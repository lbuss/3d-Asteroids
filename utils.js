function toScreenXY( position, camera, div) {
  var pos = position.clone();
  projScreenMat = new THREE.Matrix4();
  projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
  pos.applyProjection(projScreenMat);
  return [( pos.x + 1 ) * div.width() / 2, ( - pos.y + 1) * div.height() / 2 ]
};

var headingVec = function(heading){
  var x = Math.cos(heading/180 * Math.PI) * 10;
  var y = Math.sin(heading/180 * Math.PI) * 10;
  return [x,y];
};

var pointDistance = function(p1, p2){
  return Math.sqrt(Math.pow(p1[0]-p2[0], 2) + Math.pow(p1[1]-p2[1], 2) + Math.pow(p1[2]-p2[2], 2));
};

var gravityVector = function(obj, obj2) {
  var pos1 = [obj.object.position.x, obj.object.position.z, obj.object.position.y];
  var pos2 = [obj2.object.position.x, obj2.object.position.z, obj2.object.position.y];
  var dist = pointDistance(pos1, pos2);
//divide by magic scaling factor since gravity is applied every frame rather //than seconds
  var mag = (obj.mass * obj2.mass)/ Math.pow(dist, 2)/100;
  var unitVec = [ Math.floor(pos1[0]-pos2[0])/dist, Math.floor(pos1[1]-pos2[1])/dist, Math.floor(pos1[2]-pos2[2])/dist ];
  
  return [unitVec[0]*mag, unitVec[1]*mag, unitVec[2]*mag];
}