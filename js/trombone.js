var trombMain = function(game){
	prev_reading = 0;
	MIN_DIF = 2.25;
};

trombMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#0f5420';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
    	trombImg = game.add.image(200, 100, 'tromboneImg');
    	
        angleText2 = game.add.text(250, 50, "Play it!", {font: '32px', fill: 'white'});
        
		trombSound.onStop.add(function(){
			game.stage.backgroundColor = '#0f5420';
			trombImg.tint = 0xffffff;
		});

		try{navigator.accelerometer.watchAcceleration(readTrombAccel, onError, { frequency: 1 });} catch(e){}	
    }
};

function readTrombAccel(acceleration){
	if (game.state.getCurrentState().key == "Trombone"){
		angleText2.text = roundIt(acceleration.y);
		
		if (Math.abs(acceleration.y - prev_reading) > MIN_DIF && !trombSound.isPlaying){
			trombSound.play();
			
			game.stage.backgroundColor = '#0245f0';
			trombImg.tint = 0x00ffff;
		}
		prev_reading = acceleration.y;
	}
}