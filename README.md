# Jogos Educativos da Escola

Portal simples de jogos educativos (HTML/CSS/JS puro, sem frameworks, sem anúncios,
sem coleta de dados) para os alunos jogarem no navegador.

## Níveis de dificuldade

Todos os 31 jogos do catálogo têm 3 níveis, pensados por faixa de ano escolar:

- 🟢 **Fácil** — 1º ao 3º ano
- 🟡 **Médio** — 4º ao 6º ano
- 🔴 **Difícil** — 7º ao 9º ano

Em cada jogo isso muda uma coisa diferente e faz sentido pra ele: nos jogos de
pergunta/quiz (Tabuada, Somar e Subtrair, Contando Bichos, Sequência, Geografia,
História, Internet Segura, Painel de Sílabas, Forca, Caça-Palavras) o nível
ajusta a dificuldade do conteúdo (números maiores, palavras mais compridas,
tabuleiros maiores, perguntas mais específicas). No Jogo da Velha e no Jogo de
Damas, o nível também libera um novo modo **"Contra o computador"**, com uma
inteligência artificial própria de cada jogo (fácil = joga ao acaso, médio =
ataca/bloqueia mas erra às vezes, difícil = calcula várias jogadas à frente —
no Jogo da Velha o nível difícil é matematicamente imbatível, no máximo empata).
Já no Xadrez (que já tinha "Contra o computador") e na Memória (que já tinha
"Fácil/Médio/Difícil"), só ajustamos os textos pra deixar clara a faixa de ano
sugerida. Na Cobrinha e no Corredor da Escola, o nível muda a velocidade e a
quantidade de obstáculos. No 4 em Linha, o nível ajusta a inteligência artificial
do "Contra o computador" (fácil = ao acaso, médio = ataca/bloqueia na hora, difícil
= calcula 5 jogadas à frente com poda alfa-beta). No Quebra-Blocos e no Piloto
Espacial (arcade), o nível muda velocidade/tamanho dos elementos. Nos Ladrilhos
Gêmeos, o nível muda o tamanho do tabuleiro e a quantidade de pares. No Desafio
Java, o nível fácil é só lógica de programação em português (sem código de
verdade, pra fazer sentido pra criança pequena) — só a partir do médio é que
aparece código real em Java, ficando mais avançado no difícil.

**Aleatório vs. fixo:** Tabuada, Somar e Subtrair, Contando Bichos e Complete a
Sequência geram as contas na hora, com números sorteados — variedade praticamente
infinita. Já Geografia, História, Internet Segura, Painel de Sílabas e Forca usam
uma lista de fatos/palavras reais (não dá pra "inventar" aleatoriamente um fato
histórico verdadeiro) — mas essa lista já é sempre embaralhada, e foi ampliada
pra ter bastante variedade: Geografia (26 perguntas), História (18 fatos),
Internet Segura (18 situações), Painel de Sílabas (30 palavras), Forca (28
palavras), Desafio Java (22 perguntas) — todas em português, 100% originais.

## Jogos incluídos

- ❌ Jogo da Velha (Geral)
- 🔤 Forca das Palavras (Português)
- ✖️ Desafio da Tabuada (Matemática)
- 🧠 Jogo da Memória (Geral)
- 🔍 Caça-Palavras (Português)
- ➕ Somar e Subtrair (Matemática)
- 🔢 Contando Bichos (Matemática)
- 🧩 Complete a Sequência (Matemática)
- 🔡 Painel das Sílabas (Português)
- 🐍 Cobrinha Educativa (Geral)
- ⚫ Jogo de Damas (Geral)
- ♔ Xadrez (Geral) — versão simplificada: sem roque e sem "en passant", promoção sempre vira Dama.
  Tem modo **Dois jogadores** e modo **Contra o computador** (o aluno sempre joga de Brancas),
  com 3 níveis de dificuldade (Fácil = joga ao acaso, Médio = pensa 2 jogadas à frente,
  Difícil = pensa 3 jogadas à frente com poda alfa-beta).
- 🏃 Corredor da Escola (Geral) — corredor infinito em perspectiva 3D (estilo "endless runner"),
  original, sem nenhum personagem ou asset de terceiros. Personagem desenhado em vetor com animação
  de corrida/pulo/abaixar, obstáculos ilustrados (mochila, barreira, lixeira), power-ups (ímã 🧲 e
  escudo 🛡️), combo de pontuação, recorde salvo no aparelho e suporte a arrastar o dedo (swipe)
  além dos botões/teclado.
- 🗺️ Geografia do Brasil (Geografia) — mapa clicável e estilizado das 5 regiões do Brasil (Norte,
  Nordeste, Centro-Oeste, Sudeste e Sul, desenhadas como formas orgânicas originais, não é um mapa
  geográfico de precisão). O jogo dá uma dica (capital, bioma, curiosidade) e o aluno clica na
  região certa, com banco de perguntas variadas por região.
- 📜 Linha do Tempo do Brasil (História) — mecânica de monte-a-sequência: o aluno recebe cartas com
  fatos históricos do Brasil (sem mostrar a data) e clica nelas na ordem cronológica que acha
  certa; ao verificar, vê o gabarito com as datas certas. 3 rodadas com fatos sorteados de um banco
  de 13 marcos históricos.
- 💻 Internet Segura (Educação Digital) — quiz de situações do dia a dia (senha forte, golpes,
  cyberbullying, checar notícias, permissão pra postar foto de amigos, atalhos de teclado, etc.),
  com explicação do "porquê" depois de cada resposta, não só certo/errado.
- 🔬 Classifique os Animais (Ciências) — o aluno vê um bicho e clica no grupo certo (mamífero, ave,
  peixe, réptil ou inseto); o difícil inclui pegadinhas clássicas de biologia (baleia e morcego são
  mamíferos, pinguim é ave mesmo sem voar).
- 🇬🇧 Palavras em Inglês (Inglês) — jogo de formar pares: clique numa palavra em inglês e depois no
  emoji que combina com ela, em duas colunas embaralhadas.
- 🎵 Sequência Musical (Música) — jogo de memória sonora estilo "Genius": observe a sequência de
  cores/sons (sintetizados por código, sem áudio de terceiros) e repita clicando na mesma ordem;
  cada acerto adiciona um passo novo. Recorde salvo por nível no aparelho.
- 🧩 Quebra-Cabeça Deslizante (Geral) — quebra-cabeça numérico clássico (3×3 ou 4×4): deslize as
  peças vizinhas do espaço vazio até colocar os números em ordem. O embaralhamento é sempre feito
  com movimentos válidos a partir da solução, então o quebra-cabeça nunca vem impossível de resolver.
- ➗ Desafio da Divisão (Matemática) — irmã da Tabuada: 10 continhas de divisão exata (sem sobra),
  com alternativas que ficam mais parecidas entre si conforme o nível sobe.
- 🍕 Festival de Frações (Matemática) — mostra uma pizza (desenhada por código, em SVG) com algumas
  fatias coloridas e pede pra identificar a fração certa entre as alternativas.
- 🕐 Que Horas São? (Matemática) — um relógio analógico (também em SVG) mostra um horário; o aluno
  escolhe entre alternativas de horário digital. Fácil só usa horas certas/meia-hora, difícil usa
  qualquer minuto de 5 em 5.
- 🔀 Desordem das Palavras (Português) — mesma mecânica de "clicar na ordem certa" do Painel de
  Sílabas, mas letra por letra em vez de sílaba por sílaba — um jogo de desembaralhar palavras.
- 🕵️ Palavra Secreta (Português) — adivinhe a palavra secreta em poucas tentativas: cada tentativa
  mostra quais letras estão certas no lugar certo (🟩), certas no lugar errado (🟨) ou erradas (⬜).
  Bem diferente da Forca — aqui não tem "vidas", é a lógica de eliminação que importa. Simplificação
  assumida: qualquer combinação de letras do tamanho certo é aceita como tentativa (não valida se é
  uma palavra real do dicionário).
- 🔴 4 em Linha (Geral) — o clássico jogo de encaixar 4 peças seguidas (na horizontal, vertical ou
  diagonal) num tabuleiro 7×6, original. Modo Dois jogadores ou Contra o computador, com IA própria
  por nível (fácil = ao acaso, médio = ataca/bloqueia na hora, difícil = calcula 5 jogadas à frente
  com poda alfa-beta, avaliando o tabuleiro por "janelas" de 4 células).
- 🧱 Quebra-Blocos (Geral) — jogo de arcade original de rebater uma bolinha com uma raquete pra
  quebrar fileiras de blocos, com 3 vidas e recorde salvo no aparelho. O nível muda o tamanho da
  raquete, a velocidade da bola e a quantidade de fileiras (no difícil, algumas fileiras de blocos
  precisam de 2 rebatidas pra quebrar).
- 🚀 Piloto Espacial (Geral) — jogo de arcade original de desviar/atirar em meteoros que caem do
  topo da tela, com 3 vidas, pontos por sobrevivência e destruição, e recorde salvo no aparelho.
  O nível muda a velocidade e a frequência dos meteoros.
- 🀄 Ladrilhos Gêmeos (Geral) — jogo original de raciocínio: encontre dois ladrilhos com o mesmo
  desenho (emojis) e conecte-os por um caminho livre de no máximo 2 curvas, ao estilo dos clássicos
  "jogos de conectar ladrilhos". O nível muda o tamanho do tabuleiro (de 4×4/8 pares até 8×8/32
  pares). Tem um botão de "Embaralhar restantes" pra nunca ficar travado sem nenhum par possível.
- 🏎️ Corrida Kart (Geral) — jogo de corrida em 3D de verdade (com física de veículo, câmera que
  persegue o carro, derrapagem e som de pneu). Diferente dos outros jogos do site (que são 100%
  originais), esse usa como base o projeto de código aberto
  [Starter-Kit-Racing](https://github.com/mrdoob/Starter-Kit-Racing) (licença MIT) do mrdoob (criador
  do Three.js), com modelos 3D CC0 da [Kenney](https://kenney.nl) — ambas licenças permitem
  explicitamente usar, modificar e redistribuir. Adaptamos pra rodar 100% offline (sem depender de
  nenhum servidor externo) e criamos 3 pistas diferentes por nível (a pista "Médio" é a original; as
  pistas "Fácil" e "Difícil" são novas, desenhadas por nós usando as mesmas peças 3D), além de ajustar
  a velocidade do carro por dificuldade. O tempo de volta e o recorde são salvos separadamente por
  nível.
- ☕ Desafio Java (Programação) — quiz sobre como programadores pensam e sobre a linguagem Java: no
  fácil, é só lógica de programação em português (o que é um algoritmo, um "bug", um loop, uma
  decisão "se...então..."), sem nenhum código de verdade — didático pro Fundamental I. A partir do
  médio, já aparece código real em Java pra ler e entender (variáveis, `System.out.println`,
  comparações), e o difícil cobra laços de repetição, condições `if/else` e funções.

## Extra pessoal (não listado no catálogo dos alunos)

- 🧱 [Mundo de Blocos](games/mundo-blocos.html) — sandbox 3D original de construção com blocos.
  Mundo de 80×80 blocos (40 de altura) — ainda não é infinito, mas é o dobro de largura da
  versão inicial. Não é o Minecraft nem usa nenhum código/asset dele — é original, feito com a
  biblioteca open-source [Three.js](https://threejs.org/) (licença MIT, incluída em `lib/three.min.js`).

  **Recursos:**
  - 13 tipos de bloco: grama, terra, pedra, areia, tronco, folhas, tijolo, vidro, água, neve,
    **ouro** (raro, escondido nas profundezas da pedra — dá pra minerar), lã vermelha e lã azul.
  - **4 ferramentas** (picareta, machado, pá, espada): segure o clique esquerdo pra quebrar —
    agora leva um tempinho (barra de progresso), e a ferramenta certa quebra ~4,5x mais rápido
    (picareta → pedra/ouro/tijolo, machado → tronco, pá → terra/areia/grama/neve, espada → folhas).
    Sem ferramenta ainda dá pra quebrar tudo, só mais devagar.
  - Lagos/lagoas gerados naturalmente (até 5 blocos de profundidade) — dá pra **nadar de verdade**
    (gravidade reduzida na água, com flutuação: mesmo sem apertar nada, a água empurra de volta
    pra superfície, então nunca dá pra ficar preso no fundo. Segure Espaço pra subir nadando mais
    rápido, ou Shift pra mergulhar de propósito, ex.: pra minerar ouro debaixo d'água). Também tem
    um "auto-degrau": ao nadar/andar contra uma margem ou degrau de até 1 bloco, o personagem sobe
    sozinho em vez de ficar travado.
  - **Uma vila** com 6 casinhas (2 modelos diferentes) ao redor de uma pracinha com poço, sempre
    num trecho plano do mapa — e **moradores (NPCs)** que passeiam perto de casa e cumprimentam o
    jogador com uma bolha de fala quando ele se aproxima. Tudo gerado automaticamente a partir da
    semente do mundo (inclusive em rede: todos os colegas da sala veem a mesma vila e os mesmos
    moradores, sem precisar baixar nada extra).
  - **Correr**: segura Shift andando pra ir mais rápido (na água, Shift vira "mergulhar" em vez
    de correr).
  - **Modo voador**: clique duas vezes em Espaço rapidinho pra ligar/desligar o voo
    (Espaço sobe, Shift desce, sem gravidade).
  - **Sons** ao quebrar, colocar, pular, aterrissar e andar — todos sintetizados por código
    (osciladores e ruído filtrado via Web Audio), nenhum arquivo de áudio de terceiros.
  - **Menu de pausa** (Esc): continuar ou resetar o mundo (apaga tudo e gera outro, com confirmação).
  - Praias de areia nascem automaticamente perto da água, e neve nos picos mais altos.
  - Mundo ainda salvo automaticamente no navegador (localStorage).

  Como pediu explicitamente pra ser de uso pessoal, ele **não** foi adicionado à página inicial
  (`index.html`) que os alunos veem — só abre acessando o arquivo diretamente. Se quiser que
  apareça no catálogo também, é só pedir.

## Testar localmente

Basta abrir o arquivo `index.html` em qualquer navegador (duplo clique) —
não precisa de servidor nem instalar nada. Isso vale pra jogar sozinho.

Para o modo **"Jogar em rede"** (multiplayer no laboratório), veja a seção abaixo —
aí sim é preciso rodar um servidor.

## Multiplayer em rede local (laboratório de informática)

Quatro jogos têm um modo **"Jogar em rede"**, pra dois (ou mais, no caso do Mundo de
Blocos) alunos jogarem entre si usando computadores diferentes na mesma rede local
(a rede do laboratório, sem precisar de internet):

- ❌ Jogo da Velha — 2 jogadores (X e O)
- ♔ Xadrez — 2 jogadores (Brancas e Pretas)
- ⚫ Damas — 2 jogadores (Vermelhas e Brancas)
- 🧱 Mundo de Blocos — quantos alunos quiser, todos no mesmo mundo ao mesmo tempo

Isso funciona com um **servidorzinho** rodando em **apenas um computador** (pode ser
o do professor ou qualquer máquina do laboratório) — os outros computadores dos
alunos não precisam instalar nada, só abrir o navegador.

### 1. Preparar o computador que vai ser o servidor (só uma vez)

Precisa ter o [Node.js](https://nodejs.org/) instalado (baixe a versão "LTS" e
instale normalmente, next-next-next). Depois, abra um terminal (PowerShell ou
Prompt de Comando) dentro desta pasta e rode:

```bash
npm install
```

Isso baixa a única dependência (a biblioteca `ws`, usada só pra comunicação em
rede). Só precisa fazer isso uma vez.

### 2. Ligar o servidor (toda vez que for usar)

No mesmo terminal, dentro desta pasta, rode:

```bash
npm start
```

O terminal vai mostrar uma ou mais mensagens como:

```
Servidor rodando! Acesse pelos computadores da rede em:
  http://192.168.0.15:8080/
```

Esse endereço `http://192.168....:8080/` é o que os alunos vão digitar no
navegador dos outros computadores (o IP muda conforme a rede — use o que
aparecer no seu terminal). Deixe essa janela do terminal aberta enquanto os
alunos estiverem jogando; fechar o terminal (ou apertar Ctrl+C nele) desliga
o servidor pra todo mundo.

Se a porta `8080` já estiver em uso, dá pra escolher outra:
`node server.js 9000`, por exemplo.

> **Firewall do Windows:** na primeira vez que rodar, o Windows pode perguntar
> se libera o Node.js na rede — clique em **Permitir acesso**, senão os outros
> computadores não conseguem se conectar.

### 3. Os alunos entrarem no jogo

Em cada computador do laboratório, o aluno abre o navegador e digita o
endereço que apareceu no terminal do servidor (ex.: `http://192.168.0.15:8080/`).
Isso abre o mesmo portal de jogos normalmente. Dentro do jogo desejado, em vez
de "Dois jogadores"/"Jogar sozinho", ele escolhe **"Jogar em rede"** e digita um
**código de sala** combinado com o colega (pode ser qualquer palavra, tipo
`turma5a` ou `mesa3` — só precisa ser igual dos dois lados pra caírem na mesma
partida). Quem entra primeiro na sala joga com uma cor/símbolo, quem entra depois
joga com o outro.

### Observações importantes

- Só o computador-servidor precisa do Node.js instalado; os computadores dos
  alunos só precisam de um navegador comum.
- Todos os computadores (servidor e alunos) precisam estar na **mesma rede
  local** (mesmo Wi-Fi/cabo do laboratório) — não funciona pela internet.
- No Mundo de Blocos em rede, o mundo é combinado entre os jogadores da sala
  (o primeiro a entrar gera o mundo, os demais recebem uma cópia idêntica) mas
  **não fica salvo** — ao fechar a sala/página, o mundo se perde (o modo
  "Jogar sozinho" continua salvando normalmente no navegador). Por isso, o
  botão de resetar mundo fica desativado durante uma partida em rede.
- No Jogo da Velha, Xadrez e Damas, cada sala comporta 2 jogadores; se um
  terceiro entrar com o mesmo código, ele só vai receber as jogadas mas não
  terá uma cor/símbolo designado — combine com os alunos pra usar um código
  de sala diferente por dupla.

### Se aparecer "Conexão com o servidor perdida"

- Confira se a janela do terminal com "Servidor rodando!" ainda está aberta —
  fechar ela (ou o computador dormir) derruba a conexão de todo mundo na hora.
  Se foi isso, é só rodar `npm start` de novo e todo mundo recarregar a página.
- Se aparecer um aviso vermelho no topo da tela **durante** o jogo (não só na
  tela inicial), clique em **Recarregar** e entre na mesma sala de novo — isso
  já foi corrigido pra aparecer sempre que a conexão cai, mesmo com a partida
  já em andamento (antes, em alguns casos, o aviso ficava escondido).
- O jogo manda um "sinal de vida" pro servidor a cada 20 segundos sozinho, pra
  evitar que a conexão caia sozinha só por ficar um tempo sem nenhuma jogada.

## Adicionar um novo jogo

1. Crie um novo arquivo HTML autocontido em `games/`.
2. Adicione um item no array `window.GAMES` em `data/games.js` apontando pro arquivo.

## Publicar online de graça (recomendado: Vercel)

1. Instale o [Git](https://git-scm.com/) e crie uma conta gratuita no
   [GitHub](https://github.com/) e na [Vercel](https://vercel.com/) (a Vercel
   permite login direto com a conta do GitHub).
2. Envie esta pasta para um repositório no GitHub:
   ```bash
   git init
   git add .
   git commit -m "Site de jogos educativos"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/jogos-educativos-escola.git
   git push -u origin main
   ```
3. Na Vercel, clique em **Add New Project**, selecione o repositório que você
   acabou de criar e clique em **Deploy** (não precisa mudar nenhuma configuração,
   é um site estático).
4. A Vercel vai gerar um link tipo `https://jogos-educativos-escola.vercel.app`
   — é esse link que você compartilha com os alunos.

### Alternativa mais rápida (sem GitHub)

Se preferir não usar Git, instale a CLI da Vercel e rode direto desta pasta:

```bash
npm install -g vercel
vercel
```

Ela vai pedir login (abre o navegador) e perguntar algumas configurações —
pode aceitar todas as opções padrão. Ao final ela imprime o link público do site.

## Licença / autoria

Todo o código (HTML, CSS, JS e os jogos) foi criado do zero para este projeto,
sem uso de assets, textos ou código de terceiros — livre para a escola usar,
modificar e distribuir como quiser. As exceções são:

- `lib/three.min.js`, a biblioteca open-source Three.js (licença MIT) usada só no
  Mundo de Blocos para desenhar gráficos 3D — ela não faz parte do conteúdo
  educativo em si.
- `games/corrida-kart/`, que usa como base o projeto open-source
  [Starter-Kit-Racing](https://github.com/mrdoob/Starter-Kit-Racing) do mrdoob
  (licença MIT, incluída em `games/corrida-kart/LICENSE`) e modelos 3D CC0 da
  [Kenney](https://kenney.nl), adaptados com pistas novas e ajustes de
  dificuldade — ver descrição completa acima. Diferente dos outros jogos do
  site, esse não é 100% original, mas ambas as licenças permitem
  explicitamente o uso, modificação e redistribuição feitos aqui.
