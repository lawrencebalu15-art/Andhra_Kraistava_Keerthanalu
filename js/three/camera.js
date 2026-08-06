import * as THREE from "three";

export function createCamera(container) {

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.z = 5;

    return camera;
}