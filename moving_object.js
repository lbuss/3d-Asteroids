

(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(options){
    
    var color = options.color || Math.random() * 0xffffff;
    var geometry = new THREE.SphereGeometry( options.radius, 10, 10 );
    this.object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: color, emissive: options.emissive } ) );
    this.object.radius = options.radius;
    this.object.position.x = options.pos[0];
    this.object.position.z = options.pos[1];
    this.object.position.y = options.pos[2];
    this.vel = options.vel;
  };
  
  MovingObject.prototype.isCollidedWith = function(obj) {
    var point1=this.object.position;
    var point2=obj.object.position;
    return pointDistanceHash(point1, point2) < (this.object.radius + obj.object.radius);
  };
  
  MovingObject.prototype.move = function (grav) {
    this.object.position.x += this.vel[0];
    this.object.position.z += this.vel[1];
    this.object.position.y += this.vel[2];
    
    if(grav){
      this.vel[0] += grav[0];
      this.vel[1] += grav[1];
      this.vel[2] += grav[2];
    }
  };
})(this);