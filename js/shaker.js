var shakerMain = function(game){
	FRONT_COLOR = '#c1ad65';
	BACK_COLOR = '#656d7c';
	
	MIDDLE = null;

	resetTouching = true;
	
	sensFactor = 0;
	//distanceFactor = 0;
	
	resetAccel = true;
	
	lastSound = null;
};

shakerMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#ffffff';
    	
    	sensFactor = 0;
    	//distanceFactor = 0;
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        circles = game.add.group();
		circles.enableBody = true;
		circles.physicsBodyType = Phaser.Physics.ARCADE;
		
		circle = circles.create(0, 0, 'red');
		circle.scale.set(0.82, 0.82);

        circle.x = WIDTH / 2 - circle.width / 2;
        MIDDLE = HEIGHT / 2 - circle.height / 2;
        circle.y = MIDDLE;

        circle.body.collideWorldBounds = true;
        
        plus = game.add.sprite(620, 300, 'plus');
        plus.scale.set(.85, .85);
        plus.alpha = 0.85;
        plus.inputEnabled = true;
        plus.events.onInputDown.add(function(){
        	sensFactor += 0.05;
        	sensText.text = "Sensitivity\nfactor: " + roundIt(sensFactor);
        	plus.tint = 0xf04030;
        	setTimeout(function(){plus.tint = 0xffffff;},100);
        }, this);
        
        minus = game.add.sprite(525, 300, 'minus');
        minus.scale.set(.85, .85);
        minus.alpha = 0.85;
        minus.inputEnabled = true;
        minus.events.onInputDown.add(function(){
        	sensFactor -= 0.05;
        	sensText.text = "Sensitivity\nfactor: " + roundIt(sensFactor);
        	minus.tint = 0xf04030;
        	setTimeout(function(){minus.tint = 0xffffff;},100);
        }, this);
        
      /*  plusD = game.add.sprite(620, 100, 'plus');
        plusD.scale.set(.85, .85);
        plusD.alpha = 0.85;
        plusD.inputEnabled = true;
        plusD.events.onInputDown.add(function(){
        	distanceFactor += 0.5;
        	distanceText.text = "Distance\nfactor: " + roundIt(distanceFactor);
        	plusD.tint = 0xf04030;
        	setTimeout(function(){plusD.tint = 0xffffff;},100);
        }, this);
        
        minusD = game.add.sprite(525, 100, 'minus');
        minusD.scale.set(.85, .85);
        minusD.alpha = 0.85;
        minusD.inputEnabled = true;
        minusD.events.onInputDown.add(function(){
        	distanceFactor -= 0.5;
        	distanceText.text = "Distance\nfactor: " + roundIt(distanceFactor);
        	minusD.tint = 0xf04030;
        	setTimeout(function(){minusD.tint = 0xffffff;},100);
        }, this);
        
        distanceText = game.add.text(530, 30, "Distance\nfactor: " + roundIt(distanceFactor),
        {font: '22px', fill: 'black'});
        */
        
        sensText = game.add.text(530, 230, "Sensitivity\nfactor: " + roundIt(sensFactor), 
        {font: '22px', fill: 'white'});

        try{navigator.accelerometer.watchAcceleration(readAccel, onError, { frequency: 1});} catch(e){}
    },
    
    update: function(){
    	if (game.state.getCurrentState().key == 'Shaker'){	
			if ((lastSound == 'front' && circle.y > MIDDLE + 15) || (lastSound == 'back' && circle.y < MIDDLE - 15)){
				resetTouching = true;
			}

    	}
    	
    	if (resetTouching){
    		game.stage.backgroundColor = '#000000';
    	}
    	else{
    		game.stage.backgroundColor = '#ffffff';
    	}
	}
};

function readAccel(acceleration){	
    circle.y = MIDDLE + ((acceleration.x + 1) * (6.2 + sensFactor));
	
	if (game.state.getCurrentState().key == 'Shaker'){		
		if (resetTouching){    	
	    	if (circle.y < 1 && !front.isPlaying){ // front
	    		front.play();
				flash(FRONT_COLOR);	
			}
	    	
	    	else if ((circle.y > HEIGHT - circle.height - 1) && !back.isPlaying) { // back    		
				back.play();
				flash(BACK_COLOR);
			}	
		}
	}
}

function flash(_color){
	resetTouching = false;

	game.stage.backgroundColor = _color;
	circle.tint = 0xff00ff;
	
	if (_color == FRONT_COLOR){
		window.plugins.flashlight.switchOn();
		setTimeout(function(){navigator.vibrate(25);}, 20);	
		lastSound = 'front';
	}
	else{
		setTimeout(function(){navigator.vibrate(12);}, 20);	
		lastSound = 'back';
	}

	setTimeout(function(){
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
		
		circle.tint = 0xffffff;
		game.stage.backgroundColor = '#000000';
	}, 75);
}

function onError(){
	alert('error');
}
