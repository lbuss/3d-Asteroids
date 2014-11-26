(function(root){
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var htmlChanger = Asteroids.htmlChanger = function(options) {
  	this.showInfo = false;
  };

  htmlChanger.prototype.createInfo = function (object) {
	  // Display info for given object
	  $('#description').remove();
	  var div = document.createElement('div');
	  var div2 = document.createElement('div');
	  $(div).attr('id', 'description');
	  $(div2).addClass('infoWrap');
	  $(div2).html(object.description);
	  $(div).html(div2);
	  $('body').append(div);
	  //code for placing info using positions of three.js objects-current version centers camera focus on object instead.
	  // var pos = toScreenXY( object.object.position, this.camera, $('body'));
	  $(div).css({
	    top:  window.innerHeight/2,
	    left: window.innerWidth/2 + 40
	  });
	  this.showInfo = true;
	};

	htmlChanger.prototype.removeInfo = function(){
		$('#description').remove();
		this.showInfo = false;
	};

	htmlChanger.prototype.appendLink = function(object){
		$('#linksWrap').append("<br><a href="+object.link+" target='_blank' id="+object.divName+">"+object.text+"</a><br>");
	};

	htmlChanger.prototype.highlightLink = function(object){
		$('#'+object.divName).addClass("highlighted");
	};

	htmlChanger.prototype.unhighlightLink = function(object){
		$('#'+object.divName).removeClass("highlighted");
	};

	htmlChanger.prototype.shipView = function(){
		$('#spaceView').hide();
		$('#hud').show();
	};

	htmlChanger.prototype.spaceView = function(){
		$('#spaceView').show();
		$('#hud').hide();
	};

	htmlChanger.prototype.updateCount = function(number){
		$('#countWrap').html("asteroids destroyed: " + number);
	}

 })(this);