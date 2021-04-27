import {Clock} from '../../../node_modules/three/src/Three.js';
import {loadEnemy} from '../components/enemy/enemy.js';
import {Box3} from '../../../node_modules/three/src/Three.js';
import { loadStar } from '../components/star/star.js';
import { loadBullet } from '../components/bullet/bullet.js';


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
        this.health = 100;

        document.getElementById("health").innerHTML = "Score: 0"
        document.getElementById("score").innerHTML = "Health: 100"
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
            const {enemy} = await loadEnemy(this.hero.position.x, this.hero.position.y, this.hero.position.z)
            this.scene.add(enemy)
            this.updatables.push(enemy)
        }

        // create star
        if(this.num_ticks % 200 == 0 || this.num_ticks % 200 == 10 || this.num_ticks % 200 == 20 || this.num_ticks % 200 == 30 || this.num_ticks % 200 == 40 || this.num_ticks % 200 == 50 ){
            const {star} = await loadStar()
            this.scene.add(star)
            this.updatables.push(star)
        }


        // create enemy missile
        if(this.num_ticks % 50 == 0){
            for(const object of this.updatables){
                if(object.position.x > 0 && object.position.x < 60){
                    if(object.type == 'enemy'){
                        if(Math.random() < 0.3){
                            var {bullet} = await loadBullet(object.position.x-2, object.position.y, object.position.z, 'enemy')
                            this.scene.add(bullet)
                            this.updatables.push(bullet)
                        }
                    }
                }
            }
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

        document.getElementById("health").innerHTML = "Score: " + this.score
        document.getElementById("score").innerHTML = "Health: " + this.health

        // Check collision:
        // if(this.num_ticks % 5 == 0){

        const heroBox = new Box3().setFromObject( this.hero);

        // generate all_hero_bullet_boxes
        const all_bullets_boxes = []
        for (const object of this.updatables) {
            if(object.type == 'bullet' && object.position.x > -60 && object.position.x < 60 && object.e_type == 'hero'){
                all_bullets_boxes.push(new Box3().setFromObject(object))
            }
        }

        // all enemies
        for (const object of this.updatables) {
            if(object.type == 'star' && object.position.x > -60 && object.position.x < 60){
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
            else if(object.type == 'enemy' && object.position.x > -60 && object.position.x < 60){
                const enemyBox = new Box3().setFromObject(object);
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
                if(heroBox.intersectsBox(enemyBox)){
                    this.health -= 20
                    if(this.health<=0){
                        this.health=0
                        document.getElementById("score").innerHTML = "GAME OVER :( !!";
                        this.stop()
                    }
                    else{
                        this.scene.remove(object)
                        var index = this.updatables.indexOf(object);
                        if (index > -1) {
                            this.updatables.splice(index, 1);
                        }
                    }
                }
            }
            else if(object.type == 'bullet' && object.position.x > -60 && object.position.x < 60 && object.e_type=='enemy'){
                const enemyMissileBox = new Box3().setFromObject(object);
                if(heroBox.intersectsBox(enemyMissileBox)){
                    this.scene.remove(object)
                    var index = this.updatables.indexOf(object);
                    if (index > -1) {
                        this.updatables.splice(index, 1);
                    }
                    this.health -= 10;
                    if(this.health<=0){
                        this.health=0
                        document.getElementById("score").innerHTML = "GAME OVER :( !!";
                        this.stop()
                    }
                }
            }
        }
        // }
    }
}

export { Loop };