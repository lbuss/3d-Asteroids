Function.prototype.inherits = function (parentClass) {
  function Surrogate() {}
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
};

function toScreenXY( position, camera, div) {
  var pos = position.clone();
  projScreenMat = new THREE.Matrix4();
  projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
  pos.applyProjection(projScreenMat);
  return [( pos.x + 1 ) * div.width() / 2, ( - pos.y + 1) * div.height() / 2 ]
};

var panArray = function(p1, p2){
  var d1 = (p2['x'] - p1['x'])/32;
  var d2 = (p2['y'] - p1['y'])/32;
  var d3 = (p2['z'] - p1['z'])/32;
  var array =[];
  for(i = 0; i<5 ;i++){
    array.push(
      new THREE.Vector3(
      p1['x'] + d1 * Math.pow(2, i),
      p1['y'] + d2 * Math.pow(2, i),
      p1['z'] + d3 * Math.pow(2, i))
    )
  }
  for(i = 3; i>-1 ;i--){
    array.push(
      new THREE.Vector3(
      p1['x'] + d1 * Math.pow(2, 5) - d1 * Math.pow(2, i),
      p1['y'] + d2 * Math.pow(2, 5) - d2 * Math.pow(2, i),
      p1['z'] + d3 * Math.pow(2, 5) - d3 * Math.pow(2, i))
    )
  }
  return array;
}

var headingVec = function(heading){
  var x = Math.cos(heading/180 * Math.PI) * 10;
  var y = Math.sin(heading/180 * Math.PI) * 10;
  return [x,y];
};

var pointDistance = function(p1, p2){
  var d1 = p1[0]-p2[0];
  var d2 = p1[1]-p2[1];
  var d3 = p1[2]-p2[2];
  return Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2) + Math.pow(d3, 2));
};

var pointDistanceHash = function(p1, p2){
  var d1 = p1['x']-p2['x'];
  var d2 = p1['y']-p2['y'];
  var d3 = p1['z']-p2['z'];
  return Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2) + Math.pow(d3, 2));
};

var gravityVector = function(obj, obj2) {
  var pos1 = [obj.object.position.x, obj.object.position.z, obj.object.position.y];
  var pos2 = [obj2.object.position.x, obj2.object.position.z, obj2.object.position.y];
  var dist = pointDistance(pos1, pos2);
//divide by magic scaling factor since gravity is applied every frame rather //than seconds. Also not true gravity, this scaling is much easier to create a //stable system with
  var mag = (obj.mass * obj2.mass)/ (dist*dist);
  var unitVec = [ Math.floor(pos1[0]-pos2[0])/dist, Math.floor(pos1[1]-pos2[1])/dist, Math.floor(pos1[2]-pos2[2])/dist ];
  
  return [-unitVec[0]*mag, -unitVec[1]*mag, -unitVec[2]*mag];
};

function openInNewTab(url) {
  // var win = window.open(url, '_blank');
  // win.focus();
};