var visherMain = function(game){
	visherAccelX = 0;
	resetSounds = true;
	GO_NUM = 6.7;
};

visherMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#ff4502';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        angleText = game.add.text(250, 50, "Vish it!", {font: '32px', fill: 'white'});
    }
};

function readAccel(acceleration){
	visherAccelX = Math.round(acceleration.x);
	
	angleText.text = visherAccelX;
	
	if (visherAccelX < -(GO_NUM) && !sound2.isPlaying && resetSounds){
		resetSounds = false;
		sound2.play();
		window.plugins.flashlight.switchOn();
		
		setTimeout(function(){
			window.plugins.flashlight.switchOff();
		}, 200);
		
		game.stage.backgroundColor = '#ff00ff';
		navigator.vibrate(200);
	}
	else if (visherAccelX > GO_NUM && !sound1.isPlaying && resetSounds){
		resetSounds = false;
		sound1.play();
		window.plugins.flashlight.switchOn();
		
		setTimeout(function(){
			window.plugins.flashlight.switchOff();
		}, 200);
		
		game.stage.backgroundColor = '#f0ff0f';
		navigator.vibrate(200);
	}
	
	else if (visherAccelX < Math.floor(GO_NUM / 2) && visherAccelX > -(Math.floor(GO_NUM / 2))){
		resetSounds = true;
		game.stage.backgroundColor = '#000000';
	}
}