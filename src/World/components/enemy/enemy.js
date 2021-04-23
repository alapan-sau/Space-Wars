import {GLTFLoader} from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from '../../../../node_modules/three/src/Three.js'
import {setupModel} from './setupModel.js'

async function loadEnemy() {
  const loader = new GLTFLoader();
  const enemyData = await loader.loadAsync('/assets/enemy.glb');
  // console.log (enemyData);

  const enemy = setupModel(enemyData);
  enemy.position.set(80, Math.floor(Math.random() * 50)-25, 10);
  enemy.rotation.y = MathUtils.degToRad(90)
  enemy.rotation.x = MathUtils.degToRad(0)
  enemy.rotation.z = MathUtils.degToRad(90)
//   enemy.scale.set(0.6, 0.6, 0.6)
  // enemy.rotation.x+= Math.random()


  enemy.type = 'enemy';
  const speedx = -0.8
  // this method will be called once per frame
  enemy.tick = (delta, keys) => {
    enemy.position.x += speedx
  };

  return {enemy}
}

export { loadEnemy };