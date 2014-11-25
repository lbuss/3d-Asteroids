(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Explosion = Asteroids.Explosion = function(options) {

    this.radius = options.radius;
    this.originalSize = this.radius;

    options.color = 0xFFCC33;
    options.emissive = 0xFFCC33;
    options.explosion = true;

    this.lifespan = 90;

    Asteroids.MovingObject.call(this, options);
  };
  
  Explosion.inherits(Asteroids.MovingObject);

  Explosion.prototype.move = function() {
    var explosion = this;
    this.lifespan -= 1;
    this.object.scale.x += .07; 
    this.object.scale.y += .07;
    this.object.scale.z += .07;
    this.object.material.opacity -= .01;
    Asteroids.MovingObject.prototype.move.call(this);
  };
  
})(this);