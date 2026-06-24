import * as THREE from 'three';

export function initBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; // Spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1, // Primary color
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // --- Abstract Shapes (Floating Cubes) ---
    const geometry = new THREE.IcosahedronGeometry(0.5, 0);
    const material2 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.3 });

    const shape1 = new THREE.Mesh(geometry, material2);
    shape1.position.set(3, 2, -2);
    scene.add(shape1);

    const shape2 = new THREE.Mesh(geometry, material2);
    shape2.position.set(-3, -1, -2);
    shape2.scale.set(1.5, 1.5, 1.5);
    scene.add(shape2);

    camera.position.z = 3;

    // --- Interaction ---
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Rotate particles
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = mouseY * 0.2;
        particlesMesh.rotation.y += mouseX * 0.2;

        // Animate shapes
        shape1.rotation.x += 0.005;
        shape1.rotation.y += 0.005;
        shape1.position.y = 2 + Math.sin(elapsedTime * 0.5) * 0.2;

        shape2.rotation.x -= 0.005;
        shape2.rotation.y -= 0.005;
        shape2.position.y = -1 + Math.cos(elapsedTime * 0.4) * 0.2;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
}
