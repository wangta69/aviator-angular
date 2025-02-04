
import * as THREE from 'three';
import { Colors } from './Constants';
export class Particle {

  private parent;
  private mesh;


  constructor(parent: any) {
    this.parent = parent;

    const geom = new THREE.TetrahedronGeometry(3,0);
    const mat = new THREE.MeshPhongMaterial({
      color:0x009999,
      shininess:0,
      specular:0xffffff,
      flatShading: true
    });
    this.mesh = new THREE.Mesh(geom,mat);
  }

  private explode(pos:any, color: string, scale: number){
    const _this = this;
    const _p = this.mesh.parent;
    this.mesh.material.color = new THREE.Color( color);
    this.mesh.material.needsUpdate = true;
    this.mesh.scale.set(scale, scale, scale);
    const targetX = pos.x + (-1 + Math.random()*2)*50;
    const targetY = pos.y + (-1 + Math.random()*2)*50;
    const speed = .6+Math.random()*.2;
    TweenMax.to(this.mesh.rotation, speed, {x:Math.random()*12, y:Math.random()*12});
    TweenMax.to(this.mesh.scale, speed, {x:.1, y:.1, z:.1});
    TweenMax.to(this.mesh.position, speed, {x:targetX, y:targetY, delay:Math.random() *.1, ease:Power2.easeOut, onComplete:() =>{
      if(_p) _p.remove(_this.mesh);
      _this.mesh.scale.set(1,1,1);
      this.parent.particlesPool.unshift(_this);
    }});
  }
}
