import {GLTFLoader} from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from '../../../../node_modules/three/src/Three.js'
import {setupModel} from './setupModel.js'

var enemy1_loc = '/assets/enemy1.glb'
var enemy2_loc = '/assets/enemy2.glb'

async function loadEnemy(x, y, z) {
  const loader = new GLTFLoader();

  var selected_enemy = Math.random() < 0.5 ? enemy1_loc : enemy2_loc
  const enemyData = await loader.loadAsync(selected_enemy);
  // console.log (enemyData);

  const enemy = setupModel(enemyData);
  enemy.position.set(80, Math.floor(Math.random() * 50)-25, 10);
  enemy.rotation.y = MathUtils.degToRad(90)
  enemy.rotation.x = MathUtils.degToRad(0)
  enemy.rotation.z = MathUtils.degToRad(90)
//   enemy.scale.set(0.6, 0.6, 0.6)
  // enemy.rotation.x+= Math.random()

  enemy.e_type = Math.floor(Math.random() * 2)
  if(enemy.e_type == 0){
    enemy.position.y = y;
  }

  enemy.type = 'enemy';
  const speedx = -0.8
  // this method will be called once per frame
  enemy.tick = (delta, keys) => {
    if(enemy.e_type){
      enemy.position.x += speedx
    }
    else{
      // controlls
      enemy.position.x += speedx
      if(keys["ArrowUp"]){
          // enemy.rotation.x-=0.02
          enemy.position.y-=speedx;
          if(enemy.position.y > 25){
            enemy.position.y =25
          }
      }
      if(keys["ArrowDown"]){
          // enemy.rotation.x+=0.02
          enemy.position.y+=speedx;
          if(enemy.position.y < -25){
            enemy.position.y = -25
          }
      }
      if(!keys["ArrowDown"] && !keys["ArrowUp"]){
          enemy.rotation.x=0
      }
    }
  };

  return {enemy}
}

export { loadEnemy };