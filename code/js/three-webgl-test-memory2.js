var N = 100;
var container
var camera, scene, renderer;
var geometry, meshes = [];
var fragmentShader, vertexShader;

init();
setInterval(render, 1000 / 60);

function init() {

	container = document.createElement('div');
	document.body.appendChild(container);

	vertexShader = document.getElementById("vertexShader").textContent;
	fragmentShader = document.getElementById("fragmentShader").textContent;

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 2000;

	scene = new THREE.Scene();

	geometry = new THREE.SphereGeometry(15, 64, 32);

	for (var i = 0; i < N; i++) {

		var material = new THREE.ShaderMaterial({
				vertexShader : vertexShader,
				fragmentShader : generateFragmentShader()
			});

		mesh = new THREE.Mesh(geometry, material);

		mesh.position.x = (0.5 - Math.random()) * 1000;
		mesh.position.y = (0.5 - Math.random()) * 1000;
		mesh.position.z = (0.5 - Math.random()) * 1000;

		scene.add(mesh);

		meshes.push(mesh);

	}

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

}

//

function generateFragmentShader() {

	return fragmentShader.replace("XXX", Math.random() + "," + Math.random() + "," + Math.random());

}

//

function animate() {

	requestAnimationFrame(animate);

	render();

}

function render() {

	for (var i = 0; i < N; i++) {

		var mesh = meshes[i];
		mesh.material = new THREE.ShaderMaterial({
				vertexShader : vertexShader,
				fragmentShader : generateFragmentShader()
			});

	}

	renderer.render(scene, camera);

	console.log("before", renderer.info.memory.programs);

	for (var i = 0; i < N; i++) {

		var mesh = meshes[i];
		mesh.material.dispose();

	}

	console.log("after", renderer.info.memory.programs);

}
