(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Explosion = Asteroids.Explosion = function(options) {

    this.radius = options.radius;
    this.originalSize = this.radius;
    this.className = "explosion";
    // this.light = new THREE.PointLight( 0xffffff, 5, 2500);

    var color = 0xFFCC33;
    var emissive = 0xFFCC33;

    this.lifespan = 90;

    options.geometry = new THREE.SphereGeometry( options.radius, 10, 10 );
    options.material = new THREE.MeshLambertMaterial( { color: color, emissive: emissive } );

    Asteroids.MovingObject.call(this, options);

    // this.light.position.set( this.object.position.x, this.object.position.y, this.object.position.z );
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