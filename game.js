(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function () {

    this.mouse = new THREE.Vector2();
    this.animId = null;
    this.paused = false;
    
    this.projector = new THREE.Projector();
    this.raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.sortObjects = false;
    
    $('#container').append(this.renderer.domElement);

    this.htmlChanger = new Asteroids.htmlChanger;

    this.asteroids = [];
    this.enemies = [];
    this.bullets = [];
    this.explosions = [];
    this.intersected = null;
    this.hits = 0;
    
    var width = window.innerWidth;
    var height = window.innerHeight;

    this.view = 0;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 70, width / height, 1, 60000 );
    this.camera.position.set(-1600, 1600, 1600);
    this.focusPoints = [this.scene.position];
    this.camera.lookAt(this.scene.position);

    controls = new THREE.OrbitControls( this.camera );
    var game = this;
   
    document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false);
    document.addEventListener( 'mousedown', this.onDocumentMouseDown.bind(this), false);
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
    
    this.ship = new Asteroids.Ship({pos: [2000, 0, 0], vel: [0, 0, 0]});
    this.ship.text = 'Reset Page';
    this.ship.description = 'Take on the asteroids! Read controls at top of screen';
    this.ship.divName = 'ship';
    
    var game = this;
    
    $('#ship').hover(function(){game.linkHover(game.ship)}, function(){game.linkUnhover(game.ship)});
    this.htmlChanger.appendLink(this.ship);

    this.scene.add( this.ship.object );
    
    
    //     this.camera.position.set(this.ship.object.position.x, 0, this.ship.object.position.z);
    //     this.camera.rotation.y = this.ship.object.rotation.y-Math.PI/2;
  }
  
  Game.prototype.createPlanets = function(){  
    var linkUrl = ["http://packoverflow.herokuapp.com",
                   "/asteroids/index.html",
                   "/asteroids_3d/index.html",
                   "/old_stuff/chatScript.html",
                   "https://docs.google.com/document/d/1ZCjbCzfN1mTdS_MAjaZOTTTyvWiMpByEbV54VDybdNg/pub"];
    var linkName = ["packoverflow",
                    "asteroids",
                    "3d asteroids",
                    "PHP ChatApp", 
                    "Resume"];
    var descriptions = ["PackOverflow is a loose clone of StackOverflow, built on Rails and Backbone. It demonstrates various aspects of database management and dynamic pages",
    "Asteroids is a javascript/html5 game utilizing asynchronous event handling",
    "Asteroids 3d technical demo, left is fps view, right is top down. Arrows and space to control.",
    "ChatApp is a simple javascript chat client handled by server-side PHP",
    "It's my resume"
    ];   

    var game = this;
    for ( var i = 0; i < linkName.length; i ++ ) {
      (function(){
        var object = game.addAsteroid();
        
        object.text = linkName[i];
        object.link = linkUrl[i];
        object.description = descriptions[i];
        object.divName = 'link'+i;
        

        game.htmlChanger.appendLink(object);
        $("#"+object.divName).hover(function(){game.linkHover(object)}, function(){game.linkUnhover(object)});
      })();
    }
  }

  Game.prototype.linkHover = function(object){
    var game = this;
    game.pause();
    game.focusOnObject(object);
    object.highLight();
    game.htmlChanger.createInfo(object);
    game.htmlChanger.highlightLink(object);
  }

  Game.prototype.linkUnhover = function(object){
    var game = this;
    object.unhighLight();
    game.focusOnObject(game.sun);
    game.htmlChanger.removeInfo();
    game.htmlChanger.unhighlightLink(object);
    game.unpause();
  }
  
  Game.prototype.createSolarSystem = function() {
    this.scene.add( new THREE.AmbientLight( 0x101000  ) );

    light = new THREE.PointLight( 0xffffff, 2, 0);
    this.scene.add( light );
    
    this.sun = new Asteroids.Asteroid({pos:[0,0,0], vel:[0,0,0] , radius: 400, color: '#FFCC33', emissive: 0xCCFF66 });
    
    this.scene.add(this.sun.object);
  }
  
  Game.prototype.animate = function() {
    if(this.paused === false){
      this.checkCollisions();
      this.removeDeadObjects();
      this.move();
      this.ship.navigate();
    }
    if(!this.stopAnimating){
      this.animId = requestAnimationFrame( this.animate.bind(this) );
    }else{
      cancelAnimationFrame( this.animId );
    }
    this.render();
  }
  
  Game.prototype.render = function() {
    if (this.view === 0){
      this.updateCamera();
    }else{
      this.updateCameraShip();
    }
  }
  
  Game.prototype.updateCameraShip = function(){
       this.camera.position.set(this.ship.object.position.x, 10, this.ship.object.position.z);
       this.camera.rotation.y = this.ship.object.rotation.y- Math.PI/2;
       this.camera.rotation.x = this.ship.object.rotation.x;
       this.camera.rotation.z = this.ship.object.rotation.z- Math.PI/2;
       
       this.renderer.render( this.scene, this.camera);
     }
  
    Game.prototype.updateCamera = function(){
      if(this.focusPoints.length > 0){
        this.camera.lookAt(this.focusPoints[this.focusPoints.length-1])
        if(this.focusPoints.length > 1){
          this.focusPoints.pop()
        }
      }

      this.renderer.render( this.scene, this.camera);
    }

    Game.prototype.addAsteroid = function(){
      var rad = 50 + 100 * Math.random();
      var ast = Asteroids.Asteroid.prototype.randomAsteroid(rad, this.sun);
      this.asteroids.push(ast);
      this.scene.add(ast.object);
      return ast;
    };

    Game.prototype.addExplosion = function(object, still, rad){
      var posX = object.object.position.x;
      var posY = object.object.position.y;
      var posZ = object.object.position.z;

      var radius = rad || object.object.radius;

      var options = {
        radius: radius,
        mass: object.object.mass,
        pos: [posX, posZ, posY]
      };

      if(still === true){
        options.vel = [0,0,0];
      }else{
        var velX = object.vel[0];
        var velY = object.vel[1];
        var velZ = object.vel[2];
        options.vel = [velX, velY, velZ];
      }

      var exp = new Asteroids.Explosion(options);
      this.explosions.push(exp);
      this.scene.add(exp.object);
      return exp;
    };

    Game.prototype.addBullet = function(){
      var bull = this.ship.fireBullet();
      this.bullets.push(bull);
      this.scene.add(bull.object);
    };
  
    Game.prototype.spawnBabies = function(asteroid) {
      //generates smaller asteroid fragments from a parent asteroid
      var babies = [];
      if (asteroid.radius < 12) {
        return babies;
      }else {
        var radius = 0;
        var ratio;
        for (var i = 0; i < 6; i++){
          radius = asteroid.object.radius/(Math.random()+1.5);
          ratio = asteroid.object.radius/radius;

          var velX = asteroid.vel[0] * (1 + Math.random()-.5);
          var velY = asteroid.vel[1] * (1 + Math.random()-.5);
          var velZ = asteroid.vel[2] * (1 + Math.random()-.5);

          var posX = asteroid.object.position.x + (asteroid.object.radius * Math.random()-.5);
          var posY = asteroid.object.position.y + (asteroid.object.radius * Math.random()-.5);
          var posZ = asteroid.object.position.z + (asteroid.object.radius * Math.random()-.5);

          babies.push(new Asteroids.Asteroid({pos:[posX, posZ, posY],
            vel: [velX, velY, velZ],
            radius: radius,
            emissive: asteroid.object.material.emissive.getHex()
          }));
        }
      }
      return babies;
    };  
  
    //BINDING
    Game.prototype.bindKeyHandlers = function() {
      var game = this;
  
      key('space', function(e) {
        e.preventDefault();
        game.addBullet();
      });

      
      key('a', function() {
        game.addAsteroid();
      });
      
      key('f', function() {
        switch(game.view){
          case 0: game.view = 1; $('.infoWrap').hide(); break;
          
          case 1: game.view = 0; $('.infoWrap').show(); game.camera.position.set(-1600, 1600, 1600); break;
        }
      });

    };
    
    //calls objects move methods with gravity or not.
    Game.prototype.move = function() {
      var game = this;
      this.asteroids.forEach(function(asteroid) {
        asteroid.move(gravityVector(asteroid, game.sun));
      });
      //add argument gravityVector(this.ship, this.sun) and change ship.move method to accept it to add ship gravity
      this.ship.move();
      this.bullets.forEach(function(bullet) {
        bullet.move();
      });
      this.explosions.forEach(function(explosion) {
        explosion.move();
      });

    };
  
    Game.prototype.checkCollisions = function() {
      var game = this;
    
      this.asteroids.forEach(function(asteroid) {
        
        //ship collisions disabled currently, may come back
        // if (asteroid.isCollidedWith(game.ship)) {
        //   if(game.ship.bounced === 0){
        //     game.ship.shipDie(asteroid.vel);
        //     // game.gameOver();
        //   }
        // }

        if (asteroid.isCollidedWith(game.sun)) {
            game.destroyAsteroid(asteroid);
            return;
        } 

        game.bullets.forEach(function(bullet) {
          if (bullet.isCollidedWith(game.sun)) {
            game.destroyBullet(bullet);
            game.addExplosion(bullet, true, bullet.object.radius*(1 + .5 * Math.random()));
            return;
          } 
          
          if (bullet.isCollidedWith(asteroid)) {
            game.destroyBullet(bullet);
            game.fragmentAsteroid(asteroid);
            game.addExplosion(bullet, true, bullet.object.radius*(1 + .5 * Math.random()));
          } 
        });
      });
    };

    Game.prototype.removeDeadObjects = function(){
      var game = this
      this.bullets.forEach( function(bullet) {
        if (bullet.lifespan <= 0) {
          game.destroyBullet(bullet);
        }
      });

      this.explosions.forEach( function(explosion) {
        if (explosion.lifespan <= 0) {
          game.scene.remove(explosion.object);
          var index = game.explosions.indexOf(explosion);
          if (index !== -1) {
            game.explosions.splice(index, 1);
          }
        }
      });
    };

    Game.prototype.destroyBullet = function(bullet){
      var index = this.bullets.indexOf(bullet);
      this.scene.remove(bullet.object);
      if (index !== -1) {
        this.bullets.splice(index, 1);
      }
    };

    Game.prototype.destroyAsteroid = function(asteroid){
      //handles absolute destruction of asteroids with no fragmenting
      var index = this.asteroids.indexOf(asteroid);
      this.asteroids.splice(index, 1);
      this.scene.remove(asteroid.object);
      this.addExplosion(asteroid, true);
    };
     
    Game.prototype.fragmentAsteroid = function(asteroid){
      //for when asteroids fragment upon death
      var game = this;
      var index = game.asteroids.indexOf(asteroid);
      var newAsteroids = game.spawnBabies(asteroid);
      game.hits += 1;
      game.asteroids = game.asteroids.concat(newAsteroids);
      newAsteroids.forEach(function(ast) {
        game.scene.add(ast.object);
      })
      game.asteroids.splice(index, 1);
      game.scene.remove(asteroid.object);
    };

    Game.prototype.pause = function(){
      this.paused = true;
    }

    Game.prototype.unpause = function(){
      this.paused = false;
    }

    Game.prototype.focusOnObject = function(object) {
      this.focusPoints = panArray(object.object.position, this.focusPoints[this.focusPoints.length-1]);
    }
  

    //ship collisions disabled
    // Game.prototype.gameOver = function() {
    //   key.unbind('space, up, left, right');
    // }

    // broken and low priority- not interesting
    // Game.prototype.onWindowResize = function() {
    //   this.camera.aspect = window.innerWidth / window.innerHeight;
    //   this.camera.updateProjectionMatrix();
    //   this.renderer.setSize( window.innerWidth, window.innerHeight );
    //   this.composer.reset();
    // }

    // mouse position in browser
    Game.prototype.onDocumentMouseMove = function( event ) {
      event.preventDefault();
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // this.intersectBehaviour(this.checkIntersects());
    }
    
    //check for clicks on canvas objects
    Game.prototype.onDocumentMouseDown = function( event ) {
      // event.preventDefault();
      var intersect = this.checkIntersects();   
      if(intersect){
        if (intersect.text){
          this.intersected = intersect
          this.linkHover(intersect);
        } else {
          if(intersect != this.sun && intersect != this.ship){
            this.fragmentAsteroid(intersect);
          }
        }
        // openInNewTab(this.INTERSECTED.link);
      } else {
        if(this.intersected){
          this.linkUnhover(this.intersected);
          this.unpause();
          this.focusOnObject(this.sun);
          this.intersected = null;
        }
      }
    }
    
    // casts a ray straight into screen from mouse position into screen and returns intersected objects
    Game.prototype.checkIntersects = function(){
      var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 1 );
      this.projector.unprojectVector( vector, this.camera );
      this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );
      var intersects = this.raycaster.intersectObjects( this.scene.children );
      if(intersects[0]){
        return intersects[0].object.container;
      }
    }

    // // does some stuff to intersected objects. Probably useless and definitely would need refactoring
    // Game.prototype.intersectBehaviour= function(intersects){
    //   if ( intersects.length > 0 ) {        
    //     if ( this.INTERSECTED != intersects[ 0 ].object ) {
    //       if ( this.INTERSECTED ){
    //         this.INTERSECTED.unmark();
    //         if(this.INTERSECTED.text){
    //           this.pause();
    //         }  
    //       } 
    //       this.INTERSECTED = intersects[ 0 ].object.container;
    //       this.mark(this.INTERSECTED)  
    //     }
    //   } else {
    //     // if ( this.INTERSECTED ) 
    //     // INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    //     // $("a").removeClass("highlighted");
    //     if (this.htmlChanger.showInfo){
          
    //     }else{
    //       this.unmark(this.INTERSECTED);
    //       this.INTERSECTED = null;
    //       this.unpause();
    //     }

    //   }
    // };

  })(this);