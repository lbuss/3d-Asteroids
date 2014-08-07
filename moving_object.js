

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
    var deltaX = this.pos[0] - obj.pos[0];
    var deltaY = this.pos[1] - obj.pos[1];
    var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return distance < (this.radius + obj.radius);
  };
  
  MovingObject.prototype.move = function (maxX, maxY) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos[0] = (this.pos[0] < 0 ? maxX : this.pos[0] % maxX);
    this.pos[1] = (this.pos[1] < 0 ? maxY : this.pos[1] % maxY);
  };
  
  
  var headingVec = function(heading){
    var x = Math.cos(heading/180 * Math.PI) * 10;
    var y = Math.sin(heading/180 * Math.PI) * 10;
    return [x,y];
  };
})(this);