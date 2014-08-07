Function.prototype.inherits = function (parentClass) {
  function Surrogate() {}
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
};
