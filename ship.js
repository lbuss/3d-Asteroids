(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Ship = Asteroids.Ship = function(options) {
    
    var geometry = new THREE.CylinderGeometry( 7, 0, 15, 32 );
    this.object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: '#949494' } ) );
    this.object.position.x = options.pos[0];
    this.object.position.z = options.pos[1];
    this.object.rotation.z = Math.PI/2;
    this.mass = 200;
    
    this.vel = options.vel;
    // Asteroids.MovingObject.call(this, pos, vel, 10, '#FF00FF');
    
    //TODO: modify heading to 3d
    this.heading = 0;
    this.dead = null;
    this.bounced = 0;
    
  };
  
  Ship.inherits(Asteroids.MovingObject);
  
  
  Ship.prototype.navigate = function() {
    var turnSpeed = 10;
    if(this.dead === null){
      if(key.isPressed("up")) this.power(headingVec(this.heading));  
      if(key.isPressed("right")) this.heading -= turnSpeed;
      if(key.isPressed("left")) this.heading += turnSpeed;
    }
  };
  
  Ship.prototype.move = function (grav) {
      this.object.rotation.y = (this.heading)/360 * 2 * Math.PI;
      
      this.object.position.x += this.vel[0];
      this.object.position.z -= this.vel[1];
      this.object.position.y += this.vel[2];
      
      if(grav != null){
        this.vel[0] += grav[0];
        this.vel[1] += grav[1];
        this.vel[2] += grav[2];
      }  
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0]/10;
    this.vel[1] += impulse[1]/10;
  };
  
  Ship.prototype.fireBullet = function() {
    var bulletSpeed = 1;
    var bulletVel = [headingVec(this.heading)[0]*bulletSpeed,
                     -headingVec(this.heading)[1]*bulletSpeed];
    var bulletPos = [this.object.position.x, this.object.position.z];
    return new Asteroids.Bullet(bulletPos, bulletVel);
  };
  
  Ship.prototype.shipDie = function(vel) {
    this.vel[0] = vel[0]*(Math.random()+1);
    this.vel[1] = vel[1]*(Math.random()+1);
    this.rotation = Math.random()*24-12;
    this.dead = 1;
    this.bounced = 40;
  };

})(this);