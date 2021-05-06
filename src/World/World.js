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


// The most Abstracted class in the game
class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    const light = createLights();
    scene.add(light);
    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { hero } = await loadHero();
    scene.add(hero);
    loop.updatables.push(hero);

    // Add controlls
    window.addEventListener("keydown", async function (e) {
      loop.keys[e.code] = true;
      if(e.code == 'Space'){
        var { bullet } = await loadBullet(hero.position.x + 1, hero.position.y , hero.position.z, 'hero');
        scene.add(bullet);
        loop.updatables.push(bullet);

      }
    });
    window.addEventListener("keyup", function (e) {
      loop.keys[e.code] = false;
    });

    // make the hero accesible to loop
    loop.hero = hero;
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