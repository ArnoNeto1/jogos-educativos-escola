-- Esquema do banco de dados do portal de jogos educativos.
-- Cole este arquivo inteiro no SQL Editor do Supabase (Dashboard → SQL Editor → New query)
-- e clique em "Run". Pode rodar de novo sem problema (usa "if not exists"/"or replace").

-- ────────────────────────────────────────────────────────────
-- Tabela de placares/recordes compartilhados entre os alunos
-- ────────────────────────────────────────────────────────────
create table if not exists recordes (
  id bigint generated always as identity primary key,
  jogo text not null,                              -- ex: 'corredor-escolar', 'quebra-blocos'
  nivel text,                                       -- ex: 'facil', 'medio', 'dificil' (pode ser nulo)
  nome_aluno text not null check (char_length(nome_aluno) between 1 and 24),
  pontuacao numeric not null check (pontuacao >= 0),
  tipo_pontuacao text not null default 'pontos' check (tipo_pontuacao in ('pontos', 'tempo')),
  -- 'pontos': maior é melhor (ex.: Corredor da Escola, Quebra-Blocos)
  -- 'tempo': menor é melhor (ex.: tempo de volta no Corrida Kart)
  criado_em timestamptz not null default now()
);

create index if not exists recordes_jogo_nivel_idx on recordes (jogo, nivel, pontuacao desc);

alter table recordes enable row level security;

-- Qualquer pessoa pode ver o placar (é público, tipo um mural da sala)
drop policy if exists "recordes_select_publico" on recordes;
create policy "recordes_select_publico" on recordes
  for select using (true);

-- Qualquer pessoa pode enviar uma pontuação nova (sem precisar de login)
drop policy if exists "recordes_insert_publico" on recordes;
create policy "recordes_insert_publico" on recordes
  for insert with check (true);

-- Ninguém pode alterar ou apagar pontuações já enviadas (nem os próprios alunos) —
-- assim ninguém consegue "editar" o recorde de outra pessoa depois de enviado.
-- (não criamos política de update/delete: por padrão, com RLS ativado, isso já bloqueia tudo)

-- ────────────────────────────────────────────────────────────
-- Tabela de salas de multiplayer (guarda só o essencial pra sincronizar
-- quem chega depois de uma partida já ter começado — as jogadas em si
-- viajam por "broadcast" em tempo real, sem passar pelo banco)
-- ────────────────────────────────────────────────────────────
create table if not exists salas_multiplayer (
  codigo text primary key check (char_length(codigo) between 1 and 40),
  jogo text not null,
  estado jsonb not null default '{}'::jsonb,   -- último estado conhecido da partida (formato livre por jogo)
  atualizado_em timestamptz not null default now()
);

alter table salas_multiplayer enable row level security;

drop policy if exists "salas_select_publico" on salas_multiplayer;
create policy "salas_select_publico" on salas_multiplayer
  for select using (true);

drop policy if exists "salas_insert_publico" on salas_multiplayer;
create policy "salas_insert_publico" on salas_multiplayer
  for insert with check (true);

drop policy if exists "salas_update_publico" on salas_multiplayer;
create policy "salas_update_publico" on salas_multiplayer
  for update using (true);

-- Limpeza automática: apaga salas com mais de 24h sem atividade, pra não acumular lixo.
-- (o Supabase roda isso via pg_cron se estiver disponível no seu plano; se não estiver,
-- não tem problema, é só uma limpeza de conveniência, não afeta o funcionamento do site)
