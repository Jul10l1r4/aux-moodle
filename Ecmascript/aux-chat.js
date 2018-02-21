// Ele receberpa o autor do texto, o texto, e onde é o campo para enviar simultanemente
const quote = (x, y, z) => {
	console.log("chegou 1")
	// z selected, ele é o caminho já traçado do lugar
	let zs = document.querySelector(z);
	// abreviatura de div, ele criará o documento
	zs.setAttribute("style","transition-duration:0.7s;z-index:999;text-align:center");
	let buf = `<div id="resposta"><a href="${x}.php">${x}</a><br/><blockquote>${y}</blockquote></div>`;
	zs.innerHTML = buf;
	//zs.appendChild(dv);	
}

