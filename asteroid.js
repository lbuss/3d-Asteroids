(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(options) {
    this.mass = options.radius*options.radius;
    Asteroids.MovingObject.call(this, options);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.prototype.randomAsteroid = function (dimX, dimY, radius) {
    
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    
    var x = (Math.random()*300 +300) * plusOrMinus;
    var y = 0;
    var z = plusOrMinus * 50 * Math.random();

    var velX = 0;
    var velY = Math.floor(plusOrMinus * 5 *(x/700) + 2*(radius*radius/(25*25)) );

    return new Asteroid({pos: [x, y, z], vel: [velX, velY, 0], radius: radius});
  };
})(this);