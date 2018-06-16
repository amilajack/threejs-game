import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
const OrbitControls = require('three-orbit-controls')(THREE)

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio( window.devicePixelRatio );

// Shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Gamma
renderer.gammaInput = true;
renderer.gammaOutput = true;

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
	renderer.render(scene, camera);
});

// Drawing an object to the scene
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const boxMaterial = new THREE.MeshLambertMaterial()
const cube = new THREE.Mesh( geometry,  boxMaterial);
cube.position.set(0, 0, 0)
scene.add(cube);

// Add lights
const light = new THREE.AmbientLight(0xFFFFFF, 0.5)
scene.add(light)
const light2 = new THREE.PointLight(0xAFAFAF, 0.9)
light2.position.set(0, 0, 10)
scene.add(light2)

// Camera position
camera.position.z = 50;

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


function initKeyboardInteraction() {
  const deltaPosition = 1;

  function onDocumentKeyDown(event) {
    console.log(event)
    switch (event.code) {
      case 'ArrowUp': {
        cube.position.y += deltaPosition;
        break;
      }
      case 'ArrowDown': {
        cube.position.y -= deltaPosition;
        break;
      }
      case 'ArrowLeft': {
        cube.position.x -= deltaPosition;
        break;
      }
      case 'ArrowRight': {
        cube.position.x += deltaPosition;
        break;
      }
    }
  };

  document.addEventListener("keydown", onDocumentKeyDown, false);
}

let t = 0;

// Render loop
function animate() {
  t++
  cube.position.x += 0.05;
  camera.lookAt(cube.position)
  if (cube.position.y > -1) {
    const yPosition = -9*0.001*(t**2) + 1*t
    cube.position.y = yPosition
  } else {
    cube.position.y = 1
    t = 0
    cube.position.x = 0
  }
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
initKeyboardInteraction();
WindowResize(renderer, camera);
