

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
    var deltaX = this.object.position.x - obj.object.position.x;
    var deltaY = this.object.position.z - obj.object.position.z;
    var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return distance < (this.radius + obj.radius);
  };
  
  MovingObject.prototype.move = function (maxX, maxY) {
    this.object.position.x += this.vel[0];
    this.object.position.z += this.vel[1];
    if (this.object.position.x < -maxX){
      this.object.position.x = maxX
    }if (this.object.position.x > maxX){
      this.object.position.x = -maxX
    }if (this.object.position.z < -maxY){
      this.object.position.z = maxY
    }if (this.object.position.z > maxY){
      this.object.position.z = -maxY
    }
    
    
    // this.object.position.x = (this.object.position.x < 0 ? maxX : this.object.position.x % maxX);
   //  this.object.position.z = (this.object.position[1] < 0 ? maxY : this.object.position.z % maxY);
  };
  
  
  var headingVec = function(heading){
    var x = Math.cos(heading/180 * Math.PI) * 10;
    var y = Math.sin(heading/180 * Math.PI) * 10;
    return [x,y];
  };
})(this);