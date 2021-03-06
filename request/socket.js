window.addEventListener( `load`, function(){// Ao carregar a página.. no caso janela
	//Criando um novo websocket 
	
	websocket = new WebSocket( `ws://localhost:9000/chat/msg.php` )
	
	// Isso abaixo é o correspondente function (ev), estou usando o arrow function, como codestyle indicado pela airbnb
	websocket.onopen = ( ev ) => { // Ao estabelecer conexão já dispara, sem tempo de latância no browser
		console.log( ` Conectou ヾ(⌐■_■)ノ♪` ) //Notifica no cosole do browser que conectou
	}

  // Da mesma forma do que é para carregar tudo, é aqui, porém ele dispara com o click sobre  botão
	document.querySelector( `#Enviar` ).addEventListener( `click`, () => {// Arrow function, como comentei na linha 7, sem passar valor
		let mensagem = document.querySelector(".citar").innerHTML + document.querySelector( `#message` ).value // Captura o atributo value do selecionado
		document.querySelector(".citar").innerHTML = null;
		let nome = document.querySelector( `#name` ).value // Da mesma forma anterior
		// Passei a usar let, assim declaramos variáveis atualmente e no novo codestyle, let e const
		let msg = {// A variável mensagem esta em formato de json, para ser enviada ao servidor
		message: mensagem,
		name: nome
		}
		// Agora, ele converterá sua sintaxe ficará parecido com:
		// msg{ "mensagem":"conteúdo", "nome":"Conteúdo"}
		websocket.send( JSON.stringify( msg ) ) // Função send, correspondente ao evio sintaxe: Conexão.send("Dados á passar")
	})
	
	// Onmessage, como o nome bem descritivo diz, dispara assim que passar dados da parte elétrica vindo de tal conexão, sem delay
	websocket.onmessage = ( ev ) => {// sintaxe: Conexão.onmessage = (valor)
		let msg = JSON.parse( ev.data ) // Lê o json recebido do servidor
		let umsg = msg.message // Capturando informações do json.
		let uname = msg.name // Sintaxe padrão de manipulação de json, Chave.valor à corresponder
		// Pega um elemento e substitui seu conteúdo, aceitando carácteres html. ### Esta função ↓ será responsavel pela responsta
		document.getElementById( `conteudos` ).innerHTML = `<div class="msg" onclick="quote('${uname}', '${umsg}', '.citar')"><strong>${uname}</strong> : ${umsg}</div>`
		// Apagamos conteúdo existente no texto, pois não precisamos se uma vez ele já foi enviado 	
		document.querySelector( `#message` ).value = ``; //reset text
	}
	// E uma vez que ocorre um erro, existe tal função, sintaxe: Contaxão.onerror = (ErroQueIráSerPassado) => Parâmetros para tratá-lo
	websocket.onerror	= (ev) => {
		// Lembre-se de que em questão de segurança não libere muitas informações a respeito do erro, ponha seu email, para comunicar
		document.querySelector( `#avisos` ).innerHTML = `<div class="err">Ocorreu um erro uatafóquio! : ${ev.data}</div>`
		document.getElementById( `conteudos` ).innerHTML = ``// Para esvaziar o outro campo de mensagem.
	} 
	// E uma vez que a conexão é enserrada também é avisado, sintaxe semelhante as outras, porém substituindo o nome por onclose
	websocket.onclose = (ev) => {
		document.querySelector( `#avisos` ).innerHTML = `<div class="fue">Você esta desconectado</div>`
		document.getElementById( `conteudos` ).innerHTML = ``// Seria bem contraditório uma mensagem de conectado se a rede desconectou
	} 
})
/* 
	Os caracteres estão bagunçados? use utf-8 em seu editor
*/
