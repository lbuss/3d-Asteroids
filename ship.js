(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Ship = Asteroids.Ship = function(pos, vel) {
    
    var geometry = new THREE.CylinderGeometry( 7, 0, 15, 32 );
    this.object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: '#949494' } ) );
    this.object.position.x = pos[0];
    this.object.position.z = pos[1];
    this.object.rotation.z = Math.PI/2;
    
    Asteroids.MovingObject.call(this, pos, vel, 3, '#FF0000');
    Asteroids.MovingObject.call(this, pos, vel, 10, '#FF00FF');
    this.heading = 0;
    
    this.height = 33;
    this.width = 33;
    this.startHeight = 33;
    this.startWidth = 33;
    this.startRadius = 10;
    this.dead = null;
    this.bounced = 0;
    // this.makeTurret(this);
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
  
  Ship.prototype.move = function (maxX, maxY) {
      if (Math.abs(this.vel[0]) + Math.abs(this.vel[1]) > 5 && !this.dead){
        this.vel[0] *= .95;
        this.vel[1] *= .95;
      }
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      
      this.object.rotation.y = (this.heading)/360 * 2 * Math.PI;
      
      this.object.position.x += this.vel[0];
      this.object.position.z -= this.vel[1];
      
      if (this.object.position.x < -maxX){
        this.object.position.x = maxX
      }if (this.object.position.x > maxX){
        this.object.position.x = -maxX
      }if (this.object.position.z < -maxY){
        this.object.position.z = maxY
      }if (this.object.position.z > maxY){
        this.object.position.z = -maxY
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
  }
  
  Ship.prototype.draw = function(ctx, scale) {
    if(key.isPressed("up") && !this.dead) {
      ctx.beginPath();
      var vec = headingVec(this.heading);
      var xJet = this.pos[0] - this.width/2*vec[0]/10;
      var yJet = this.pos[1] - this.height/2*vec[1]/10;
      var rad = this.height/3 + Math.random()*this.height/10;
      ctx.arc(xJet, yJet, rad, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      // ctx.lineWidth = 5;
      // ctx.strokeStyle = 'yellow';
      ctx.stroke();
    }
    if (!this.dead){
      drawImageRot(this.img, this.pos[0]-this.width/2, this.pos[1]-this.height/2, this.width, this.height, this.heading+90, ctx);
    }else{
      drawImageRot(this.img, this.pos[0]-this.width/2, this.pos[1]-this.height/2, this.width, this.height, this.heading+90 + this.rotation * this.dead, ctx);
      this.dead +=1;
    }
    
    if (this.turret){
      this.turret.draw(ctx);
    };
  };
  
  Ship.prototype.makeTurret = function(ship){
    ship.turret = new Asteroids.Turret(ship);
  }
  
  var headingVec = function(heading){
    var x = Math.cos(heading/180 * Math.PI) * 10;
    var y = Math.sin(heading/180 * Math.PI) * 10;
    return [x,y];
  };
  
  function drawImageRot(img,x,y,width,height,deg,ctx){

        //Convert degrees to radian 
        var rad = deg * Math.PI / 180;

        //Set the origin to the center of the image
        ctx.translate(x + width / 2, y + height / 2);

        //Rotate the canvas around the origin
        ctx.rotate(rad);

        //draw the image    
        ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

        //reset the canvas  
        ctx.rotate(rad * ( -1 ) );
        ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
    }
  
})(this);