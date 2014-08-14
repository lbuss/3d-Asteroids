(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    this.mass = radius*radius;
    var color = color || Math.random() * 0xffffff;
    var geometry = new THREE.SphereGeometry( radius, 10, 10 );
    this.object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: color } ) );
    this.object.position.x = pos[0];
    this.object.position.z = pos[1];
    this.object.position.y = pos[2];
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
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
    var SPEED_MODIFIER = 80;
    var modX = (dimX / SPEED_MODIFIER);
    var modY = (dimY / SPEED_MODIFIER);

    var velX = Math.floor((Math.random() - 0.5) * modX);
    var velY = Math.floor((Math.random() - 0.5) * modY);
    var that = this;
    return new Asteroid([x, y, 0], [0, 0, 0], radius);
  };
})(this);