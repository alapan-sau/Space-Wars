import { BoxBufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial , MathUtils} from '../../../node_modules/three/src/Three.js';

function createCube() {
    // create a geometry
    const geometry = new BoxBufferGeometry(1, 0.2, 0.2);


    // create a default (white) Basic material
    const material = new MeshStandardMaterial({color:'purple'});

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    const radiansPerSecond = MathUtils.degToRad(30);

    let min = (a,b)=>{
        if(a<b)return a;
        else return b;
    }

    const speedx = 0.05
    // this method will be called once per frame
    cube.tick = (delta, keys) => {

        // controlls
        if(keys["ArrowLeft"]){
            cube.position.x-=speedx;
        }
        if(keys["ArrowRight"]){
            cube.position.x+=speedx;
        }
        if(keys["ArrowUp"]){
            cube.rotation.x-=0.01
            cube.position.y+=speedx;
        }
        if(keys["ArrowDown"]){
            cube.rotation.x+=0.01
            cube.position.y-=speedx;
        }
        if(!keys["ArrowDown"] && !keys["ArrowUp"]){
            cube.rotation.x=0
        }
    };

    return cube;
}

export { createCube };