(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Asteroid = Asteroids.Asteroid = function(options) {

    this.mass = options.mass || options.radius*options.radius;
    this.className = "asteroid";

    var imgTexture = THREE.ImageUtils.loadTexture( "http://codelab.nfshost.com/asteroids_super_3d/asteroid.jpeg" );
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
    imgTexture.anisotropy = 16;

    var color = options.color || Math.random() * 0xffffff;

    var shininess = 0, specular = 0x333333, bumpScale = 1, shading = THREE.SmoothShading;

    options.material = new THREE.MeshPhongMaterial( { map: imgTexture, bumpMap: imgTexture, bumpScale: bumpScale, emissive: 0x111111, color: color, specular: specular, shininess: shininess, shading: shading });
    options.geometry = new THREE.SphereGeometry( options.radius, 32, 16 );

    var spinX = Math.random() * Math.PI;
    var spinY = Math.random() * Math.PI;
    var spinZ = Math.random() * Math.PI;

    options.spin = [spinX, spinY, spinZ];
    // options.ambient = options.ambient || 0x080808;
    
    Asteroids.MovingObject.call(this, options);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  

  Asteroid.prototype.randomAsteroid = function (radius, sun) {
    
    var angle = Math.floor(Math.random() * 360);
    var startDist = 1000 + Math.floor(Math.random() * 2000);

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    var mass = radius*radius;

    var x = startDist * Math.cos(angle);
    var y = startDist * Math.sin(angle);
    var z = plusOrMinus * 300 * Math.random();

    var velMag = Math.sqrt((sun.mass+mass)/startDist);

    var velX = -velMag * Math.sin(angle);
    var velY = velMag * Math.cos(angle);

    return new Asteroid({pos: [x, y, z], vel: [velX, velY, 0], radius: radius, mass: mass});
  };
})(this);