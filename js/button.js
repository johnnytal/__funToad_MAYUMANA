var btnMain = function(game){
	pause_mode = false;

	SOUND_BUTTONS_N = 3;
	soundButtons = [];
	colorBtns = ['red', 'green', 'blue'];
};

btnMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#ff2256';
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
    	createSoundBtns();
    	
    	game.input.addPointer();

        mode_button = this.add.image(0, 0, 'cont');
        mode_button.frame = 1;
        mode_button.y = HEIGHT - mode_button.height;
        mode_button.x = WIDTH - mode_button.width - 50;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);
    }	
};

function createSoundBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (220 * b), 50, colorBtns[b]);
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(playSound, this);
		soundButtons[b].scale.set(.6, .6);
		
        soundButtons[b].events.onInputUp.add(function(){
            if (pause_mode) stopSounds();
        }, this);  
    }
}

function playSound(item, kb){	
	var place;

	place = soundButtons.indexOf(item);
	theButton = soundButtons[place];

	var sprite = soundButtons[place];
	var sound = sounds[place];

    if (!sound.isPlaying){
        if (!sound.paused){
            sound.play();  
            navigator.vibrate(200);  
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

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // max media volume
}

function UIbuttons(){	    	
	document.getElementById("shakerBtn").addEventListener('click', function(){  game.state.start("Shaker"); }); 
	document.getElementById("visherBtn").addEventListener('click', function(){ game.state.start("Visher"); }); 
    document.getElementById("trombBtn").addEventListener('click', function(){ game.state.start("Trombone"); }); 
    document.getElementById("btnBtn").addEventListener('click', function(){ game.state.start("Buttons"); }); 
    document.getElementById("hotBtn").addEventListener('click', function(){ game.state.start("Hot"); }); 
}

function loadSounds(){
	huSfx = game.add.audio('hu', 1);
	haSfx = game.add.audio('ha', 1);
	
	trombSound = game.add.audio('trombone', 1);
	
    sfx1 = game.add.audio('note1', 0.5);
    sfx2 = game.add.audio('note2', 0.5);
    sfx3 = game.add.audio('note3', 0.5);
    sounds = [sfx1, sfx2, sfx3];
    
    back = game.add.audio('back', 1);
    front = game.add.audio('front', 1); 
}