(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Turret = Asteroids.Turret = function(ship, target) {
    this.target = target;
    this.ship = ship;
    this.pos = this.ship.pos;
    this.radius = 5;
    this.color = "gray";
    this.heading = -90;
    this.turnSpeed = 10;
    this.fireSpeed = 1000;
    //TODO fix position so it tracks and doesnt caluculate in both bullet and draw
  };
  
  Turret.prototype.turretPos = function() {
    var vec = headingVec(this.ship.heading);
    var xTur = this.pos[0] - this.ship.width/4*vec[0]/20;
    var yTur = this.pos[1] - this.ship.height/4*vec[1]/20;
    return [xTur, yTur];
  };
  
  Turret.prototype.drawTargetCircle = function(ctx){
    ctx.fillStyle = "green";
    ctx.beginPath();

    ctx.arc(
      this.target[0],
      this.target[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  Turret.prototype.aim = function(target) {
    this.target = target;
    var pos = this.turretPos();
    if (target != null) {
    var x = pos[0] - target[0];
    var y = target[1] - pos[1];
    var rad = Math.atan2(x, y) + Math.PI/2;
    var angle = rad/Math.PI*180;
    this.heading = angle;
    }
    // if(key.isPressed("right")) this.heading += turnSpeed;
    // if(key.isPressed("left")) this.heading -= turnSpeed;
  };
  
  Turret.prototype.fireBullet = function() {
    
    var vec = headingVec(this.ship.heading);
    var xTur = this.pos[0] - this.width/3*vec[0]/20;
    var yTur = this.pos[1] - 10*vec[1];
    var bulletSpeed = 5;
    var bulletVel = [headingVec(this.heading)[0]*bulletSpeed,
                     headingVec(this.heading)[1]*bulletSpeed];
    var bulletPos = [xTur, yTur];
    return new Asteroids.Bullet(bulletPos, bulletVel);
  };
  
  Turret.prototype.draw = function(ctx) {
    var vec = headingVec(this.ship.heading);
    var xTur = this.pos[0] - this.ship.width/3*vec[0]/20;
    var yTur = this.pos[1] - this.ship.height/3*vec[1]/20;


    ctx.fillStyle = "#606060";
    ctx.beginPath();

    ctx.arc(
      xTur,
      yTur,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.closePath();
    // ctx.fillStyle = "#303030";

    // ctx.beginPath();
    // var vec = headingVec;
    // ctx.arc(
    //   vec[0]*10,
    //   vec[1]*10,
    //   6,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.fill();
    // ctx.closePath();
    
  };
  
  var headingVec = function(heading){
    var x = Math.cos(heading/180 * Math.PI)*10;
    var y = Math.sin(heading/180 * Math.PI)*10;
    return [x,y];
  };


  
})(this);