var shakerMain = function(game){
	GENTLE_COLOR = '#c1ad65';
	BACK_COLOR = '#656d7c';

	gamma = 0;
	accelX = 0;

	accelFactor = 57;
	gammaFactor = 730;
	ballFactor = 969;

	resetTouching = true;
};

shakerMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#ffffff';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        circles = game.add.group();
		circles.enableBody = true;
		circles.physicsBodyType = Phaser.Physics.ARCADE;
		
		circle = circles.create(0, 0, 'red');
        circle.x = WIDTH / 2 - circle.width / 2;
        circle.y = HEIGHT / 2 - circle.height / 2;
        circle.scale.set(ballFactor/1000, ballFactor/1000);
 
        circle.body.collideWorldBounds = true;

		if (window.DeviceMotionEvent) {
		  	window.addEventListener('devicemotion', deviceMotion);
		}
		else{
			alert('motion not supported');
		}
		
		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', handleOrientation);
		}
		else{
			alert('orientation not supported');
		}
    },
    
    update: function(){
    	if (game.state.getCurrentState().key == 'Shaker'){
	    	if (circle.y > 22 && circle.y < HEIGHT - circle.height - 22){
	    		resetTouching = true;
	    	}
	    	
	    	if (resetTouching){    	
		    	if (circle.y == 0){ // front
		    		window.plugins.NativeAudio.play('frontSfx');
					flash(GENTLE_COLOR);	
	    		}
		    	
		    	else if (circle.y == HEIGHT - circle.height){ // back    		
	    			window.plugins.NativeAudio.play('backSfx');
					flash(BACK_COLOR);
				}	
	    	}
    	}
	}
};

function deviceMotion(event){
	accelX = roundIt(event.acceleration.x);
	circle.body.velocity.y = accelX * accelFactor;
}

function handleOrientation(event){
	gamma = roundIt(event.gamma);  // -90,90 X
	circle.body.gravity.y = (gamma * gammaFactor) * -1;
}

function flash(_color){
	resetTouching = false;

	game.stage.backgroundColor = _color;
	
	if (_color == GENTLE_COLOR){
		window.plugins.flashlight.switchOn();
		circle.tint = 0xff00ff;
		navigator.vibrate(150);
	}
	else{
		circle.tint = 0xff00ff;
		navigator.vibrate(75);
	}

	setTimeout(function(){
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
		
		circle.tint = 0xffffff;
		game.stage.backgroundColor = '#000000';
	}, 150);
}
