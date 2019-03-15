var trombMain = function(game){
	accelY = 0;
	resetSounds = true;
	prev_reading = 0;
	
	MIN_DIF = 1.75;
};

trombMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#0f5420';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        angleText = game.add.text(250, 50, "Play it!", {font: '32px', fill: 'white'});

		initPlugIns();
		loadSounds();
    }
};

function readAccel(acceleration){
	accelY = Math.round(acceleration.y * 10) / 10;
	
	angleText.text = accelY;
	
	if (Math.abs(accelY - prev_reading) > MIN_DIF && !sound1.isPlaying){
		sound1.play();
	}

	prev_reading = accelY;
}

function initPlugIns(){
	navigator.accelerometer.watchAcceleration(readAccel, onError, { frequency: 5 });

    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // max media volume
}

function loadSounds(){
	sound1 = game.add.audio('trombone', 1, false);
}

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}

function onError() {
    alert('Sorry, No acceleration reading detected!');
};