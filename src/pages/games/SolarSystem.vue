<template>
    <div ref="container"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    mounted() {
      this.initThreeScene();
    },
    beforeUnmount() {
      this.cleanup();
    },
    methods: {
      initThreeScene() {
        const width = 1200;
        const height = 600;
  
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
  
        this.$refs.container.appendChild(this.renderer.domElement);
  
        // dodaj obiekty do sceny
        this.addSun();
        this.addPlanets();
        this.addMoon();
  
        this.camera.position.set(0, 0, 15);
  
        this.animate();
      },
      addSun() {
  const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffee00 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);

  sun.rotationSpeed = 0.01;
  this.scene.add(sun);

  // Dodaj światło słoneczne do sceny
  const sunLight = new THREE.PointLight(0xffffcc, 2, 100);
  sunLight.position.set(0, 0, 0);
  this.scene.add(sunLight);
},

      addMoon() {
        const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const moonMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  
        // Dodaj księżyc jako potomny Ziemi
        const earthMesh = this.scene.children[2];
        earthMesh.add(moonMesh);
  
        // Ustaw pozycję księżyca na orbicie wokół Ziemi
        moonMesh.position.set(1, 0, 0);
      },
      addPlanets() {
        const planets = [
        { name: 'mercury', color: 0x8a8a8a, distance: 2, radius: 0.2, speed: 1.5 },
        { name: 'venus', color: 0xff8800, distance: 4, radius: 0.3, speed: 1 },
        { name: 'earth', color: 0x0044ff, distance: 6, radius: 0.4, speed: 0.5 },
        { name: 'mars', color: 0xff0000, distance: 8, radius: 0.3, speed: 2.3 },
      ];

  
        planets.forEach((planet) => {
          const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
          const planetMaterial = new THREE.MeshBasicMaterial({ color: planet.color });
          const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  
          planetMesh.position.set(planet.distance, 0, 0);
  
          planetMesh.orbitAngle = Math.random() * Math.PI * 2;
          this.scene.add(planetMesh);
        });
  
        this.addMoon();
      },
      animate() {
        requestAnimationFrame(this.animate);
  
        const planets = [
        { name: 'mercury', color: 0x8a8a8a, distance: 2, radius: 0.2, speed: 1.5 },
        { name: 'venus', color: 0xff8800, distance: 4, radius: 0.3, speed: 1 },
        { name: 'earth', color: 0x0044ff, distance: 6, radius: 0.4, speed: 0.5 },
        { name: 'mars', color: 0xff0000, distance: 8, radius: 0.3, speed: 2.3 },
      ];
  
        planets.forEach((planet, index) => {
          const planetMesh = this.scene.children[index + 1];
  
          planetMesh.rotation.y += planet.speed * 0.01; 
          planetMesh.orbitAngle += planet.speed * 0.01; // aktualizacja kąta w orbicie

// Oblicz nowe położenie planety
const x = planet.distance * Math.cos(planetMesh.orbitAngle);
const z = planet.distance * Math.sin(planetMesh.orbitAngle);

planetMesh.position.set(x, 0, z);
});

const sun = this.scene.children[0];
  sun.rotation.y += sun.rotationSpeed * 0.01; // aktualizacja kąta obrotu Słońca wokół własnej osi

  const earthMesh = this.scene.children[2];
const moonMesh = earthMesh.children[0];

// Oblicz pozycję księżyca na orbicie wokół Ziemi
const moonDistance = 0.3;
moonMesh.orbitAngle += 0.01; // prędkość obrotu księżyca wokół Ziemi
const moonX = moonDistance * Math.cos(moonMesh.orbitAngle);
const moonZ = moonDistance * Math.sin(moonMesh.orbitAngle);

// Ustaw pozycję księżyca na orbicie wokół Ziemi
moonMesh.position.set(moonX, 0, moonZ);

// Obróć księżyc wokół własnej osi
moonMesh.rotation.y += 0.02;


  this.renderer.render(this.scene, this.camera);



},
cleanup() {
this.renderer.dispose();
}
},
};
</script>

<style>
  #container {
    display: grid;
   place-items: center;
    width: 1200px;
    height: 600px;
  }
</style>