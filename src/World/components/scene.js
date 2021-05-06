import {Scene, Color} from '../../../node_modules/three/src/Three.js'

// creates the scene
function createScene(){
    const scene = new Scene()
    scene.background = new Color('black');
    return scene
}

export {createScene};