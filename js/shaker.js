var shakerMain = function(game){
	GENTLE_COLOR = '#c1ad65';
	BACK_COLOR = '#656d7c';

	gamma = 0;
	accelX = 0;

	accelFactor = 57;
	gammaFactor = 730;

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
		circle.scale.set(0.8, 0.8);
        circle.x = WIDTH / 2 - circle.width / 2;
        circle.y = HEIGHT / 2 - circle.height / 2;

        circle.body.collideWorldBounds = true;

		if (window.DeviceMotionEvent) {
		  	window.addEventListener('devicemotion', deviceMotion);
		}
		else{
			alert('motion not supported');
		}
    },
    
    update: function(){
    	if (game.state.getCurrentState().key == 'Shaker'){
	    	if (circle.y > 15 && circle.y < HEIGHT - circle.height - 15){
	    		resetTouching = true;
	    	}
	    	
	    	if (resetTouching){    	
		    	if (circle.y < 1){ // front
		    		front.play();
					flash(GENTLE_COLOR);	
	    		}
		    	
		    	else if (circle.y > HEIGHT - circle.height - 1){ // back    		
	    			back.play();
					flash(BACK_COLOR);
				}	
	    	}
    	}
	}
};

function deviceMotion(event){
	accelX = event.acceleration.x;
    circle.y = HEIGHT / 2 - circle.height / 2 + (accelX * 4.75);
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
		navigator.vibrate(30);
	}
	else{
		circle.tint = 0xff00ff;
		navigator.vibrate(15);
	}

	setTimeout(function(){
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
		
		circle.tint = 0xffffff;
		game.stage.backgroundColor = '#000000';
	}, 120);
}
