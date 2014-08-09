(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, 10, '#FF00FF');
    this.heading = -90;
    
    var img = new Image();
    img.src = 'ship.png';
    this.img = img;
    this.height = 33;
    this.width = 33;
    this.startHeight = 33;
    this.startWidth = 33;
    // this.makeTurret(this);
  };
  
  Ship.inherits(Asteroids.MovingObject);
  
  
  Ship.prototype.navigate = function() {
    var turnSpeed = 10;
    if(key.isPressed("up")) this.power(headingVec(this.heading));  
    if(key.isPressed("right")) this.heading += turnSpeed;
    if(key.isPressed("left")) this.heading -= turnSpeed;
  };
  
  Ship.prototype.move = function (maxX, maxY) {
      if (Math.abs(this.vel[0]) + Math.abs(this.vel[1]) > 5){
        this.vel[0] *= .95;
        this.vel[1] *= .95;
      }
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      this.pos[0] = (this.pos[0] < 0 ? maxX : this.pos[0] % maxX);
      this.pos[1] = (this.pos[1] < 0 ? maxY : this.pos[1] % maxY);
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0]/10;
    this.vel[1] += impulse[1]/10;
  };
  
  Ship.prototype.fireBullet = function() {
    var bulletSpeed = 1;
    var bulletVel = [headingVec(this.heading)[0]*bulletSpeed,
                     headingVec(this.heading)[1]*bulletSpeed];
    var bulletPos = [this.pos[0], this.pos[1]];
    return new Asteroids.Bullet(bulletPos, bulletVel);
  };
  
  Ship.prototype.draw = function(ctx, scale) {
    if(key.isPressed("up")) {
      ctx.beginPath();
      var vec = headingVec(this.heading);
      var xJet = this.pos[0] - this.width/2*vec[0]/10;
      var yJet = this.pos[1] - this.height/2*vec[1]/10;
      debugger
      var rad = this.height/3 + Math.random()*this.height/10;
      ctx.arc(xJet, yJet, rad, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      // ctx.lineWidth = 5;
      // ctx.strokeStyle = 'yellow';
      ctx.stroke();
    }
    
    drawImageRot(this.img, this.pos[0]-this.width/2, this.pos[1]-this.height/2, this.width, this.height, this.heading+90, ctx);
    
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