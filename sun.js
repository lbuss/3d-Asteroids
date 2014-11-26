(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  
  var Sun = Asteroids.Sun = function(options) {

    var radius = 400;
    var options = {};

    var imgTexture = THREE.ImageUtils.loadTexture( "sun.jpg" );
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
    imgTexture.anisotropy = 16;

    var shininess = 10, specular = 0x333333, bumpScale = 1, shading = THREE.SmoothShading;

    options.material = new THREE.MeshPhongMaterial( { map: imgTexture, bumpMap: imgTexture, bumpScale: bumpScale, ambient: 0x101000, specular: specular, shininess: shininess, shading: shading, emissive: 0xFFFF99 });
    options.geometry = new THREE.SphereGeometry( radius, 32, 16 );
    // var material = new THREE.MeshLambertMaterial( { color: '#FFCC33', emissive: 0xCCFF66 } );

    // this.object = new Asteroids.MovingObject({pos:[0,0,0], vel:[0,0,0], geometry: options.geometry, material: options.material, radius: radius});
    this.radius = radius;
    this.mass = radius * radius;

    options.radius = radius;
    options.vel = [0,0,0];
    options.pos = [0,0,0];

    Asteroids.MovingObject.call(this, options);

    var vShader = $('#vertexShader');
    var fShader = $('#fragmentShader');

    var attributes = {
        displacement: {
            type: 'f', // a float
            value: [] // an empty array
        }
    };
    

    // var uniforms = {
    //     amplitude: {
    //         type: 'f', // a float
    //         value: 0
    //     }
    // };
    var uniforms = { 
            "c":   { type: "f", value: .2 },
            "p":   { type: "f", value: 3 },
            glowColor: { type: "c", value: new THREE.Color(0xffff00) },
            viewVector: { type: "v3", value: window.g.camera.position }
    };

    var customMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader:   vShader.text(),
        fragmentShader: fShader.text(),
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
        
    this.glow = new THREE.Mesh( options.geometry.clone(), customMaterial );
    this.glow.position = this.object.position;
    this.glow.scale.multiplyScalar(1.2);
  };
  
  Sun.inherits(Asteroids.MovingObject);
  

})(this);