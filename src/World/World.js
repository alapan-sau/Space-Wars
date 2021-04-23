import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import {Loop} from './systems/Loop.js';

import { loadHero } from './components/hero/hero.js';
import { loadEnemy } from './components/enemy/enemy.js';
import { loadBullet } from './components/bullet/bullet.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const light = createLights();
    // const cube = createCube();

    scene.add(light);
    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { hero } = await loadHero();
    scene.add(hero);
    loop.updatables.push(hero);

    const { enemy } = await loadEnemy();
    scene.add(enemy);
    loop.updatables.push(enemy);




    // Add controlls
    window.addEventListener("keydown", async function (e) {
      loop.keys[e.code] = true;
      if(e.code == 'Space'){
        const { bullet } = await loadBullet(hero.position.x, hero.position.y, hero.position.z);
        scene.add(bullet);
        loop.updatables.push(bullet);
      }
    });
    window.addEventListener("keyup", function (e) {
      loop.keys[e.code] = false;
    });


  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start(){
    loop.start()
  }

  stop(){
    loop.stop()
  }


}

export { World };