import {GLTFLoader} from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from '../../../../node_modules/three/src/Three.js'
import {setupModel} from './setupModel.js'


// imports the bullet model
async function loadBullet(x, y, z, type) {
  const loader = new GLTFLoader();
  const bulletData = await loader.loadAsync('/assets/missile.glb');
  // console.log (bulletData);

  //initital configuration
  const bullet = setupModel(bulletData);
  bullet.position.set(x, y, z);
  bullet.scale.set(0.5, 0.5, 0.5)
  bullet.type = 'bullet';

  // decides whether an enemy missile or hero missile
  bullet.e_type = type



  var speedx = 1
  // this method will be called once per frame

  if(bullet.e_type == 'enemy'){
    console.log("created")
    speedx = -1
    bullet.rotation.y = MathUtils.degToRad(-180)
  }

  bullet.tick = (delta, keys) => {
      bullet.position.x += speedx;
  };

  return {bullet}
}

export { loadBullet };