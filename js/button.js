var btnMain = function(game){
	pause_mode = false;
	
	DEFAULT_COLOR = '#00ffff';
};

btnMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#ff2256';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
		server_sound = game.add.audio('saraSound');

        play_button = this.add.image(0, 0, 'red');
        play_button.frame = 1;
        play_button.x = WIDTH / 2 - play_button.width / 2;
        play_button.y = HEIGHT / 2 - play_button.height / 2;
        
        play_button.inputEnabled = true;
        play_button.events.onInputDown.add(on_play_down, this);
        play_button.events.onInputUp.add(on_play_up, this);
        
        mode_button = this.add.image(0, 0, 'cont');
        mode_button.scale.set(.5, .5);
        mode_button.frame = 1;
        mode_button.y = HEIGHT - mode_button.height;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);  
        
        //server_sound.onStop.add(on_sound_ended, this);   
        
        initPlugIns(); 
    }	
};

function on_play_down(_item){	
	server_sound.play();

	_item.frame = 0;
	game.stage.backgroundColor = server_color;
	window.plugins.flashlight.switchOn();
}

function on_play_up(_item){
	if (pause_mode){
		server_sound.stop();

		_item.frame = 1;
		game.stage.backgroundColor = DEFAULT_COLOR;
		window.plugins.flashlight.switchOff();
	}
}

function on_sound_ended(){
	play_button.frame = 1;
	game.stage.backgroundColor = DEFAULT_COLOR;
	window.plugins.flashlight.switchOff();
}

function toggle_mode(item){
	if (item.frame == 0){
		item.frame = 1;
		pause_mode = false;
	}	
	else{
		item.frame = 0;
		pause_mode = true;
	}
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // max media volume
}
