// Configuração de conexão com o Supabase (banco de dados na nuvem).
// A chave "anon" abaixo é pública por natureza — o Supabase foi projetado pra
// essa chave viver no código do site; o controle de acesso de verdade fica
// nas regras de segurança (RLS) configuradas no banco, não em esconder essa chave.
//
// Requer que lib/supabase.min.js já tenha sido carregado antes deste script.
var SUPABASE_URL = "https://fsidlpjvxqqfbthzxzin.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_l515_Wf_ijv-R4y_yt5CKQ_KVIVTQqt";

var supabaseCliente = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
