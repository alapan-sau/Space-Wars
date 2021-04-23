import {DirectionalLight} from '../../../node_modules/three/src/Three.js'

function createLights(){
    const light = new DirectionalLight('white', 8);

    light.position.set(500,500,500)

    return light;
}

export {createLights};