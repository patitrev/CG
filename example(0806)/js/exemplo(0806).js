var scene;//nosso mundo virtual
var camera; 
var render;// responsável por gerar as imagems

var elements = [];
var velCubo = 0.10;

var parametrosGUI;

var controls;


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


	let opcoesCabeca = ["Roberto", "Rita","Astolfo","Reinaldo","Madalena", "Gerusa","Geraldo", "Natalino","Tereza", "Princesa"];
	let opcHead = cores.add(parametrosGUI, 'formaCabeca').options(opcoesCabeca).name("Olhando");
	opcHead.onChange(function(parametro){
		let cabeca;
		
		if (parametro == "Roberto"){
			camera.lookAt(elements["dog"].position);
		}else if (parametro == "Rita"){
			camera.lookAt(elements["fla"].position);
		}
		else if (parametro == "Astolfo"){
			camera.lookAt(elements["cat"].position);
		}
		else if (parametro == "Reinaldo"){
			camera.lookAt(elements["cat1"].position);
		}
		else if (parametro == "Madalena"){
			camera.lookAt(elements["cat2"].position);
		}
		else if (parametro == "Gerusa"){
			camera.lookAt(elements["tik"].position);
		}
		else if (parametro == "Geraldo"){
			camera.lookAt(elements["duck"].position);
		}
		else if (parametro == "Natalino"){
			camera.lookAt(elements["glu"].position);
		}
		else if (parametro == "Tereza"){
			camera.lookAt(elements["tart"].position);
		}
		else if (parametro == "Princesa"){
			camera.lookAt(elements["cow"].position);
		}
	
	});


	//gui.open();
}

/* FIM INTERFACE*/

var loadObjects = function(){
	let objLoader = new THREE.OBJLoader();
	let fbxLoader = new THREE.FBXLoader();
	let textLoader = new THREE.TextureLoader();

	// objLoader.load(
	// 	'assets/ninja/ninjaHead_Low.obj',//o que carregar
	// 	function(obj){ //função executada após o loading
			
	// 		let ninjaMaterial = new THREE.MeshStandardMaterial();

	// 		obj.traverse(
	// 			function (child){
	// 				if (child instanceof THREE.Mesh){
	// 					child.material = ninjaMaterial;
	// 				}
	// 			}
	// 		);

	// 		let texture = textLoader.load('assets/ninja/ao.jpg');
	// 		ninjaMaterial.map = texture;
	// 		ninjaMaterial.normalMap = textLoader.load('assets/ninja/normal.png');
	// 		ninjaMaterial.displacementMap = textLoader.load('assets/ninja/displacement.jpg');
	// 		ninjaMaterial.displacementScale = 2.436143;
	// 		ninjaMaterial.displacementBias = -0.428408;


	// 		obj.scale.x = 0.3;
	// 		obj.scale.y = 0.3;
	// 		obj.scale.z = 0.3;

	// 		obj.position.y=-48;

	// 		//obj.rotation.x += 1.5;

	// 		//obj.position.x = -7;
			
	// 		//obj.rotation.x-= Math.PI/2; //rotação de 90°	
			
	// 		//scene.add(obj);
	// 		elements['mamaco'] = obj;
	// 		console.log("Carregou!");
	// 	},
	// 	function (andamento){ //função executada durante o loading
	// 		console.log(andamento.loaded/andamento.total*100 + "%");
	// 	},
	// 	function(error){//função executada se deu problema
	// 		console.log("Deu erro: "+error);
	// 	}
	// );


	// objLoader.load(
	// 	'assets/cerberus/Cerberus.obj',//o que carregar
	// 	function(obj){ //função executada após o loading
			
	// 		let cerbMaterial = new THREE.MeshStandardMaterial();

	// 		obj.traverse(
	// 			function (child){
	// 				if (child instanceof THREE.Mesh){
	// 					child.material = cerbMaterial;
	// 				}
	// 			}
	// 		);

	// 		 let texture = textLoader.load('assets/cerberus/Cerberus_A.jpg');
	// 		 cerbMaterial.map = texture;
	// 		 cerbMaterial.normalMap = textLoader.load('assets/cerberus/Cerberus_N.jpg');
	// 		 cerbMaterial.metalnessMap = cerbMaterial.roughnessMap = textLoader.load('assets/cerberus/Cerberus_RM.jpg');
	// 		// ninjaMaterial.displacementMap = textLoader.load('assets/ninja/displacement.jpg');
	// 		// ninjaMaterial.displacementScale = 2.436143;
	// 		// ninjaMaterial.displacementBias = -0.428408;


	// 		obj.scale.x = 6;
	// 		obj.scale.y = 6;
	// 		obj.scale.z = 6;

	// 		// obj.position.y=0;
	// 		// obj.position.z=10;
	// 		// obj.position.z=7;

	// 		//obj.rotation.x += 1.5;

	// 		//obj.position.x = -7;
			
	// 		//obj.rotation.x-= Math.PI/2; //rotação de 90°	
			
	// 		scene.add(obj);
	// 		elements['mamaco'] = obj;
	// 		console.log("Carregou!");
	// 	},
	// 	function (andamento){ //função executada durante o loading
	// 		console.log(andamento.loaded/andamento.total*100 + "%");
	// 	},
	// 	function(error){//função executada se deu problema
	// 		console.log("Deu erro: "+error);
	// 	}
	// );

	// fbxLoader.load(
	// 	'assets/Pug.fbx',//o que carregar
	// 	function(obj){ //função executada após o loading
			
	// 		obj.traverse(
	// 			function (child){
	// 				if (child instanceof THREE.Mesh){
	// 					let texture = textLoader.load('assets/Pug_texture.png');
	// 					child.material = new THREE.MeshStandardMaterial({map: texture});
	// 					console.log("passou aqui");
	// 				}
	// 			}
	// 		);

	// 		obj.scale.x = 0.01;
	// 		obj.scale.y = 0.01;
	// 		obj.scale.z = 0.01;

	// 		obj.position.x = 0;
	// 		obj.position.y = -5.9;
			
			
	// 		scene.add(obj);
	// 		elements['pug'] = obj;
	// 		console.log("Carregou!");
	// 	},
	// 	function (andamento){ //função executada durante o loading
	// 		console.log(andamento.loaded/andamento.total*100 + "%");
	// 	},
	// 	function(error){//função executada se deu problema
	// 		console.log("Deu erro: "+error);
	// 	}
	// );

	fbxLoader.load(
		'assets/Cow.FBX',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/UV Cow.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 0.06;

		
			obj.position.y = -5.9;
			obj.position.z = 70;
			obj.position.x = -30;
			obj.rotation.y= Math.PI/2; 
			scene.add(obj);
			elements['cow'] = obj;
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
		'assets/Turtle.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/UV Turtle.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 0.0035;

		
			obj.position.y = -5.9;
			obj.position.z = 20;
			obj.position.x = -30;
			
			scene.add(obj);
			elements['tart'] = obj;
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
		'assets/Turkey.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Turkey_texture.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;

		
			obj.position.y = -5.9;
			obj.position.z = 70;
			obj.position.x = 30;
			obj.rotation.y= Math.PI; 
			scene.add(obj);
			elements['glu'] = obj;
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
		'assets/Swan.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Swan_texture.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
			obj.rotation.y-= Math.PI/2; 
		
			obj.position.y = -5.9;
			obj.position.z = 50;
			obj.position.x = 40;
			
			scene.add(obj);
			elements['duck'] = obj;
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
						let texture = textLoader.load('assets/UV Chicken.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
			obj.rotation.y= Math.PI; 
		
			obj.position.y = -5.9;
			obj.position.z = 80;
			
			scene.add(obj);
			elements['tik'] = obj;
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
		'assets/Flamingo.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Flamingo_texture.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;

		
			obj.position.y = -5.9;
			obj.position.x = -10;
			
			scene.add(obj);
			elements['fla'] = obj;
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
		'assets/Maine Coon.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Maine_Coon_texture.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;

			obj.position.x = 5;
			obj.position.y = -5.9;
			
			obj.rotation.y -= Math.PI/4; 
			scene.add(obj);
			elements['cat'] = obj;
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
		'assets/British Shorthair.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/British_Shorthair_texture.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
			obj.rotation.y= Math.PI/4; 
			obj.position.x = -35;
			obj.position.y = -5.9;
			obj.position.z = 45;
			
			scene.add(obj);
			elements['cat1'] = obj;
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
		'assets/Cat.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/CatTexture.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.005;
			obj.scale.y = 0.005;
			obj.scale.z = 0.005;
			obj.position.z= 10
			obj.position.x = 25;
			obj.position.y = -5.9;
			obj.rotation.y= Math.PI/2; 
			
			scene.add(obj);
			elements['cat2'] = obj;
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
		'assets/Chihuahua.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Chihuahua_texture.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = obj.scale.y = obj.scale.z = 0.01;

			obj.position.x = 35;
			obj.position.y = -5.9;
			obj.position.z = 25;
			obj.rotation.y -= Math.PI/2; 
			
			scene.add(obj);
			elements['dog'] = obj;
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

	movimentaBoneco();

	render.render(scene,camera); //quem, e como será vista a cena
}

var criaIluminacao = function (){
	let spot = new THREE.SpotLight(0xffffff);
	spot.position.set(100,100,100);
	scene.add(spot);

	scene.add(new THREE.AmbientLight(0x666666, 0.6));
}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff);

	camera = new THREE.PerspectiveCamera(
					40, //angulo de visualização
					window.innerWidth/window.innerHeight, //aspect ratio
					0.1, //distancia do near
					500 //far
				);


	render = new THREE.WebGLRenderer();
	render.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(render.domElement);

	camera.position.z = 30;
	// camera.position.y = 6;
	// camera.position.x = 4;
	createGui();
	criaIluminacao();
	loadObjects();

	animation();	

	controls = new THREE.OrbitControls(camera, render.domElement);


	let textLoader = new THREE.TextureLoader();
	let textureGround = textLoader.load('assets/grasslight-big.jpg');
	textureGround.wrapS = textureGround.wrapT = THREE.RepeatWrapping;
	textureGround.repeat.set(25,25);
	textureGround.anisotropy = 16;
	textureGround.encoding = THREE.sRGBEncoding;
	let materialGround = new THREE.MeshStandardMaterial({map: textureGround});
	//materialGround.normalMap = textLoader.load('assets/grasslight-big-nm.jpg');
	//materialGround.normalMap.wrapS = materialGround.normalMap.wrapT = THREE.RepeatWrapping;
	//materialGround.normalMap.repeat.set(25,25);

	let ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000),
									materialGround);
	ground.rotation.x = -Math.PI/2;
//	ground.position.z -= 300;
//	ground.position.x += 300;
	ground.position.y-=6;
	scene.add(ground);

	scene.fog = new THREE.Fog(0xcce0ff, 100, 500);



	document.addEventListener('keydown', onKeyDown); //pegar um evento do teclado. Aperta tecla.
	document.addEventListener('keyup', onKeyUp); //pegar um evento do teclado. Solta tecla.


	// //Eventos relacionados ao mouser
	// document.addEventListener('mousemove', movimentaMouser); //pegar um evento do teclado. Aperta tecla.
	// document.addEventListener('mouseup', soltaClick); //pegar um evento do teclado. Aperta tecla.
	// document.addEventListener('mousedown', click); //pegar um evento do teclado. Aperta tecla.

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


/**
 * Mapeamento e ações de movimento
 */
function movimentaBoneco(){
	if (keyPressed["R"]){
		elements["mamaco"].rotation.y+=0.1;
	}

	
}


var keyPressed = []; 

keyPressed['R'] = false;
keyPressed['S'] = false;
keyPressed['W'] = false;


var onKeyUp = function (e){
	console.log("Soltei: " + e.keyCode);

	//Solução elegante -> keyPressed[e.keyCode] = false;
	
	if (e.keyCode == 82){ //tecla R
		keyPressed['R'] = false;
	}

	if (e.keyCode == 87){ //tecla w
		keyPressed['W'] = false;
	}

	if (e.keyCode == 83){ //tecla s
		keyPressed['S'] = false;
	}
}


var onKeyDown = function (e){
	//console.log(e.keyCode);

	/* TECLAS DE MOVIMENTAÇÃO */
	if (e.keyCode == 87){ //tecla w
		keyPressed['W'] = true;
	}

	if (e.keyCode == 83){ //tecla s
		keyPressed['S'] = true;
	}


	if (e.keyCode == 189){ //tecla -
		elements["tronco"].scale.x-= 0.1;
		elements["tronco"].scale.y-= 0.1;
		elements["tronco"].scale.z-= 0.1;
	}

	if (e.keyCode == 187){ // tecla +
		elements["tronco"].scale.x+= 0.1;
		elements["tronco"].scale.y+= 0.1;
		elements["tronco"].scale.z+= 0.1;
	}

	if (e.keyCode == 38){ // up
		camera.position.z-=0.5;
	}

	if (e.keyCode == 40){ // down
		camera.position.z+=0.5;
	}

	
	if (e.keyCode == 81){ // q
		if (elements["pivoOmbroEsq"].rotation.x < -2.8 || elements["pivoOmbroEsq"].rotation.x > 0.1)
			rotacaoPivoOmbEsq*=-1;

		
		elements["pivoOmbroEsq"].rotation.x-=rotacaoPivoOmbEsq;
		
		console.log("Rot "+ elements["pivoOmbroEsq"].rotation.x);
	}

	if (e.keyCode == 82){ // R
		keyPressed["R"] = true;
		
	}
}
/**
 * FIM MOVIMENTOS
 */

window.onload = this.init;

