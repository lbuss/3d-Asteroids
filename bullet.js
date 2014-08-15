(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});  
    
  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call( this, {pos: pos, vel: vel, radius: 3, color: '#FF0000'} );
    this.lifespan = 90;
  };
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.move = function(x, y) {
    var bullet = this;
    Asteroids.MovingObject.prototype.move.call(bullet, x, y);
    this.lifespan -= 1;
  };

})(this);
  