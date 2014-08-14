

(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color){
    var color = color || Math.random() * 0xffffff;
    var geometry = new THREE.SphereGeometry( radius, 10, 10 );
    this.object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: color } ) );
    this.object.position.x = pos[0];
    this.object.position.z = pos[1];
    this.object.position.y = pos[2];
    this.vel = vel;
  };
  
  MovingObject.prototype.isCollidedWith = function(obj) {
    return pointDistance(this, obj) < (this.radius + obj.radius);
  };
  
  MovingObject.prototype.move = function (grav) {
    this.object.position.x += this.vel[0];
    this.object.position.z += this.vel[1];
    this.object.position.y += this.vel[2];
    
    this.vel[0] += grav[0];
    this.vel[1] += grav[1];
    this.vel[2] += grav[2];
    
  // boundary wrapping may be useful still at some point
  // if (this.object.position.x < -600){
 //      this.object.position.x = 600
 //    }if (this.object.position.x > 600){
 //      this.object.position.x = -600
 //    }if (this.object.position.z < -600){
 //      this.object.position.z = 600
 //    }if (this.object.position.z > 600){
 //      this.object.position.z = -600
 //    }if (this.object.position.y < -600){
 //      this.object.position.y = 600
 //    }if (this.object.position.y > 600){
 //      this.object.position.y = -600
 //    }
    
  };
})(this);