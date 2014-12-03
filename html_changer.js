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
	  var par = document.createElement('p');
	  var button = document.createElement('button');
	  $(div).attr('id', 'description');
	  $(div2).addClass('infoWrap');
	  $(par).html(object.description);
	  $(par).append("<br><br>");
	  $(par).append("<a href="+object.link+" target='_blank' class='clean' id="+object.divName+"1>Launch</a>");
	  $(div2).html(par);
	  $(div).html(div2);
	  $('body').append(div);
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
		$('#linkList').append("<button type='button' class='clean' id="+object.divName+">"+object.text+"</button><br>");
	};

	// htmlChanger.prototype.highlightLink = function(object){
	// 	$('#'+object.divName).addClass("highlighted");
	// };

	// htmlChanger.prototype.unhighlightLink = function(object){
	// 	$('#'+object.divName).removeClass("highlighted");
	// };

	htmlChanger.prototype.shipView = function(){
		$('#spaceView').hide();
		$('#hud').show();
	};

	htmlChanger.prototype.spaceView = function(){
		$('#spaceView').show();
		$('#hud').hide();
	};

	htmlChanger.prototype.updateCount = function(number){
		$('#countWrap').html(" Asteroids destroyed: " + number + " ");
	}

 })(this);