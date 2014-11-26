

(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(options){

    var color = options.color || Math.random() * 0xffffff;

    this.object = new THREE.Mesh(options.geometry, options.material);

    this.object.radius = options.radius;
    this.object.position.x = options.pos[0];
    this.object.position.z = options.pos[1];
    this.object.position.y = options.pos[2];
    this.vel = options.vel;
    this.currentHex = this.object.material.emissive.getHex();
    this.object.container = this;

    //enable explosion opacity setting
    if(this.className === "asteroid"){
      this.object.rotation.x = options.spin[0];
      this.object.rotation.y = options.spin[1];
      this.object.rotation.z = options.spin[2];
    }

    if(this.className === "explosion"){
      this.object.material.transparent = true;
    }
  };
  
  MovingObject.prototype.isCollidedWith = function(obj) {
    var point1=this.object.position;
    var point2=obj.object.position;
    var collisionAdjust = Math.min(this.object.radius, obj.object.radius)/2
    return pointDistanceHash(point1, point2) < Math.max(this.object.radius, obj.object.radius) + collisionAdjust;
  };
  
  MovingObject.prototype.move = function (grav) {
    this.object.position.x += this.vel[0];
    this.object.position.z += this.vel[1];
    this.object.position.y += this.vel[2];
    
    if(this.mass && grav){
      this.vel[0] += grav[0]/this.mass;
      this.vel[1] += grav[1]/this.mass;
      this.vel[2] += grav[2]/this.mass;
    }
  };

  MovingObject.prototype.highLight = function(){
    this.object.material.emissive.setHex( 0xff0000 );
  };

  MovingObject.prototype.unhighLight = function(){
    this.object.material.emissive.setHex( this.currentHex );
  };
  
})(this);