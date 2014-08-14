

(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.startRadius = radius;
    this.color = color;
  };
  
  MovingObject.prototype.isCollidedWith = function(obj) {
    return pointDistance(this, obj) < (this.radius + obj.radius);
  };
  
  MovingObject.prototype.move = function (grav) {
    this.object.position.x += this.vel[0];
    this.object.position.z += this.vel[1];
    this.object.position.y += this.vel[2];
    
    this.vel[0] += grav[0];
    this.vel[1] += grav[0];
    this.vel[2] += grav[0];
    
  // boundary wrapping may be useful still at some point
  if (this.object.position.x < -600){
      this.object.position.x = 600
    }if (this.object.position.x > 600){
      this.object.position.x = -600
    }if (this.object.position.z < -600){
      this.object.position.z = 600
    }if (this.object.position.z > 600){
      this.object.position.z = -600
    }if (this.object.position.y < -600){
      this.object.position.y = 600
    }if (this.object.position.y > 600){
      this.object.position.y = -600
    }
    
  };
})(this);