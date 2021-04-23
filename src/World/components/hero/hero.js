import {GLTFLoader} from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from '../../../../node_modules/three/src/Three.js'
import {setupModel} from './setupModel.js'

async function loadHero() {
  const loader = new GLTFLoader();
  const heroData = await loader.loadAsync('/assets/hero.glb');
  console.log (heroData);

  const hero = setupModel(heroData);
  hero.position.set(-50, 0, 10);
  hero.rotation.y = MathUtils.degToRad(90)
  hero.rotation.x = MathUtils.degToRad(0)
  hero.rotation.z = MathUtils.degToRad(90)
  hero.scale.set(0.5, 0.5, 0.5)

  const speedx = 0.8
  // this method will be called once per frame
  hero.tick = (delta, keys) => {

      // controlls
      if(keys["ArrowLeft"]){
          hero.position.x-=speedx;
      }
      if(keys["ArrowRight"]){
          hero.position.x+=speedx;
      }
      if(keys["ArrowUp"]){
          hero.rotation.x-=0.01
          hero.position.y+=speedx;
      }
      if(keys["ArrowDown"]){
          hero.rotation.x+=0.01
          hero.position.y-=speedx;
      }
      if(!keys["ArrowDown"] && !keys["ArrowUp"]){
          hero.rotation.x=0
      }
  };



  return {hero}
}

export { loadHero };