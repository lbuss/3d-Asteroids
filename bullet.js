(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});  
    
  var Bullet = Asteroids.Bullet = function(pos, vel) {
    // var geometry = new THREE.SphereGeometry( options.radius, 10, 10 );
    // this.object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: color, emissive: options.emissive } ) );
    var options ={};
    this.radius = 3
    options.radius = this.radius;
    options.pos = pos;
    options.vel = vel;
    options.geometry = new THREE.SphereGeometry( 3, 10, 10 );
    options.material = new THREE.MeshLambertMaterial( { color: '#FF0000', emissive: '#FF0000' } );

    Asteroids.MovingObject.call( this, options);
    this.lifespan = 90;
  };
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);
    this.lifespan -= 1;
  };

})(this);
  