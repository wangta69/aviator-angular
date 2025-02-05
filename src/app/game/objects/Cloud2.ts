
import * as THREE from 'three';
import { Colors } from './Constants';
export class Cloud2 {

  private parent;
  private mesh;
  constructor(parent: any) {
    this.parent = parent;

    this.mesh = new THREE.Object3D();
    this.mesh.name = "cloud";
    // const geom = new THREE.CubeGeometry(20,20,20);
    const geom = new THREE.BoxGeometry(20,20,20);
    const mat = new THREE.MeshPhongMaterial({
      color:Colors.white,
    });

    //*
    const nBlocs = 3+Math.floor(Math.random()*3);
    for (let i=0; i<nBlocs; i++ ){
      const m = new THREE.Mesh(geom.clone(), mat);
      m.position.x = i*15;
      m.position.y = Math.random()*10;
      m.position.z = Math.random()*10;
      m.rotation.z = Math.random()*Math.PI*2;
      m.rotation.y = Math.random()*Math.PI*2;
      const s = .1 + Math.random()*.9;
      m.scale.set(s,s,s);
      this.mesh.add(m);
      m.castShadow = true;
      m.receiveShadow = true;

    }
  }

  private rotate(){
    const l = this.mesh.children.length;
    for(let i=0; i<l; i++){
      const m = this.mesh.children[i];
      m.rotation.z+= Math.random()*.005*(i+1);
      m.rotation.y+= Math.random()*.002*(i+1);
    }
  }
}
