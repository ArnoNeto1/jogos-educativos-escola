/*
 * Traducao pt-BR baseada em td-msg-en.js
 * Jogo original por oldj <oldj.wu@gmail.com> - http://oldj.net/
 */


// _TD.a.push begin
_TD.a.push(function (TD) {

	TD._msg_texts = {
		"_cant_build": "Não é possível construir aqui!",
		"_cant_pass": "Não é possível passar!",
		"entrance": "Entrada",
		"exit": "Saída",
		"not_enough_money": "Dinheiro insuficiente, precisa de $${0}.",
		"wave_info": "Onda ${0}",
		"panel_money_title": "Dinheiro: ",
		"panel_score_title": "Pontos: ",
		"panel_life_title": "Vida: ",
		"panel_building_title": "Construções: ",
		"panel_monster_title": "Monstros: ",
		"building_name_wall": "Barreira",
		"building_name_cannon": "Canhão",
		"building_name_LMG": "Metralhadora Leve",
		"building_name_HMG": "Metralhadora Pesada",
		"building_name_laser_gun": "Canhão a laser",
		"building_info": "${0}: Nível ${1}, Dano ${2}, Velocidade ${3}, Alcance ${4}, Abates ${5}",
		"building_info_wall": "${0}",
		"building_intro_wall": "Barreira: monstros não conseguem passar ($${0})",
		"building_intro_cannon": "Canhão: equilíbrio entre alcance e dano ($${0})",
		"building_intro_LMG": "Metralhadora Leve: alcance maior, dano normal ($${0})",
		"building_intro_HMG": "Metralhadora Pesada: tiro rápido, dano maior, alcance normal ($${0})",
		"building_intro_laser_gun": "Canhão a laser: dano maior, 100% de acerto ($${0})",
		"click_to_build": "Clique com o botão esquerdo para construir ${0} ($${1})",
		"upgrade": "Melhorar ${0} para o nível ${1}, custa $${2}.",
		"sell": "Vender ${0} por $${1}",
		"upgrade_success": "Melhoria concluída! ${0} subiu para o nível ${1}. Próxima melhoria vai custar $${2}.",
		"monster_info": "Monstro: Vida ${0}, Escudo ${1}, Velocidade ${2}, Dano ${3}",
		"button_upgrade_text": "Melhorar",
		"button_sell_text": "Vender",
		"button_start_text": "Começar",
		"button_restart_text": "Reiniciar",
		"button_pause_text": "Pausar",
		"button_continue_text": "Continuar",
		"button_pause_desc_0": "Pausar o jogo",
		"button_pause_desc_1": "Continuar o jogo",
		"blocked": "Não é possível construir aqui, isso bloquearia o caminho da entrada até a saída!",
		"monster_be_blocked": "Não é possível construir aqui, algum monstro ficaria preso!",
		"entrance_or_exit_be_blocked": "Não é possível construir na entrada ou na saída!",
		"_": "ERRO"
	};

	TD._t = TD.translate = function (k, args) {
		args = (typeof args == "object" && args.constructor == Array) ? args : [];
		var msg = this._msg_texts[k] || this._msg_texts["_"],
			i,
			l = args.length;
		for (i = 0; i < l; i++) {
			msg = msg.replace("${" + i + "}", args[i]);
		}

		return msg;
	};


}); // _TD.a.push end
