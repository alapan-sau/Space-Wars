import {Clock} from '../../../node_modules/three/src/Three.js';
import {loadEnemy} from '../components/enemy/enemy.js';
import {Box3} from '../../../node_modules/three/src/Three.js';
import { loadStar } from '../components/star/star.js';


const clock = new Clock();
class Loop{
    constructor(camera, scene, renderer, hero) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.keys = {};
        this.num_ticks = 0;
        this.score = 0;
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

    async tick(){
        // console.log(this.keys);
        // only call the getDelta function once per frame!
        const delta = clock.getDelta();

        // Add a tick
        this.num_ticks+=1;

        // Code to update animations will go here
        for (const object of this.updatables) {
            object.tick(delta, this.keys);
        }

        // create enemy
        if(this.num_ticks % 100 == 0 || this.num_ticks % 100 == 10 || this.num_ticks % 100 == 20 || this.num_ticks % 100 == 30 ){
            const {enemy} = await loadEnemy()
            this.scene.add(enemy)
            this.updatables.push(enemy)
        }

        // create star
        if(this.num_ticks % 200 == 0 || this.num_ticks % 200 == 10 || this.num_ticks % 200 == 20 || this.num_ticks % 200 == 30 || this.num_ticks % 200 == 40 || this.num_ticks % 200 == 50 ){
            const {star} = await loadStar()
            this.scene.add(star)
            this.updatables.push(star)
        }


        // at regular interval remove items
        if(this.num_ticks % 1000 == 0){
            // remove external objects
            for (const object of this.updatables) {
                if(object.position.x < -100  ||  object.position.x > 100){
                    this.scene.remove(object)
                    var index = this.updatables.indexOf(object);
                    if (index > -1) {
                        this.updatables.splice(index, 1);
                    }
                }
            }
        }


        // Check collision:
        if(this.num_ticks % 5 == 0){

            const heroBox = new Box3().setFromObject( this.hero);

            // generate all_bullet_boxes
            const all_bullets_boxes = []
            for (const object of this.updatables) {
                if(object.type == 'bullet' && object.position.x > -60 && object.position.x < 60){
                    all_bullets_boxes.push(new Box3().setFromObject(object))
                }
            }

            // all enemies
            for (const object of this.updatables) {
                if(object.type == 'enemy' && object.position.x > -60 && object.position.x < 60){
                    const enemyBox = new Box3().setFromObject(object);
                    if(heroBox.intersectsBox(enemyBox)){
                        this.stop()
                    }
                    for(const bullet_box of all_bullets_boxes){
                        if(enemyBox.intersectsBox(bullet_box)){
                            this.scene.remove(object)
                            var index = this.updatables.indexOf(object);
                            if (index > -1) {
                                this.updatables.splice(index, 1);
                            }
                            this.score += 50;
                        }
                    }
                }
                else if(object.type == 'star' && object.position.x > -60 && object.position.x < 60){
                    const starBox = new Box3().setFromObject(object);
                    if(heroBox.intersectsBox(starBox)){
                        this.scene.remove(object)
                        var index = this.updatables.indexOf(object);
                        if (index > -1) {
                            this.updatables.splice(index, 1);
                        }
                        this.score +=10
                    }
                }
            }
        }
    }
}

export { Loop };