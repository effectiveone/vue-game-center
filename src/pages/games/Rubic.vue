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
        const width = 500;
        const height = 500;
  
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
  
        this.$refs.container.appendChild(this.renderer.domElement);
  
        const cubeSize = 1;
        const spacing = 0.1;
  
        const colors = [
          new THREE.MeshBasicMaterial({ color: 'white' }),
          new THREE.MeshBasicMaterial({ color: 'yellow' }),
          new THREE.MeshBasicMaterial({ color: 'green' }),
          new THREE.MeshBasicMaterial({ color: 'blue' }),
          new THREE.MeshBasicMaterial({ color: 'red' }),
          new THREE.MeshBasicMaterial({ color: 'orange' }),
        ];
  
        const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
              const cube = new THREE.Mesh(boxGeometry, colors);
              cube.position.set(
                (x - 1) * (cubeSize + spacing),
                (y - 1) * (cubeSize + spacing),
                (z - 1) * (cubeSize + spacing)
              );
              this.scene.add(cube);
            }
          }
        }
  
        this.camera.position.z = 8;
        this.animate();
      },
      animate() {
        this.frameId = requestAnimationFrame(this.animate);
        this.scene.rotation.x += 0.01;
        this.scene.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
      },
      cleanup() {
        cancelAnimationFrame(this.frameId);
        this.renderer.dispose();
      },
    },
  };
  </script>
  