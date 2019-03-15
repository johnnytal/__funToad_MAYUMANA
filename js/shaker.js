var shakerMain = function(game){
	FRONT_COLOR = '#c1ad65';
	BACK_COLOR = '#656d7c';
	
	MIDDLE = null;

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
        MIDDLE = HEIGHT / 2 - circle.height / 2;
        circle.y = MIDDLE;

        circle.body.collideWorldBounds = true;
        
        try{navigator.accelerometer.watchAcceleration(readAccel, onError, { frequency: 1});} catch(e){}
    },
    
    update: function(){
    	if (game.state.getCurrentState().key == 'Shaker'){
	    	if (!resetTouching && circle.y > 30 && circle.y < (HEIGHT - circle.height - 30)){
	    		resetTouching = true;
	    	}
	    	
	    	if (resetTouching){    	
		    	if (circle.y < 1){ // front
		    		front.play();
					flash(FRONT_COLOR);	
	    		}
		    	
		    	else if (circle.y > HEIGHT - circle.height - 1){ // back    		
	    			back.play();
					flash(BACK_COLOR);
				}	
	    	}
    	}
	}
};

function readAccel(acceleration){
    circle.y = MIDDLE + (acceleration.x * 5.5);
}

function flash(_color){
	resetTouching = false;

	game.stage.backgroundColor = _color;
	circle.tint = 0xff00ff;
	
	if (_color == FRONT_COLOR){
		window.plugins.flashlight.switchOn();
		navigator.vibrate(30);
	}
	else{
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

function onError(){
	alert('error');
}
