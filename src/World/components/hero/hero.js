import {GLTFLoader} from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from '../../../../node_modules/three/src/Three.js'
import {setupModel} from './setupModel.js'


//imports a hero model
async function loadHero() {
  const loader = new GLTFLoader();
  const heroData = await loader.loadAsync('/assets/hero.glb');
  //   console.log (heroData);


  //set up the configuration
  const hero = setupModel(heroData);
  hero.position.set(-40, 0, 10);
  hero.rotation.y = MathUtils.degToRad(90)
  hero.rotation.x = MathUtils.degToRad(0)
  hero.rotation.z = MathUtils.degToRad(90)
  hero.scale.set(0.5, 0.5, 0.5)


  hero.type = 'hero';
  const speedx = 0.8
  // this method will be called once per frame
  hero.tick = (delta, keys) => {

      // controlls
      if(keys["ArrowLeft"]){
          hero.position.x-=speedx;
          if(hero.position.x < -45){
            hero.position.x = -45
          }
      }
      if(keys["ArrowRight"]){
          hero.position.x+=speedx;
          if(hero.position.x > 45){
            hero.position.x = 45
          }
      }
      if(keys["ArrowUp"]){
          hero.rotation.x-=0.02
          hero.position.y+=speedx;
          if(hero.position.y > 25){
            hero.position.y = 25
          }
      }
      if(keys["ArrowDown"]){
          hero.rotation.x+=0.02
          hero.position.y-=speedx;
          if(hero.position.y < -25){
            hero.position.y = -25
          }
      }
      if(!keys["ArrowDown"] && !keys["ArrowUp"]){
          hero.rotation.x=0
      }
  };



  return {hero}
}

export { loadHero };