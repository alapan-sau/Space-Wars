import {GLTFLoader} from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from '../../../../node_modules/three/src/Three.js'
import {setupModel} from './setupModel.js'

async function loadStar() {
  const loader = new GLTFLoader();
  const starData = await loader.loadAsync('/assets/star.glb');
  // console.log (enemyData);

  const star = setupModel(starData);
  star.position.set(80, Math.floor(Math.random() * 50)-25, 10);
  star.rotation.y = MathUtils.degToRad(90)
//   star.rotation.x = MathUtils.degToRad(0)
//   star.rotation.z = MathUtils.degToRad(90)
//   enemy.scale.set(0.6, 0.6, 0.6)
  // enemy.rotation.x+= Math.random()


  star.type = 'star';
  const speedx = -0.5
  // this method will be called once per frame
  star.tick = (delta, keys) => {
    star.position.x += speedx
    star.rotation.y += MathUtils.degToRad(10)
  };

  return {star}
}

export { loadStar };