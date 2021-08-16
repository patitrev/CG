var scene;//nosso mundo virtual
var camera; 
var render;// responsável por gerar as imagems

var elements = [];
var velCubo = 0.10;

var parametrosGUI;


/**
 * INTEFACE GRÁFICA
 */

var createGui = function(){
	const gui = new dat.GUI();

	parametrosGUI = {
		scalaMonstro: 1,
		posMonstroX: 0,
		posMonstroY: 0,
		posMonstroZ: 0,

		monstroColorT: "#899400",

		skyColor: "#00bfff",
		
		formaCabeca : "Suzanne"
	}

	let fazScala = gui.add(parametrosGUI, 'scalaMonstro').min(0.1).max(2).step(0.1).name("Scala Monstro");
	fazScala.onChange(function(parametro){
		elements["mamaco"].scale.x = elements["mamaco"].scale.y = elements["mamaco"].scale.z =  parametro;
	});

	let posicao = gui.addFolder("Posicao");
	
	let posX = posicao.add(parametrosGUI, 'posMonstroX').min(-4).max(4).step(0.5).name("Pos. X");
	posX.onChange(function(parametro){
		elements["mamaco"].position.x =  parametro;
	});
	let posY = posicao.add(parametrosGUI, 'posMonstroY').min(-4).max(4).step(0.5).name("Pos. Y");
	posY.onChange(function(parametro){
		elements["mamaco"].position.y =  parametro;
	});
	let posZ = posicao.add(parametrosGUI, 'posMonstroZ').min(-4).max(4).step(0.5).name("Pos. Z");
	posZ.onChange(function(parametro){
		elements["mamaco"].position.z =  parametro;
	});

	let cores = gui.addFolder("Closet");
	let tronColor = cores.addColor(parametrosGUI, 'monstroColorT').name("Camiseta");
	tronColor.onChange(function(parametro){
		console.log(elements["mamaco"]);
		elements["mamaco"].traverse(
			function (child){
				if (child instanceof THREE.Mesh){
					child.material = new THREE.MeshStandardMaterial({color: new THREE.Color(parametro)});
					console.log("passou aqui");
				}
			}
		);
	});

	let skyColor = cores.addColor(parametrosGUI, 'skyColor').name("Sky");
	skyColor.onChange(function(parametro){
		scene.background = new THREE.Color(parametro);
	});


	let opcoesCabeca = ["Astolfo", "Gerusa", "Plane", "Jack", "Alice", "Madalena"];
	let opcHead = cores.add(parametrosGUI, 'formaCabeca').options(opcoesCabeca).name("Olhando");
	opcHead.onChange(function(parametro){
		let cabeca;
		
		if (parametro == "Astolfo"){
			camera.lookAt(elements["mamaco"].position);
		}
		else if (parametro == "Gerusa"){
			camera.lookAt(elements["chicken"].position);
		}
		else if (parametro == "Plane"){
			camera.lookAt(elements["plane"].position);
		}
		else if (parametro == "Jack"){
			camera.lookAt(elements["skeleton"].position);
		}
		else if (parametro == "Alice"){
			camera.lookAt(elements["alice"].position);
		}
		else if (parametro == "Madalena"){
			camera.lookAt(elements["mada"].position);
		}
	});


	//gui.open();
}

/* FIM INTERFACE*/

var loadObjects = function(){
	let objLoader = new THREE.OBJLoader();
	let fbxLoader = new THREE.FBXLoader();

	objLoader.load(
		'assets/mimi.obj',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({color: 0x292a21});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 1.3;
			
		
			obj.position.y=	-5;
			
			scene.add(obj);
			elements['mamaco'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);

	objLoader.load(
		'assets/mada.obj',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({color: 0xfe9fd2});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 1.3;
			
		
			obj.position.y=	-5;
			obj.position.z = 60;
			obj.rotation.y= 2*Math.PI/3;
			
			scene.add(obj);
			elements['mada'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);

	objLoader.load(
		'assets/Commercial Airplane.obj',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({color: 0x02de89});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 3;
			
			obj.position.x= -30;
			obj.position.y=	30;
			obj.position.z= 30;
			
			scene.add(obj);
			elements['plane'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);

	objLoader.load(
		'assets/alice.obj',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({color: 0xfec9a1});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 3;
			
			obj.position.x= -50;
			obj.position.y=	-5;
			obj.position.z= 50;

			obj.rotation.y= Math.PI/2; //rotação de 90°

			scene.add(obj);

			elements['alice'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);

	fbxLoader.load(
		'assets/Chicken.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({color: 0xffffff});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;

			obj.position.x = -45;
			obj.position.y = -5;
			
			
			scene.add(obj);
			elements['chicken'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);

	fbxLoader.load(
		'assets/skeleton.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({color: 0x191970});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 0.1;
			obj.position.x = 45;
			obj.position.y = -5

			
			
			scene.add(obj);
			elements['skeleton'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);
	
}


var animation = function (){
	requestAnimationFrame(animation); //loop da animação

	
	render.render(scene,camera); //quem, e como será vista a cena
}

var criaIluminacao = function (){
	let spot = new THREE.SpotLight(0xffffff);
	spot.position.set(100,100,100);
	scene.add(spot);
}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x00bfff);

	camera = new THREE.PerspectiveCamera(
					40, //angulo de visualização
					window.innerWidth/window.innerHeight, //aspect ratio
					6, //distancia do near
					100 //far
				);


	render = new THREE.WebGLRenderer();
	render.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(render.domElement);

	camera.position.z = 30;

	createGui();
	criaIluminacao();
	loadObjects();

	animation();	




	let ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000),
								new THREE.MeshStandardMaterial({color: 0x7cfc00}));
	ground.rotation.x = -Math.PI/2;
	ground.position.y-=6;
	scene.add(ground);
	

	

	// //Eventos relacionados ao mouser
	document.addEventListener('mousemove', movimentaMouser); //pegar um evento do teclado. Aperta tecla.
	document.addEventListener('mouseup', soltaClick); //pegar um evento do teclado. Aperta tecla.
	document.addEventListener('mousedown', click); //pegar um evento do teclado. Aperta tecla.

}

// var x = 0.1,y = 1.5,z = 0.4;
var rotacaoPivoOmbEsq = 0.1;

/**
 * ROTAÇÃO MOUSER
 */

var estaClicando = false;

var click = function(){
	estaClicando = true;
}

var soltaClick = function(){
	estaClicando = false;
}

var mouserAnterior = {
	x:0,
	y:0

};

var movimentaMouser = function(e){
	let difMouser = {
		x: e.offsetX - mouserAnterior.x,
		y: e.offsetY - mouserAnterior.y
	}

	if (estaClicando){
		let rotacaoElemento = new THREE.Quaternion().setFromEuler( new THREE.Euler(0, //paraRadianos(difMouser.y)*0.1,
																					paraRadianos(difMouser.x)*0.1,
																					0,
																					'XYZ'));

		//elements["tronco"].quaternion.multiplyQuaternions(rotacaoElemento, elements["tronco"].quaternion);

		camera.quaternion.multiplyQuaternions(rotacaoElemento, camera.quaternion);

		//camera.rotation.y+=paraRadianos(difMouser.x)*0.1;
	//	camera.rotation.x+=paraRadianos(difMouser.y)*0.001;
	}
	mouserAnterior = {
		x:e.offsetX,
		y:e.offsetY
	
	};

}

var paraRadianos = function (valor){
	return valor *(Math.PI/180);
}
/**
 * FIM ROTAÇÃO MOUSER
 */

window.onload = this.init;

