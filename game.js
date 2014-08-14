(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function () {
    this.DIM_X = 1200;
    this.DIM_Y = 600;
    this.boundX = this.DIM_X/2*.8;
    this.boundY = this.DIM_Y*.8;
    this.scene = new THREE.Scene();

var light = new THREE.DirectionalLight( 0xffffff, .5 );
    light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( light );
//
//     var light = new THREE.DirectionalLight( 0xffffff );
//     light.position.set( -1, -1, -1 ).normalize();
//     this.scene.add( light );
    
    this.projector = new THREE.Projector();
    raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer();
    
    this.renderer.setSize( this.DIM_X, this.DIM_Y );
    this.renderer.sortObjects = false;
    
    $('#container').append(this.renderer.domElement);

    this.asteroids = [];
    this.enemies = [];
    this.bullets = [];
    this.hits = 0;

// this.ship = new Asteroids.Ship([0, 0], [0, 0]);
//     this.scene.add( this.ship.object );
//
//     this.camera = new THREE.PerspectiveCamera( 70, this.DIM_X/2/this.DIM_Y, 1, 10000 );
//     this.camera.position.set(this.ship.object.position.x, 0, this.ship.object.position.z);
//     this.camera.rotation.y = this.ship.object.rotation.y-Math.PI/2;
    
    this.camera2 = new THREE.PerspectiveCamera( 70, this.DIM_X/2/this.DIM_Y, 1, 10000 );
    this.camera2.position.set(0, 700, 0);
    this.camera2.rotation.y = Math.PI/2;
    
    var game = this;
    // this.asteroidTimer = window.setInterval(function() {
//       if (game.asteroids.length < 30) {
//         game.addAsteroids(1);
//       }
//     }, 4000);
  };
  
  Game.prototype.start = function() {
    this.createSolarSystem();
    this.bindKeyHandlers();
    var game = this;
    this.animate();
    // this.timerId = window.setInterval(function() {game.step();}, game.FPS);
  };
  
  Game.prototype.createSolarSystem = function() {
    var light = new THREE.PointLight( 0xffffff, 1, 0 );
    light.position.set( 0, 0, 0 );
    this.scene.add( light );
    
    this.sun = new Asteroids.Asteroid([0,0,0], [0,0,0] , 100, '#FFCC33');
    this.scene.add(this.sun.object);
    
    this.addAsteroids(6);
  }
  
  Game.prototype.animate = function() {
    // this.checkCollisions();
    this.move();
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
    // this.ship.navigate();
  }
  
  Game.prototype.render = function() {
    // this.updateCamera();
    this.updateCamera2();
  }
  
  Game.prototype.updateCamera = function(){
		var left = 0;
		var bottom = 0;
		var width = 0.5;
		var height = 1;
			
    var left   = Math.floor( this.DIM_X  * left );
		var bottom = Math.floor( this.DIM_Y * bottom );
		var width  = Math.floor( this.DIM_X  * width );
		var height = Math.floor( this.DIM_Y * height );
      
    this.renderer.setViewport( left, bottom, width, height );
    this.renderer.setScissor( left, bottom, width, height );
    this.renderer.enableScissorTest ( true );
    this.camera.position.set(this.ship.object.position.x, 10, this.ship.object.position.z);
    this.camera.rotation.y = this.ship.object.rotation.y -Math.PI/2;
    
    this.renderer.render( this.scene, this.camera);
    // var theta += 0.1;
    // camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
    // camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    //             camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
    // camera.position.x += ( mouse.x - camera.position.x ) * 0.05;
    //             camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
    // this.camera.lookAt( this.scene.position );
  }
  
  Game.prototype.updateCamera2 = function(){
		var left = 0.5;
		var bottom = 0;
		var width = 0.5;
		var height = 1;
    
    var left   = Math.floor( this.DIM_X  * left );
		var bottom = Math.floor( this.DIM_Y * bottom );
		var width  = Math.floor( this.DIM_X  * width );
		var height = Math.floor( this.DIM_Y * height );
      
    this.renderer.setViewport( left, bottom, width, height );
    this.renderer.setScissor( left, bottom, width, height );
    this.renderer.enableScissorTest ( true );
    
    this.camera2.lookAt( this.scene.position );
    this.renderer.render( this.scene, this.camera2);
  }

  Game.prototype.addAsteroids = function(num){
    for(var i = 0; i < num; i++){
      var rad = 5 + 20 * Math.random();
      var ast = Asteroids.Asteroid.prototype.randomAsteroid(this.DIM_X, this.DIM_Y, rad);
      this.asteroids.push(ast);
      this.scene.add(ast.object);
    }
  };
  
  Game.prototype.gameOver = function() {
    key.unbind('space, up, left, right');
    // clearInterval(this.timerId);
  }
  
  Game.prototype.spawnBabies = function(asteroid) {
    
    var babies = [];
    if (asteroid.radius < 12) {
      return babies;
    }else {
      for (var i = 0; i < 3; i++){
        var velX = asteroid.vel[0] * Math.random()-.5;
        var velY = asteroid.vel[1] * Math.random()-.5;
        babies.push(new Asteroids.Asteroid([asteroid.object.position.x, asteroid.object.position.z], [velX, velY], asteroid.radius/(Math.random()+1.5)));
      }
    }
    return babies;
  };  
  
  //BINDING
  
  Game.prototype.bindKeyHandlers = function() {
    var game = this;
  
    key('space', function(e) { 
      e.preventDefault();
      var bull = game.ship.fireBullet();
      game.bullets.push(bull);
      game.scene.add(bull.object);
    });

//
//     key('a', function() {
//       game.asteroidTimer = window.setInterval(function() {
//         if (game.asteroids.length < 30) {
//           game.addAsteroids(1);
//         }
//       }, 400);
//
//     });

  };
  
  Game.prototype.move = function() {
    var game = this;
    this.asteroids.forEach(function(asteroid) {
      asteroid.move(gravityVector(asteroid, game.sun));
    });
    // this.ship.move(game.boundX, game.boundY);
    this.bullets.forEach(function(bullet) {
      bullet.move(game.gravityVector());
    });
  };
  
  Game.prototype.checkCollisions = function() {
    var gameInstance = this;
    var destroyBullets = [];
    var destroyAsteroids = [];
    
    this.asteroids.forEach(function(asteroid) {
      if(gameInstance.ship.bounced > 0){
        gameInstance.ship.bounced -= 1;
      }

      if (asteroid.isCollidedWith(gameInstance.ship)) {
        if(gameInstance.ship.bounced === 0){
          gameInstance.ship.shipDie(asteroid.vel);
          gameInstance.gameOver();
        }
      }

      gameInstance.bullets.forEach(function(bullet) {
        if (bullet.isCollidedWith(asteroid)) {
          destroyBullets.push(bullet);
          destroyAsteroids.push(asteroid);
        } 
      });

    });

    this.bullets.forEach( function(bullet) {
    if (bullet.lifespan <= 0) {
      destroyBullets.push(bullet);
      gameInstance.scene.remove(bullet.object);
      }
    });
    destroyBullets.forEach(function(bullet) {
      var index = gameInstance.bullets.indexOf(bullet);
      gameInstance.scene.remove(bullet.object);
      if (index !== -1) {
        gameInstance.bullets.splice(index, 1);
      }
    });

    destroyAsteroids.forEach(function(asteroid) {
      var index = gameInstance.asteroids.indexOf(asteroid);
      var newAsteroids = gameInstance.spawnBabies(asteroid);
      gameInstance.hits += 1;
      gameInstance.asteroids = gameInstance.asteroids.concat(newAsteroids);
      newAsteroids.forEach(function(ast) {
        gameInstance.scene.add(ast.object);
      })
      gameInstance.asteroids.splice(index, 1);
      gameInstance.scene.remove(asteroid.object);
      $(".scoreBox").html("Asteroids Destroyed: "+gameInstance.hits);
    });
  };
  
})(this);