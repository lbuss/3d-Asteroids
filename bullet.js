(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});  
    
  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call( this, {pos: pos, vel: vel, radius: 3, color: '#FF0000', emissive: '#FF0000'} );
    this.lifespan = 90;
  };
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);
    this.lifespan -= 1;
  };

})(this);
  