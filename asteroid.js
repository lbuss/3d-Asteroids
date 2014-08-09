(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    // this.COLOR = '#339900';
    // this.RADIUS = 5;
    Asteroids.MovingObject.call(this, pos, vel, radius, '#505050');
    var img = new Image();
    img.src = 'ast.png';
    this.img = img;
    this.height = radius*2;
    this.width = radius*2;
    this.startHeight = radius*2;
    this.startWidth = radius*2;
    
    this.rotation = 360 * Math.random();
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
    var SPEED_MODIFIER = 40;
    var modX = (dimX / SPEED_MODIFIER);
    var modY = (dimY / SPEED_MODIFIER);

    var velX = Math.floor((Math.random() - 0.5) * modX);
    var velY = Math.floor((Math.random() - 0.5) * modY);

    var that = this;
    return new Asteroid([x, y], [velX, velY], radius);
  };
  
  Asteroid.prototype.draw = function(ctx) {
    
    drawImageRot(this.img, this.pos[0]-this.width/2, this.pos[1]-this.height/2, this.width, this.height, this.rotation, ctx);
    // ctx.fillStyle = this.color;
//     ctx.strokeStyle = '#f00';
//     ctx.lineWidth = 1;
//     ctx.lineColor = 'black';
//     ctx.beginPath();
//
//     ctx.arc(
//       this.pos[0],
//       this.pos[1],
//       this.radius,
//       0,
//       2 * Math.PI,
//       false
//     );
//
//     ctx.fill();
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