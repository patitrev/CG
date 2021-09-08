
var scene;//nosso mundo virtual
var camera; 
var render;// responsável por gerar as imagems

var elements = [];
var velCubo = 0.10;

var parametrosGUI;

var controls;

var relogio = new THREE.Clock();

//itens para a animação
var mixer;
var animationArray = new Array();
var animacaoAtiva;
var animacaoAnterior;
var loboCarregado = false;
var velocidadeLobo = 0;

var velociadadeChar = 0.5;

var carregouScene = false;

var charGroup;


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
		
		formaCabeca : "Suzanne",

		//animações
		animaca00 : function (){
			trocaAnimacao(animationArray[0]);
			velocidadeLobo = 0;
		},
		animaca01 : function (){
			trocaAnimacao(animationArray[1]);
			velocidadeLobo = 0;
		},
		animaca02 : function (){
			trocaAnimacao(animationArray[2]);			
			velocidadeLobo = 0;
		},
		animaca03 : function (){
			trocaAnimacao(animationArray[3]);
			velocidadeLobo = 0;
		},
		animaca04 : function (){
			trocaAnimacao(animationArray[4]);
			velocidadeLobo = 0;
		},
		animaca05 : function (){
			trocaAnimacao(animationArray[5]);
			velocidadeLobo = 0;
		},
		animaca06 : function (){
			trocaAnimacao(animationArray[6]);
			velocidadeLobo = 0;
		}


	}

	let fazScala = gui.add(parametrosGUI, 'scalaMonstro').min(0.1).max(2).step(0.1).name("Scala Sol");
	fazScala.onChange(function(parametro){
		elements["sol"].intensity = parametro;
	});

	let posicao = gui.addFolder("Posicao");
	
	let posX = posicao.add(parametrosGUI, 'posMonstroX').min(-200).max(300).step(0.5).name("Pos. X");
	posX.onChange(function(parametro){
		elements["sol"].position.x =  parametro;
	});
	let posY = posicao.add(parametrosGUI, 'posMonstroY').min(-4).max(1000).step(0.5).name("Pos. Y");
	posY.onChange(function(parametro){
		elements["sol"].position.y =  parametro;
	});
	let posZ = posicao.add(parametrosGUI, 'posMonstroZ').min(-4).max(4).step(0.5).name("Pos. Z");
	posZ.onChange(function(parametro){
		elements["sol"].position.z =  parametro;
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


	let opcoesCabeca = ["Suzanne", "Pug"];
	let opcHead = cores.add(parametrosGUI, 'formaCabeca').options(opcoesCabeca).name("Olhando");
	opcHead.onChange(function(parametro){
		let cabeca;
		
		if (parametro == "Suzanne"){
			camera.lookAt(elements["lobo"].position);
		}else if (parametro == "Pug"){
			camera.lookAt(elements["lobo"].position);
		}
	
	});

	let animacoes = gui.addFolder("Animações");
	animacoes.add(parametrosGUI,'animaca00').name("Suave");
	animacoes.add(parametrosGUI,'animaca01').name("Pula mijoleta");
	animacoes.add(parametrosGUI,'animaca02').name("Caminhar");
	animacoes.add(parametrosGUI,'animaca03').name("Morre");
	animacoes.add(parametrosGUI,'animaca04').name("Levou dano");
	animacoes.add(parametrosGUI,'animaca05').name("Chute");
	animacoes.add(parametrosGUI,'animaca06').name("Correr");


	//gui.open();
}

/* FIM INTERFACE*/


/*Função que controla as animações*/
var trocaAnimacao = function (novaAnimacao) {
	if (novaAnimacao != animacaoAtiva){
		animacaoAnterior = animacaoAtiva;
		animacaoAtiva = novaAnimacao;
		animacaoAtiva.reset();
		if (animacaoAtiva == animationArray[3] ){
			animacaoAtiva.clampWhenFinished = true;
			animacaoAtiva.loop = THREE.LoopOnce;

		}else{
			animacaoAtiva.clampWhenFinish = false;
			animacaoAtiva.loop = THREE.LoopRepeat;
		}
		animacaoAnterior.stop();
		animacaoAtiva.play();
	}

}


var loadObjects = function(){
	let objLoader = new THREE.OBJLoader();
	let fbxLoader = new THREE.FBXLoader();
	let textLoader = new THREE.TextureLoader();

	for (let i =0; i<30; i++)
		objLoader.load(
			'assets/tree.obj',//o que carregar
			function(obj){ //função executada após o loading
				
				let ninjaMaterial = new THREE.MeshStandardMaterial();

				obj.traverse(
					function (child){
						if (child instanceof THREE.Mesh){
							child.material = ninjaMaterial;
							child.castShadow = true;
							child.receiveShadow = true;
						}
					}
				);

				let texture = textLoader.load('assets/Wood.jpg');
				ninjaMaterial.map = texture;
				
				obj.castShadow = true;

				obj.scale.x = 50;
				obj.scale.y = 50;
				obj.scale.z = 50;

				obj.position.y=-5;

				//obj.rotation.x += 1.5;

				console.log("caqui: " + Math.random());	

				 let randomX = Math.random()*1000 -1000;
				 let randomZ = Math.random()*1000 -1000;
				 obj.position.x = randomX;
				 obj.position.z = randomZ;
				
				//obj.rotation.x-= Math.PI/2; //rotação de 90°	
				
				scene.add(obj);
				elements['tree'] = obj;
				console.log("Carregou!");
			},
			function (andamento){ //função executada durante o loading
				console.log(andamento.loaded/andamento.total*100 + "%");
			},
			function(error){//função executada se deu problema
				console.log("Deu erro: "+error);
			}
		);


	

	
	// fbxLoader.load(
	// 	'assets/wolf/Wolf.fbx',//o que carregar
	// 	function(obj){ //função executada após o loading
			
	// 		obj.traverse(
	// 			function (child){
	// 				if (child instanceof THREE.Mesh){
	// 					let texture = textLoader.load('assets/wolf/Wolf_Body.jpg');
	// 					child.material = new THREE.MeshStandardMaterial({map: texture});
	// 					child.castShadow = true;
	// 					child.receiveShadow = true;
	// 					console.log("passou aqui");
	// 				}
	// 			}
	// 		);

	// 		obj.castShadow = true;
	// 		obj.scale.x = 0.15;
	// 		obj.scale.y = 0.15;
	// 		obj.scale.z = 0.15;
	// 		obj.position.x = -7;
	// 		obj.position.y = -5.9;
			
	// 		//ANIMAÇOES
	// 		mixer = new THREE.AnimationMixer(obj);
	// 		let animacao;

	// 		animacao = mixer.clipAction(obj.animations[0]);
	// 		animationArray.push(animacao);
	// 		animacaoAtiva = animacao;

	// 		animacao = mixer.clipAction(obj.animations[1]);
	// 		animationArray.push(animacao);

	// 		animacao = mixer.clipAction(obj.animations[2]);
	// 		animationArray.push(animacao);
	// 		trocaAnimacao(animacao);

	// 		animacao = mixer.clipAction(obj.animations[3]);
	// 		animationArray.push(animacao);

	// 		animacao = mixer.clipAction(obj.animations[4]);
	// 		animationArray.push(animacao);
			

	// 		animacao = mixer.clipAction(obj.animations[5]);
	// 		animationArray.push(animacao);
				
			

	// 		loboCarregado = true;


	// 		//END ANIMCOES




	// 		scene.add(obj);
	// 		elements['lobo'] = obj;
	// 		console.log("Carregou lobo!");
	// 	},
	// 	function (andamento){ //função executada durante o loading
	// 		console.log(andamento.loaded/andamento.total*100 + "%");
	// 	},
	// 	function(error){//função executada se deu problema
	// 		console.log("Deu erro: "+error);
	// 	}
	// );

	fbxLoader.load(
		'assets/r2/Android_Idle.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/r2/UVAndroid.png');
						child.material = new THREE.MeshStandardMaterial({map: texture});
						child.castShadow = true;
						child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);

			obj.castShadow = true;
			obj.scale.x = 0.015;
			obj.scale.y = 0.015;
			obj.scale.z = 0.015;
			//obj.position.x = -7;
			obj.position.y = -5.9;
			
			//ANIMAÇOES
			mixer = new THREE.AnimationMixer(obj);
			let animacao;

			animacao = mixer.clipAction(obj.animations[0]);
			animationArray.push(animacao);
			animacaoAtiva = animacao;

			fbxLoader.load(
				'assets/r2/Android_Jump.fbx',
				function(obj){
					let animacao = mixer.clipAction(obj.animations[0]);
					animationArray.push(animacao);

					fbxLoader.load(
						'assets/r2/Android_Walk.fbx',
						function(obj){
							let animacao = mixer.clipAction(obj.animations[0]);
							animationArray.push(animacao);

							fbxLoader.load(
								'assets/r2/Android_Dead.fbx',
								function(obj){
									let animacao = mixer.clipAction(obj.animations[0]);
									animationArray.push(animacao);

									fbxLoader.load(
										'assets/r2/Android_Damage.fbx',
										function(obj){
											let animacao = mixer.clipAction(obj.animations[0]);
											animationArray.push(animacao);

											fbxLoader.load(
												'assets/r2/Android_Attack.fbx',
												function(obj){
													let animacao = mixer.clipAction(obj.animations[0]);
													animationArray.push(animacao);
													fbxLoader.load(
														'assets/r2/Android_Running.fbx',
														function(obj){
															let animacao = mixer.clipAction(obj.animations[0]);
															animationArray.push(animacao);
														}
														,function(){}
														,function(){ console.log("Problema Loading animação 7")}
													);
												}
												,function(){}
												,function(){ console.log("Problema Loading animação 6")}
											);
										}
										,function(){}
										,function(){ console.log("Problema Loading animação 5")}
									);
								}
								,function(){}
								,function(){ console.log("Problema Loading animação 4")}
							);
						}
						,function(){}
						,function(){ console.log("Problema Loading animação 3")}
					);
				}
				,function(){}
				,function(){ console.log("Problema Loading animação 2")}
			);

			trocaAnimacao(animacao);


			
			

			loboCarregado = true;


			//END ANIMCOES


			charGroup = new THREE.Group();
			
			charGroup.add(obj);
			charGroup.add(camera);
			obj.position.z = camera.position.z+40;
			camera  .rotation.y+=Math.PI;

			scene.add(charGroup);
			//scene.add(obj);

			elements['lobo'] = obj;
			console.log("Carregou lobo!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);

}


var locomocao = function(){
	

	if (camera){
		direcao = camera.getWorldDirection(new THREE.Vector3(0,0,0));
	
		if (keyPressed['W']){
			charGroup.position.z+=velociadadeChar*direcao.z;
			charGroup.position.x+=velociadadeChar*direcao.x;

			

		}else if (keyPressed['S']){
			charGroup.position.z-=velociadadeChar*direcao.z;
			charGroup.position.x-=velociadadeChar*direcao.x;

		}
		if (keyPressed['down']){
			charGroup.position.z+=2.5*direcao.z;
			charGroup.position.x+=2.5*direcao.x;
		}

		if (keyPressed['A'])
			charGroup.rotation.y+=0.01;

		if (keyPressed['D'])
			charGroup.rotation.y-=0.01;

	}

}


var animation = function (){
	requestAnimationFrame(animation); //loop da animação
	let tempo = relogio.getDelta();
	
	locomocao();

	

	if (loboCarregado){
		mixer.update(tempo);
		//elements['lobo'].position.z+=velocidadeLobo;
	}

	//camera.position.y = 6;

	render.render(scene,camera); //quem, e como será vista a cena
}

var luzAmbiente = function(){
	scene.add(new THREE.AmbientLight(0x666666, 0.5));
}

var luzHemisferica = function(){
	let hemisphereLight = new THREE.HemisphereLight(0xcce0ff, 0xffffff, 0.2);
	scene.add(hemisphereLight);
}

var spotLight = function (){
	var lanterna = new THREE.SpotLight(0xffffff, 1);

	lanterna.angle = 0.3;
	lanterna.position.z= 39;
	lanterna.position.y = 7;
	lanterna.position.x = 0;

	lanterna.castShadow = true;
	lanterna.shadow.distance = 50;
	lanterna.shadow.penumbre = 20;
	lanterna.shadow.angle = 25;

	
	lanterna.visible = false;
	elements["lanterna"] = lanterna;
	scene.add(lanterna);
	scene.add(lanterna.target);
	
	lanterna.target.position.x = 7;
	scene.add(new THREE.SpotLightHelper(lanterna));

}


var directionalLight = function(){
	let sol = new THREE.DirectionalLight(0xffffff, 1, 1000);
	sol.castShadow = true;

	sol.shadow.mapSize.width = 4096;
	sol.shadow.mapSize.height = 4096;
	sol.shadow.camera.left = 1000;
	sol.shadow.camera.bottom = 1000;
	sol.shadow.camera.right = -1000
	sol.shadow.camera.top = -1000;
	sol.shadow.camera.far = 1000;

	scene.add(new THREE.DirectionalLightHelper(sol));

	sol.position.y = 900;
	//sol.position.x = 100;
	 sol.target = elements['ground'];

	scene.add(sol);
	//

	elements['sol'] = sol;
}

var pontoLuz = function(){
	let point = new THREE.PointLight(0xffffff, 1, 100);

	point.castShadow = true;

	point.position.set(0,5,30);

	scene.add(point);
}


var criaIluminacao = function (){
	directionalLight();
	luzAmbiente();
	//pontoLuz();
	//spotLight();
}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff);

	camera = new THREE.PerspectiveCamera(
					40, //angulo de visualização
					window.innerWidth/window.innerHeight, //aspect ratio
					0.1, //distancia do near
					1000 //far
				);


	render = new THREE.WebGLRenderer( {antialias: true});
	render.shadowMap.enabled = true;
	render.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(render.domElement);

	camera.position.z = 41;
	camera.position.y = 10;
	// camera.position.x = 4;
	createGui();
	loadObjects();
	
	animation();	
	
	// controls = new THREE.FirstPersonControls(camera, render.domElement);
	// controls.movementSpeed = 10;
	// controls.lookSpeed = 0.1;
	// controls.constrainVertical = true;
	// controls.verticalMin = 1;
	// controls.verticalMax = 2;
	
	
	let textLoader = new THREE.TextureLoader();
	let textureGround = textLoader.load('assets/grasslight-big.jpg');
	textureGround.wrapS = textureGround.wrapT = THREE.RepeatWrapping;
	textureGround.repeat.set(250,250);
	textureGround.anisotropy = 16;
	textureGround.encoding = THREE.sRGBEncoding;
	let materialGround = new THREE.MeshLambertMaterial({map: textureGround});
	//materialGround.normalMap = textLoader.load('assets/grasslight-big-nm.jpg');
	//materialGround.normalMap.wrapS = materialGround.normalMap.wrapT = THREE.RepeatWrapping;
	//materialGround.normalMap.repeat.set(25,25);
	
	let ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000,10000),
	materialGround);
	elements['ground'] = ground;
	ground.rotation.x = -Math.PI/2;
	//	ground.position.z -= 300;
	//	ground.position.x += 300;
	ground.position.y-=6;
	ground.receiveShadow = true;
	scene.add(ground);

	scene.fog = new THREE.Fog(0xcce0ff, 20, 500);
	
	criaIluminacao();


	

	document.addEventListener('keydown', onKeyDown); //pegar um evento do teclado. Aperta tecla.
	document.addEventListener('keyup', onKeyUp); //pegar um evento do teclado. Solta tecla.


	//Eventos relacionados ao mouser
	// document.addEventListener('mousemove', movimentaMouser); //pegar um evento do teclado. Aperta tecla.
	// document.addEventListener('mouseup', soltaClick); //pegar um evento do teclado. Aperta tecla.
	// document.addEventListener('mousedown', click); //pegar um evento do teclado. Aperta tecla.

}

// var x = 0.1,y = 1.5,z = 0.4;
var rotacaoPivoOmbEsq = 0.1;

/**
 * ROTAÇÃO MOUSER
 */

// var estaClicando = false;

// var click = function(){
// 	estaClicando = true;

// 	//document.body.requestPointerLock();

// //	console.log(camera);
// }

// var soltaClick = function(){
// 	estaClicando = false;
// }

// var mouserAnterior = {
// 	x:0,
// 	y:0

// };

// var movimentaMouser = function(e){
// 	let difMouser = {
// 		x: e.offsetX - mouserAnterior.x,
// 		y: e.offsetY - mouserAnterior.y
// 	}

// 	if (estaClicando){
// 		let rotacaoElemento = new THREE.Quaternion().setFromEuler( new THREE.Euler(0, //paraRadianos(difMouser.y)*0.1,
// 																					paraRadianos(-difMouser.x)*0.1,
// 																					0,
// 																					'XYZ'));

// 		//elements["tronco"].quaternion.multiplyQuaternions(rotacaoElemento, elements["tronco"].quaternion);

// 		charGroup.quaternion.multiplyQuaternions(rotacaoElemento, charGroup.quaternion);

// 		//camera.rotation.y+=paraRadianos(difMouser.x)*0.1;
// 	//	camera.rotation.x+=paraRadianos(difMouser.y)*0.001;
// 	}
// 	mouserAnterior = {
// 		x:e.offsetX,
// 		y:e.offsetY
	
// 	};

//}

var paraRadianos = function (valor){
	return valor *(Math.PI/180);
}
/**
 * FIM ROTAÇÃO MOUSER
 */


/**
 * Mapeamento e ações de movimento
//  */
// function movimentaBoneco(){
// 	if (keyPressed["R"]){
// 		elements["mamaco"].rotation.y+=0.1;
// 	}

	
// }


var keyPressed = []; 

keyPressed['up'] = false;
keyPressed['down']=false;
keyPressed['S'] = false;
keyPressed['W'] = false;
keyPressed['A'] = false;
keyPressed['D'] = false;
keyPressed['space']=false;


var onKeyUp = function (e){
	console.log("Soltei: " + e.keyCode);

	//Solução elegante -> keyPressed[e.keyCode] = false;
	
	if (e.keyCode == 27){ //tecla R
		controls.enabled = !controls.enabled;
	}


	if (e.keyCode == 68){ //tecla D
		keyPressed['D'] = false;
	}

	if (e.keyCode == 65){ //tecla A
		keyPressed['A'] = false;
	}

	if (e.keyCode == 87){ //tecla w
		keyPressed['W'] = false;
		trocaAnimacao(animationArray[0]);
		animacaoAtiva.rotation
	}

	if (e.keyCode == 83){ //tecla s
		keyPressed['S'] = false;
		animacaoAtiva.timeScale = 1;
		trocaAnimacao(animationArray[0]);
	}

	if (e.keyCode == 32){ //tecla espaço
		keyPressed['space']=false;
		
		
	}
	if (e.keyCode == 38){ // up
		keyPressed["up"] = false;
		
	}

	if (e.keyCode == 40){ // down
		keyPressed["down"] = false;
		trocaAnimacao(animationArray[0]);
	}
	
}


var onKeyDown = function (e){
	//console.log(e.keyCode);

	if (e.keyCode == 32){ //tecla espaço
		keyPressed['space']=true;
		trocaAnimacao(animationArray[1]);
	}
	
	/* TECLAS DE MOVIMENTAÇÃO */
	if (e.keyCode == 87){ //tecla w
		keyPressed['W'] = true;
		trocaAnimacao(animationArray[2]);
	}

	if (e.keyCode == 83){ //tecla s
		keyPressed['S'] = true;
		trocaAnimacao(animationArray[2]);
		animacaoAtiva.timeScale=-1;

	}
	if (e.keyCode == 38){ // up
		keyPressed["up"] = true;
		trocaAnimacao(animationArray[5]);
	}

	if (e.keyCode == 40){ // down
		keyPressed["down"] = true;
		trocaAnimacao(animationArray[6]);
		
	}

	if (e.keyCode == 68){ // D
		keyPressed["D"] = true;
		
	}

	if (e.keyCode == 65){ // A
		keyPressed["A"] = true;
		
	}
}
/**
 * FIM MOVIMENTOS
 */

window.onload = this.init;
