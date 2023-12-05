import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 1, -4);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


// Floor
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.2, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2; // Adjust floor level here!
scene.add(floor);


// Loading 3D Model
const loader = new GLTFLoader();
loader.load('raw.glb', (gltf) => {
   const car = gltf.scene;
   car.position.y = 1;
   scene.add(car);
}, undefined, (error) => {
   console.error('Error loading GLB model:', error);
});


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;


// Handle window resize, less laggings
window.addEventListener('resize', () => {
   const newWidth = window.innerWidth;
   const newHeight = window.innerHeight;


   camera.aspect = newWidth / newHeight;
   camera.updateProjectionMatrix();


   renderer.setSize(newWidth, newHeight);
});


// Animation
function animate() {
   requestAnimationFrame(animate);


   controls.update();


   renderer.render(scene, camera);
}


animate();


const engineTemperatureLevel = document.getElementById('engine-temperature-level');
const tirePressureLevel = document.getElementById('tire-pressure-level');

// We can update levels by giving values between 0 and 100
const engineTemperatureValue = 50;
const tirePressureValue = 50;
const fuelLevelLevel = document.getElementById('fuel-level-level');
const fuelLevelValue = 100;


// We can set width based on values
engineTemperatureLevel.style.width = `${engineTemperatureValue}%`;
tirePressureLevel.style.width = `${tirePressureValue}%`;
fuelLevelLevel.style.width = `${fuelLevelValue}%`;