function toScreenXY( position, camera, div) {
  var pos = position.clone();
  projScreenMat = new THREE.Matrix4();
  projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
  // pos.applyMatrix4(projScreenMat);
  pos.applyProjection(projScreenMat);
  // projScreenMat.multiplyVector3( pos );
  // var offset = findOffset(div);
  return [( pos.x + 1 ) * div.width() / 2, ( - pos.y + 1) * div.height() / 2 ]
  // return [ (pos.x+1) * 400-100, (1-pos.y) * 300];
}