import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
import './OrbitControls';

// Scene configuration
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer configuration
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;

// Drawing an object to the scene
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true
});
const boxMaterial = new THREE.MeshLambertMaterial({
	color: 0xAAAAAA
})

// Add lights
const light = new THREE.AmbientLight(0xFFFFFF, 0.5)
scene.add(light)

const light2 = new THREE.PointLight(0xAFAFAF, 0.9)
light2.position.set(0, 0, 10)
scene.add(light2)

const cube = new THREE.Mesh( geometry,  boxMaterial);
cube.position.set(0, 0, 0)
scene.add(cube);
scene.add( new THREE.AxesHelper( 20 ) );

// Camera position
camera.position.z = 5;

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
	renderer.render(scene, camera);
});

WindowResize(renderer, camera);

// Render loop
function animate() {
	controls.update()
    cube.rotation.x += 0.05;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();