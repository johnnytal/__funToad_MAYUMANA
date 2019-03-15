var visherMain = function(game){
	resetSounds = true;
	visherAccelX = 0;
	
	GO_NUM = 7.5;
	
	enough_time = false;
};

visherMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#ff4502';
    	
    	game.add.image(350, 25, 'arrowsImg');
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        angleText = game.add.text(250, 50, "Vish it!", {font: '32px', fill: 'white'});

    	try{navigator.accelerometer.watchAcceleration(readVisherAccel, onError, { frequency: 2 });} catch(e){}
    }
};

function readVisherAccel(acceleration){
	if (game.state.getCurrentState().key == "Visher"){
		visherAccelX = Math.round(acceleration.x);
		
		angleText.text = visherAccelX;
		
		if (resetSounds && enough_time){
			if (visherAccelX < -7.5 && !sound1.isPlaying && !sound2.isPlaying){
				resetSounds = false;
				sound2.play();
				window.plugins.flashlight.switchOn();
				
				setTimeout(function(){
					window.plugins.flashlight.switchOff();
				}, 100);
				
				game.stage.backgroundColor = '#ff00ff';
				navigator.vibrate(100);
				
				setTimeout(function(){
					enough_time = true;
				}, 500);
			}
			else if (visherAccelX > 7.5 && !sound1.isPlaying && !sound2.isPlaying){
				resetSounds = false;
				sound1.play();
				window.plugins.flashlight.switchOn();
				
				setTimeout(function(){
					window.plugins.flashlight.switchOff();
				}, 100);
				
				game.stage.backgroundColor = '#f0ff0f';
				navigator.vibrate(100);
				
				setTimeout(function(){
					enough_time = true;
				}, 500);
			}
		}
		
		if (visherAccelX < 2 && visherAccelX > -2 && !resetSounds){
			resetSounds = true;
			game.stage.backgroundColor = '#000000';
		}
	}
}