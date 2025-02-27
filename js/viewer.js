import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);




//Keep the 3D object on a global variable 
let object;
//OrbitControls allowing camera to move around in the scene
let controls;

let objToRender = "ducky";

function loadModel(){
  //Instantiate a loader for the .gltf file
  const loader = new GLTFLoader();
  //Load the file
  loader.load(
    `models/${objToRender}/scene.gltf`,
    
    function (gltf) {
      //add loaded file to the scene 
      object = gltf.scene;
      
      
      scene.add(object);
      
    },
    function (xhr) {
      //While it is loading, log the progress
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      //If there is an error, log it
      console.error(error);
    }
  );
}
loadModel();

//This checks the dropdown menu and checks which model is selected, then changes the model to the chosen one
document.getElementById("model-dropdown").addEventListener("change", function () {
  let modelDropdown = document.getElementById("model-dropdown");
  let selectedModel = modelDropdown.value;
  camera.position.z=500;
  if (selectedModel == "ducky"){
    objToRender = "ducky"
    console.log("ducky")
  }
  if (selectedModel == "pengu"){
    objToRender = "pengu"
    console.log("pengu")
  }
  

  // Remove existing object from scene
  if (object) {
    scene.remove(object);
  }

  loadModel();

  
//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);


//Controls for the camera, so we can rotate / zoom it with the mouse
if (objToRender === "ducky") {
  controls = new OrbitControls(camera, renderer.domElement);
}
if (objToRender === "pengu") {
  controls = new OrbitControls(camera, renderer.domElement);
}




//Begin 3D rendering
animate();
});




//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model

//camera.position.z = objToRender === "ducky" ? 25 : 500;
//camera.position.y = objToRender === "ducky" ? 50 : 50;
camera.position.x = objToRender === "ducky" ? -200 : 500;


//Add lights to the scene, so we can see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
topLight.position.set(500, 500, 500) 
topLight.castShadow = true;
scene.add(topLight);



const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "ducky" ? 5 : 1);
scene.add(ambientLight);

console.log(objToRender);
//Controls for the camera, so we can rotate / zoom it with the mouse
if (objToRender === "ducky") {
  controls = new OrbitControls(camera, renderer.domElement);
}
if (objToRender === "pengu") {
  controls = new OrbitControls(camera, renderer.domElement);
}


//Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

//Add a listener to the window, to resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


//Zoom in and zoom out buttons
const zoomInButton = document.getElementById('zoom-in-button');
const zoomOutButton = document.getElementById('zoom-out-button');

const zoomSpeed = 0.1; // Zoom speed

//Zoom calculations and updating the page
zoomInButton.addEventListener('click', () => {
  camera.zoom *= 1 + zoomSpeed;
  camera.updateProjectionMatrix();
});

zoomOutButton.addEventListener('click', () => {
  camera.zoom /= 1 + zoomSpeed;
  camera.updateProjectionMatrix();
});

//Begin 3D rendering
animate();