(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(options) {
    this.mass = options.radius*options.radius;
    Asteroids.MovingObject.call(this, options);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
 Asteroid.prototype.randomAsteroid = function (dimX, dimY, radius) {
    
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    
    var x = (Math.random()*1000 + 1000) * plusOrMinus;
    var y = 0;
    var z = plusOrMinus * 50 * Math.random();

    var velX = 0;
    var velY = Math.floor(plusOrMinus * 10 *(x/1200) + 5*(radius/(150)) );

    return new Asteroid({pos: [x, y, z], vel: [velX, velY, 0], radius: radius});
  };
})(this);