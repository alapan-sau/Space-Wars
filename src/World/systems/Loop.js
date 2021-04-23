import {Clock} from '../../../node_modules/three/src/Three.js';

import {loadBullet} from '../components/bullet/bullet.js';

const clock = new Clock();

class Loop{
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.keys = {};
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }
    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick(){
        // console.log(this.keys);
        // only call the getDelta function once per frame!
        const delta = clock.getDelta();

        // Code to update animations will go here
        for (const object of this.updatables) {
            object.tick(delta, this.keys);
        }
    }
}

export { Loop };