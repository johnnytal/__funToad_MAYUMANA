var trombMain = function(game){
	accelY = 0;
	prev_reading = 0;
	
	MIN_DIF = 1.75;
};

trombMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#0f5420';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        angleText2 = game.add.text(250, 50, "Play it!", {font: '32px', fill: 'white'});

		try{navigator.accelerometer.watchAcceleration(readAccel, onError, { frequency: 2 });} catch(e){}
    }
};

function readAccel(acceleration){
	accelY = Math.round(acceleration.y * 10) / 10;
	
	angleText2.text = accelY;
	
	if (Math.abs(accelY - prev_reading) > MIN_DIF && !trombSound.isPlaying){
		trombSound.play();
	}

	prev_reading = accelY;
}

function onError(err) {
    alert('Error: ' + err);
};