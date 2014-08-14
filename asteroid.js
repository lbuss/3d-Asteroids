(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    this.mass = radius*radius;
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.prototype.randomAsteroid = function (dimX, dimY, radius) {
    
    var x = Math.random()*400 +300;
    var y = 0;

    var velX = 0;

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var velY = Math.floor(plusOrMinus * ((Math.random()*5) + 3));
    
    return new Asteroid([x, y, 0], [velX, velY, 0], radius);
  };
})(this);