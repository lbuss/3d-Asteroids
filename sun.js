(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Sun = Asteroids.Sun = function(options) {

    this.start = Date.now();
    var radius = 400;
    var options = {};

    // var imgTexture = THREE.ImageUtils.loadTexture( "http://codelab.nfshost.com/asteroids_super_3d/sun.jpg" );
    // imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
    // imgTexture.anisotropy = 16;

    // var shininess = 10, specular = 0x333333, bumpScale = 1, shading = THREE.SmoothShading;
    // options.material = new THREE.MeshPhongMaterial( { map: imgTexture, bumpMap: imgTexture, bumpScale: bumpScale, ambient: 0x101000, specular: specular, shininess: shininess, shading: shading, emissive: 0xFFFF99 });
    // options.geometry = new THREE.SphereGeometry( radius, 32, 16 );

    // var material = new THREE.MeshLambertMaterial( { color: '#FFCC33', emissive: 0xCCFF66 } );

    // this.object = new Asteroids.MovingObject({pos:[0,0,0], vel:[0,0,0], geometry: options.geometry, material: options.material, radius: radius});
    this.radius = radius;
    this.mass = radius * radius;
    this.className = "sun";
    this.timer = 0;

    options.radius = radius;
    options.vel = [0,0,0];
    options.pos = [0,0,0];
    
    options.material = new THREE.ShaderMaterial( {
        uniforms: { 
            // tExplosion: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( 'explosion.png' ) },
            time: { type: "f", value: 0.0 },
            weight: { type: "f", value: 50.0 }
        },
        vertexShader: document.getElementById( 'sunVertexShader' ).textContent,
        fragmentShader: document.getElementById( 'sunFragmentShader' ).textContent
        
    } );
    
    options.geometry = new THREE.IcosahedronGeometry( 400, 4 );

    Asteroids.MovingObject.call(this, options);




    var vShader = $('#glowVertexShader');
    var fShader = $('#glowFragmentShader');

    var glowAttributes = {
        displacement: {
            type: 'f', // a float
            value: [] // an empty array
        }
    };
    
    var glowUniforms = { 
            "c":   { type: "f", value: .2 },
            "p":   { type: "f", value: 3 },
            glowColor: { type: "c", value: new THREE.Color(0xffdd00) },
            viewVector: { type: "v3", value: window.g.camera.position },
            // amplitude: {
            //     type: 'f',
            //     value: 1
            // }
    };

    var glowMaterial = new THREE.ShaderMaterial({
        uniforms: glowUniforms,
        attributes: glowAttributes,
        vertexShader:   vShader.text(),
        fragmentShader: fShader.text(),
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    // var vertices = options.geometry.vertices;
    // var values = attributes.displacement.value;
    // for(var v = 0; v < vertices.length; v++) {
    //     if (Math.random()  < (.1 + Math.sin(2* Math.PI * v/vertices.length)/2)){
    //         values.push(50 + Math.random() * 100);
    //     } else{
    //         values.push(0);
    //     }
    // }
    // var glowGeometry = new THREE.SphereGeometry( radius, 64, 32 );

    this.glow = new THREE.Mesh( options.geometry.clone(), glowMaterial );

    this.glow.position = this.object.position;
    // this.glow.material.attributes.displacement.needsUpdate = true;
    this.glow.scale.multiplyScalar(1.2);
    this.glow.container = this;

  };
  
  Sun.inherits(Asteroids.MovingObject);

  Sun.prototype.update = function(){
    this.object.material.uniforms[ 'time' ].value = .00005 * ( Date.now() - this.start );
    // debugger;
    // this.uniforms.amplitude.value = 2 + 1 * Math.sin(this.timer);
 
    // // debugger;
    // this.timer += 0.5;
    // if (this.timer > 2*Math.PI){
    //     this.timer = 0;
    // }
    // set up the next call
  }
  

})(this);