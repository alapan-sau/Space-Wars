import {GLTFLoader} from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from '../../../../node_modules/three/src/Three.js'
import {setupModel} from './setupModel.js'

async function loadBullet(x, y, z) {
  const loader = new GLTFLoader();
  const bulletData = await loader.loadAsync('/assets/star.glb');
  console.log (bulletData);

  const bullet = setupModel(bulletData);
  bullet.position.set(x+10, y, z);
  bullet.rotation.y = MathUtils.degToRad(90)
//   bullet.rotation.x = MathUtils.degToRad(0)
//   bullet.rotation.z = MathUtils.degToRad(90)
//   enemy.scale.set(0.6, 0.6, 0.6)



  const speedx = 1
  // this method will be called once per frame
  bullet.tick = (delta, keys) => {
      bullet.position.x += speedx;
  };

  return {bullet}
}

export { loadBullet };