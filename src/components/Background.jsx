// Background.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from '../styles/login.module.css'; // Assuming CSS Modules are used

export default function Background() {
  const mountRef = useRef(null); // Reference to attach the Three.js renderer to a div

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement); // Attach renderer to the div

    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
     
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      velocities[i] = 0.006 + Math.random() * 0.05;
    }

    const particles = new THREE.BufferGeometry();
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x5555ff, size: 0.1 });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    
    const animate = () => {
      requestAnimationFrame(animate);

      // Update particle positions to create raindrop effect
      const positionAttribute = particles.getAttribute('position');
      for (let i = 0; i < particleCount; i++) {
        positionAttribute.array[i * 3 + 1] -= velocities[i];
        if (positionAttribute.array[i * 3 + 1] < -10) {
          positionAttribute.array[i * 3 + 1] = 10;
        }
      }
      positionAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

  }, []);

  // Render the container div
  return <div ref={mountRef} style={{position:"absolute" , zIndex:-1}}></div>;
}
