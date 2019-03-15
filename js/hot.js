var gameMain = function(game){
	notChosen = true;
	FACTOR = 30;
};

gameMain.prototype = {
    create: function(){	
    	game.stage.backgroundColor = '#000040';
    	
    	notChosen = true;
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
  		questionText = game.add.text(0, 0, 'What is your\nfavorite color?', 
  		{font: '46px', fill: 'white', align:'center', fontWeight:'bold'});
		questionText.x = game.world.centerX - questionText.width / 2;
		questionText.y = questionText.height / 4;
		
        option1Img = this.add.image(0, 0, 'red');
        option1Img.anchor.set(.5,.5);
        option1Img.x = option1Img.width - 50;
    	option1Img.y = game.world.centerY - option1Img.height / 2;

        option2Img = this.add.image(0, 0, 'green');
        option2Img.anchor.set(.5,.5);
        option2Img.x = WIDTH - option2Img.width + 50;
    	option2Img.y = game.world.centerY - option2Img.height / 2;

        button = this.add.sprite(0, 0, 'button');
        button.scale.set(.75, .75);
        button.x = WIDTH / 2 - button.width / 2;
        button.y = HEIGHT / 2 + button.height / 4;

        button.events.onInputDown.add(function(){
        	game.add.tween(drag).to( { alpha: 0 }, 800, "Linear", true);
        }, this);  
        button.events.onInputUp.add(function(){
        	game.add.tween(drag).to( { alpha: 0.6 }, 800, "Linear", true);
        }, this);  

	    button.inputEnabled = true;
	    button.input.enableDrag();
	    button.input.allowVerticalDrag = false;
	    game.physics.enable( button, Phaser.Physics.ARCADE);
	    
	    drag = this.add.image(0, 0, 'drag');
	    drag.alpha = 0.6;
	    drag.scale.set(.2,.2);
        drag.x = WIDTH / 2;
        drag.y = button.y + drag.height * 2;
        drag.anchor.set(.5, 1);

	    swipe_r = this.add.image(0, 0, 'swipe_r');
	    swipe_r.scale.set(.7,.7);
        swipe_r.x = WIDTH - swipe_r.width - 20;
        swipe_r.y = button.y + button.height / 6;
        swipe_r.alpha = 0.5;

	    swipe_l = this.add.image(0, 0, 'swipe_l');
	    swipe_l.scale.set(.7,.7);
        swipe_l.x = 20;
        swipe_l.y = button.y + button.height / 6;
        swipe_l.alpha = 0.5;

        tweenL = game.add.tween(swipe_l).to( { alpha: 0.8 }, 800, "Linear", true, 0, -1);
    	tweenL.yoyo(true, 40);
        tweenR = game.add.tween(swipe_r).to( { alpha: 0.8 }, 800, "Linear", true, 0, -1);
    	tweenR.yoyo(true, 40);
    	
    	elements = [option1Img, option2Img, button, drag, swipe_l, swipe_r];
    },
    update: function(){
    	if (notChosen){
	    	if (button.x < -FACTOR){
	    		choose(option1Img);	
	    	}
	    	else if (button.x > (WIDTH - button.width) + FACTOR){
	    		choose(option2Img);
	    	}
	    	
	    	if (game.input.activePointer.isUp){
	    		button.x = WIDTH / 2 - button.width / 2;
	    	}
    	}
    }
};

function choose(_what){
	notChosen = false;
	button.inputEnabled = false;

	setTimeout(function(){
		game.add.tween(_what.scale).to({ x: 1.75, y: 1.75}, 3000, "Linear", true);
		
		for(n=0; n<elements.length; n++){
			if (elements[n] != _what){
				FOtween = game.add.tween(elements[n]).to( { alpha: 0 }, 1750, "Linear", true);
			}
		}
		
		tweenL.stop();
		tweenR.stop();
		
		FOtween.onComplete.add(function(){
			setTimeout(function(){
				if (game.state.getCurrentState().key == 'Hot'){
					this.game.state.start("Hot");
				}
			},5000);
		}, this);
	}, 200);
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // max media volume
}
