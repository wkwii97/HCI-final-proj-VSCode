import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


let car; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(11, 2, 1);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const mygarage = new GLTFLoader();
mygarage.load('garage/uploads-files-4420114-new_garage_3D_scene.glb', (gltf) => {
   const garage = gltf.scene;
   scene.add(garage);
   
   const loader = new GLTFLoader();
   loader.load('WarrenCar.glb', (carGltf) => {
      car = carGltf.scene; 
      car.position.set(5.7, 2.1, 0);
      car.scale.set(1, 1, 1);
      car.rotation.set(0, Math.PI / 2, 0);

      const horizontalRotationAngle = Math.PI / -1.5;
      car.rotation.y += horizontalRotationAngle;

      scene.add(car);
   }, undefined, (error) => {
      console.error('Error loading car GLB model:', error);
   });
}, undefined, (error) => {
   console.error('Error loading garage model:', error);
});

let isDragging = false;
let previousMouseX = 0;

document.addEventListener('mousedown', (event) => {
   isDragging = true;
   previousMouseX = event.clientX;
});

document.addEventListener('mousemove', (event) => {
   if (isDragging) {
      const deltaMouseX = event.clientX - previousMouseX;
      previousMouseX = event.clientX;

      const rotationSpeed = 0.005;
      car.rotation.y += deltaMouseX * rotationSpeed;
   }
});

document.addEventListener('mouseup', () => {
   isDragging = false;
});


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enabled = false;

window.addEventListener('resize', () => {
   const newWidth = window.innerWidth;
   const newHeight = window.innerHeight;

   camera.aspect = newWidth / newHeight;
   camera.updateProjectionMatrix();

   renderer.setSize(newWidth, newHeight);
});

function animate() {
   requestAnimationFrame(animate);

   renderer.render(scene, camera);
}

animate();


const engineTemperatureLevel = document.getElementById('engine-temperature-level');
const tirePressureLevel = document.getElementById('tire-pressure-level');
const startEngineButton = document.getElementById('start-engine');
const byeButton = document.getElementById('stop-engine');
const honkHornButton = document.getElementById('honk-horn');

// We can update levels by giving values between 0 and 100
const engineTemperatureValue = 50;
const tirePressureValue = 50;
const fuelLevelLevel = document.getElementById('fuel-level-level');
const fuelLevelValue = 100;


// We can set width based on values
engineTemperatureLevel.style.width = `${engineTemperatureValue}%`;
tirePressureLevel.style.width = `${tirePressureValue}%`;
fuelLevelLevel.style.width = `${fuelLevelValue}%`;


const engineStartSound = new Audio('engine-start.mp3');
startEngineButton.addEventListener('click', () => {
    engineStartSound.play();
});
const engineStopSound = new Audio('byeSound.mp3');
byeButton.addEventListener('click', () => {
   engineStopSound.play();
});

const honkHornSound = new Audio('honk-horn.mp3');
honkHornButton.addEventListener('click', () => {
   honkHornSound.play();
});

