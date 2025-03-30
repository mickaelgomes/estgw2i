//import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setAnimationLoop( animate );
document.body.appendChild(renderer.domElement);

var ArToolkitSource = new THREEx.ArToolkitSource({
	sourceType: "webcam"
})

ArToolkitSource.init(function(){
	setTimeout(function(){
		ArToolkitSource.onResizeElement();
		ArToolkitSource.copyElementSizeTo(renderer.domElement);
	}, 2000)
});

var ArToolkitContext = new THREEx.ArToolkitContext({
	cameraParametersUrl: 'camera_para.dat',
	detectionmode: 'color_and_matrix'
})

ArToolkitContext.init(function(){
	camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix())
})

var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext,camera,{
	type: 'pattern',
  	patternUrl: 'pattern-hiro.patt',
	changeMatrixMode: 'modelViewMatrix',
})

scene.visible = false;

const geometry = new THREE.CubeGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.5,color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material);
cube.position.y = geometry.parameters.height/2;
scene.add(cube);

//camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
	ArToolkitContext.update(ArToolkitSource.domElement);
	scene.visible = camera.visible;
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render(scene,camera);
}

animate();