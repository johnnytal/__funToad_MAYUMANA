var btnMain = function(game){
	pause_mode = false;
	
	DEFAULT_COLOR = '#00ffff';
	
	SOUND_BUTTONS_N = 3;
	soundButtons = [];
	colorBtns = ['red', 'green', 'blue'];
	
	multiSounds = true;
};

btnMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#ff2256';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
    	createSoundBtns();
    	loadSounds();

        mode_button = this.add.image(0, 0, 'cont');
        mode_button.scale.set(.5, .5);
        mode_button.frame = 1;
        mode_button.y = HEIGHT - mode_button.height;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);  

        initPlugIns(); 
    }	
};

function createSoundBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (220 * (b%3)), 50, colorBtns[b]);
    	soundButtons[b].alpha = 0.87;
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(playSound, this);
		soundButtons[b].scale.set(.6, .6);
		
        soundButtons[b].events.onInputUp.add(function(){
            if (pause_mode) stopSounds();
        }, this);  
    }
}

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

function playSound(item, kb){	
	var place;

	place = soundButtons.indexOf(item);
	theButton = soundButtons[place];

	var sprite = soundButtons[place];
	var sound = sounds[place];

    if (!sound.isPlaying){
        if (!multiSounds){ // no multichannel
        	stopSounds();
		}
		
        if (!sound.paused){
            sound.play();    
        }
        else{
            sound.resume();
        }
		
		sprite.frame = 1;
        sprite.tint = 0xe3dfff;
        
        sound.onStop.add(function(){
           sprite.frame = 0;
           sprite.tint = 0xffffff;
        }, this);
    } 
    
    else{
        sound.stop();
    }    
}

function stopSounds(){
    for (n = 0; n < sounds.length; n++){
        sounds[n].stop();
    }   
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

function loadSounds(){
    sfx1 = game.add.audio('note1', 0.6);
    sfx2 = game.add.audio('note2', 0.6);
    sfx3 = game.add.audio('note3', 0.6);
    
    sounds = [sfx1, sfx2, sfx3];
}
