import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const pov = 75;
const aspectRatio = window.innerWidth/window.innerHeight;
const near = 0.01;
const far = 1000;


const perspCamera = new THREE.PerspectiveCamera(pov, aspectRatio, near, far)
const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, near, far);

const camera = perspCamera;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#renderer'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(15);
camera.position.setY(15);
camera.position.setZ(30);


const basicMaterial = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const standardMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
const orangeMaterial = new THREE.MeshStandardMaterial({color: 0xFF6347})

//plane
const planeGeometry = new THREE.PlaneGeometry(10,10,10,10);
const plane = new THREE.Mesh(planeGeometry,orangeMaterial);
plane.rotateX(-Math.PI / 2);
scene.add(plane);


//box
const boxGeometry = new THREE.BoxGeometry(1,1,1,1);
const box = new THREE.Mesh(boxGeometry, standardMaterial);
box.position.setY(0.5);
scene.add(box);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,15);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLight, pointLightHelper);

const gridHelper = new THREE.GridHelper(10,10);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();