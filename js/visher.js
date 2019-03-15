var visherMain = function(game){
	resetSounds = true;
	visherAccelX = 0;
	
	GO_NUM = 6.5;
};

visherMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#ff4502';
    	
    	game.add.image(350, 25, 'arrowsImg');
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        angleText = game.add.text(250, 50, "Vish it!", {font: '32px', fill: 'white'});

    	try{navigator.accelerometer.watchAcceleration(readVisherAccel, onError, { frequency: 1 });} catch(e){}
    }
};

function readVisherAccel(acceleration){
	if (game.state.getCurrentState().key == "Visher"){
		visherAccelX = roundIt(acceleration.x);
		
		angleText.text = visherAccelX;
		
		if (resetSounds){
			if (visherAccelX < -GO_NUM && !sound1.isPlaying && !sound2.isPlaying){
				sound2.play();
				flashVisher('#ff00ff');
			}
			else if (visherAccelX > GO_NUM && !sound1.isPlaying && !sound2.isPlaying){
				sound1.play();
				flashVisher('#f0ff0f');
			}
		}
		
		else{
			if (visherAccelX < (GO_NUM / 3) && visherAccelX > -(GO_NUM / 3)){
				resetSounds = true;
				game.stage.backgroundColor = '#000000';
			}
		}
	}
}

function flashVisher(_color){
	window.plugins.flashlight.switchOn();
	navigator.vibrate(100);
	game.stage.backgroundColor = _color;
	
	resetSounds = false;
	
	setTimeout(function(){
		window.plugins.flashlight.switchOff();
	}, 100);	
}
