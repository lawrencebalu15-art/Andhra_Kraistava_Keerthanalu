import { createRenderer } from "./renderer.js";
import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";

export function initHeroScene() {

    const container = document.getElementById("hero-canvas");

    if (!container) return;

    const renderer = createRenderer(container);
    const scene = createScene();
    const camera = createCamera(container);

    function animate() {

        requestAnimationFrame(animate);

        renderer.render(scene, camera);

    }

    animate();

    window.addEventListener("resize", () => {

        camera.aspect =
            container.clientWidth / container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    });

}