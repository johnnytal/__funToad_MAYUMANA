var visherMain = function(game){
	resetSounds = true;
	visherAccelX = 0;
	
	GO_NUM = 7.5;
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
		
		if (visherAccelX < -(GO_NUM) && !sound2.isPlaying && resetSounds){
			resetSounds = false;
			sound2.play();
			window.plugins.flashlight.switchOn();
			
			setTimeout(function(){
				window.plugins.flashlight.switchOff();
			}, 150);
			
			game.stage.backgroundColor = '#ff00ff';
			navigator.vibrate(100);
		}
		else if (visherAccelX > GO_NUM && !sound1.isPlaying && resetSounds){
			resetSounds = false;
			sound1.play();
			window.plugins.flashlight.switchOn();
			
			setTimeout(function(){
				window.plugins.flashlight.switchOff();
			}, 150);
			
			game.stage.backgroundColor = '#f0ff0f';
			navigator.vibrate(100);
		}
		
		else if (visherAccelX < Math.floor(GO_NUM / 3) && visherAccelX > -(Math.floor(GO_NUM / 3))){
			setTimeout(function(){
				resetSounds = true;
				game.stage.backgroundColor = '#000000';
			}, 250);
		}
		

	}
}