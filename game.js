(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function () {

    this.scene = new THREE.Scene();
    this.mouse = new THREE.Vector2();
    this.intersects = [];
    this.animId = null;
    
    this.projector = new THREE.Projector();
    this.raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.sortObjects = false;
    
    $('#container').append(this.renderer.domElement);

    this.asteroids = [];
    this.enemies = [];
    this.bullets = [];
    this.hits = 0;
    
    this.view = 0;
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.set(-700, 700, 700);

    controls = new THREE.OrbitControls( this.camera );
    var game = this;
   
    // document.addEventListener( 'mousemove', this.onDocumentMouseMove, false);
    document.addEventListener( 'mousedown', this.onDocumentMouseDown, false);
    // window.addEventListener( 'resize', this.onWindowResize, false );
    $('#description').remove();
  };
  
  Game.prototype.start = function() {
    this.createSolarSystem();
    this.createPlanets();
    this.createShip();
    this.bindKeyHandlers();
    this.animate();
  };
  
  Game.prototype.createShip = function(){ 
    var object = this.addAsteroid();
    
    this.ship = new Asteroids.Ship({pos: [700, 0, 0], vel: [0, 5, 0]});
    this.ship.text = 'Super 3d asteroids';
    this.ship.description = 'Take on the asteroids!';
    this.ship.divName = 'ship';
    
    var game = this;
    $('#linksWrap').append("<br><a href='' id='ship'>"+this.ship.text+"</a><br>");
    $('#ship').hover(function(){game.mark(game.ship); game.createInfo(game.ship)}, function(){game.unmark(game.ship)});
    
    this.scene.add( this.ship.object );
    
    
    //     this.camera.position.set(this.ship.object.position.x, 0, this.ship.object.position.z);
    //     this.camera.rotation.y = this.ship.object.rotation.y-Math.PI/2;
  }
  
  Game.prototype.createPlanets = function(){  
    var linkUrl = ["http://packoverflow.herokuapp.com"];
    var linkName = ["packoverflow", "asteroids", "trelloclone", "ChatApp", "Resume"];
    var descriptions = ["PackOverflow is a loose clone of StackOverflow, built on Rails and Backbone. It demonstrates various aspects of database management and dynamic pages",
    "Asteroids is a javascript/html5 game utilizing asynchronous event handling",
    "TrelloClone is a Rails/Backbone app heavily utilizing the Twitter Bootstrap framework and the JQuery sortable feature",
    "ChatApp is a simple javascript chat client handled by server-side PHP",
    "It's my resume"
    ];   

    var game = this;
    for ( var i = 0; i < linkName.length; i ++ ) {
      (function(){
        var object = game.addAsteroid();
        
        object.text = linkName[i];
        object.link = linkUrl[0];
        object.description = descriptions[i];
        object.divName = 'link'+i;
        
        $('#linksWrap').append("<br><a href="+object.link+" target='_blank' id="+object.divName+">"+object.text+"</a><br>");
        $("#"+object.divName).hover(function(){game.mark(object); game.createInfo(object)}, function(){game.unmark(object)});
        
        game.scene.add( object.object );
        game.asteroids.push(object);
      })();
    }
  }
  
  Game.prototype.createSolarSystem = function() {
    this.scene.add( new THREE.AmbientLight( 0x101000  ) );

    light = new THREE.PointLight( 0xffffff, 2, 0);
    this.scene.add( light );
    
    this.sun = new Asteroids.Asteroid({pos:[0,0,0], vel:[0,0,0] , radius: 100, color: '#FFCC33', emissive: 0xCCFF66 });
    
    this.scene.add(this.sun.object);
  }
  
  Game.prototype.animate = function() {
    this.checkCollisions();
    this.move();
    if(!this.stopAnimating){
      this.animId = requestAnimationFrame( this.animate.bind(this) );
    }else{
      cancelAnimationFrame( this.animId );
    }
    this.render();
    this.ship.navigate();
  }
  
  Game.prototype.render = function() {
    if (this.view === 0){
      this.updateCamera();
    }else{
      this.updateCamera2();
    }
      
  }
  
  Game.prototype.updateCamera2 = function(){
       this.camera.position.set(this.ship.object.position.x, 10, this.ship.object.position.z);
       this.camera.rotation.y = this.ship.object.rotation.y- Math.PI/2;
       this.camera.rotation.x = this.ship.object.rotation.x;
       this.camera.rotation.z = this.ship.object.rotation.z- Math.PI/2;
       
       this.renderer.render( this.scene, this.camera);
     }
  
    Game.prototype.updateCamera = function(){
      this.camera.lookAt( this.scene.position );
      this.renderer.render( this.scene, this.camera);
    }

    Game.prototype.addAsteroid = function(){
      var rad = 5 + 20 * Math.random();
      var ast = Asteroids.Asteroid.prototype.randomAsteroid(this.DIM_X, this.DIM_Y, rad);
      this.asteroids.push(ast);
      this.scene.add(ast.object);
      return ast;
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
          var velZ = asteroid.vel[2] * Math.random()-.5;
          babies.push(new Asteroids.Asteroid({pos:[asteroid.object.position.x, asteroid.object.position.z, asteroid.object.position.y], vel: [velX, velY, velZ], radius: asteroid.object.radius/(Math.random()+1.5)}));
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

      
      key('a', function() {
        game.asteroidTimer = window.setInterval(function() {
          if (game.asteroids.length < 30) {
            game.addAsteroids(1);
          }
        }, 400);
      });
      
      key('f', function() {
        switch(game.view){
          case 0: game.view = 1; $('.infoWrap').hide(); break;
          
          case 1: game.view = 0; $('.infoWrap').show(); game.camera.position.set(-700, 700, 700); break;
        }
      });

    };
  
    Game.prototype.move = function() {
      var game = this;
      this.asteroids.forEach(function(asteroid) {
        asteroid.move(gravityVector(asteroid, game.sun));
      });
      this.ship.move(gravityVector(this.ship, this.sun));
      this.bullets.forEach(function(bullet) {
        bullet.move();
      });
    };
  
    Game.prototype.checkCollisions = function() {
      var game = this;
      var destroyBullets = [];
      var destroyAsteroids = [];
    
      this.asteroids.forEach(function(asteroid) {
        if(game.ship.bounced > 0){
          game.ship.bounced -= 1;
        }

        if (asteroid.isCollidedWith(game.ship)) {
          if(game.ship.bounced === 0){
            game.ship.shipDie(asteroid.vel);
            // game.gameOver();
          }
        }

        game.bullets.forEach(function(bullet) {
          if (bullet.isCollidedWith(asteroid)) {
            destroyBullets.push(bullet);
            destroyAsteroids.push(asteroid);
          } 
        });

      });

      this.bullets.forEach( function(bullet) {
        if (bullet.lifespan <= 0) {
          destroyBullets.push(bullet);
          game.scene.remove(bullet.object);
        }
      });
      destroyBullets.forEach(function(bullet) {
        var index = game.bullets.indexOf(bullet);
        game.scene.remove(bullet.object);
        if (index !== -1) {
          game.bullets.splice(index, 1);
        }
      });

      destroyAsteroids.forEach(function(asteroid) {
        var index = game.asteroids.indexOf(asteroid);
        var newAsteroids = game.spawnBabies(asteroid);
        game.hits += 1;
        game.asteroids = game.asteroids.concat(newAsteroids);
        newAsteroids.forEach(function(ast) {
          game.scene.add(ast.object);
        })
        game.scene.remove(asteroid.object);
        game.asteroids.splice(index, 1);
      });
    };
  
    Game.prototype.createInfo = function(object) {
      $('#description').remove();
      var div = document.createElement('div');
      var div2 = document.createElement('div');
      $(div).attr('id', 'description');
      $(div2).addClass('infoWrap');
      $(div2).html(object.description);
      $(div).html(div2);
      $('body').append(div);
      var pos = toScreenXY( object.position, camera, $('body'));
      $(div).css({
        top: pos[1],
        left: pos[0] + 10
      })
    }
    
    Game.prototype.mark = function(object){
      if (object.object.material.emissive !== 0xff0000){
        object.currentHex = object.object.material.emissive.getHex();
      }
      object.object.material.emissive.setHex( 0xff0000 );
      this.stopAnimating = true;
    } 

    Game.prototype.unmark = function(object){
      object.object.material.emissive.setHex( object.currentHex );
      $('#description').remove();
      this.stopAnimating = false;
      this.animate();
    }
  
    Game.prototype.onWindowResize = function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.composer.reset();
    }

    Game.prototype.onDocumentMouseMove = function( event ) {
      event.preventDefault();
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
        
    Game.prototype.onDocumentMouseDown = function( event ) {
      event.preventDefault();   
      if(this.INTERSECTED){
        openInNewTab(this.INTERSECTED.link);
      }
    }
    
    Game.prototype.createInfo = function (object) {
      $('#description').remove();
      var div = document.createElement('div');
      var div2 = document.createElement('div');
      $(div).attr('id', 'description');
      $(div2).addClass('infoWrap');
      $(div2).html(object.description);
      $(div).html(div2);
      $('body').append(div);
      var pos = toScreenXY( object.object.position, this.camera, $('body'));
      $(div).css({
        top: pos[1],
        left: pos[0] + 20
      })
    }
    
    Game.prototype.checkIntersects = function(){
      var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
      projector.unprojectVector( vector, camera );
      raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
      var intersects = raycaster.intersectObjects( scene.children );
      return intersects;
    }
  
    Game.prototype.intersectBehaviour= function(intersects){
  
      if ( intersects.length > 0 ) {        
    
        if ( INTERSECTED != intersects[ 0 ].object ) {
          $("a").removeClass("highlighted");
          $('#description').remove();
      
          if ( INTERSECTED ) 
          INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
          INTERSECTED = intersects[ 0 ].object;
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED.material.emissive.setHex( 0xff0000 );
          $("#"+INTERSECTED.divName).addClass("highlighted");
          createInfo(INTERSECTED);
        }
      } else {
    
        if ( INTERSECTED ) 
        INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        $("a").removeClass("highlighted");
        INTERSECTED = null;

      }
    }
  })(this);