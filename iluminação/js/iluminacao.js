var scene;
var camera;
var render;

var elements = [];

var parametersGUI;

var sunGroup;

var controls;

var velocity = 0.01;

var time = 0;

const clock = new THREE.Clock();

var createGui = function(){
    const gui = new dat.GUI();

    parametersGUI = {
        speedDay: 0.01,
        hour: 6,
        Head: 'Roberto'
    }

	let dayLong = gui.add(parametersGUI, 'speedDay').min(0.09).max(0.102).step(0.001).name("Velcidade Dia");
	dayLong.onChange(function(parameter){
		velocity = parameter;
    });

    let position = gui.addFolder("Posicao");
    let Heads = ["Roberto", "Rita","Astolfo","Reinaldo","Madalena", "Gerusa","Geraldo", "Natalino","Tereza", "Princesa"];
    let optionHead = position.add(parametersGUI, 'Head').options(Heads).name("Olhando");
	optionHead.onChange(function(parametro){
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

}

var loadObjects = function(){
	let objLoader = new THREE.OBJLoader();
	let fbxLoader = new THREE.FBXLoader();
	let textLoader = new THREE.TextureLoader();

	for (let i =0; i<10; i++)
		objLoader.load(
			'assets/tree.obj',//o que carregar
			function(obj){ //função executada após o loading
				
				let treeMaterial = new THREE.MeshStandardMaterial();

				obj.traverse(
					function (child){
						if (child instanceof THREE.Mesh){
							child.material = treeMaterial;
							child.castShadow = true;
							child.receiveShadow = true;
						}
					}
				);

				let texture = textLoader.load('assets/Wood.jpg');
				treeMaterial.map = texture;
				
				obj.castShadow = true;

				obj.scale.x = obj.scale.y = obj.scale.z = 50;

				obj.position.y=-5;

				//obj.rotation.x += 1.5;


				 let randomX = Math.random()*1000 -500;
				 let randomZ = Math.random()*1000 -500;
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

	fbxLoader.load(
		'assets/Cow.FBX',//o que carregar
		function(obj){ //função executada após o loading

            let cowMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = cowMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/UV Cow.png');
			cowMaterial.map = texture;

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

			let turtleMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = turtleMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/UV Turtle.png');
			turtleMaterial.map = texture;

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
			
			let turkeyMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = turkeyMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/Turkey_texture.png');
			turkeyMaterial.map = texture;

					

			obj.scale.x = obj.scale.y = obj.scale.z = 0.01;

		
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
			
			let swanMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = swanMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/Swan_texture.png');
			swanMaterial.map = texture;

			

			obj.scale.x = obj.scale.y = obj.scale.z = 0.01;
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
			
            let chickenMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = chickenMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/UV Chicken.png');
			chickenMaterial.map = texture;


			obj.scale.x = obj.scale.y = obj.scale.z = 0.01;
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
			let flaMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = flaMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/Flamingo_texture.png');
			flaMaterial.map = texture;



			obj.scale.x = obj.scale.y = obj.scale.z = 0.01;

		
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
			let catMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = catMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/Maine_Coon_texture.png');
			catMaterial.map = texture;

			obj.scale.x = obj.scale.y = obj.scale.z = 0.01;

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
            let mimiMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = mimiMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/British_Shorthair_texture.png');
			mimiMaterial.map = texture;
			
			obj.scale.x = obj.scale.y = obj.scale.z = 0.01;
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

            let gatoMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = gatoMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/CatTexture.png');
            gatoMaterial.map = texture;


			obj.scale.x = obj.scale.y = obj.scale.z = 0.005;
            obj.rotation.y= Math.PI/2;

			obj.position.z= 10
			obj.position.x = 25;
			obj.position.y = -5.9;
			 
			
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

            let dogMaterial = new THREE.MeshStandardMaterial();
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						child.material = dogMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
						console.log("passou aqui");
					}
				}
			);
            let texture = textLoader.load('assets/Chihuahua_texture.png');
            dogMaterial.map = texture;

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

    if(controls)
        controls.update(clock.getDelta());

    if(sunGroup){
        time++;

        if(elements["sun"].visible){
            sunGroup.rotation.z += velocity*0.05;
        }

        parametersGUI.hour += 6;

        if(parametersGUI.hour > 23.59){
            parametersGUI.hour = 0;
        }

        if(time > 600){
            if(elements['sun'].visible){
                sunGroup.rotation.z = -0.98;
                scene.background = new THREE.Color(0x071021);
            }
            else{
                scene.background = new THREE.Color(0xcce0ff);
                parametersGUI.hour = 6;
            }

            elements['sun'].visible = !elements['sun'].visible;
            time = 0;
        }
    }

    render.render(scene,camera); 
}

var primariLight = function(){
	scene.add(new THREE.AmbientLight(0x666666, 0.5));
}


var directionalLight = function(){
	let sun = new THREE.DirectionalLight(0xffffff, 1);
	sun.castShadow = true;

	sun.shadow.mapSize.width = 4096;
	sun.shadow.mapSize.height = 4096;
	sun.shadow.camera.left = 1000;
	sun.shadow.camera.bottom = 1000;
	sun.shadow.camera.right = -1000
	sun.shadow.camera.top = -1000;
	sun.shadow.camera.far = 2020;

	scene.add(new THREE.DirectionalLightHelper(sun));

	sun.position.x = 1000;
	sun.target = elements['ground'];

	sunGroup = new THREE.Group();
	sunGroup.add(sun)
	sun.position.y = 1500;
	sunGroup.rotation.z = -0.98;
	scene.add(sunGroup);

	elements['sun'] = sun;
}

var criateLighting = function (){
	directionalLight();
	primariLight();
}

var init = function(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight,0.1,1000);
    
    render = new THREE.WebGLRenderer({antilias: true});
    render.shadowMap.enabled = true;
	render.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(render.domElement);

    camera.position.z = 40;
    camera.position.y = 5;

    createGui();
    loadObjects();
    animation();

    let textLoader = new THREE.TextureLoader();
	let textureGround = textLoader.load('assets/grasslight-big.jpg');
	textureGround.wrapS = textureGround.wrapT = THREE.RepeatWrapping;
	textureGround.repeat.set(250,250);
	textureGround.anisotropy = 16;
	textureGround.encoding = THREE.sRGBEncoding;
	let materialGround = new THREE.MeshStandardMaterial({map: textureGround,transparent: false});

    let ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000,10000),
	materialGround);
	elements['ground'] = ground;
	ground.rotation.x = -Math.PI/2;
    ground.position.y-=6;
	ground.receiveShadow = true;
	scene.add(ground);

    criateLighting();

}
window.onload = this.init;


