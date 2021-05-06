import {PerspectiveCamera} from '../../../node_modules/three/src/Three.js'

// creates a camera
function createCamera(){
    const camera = new PerspectiveCamera(
        35, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        100, // far clipping plane
    )
    // move the camera back so we can view the scene
    camera.position.set(0, 0, 100);
  return camera;
}

export { createCamera };