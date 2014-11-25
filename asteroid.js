(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(options) {

    this.mass = options.mass || options.radius*options.radius;

    options.emissive = options.emissive || 0x080808;
    
    Asteroids.MovingObject.call(this, options);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  

  Asteroid.prototype.randomAsteroid = function (radius, sun) {
    
    var angle = Math.floor(Math.random() * 360);
    var startDist = 1000 + Math.floor(Math.random() * 2000);

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    var mass = radius*radius;

    var x = startDist * Math.cos(angle);
    var y = startDist * Math.sin(angle);
    var z = plusOrMinus * 50 * Math.random();

    var velMag = Math.sqrt((sun.mass+mass)/startDist);

    var velX = -velMag * Math.sin(angle);
    var velY = velMag * Math.cos(angle);

    return new Asteroid({pos: [x, y, z], vel: [velX, velY, 0], radius: radius, mass: mass});
  };
})(this);