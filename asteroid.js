(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    // this.COLOR = '#339900';
    // this.RADIUS = 5;
    Asteroids.MovingObject.call(this, pos, vel, radius, '#505050');
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.prototype.randomAsteroid = function (dimX, dimY, radius) {

    var xOrY = Math.floor(Math.random() *2);
    var highOrLow = Math.floor(Math.random() *2);
    var x = 0;
    var y = 0;
    if (xOrY === 1) {
      x = Math.floor(Math.random() * dimX);
      if (highOrLow === 1) {
        y = dimY;
      } else {
        y = 0;
      }
    } else {
      y = Math.floor(Math.random() * dimY);
      if (highOrLow === 1) {
        x = dimX;
      } else {
        x = 0;
      }
    } 
    var SPEED_MODIFIER = 40;
    var modX = (dimX / SPEED_MODIFIER);
    var modY = (dimY / SPEED_MODIFIER);

    var velX = Math.floor((Math.random() - 0.5) * modX);
    var velY = Math.floor((Math.random() - 0.5) * modY);

    var that = this;
    return new Asteroid([x, y], [velX, velY], radius);
  };
  
  Asteroid.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  
    ctx.fill();
  };
    
  Asteroid.prototype.spawn = function() {
    var babies = [];
    if (this.radius > 15){
      for (var i = 0; i < 3; i++){
        babies.push(this.randomAsteroid(this.pos[0], this.pos[1], 9))
      }
      return babies;
    }
    if (this.radius > 8) {
      for (var i = 0; i < 4; i++){
        babies.push(this.randomAsteroid(this.pos[0], this.pos[1], 3))
      }
      return babies;
    }
  }  
  
})(this);