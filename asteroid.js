(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(options) {

    this.mass = options.mass || options.radius*options.radius;

    options.emissive = options.emissive || 0x000000;
    
    Asteroids.MovingObject.call(this, options);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
 Asteroid.prototype.randomAsteroid = function (radius, sun) {
    
    var mass = radius*radius;

    var x = (Math.random()*1000 + 1000) * plusOrMinus();
    var y = 0;
    var z = plusOrMinus() * 50 * Math.random();

    var velX = 0;
    var velY = Math.sqrt((sun.mass+mass)/x);

    return new Asteroid({pos: [x, y, z], vel: [velX, velY, 0], radius: radius, mass: mass});
  };
})(this);