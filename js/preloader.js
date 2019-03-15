var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
    	
    	if (!this.game.device.desktop){
			window.plugins.NativeAudio.preloadComplex('frontSfx', 'assets/audio/shakerGentle.mp3',  1, 1, 0, 
			null, function(msg){alert(msg);});
				
			window.plugins.NativeAudio.preloadComplex('backSfx', 'assets/audio/shakerBack.mp3',  1, 1, 0, 
			null, function(msg){alert(msg);});
		}
	
		game.load.image('bg', 'assets/images/bg.png');
		
        game.load.image('red', 'assets/images/red.png');
        game.load.image('green', 'assets/images/green.png');
        game.load.image('blue', 'assets/images/blue.png');
        
        game.load.image('button', "assets/images/large_orange_button.png");
        game.load.image('drag', "assets/images/drag.png");
        
        game.load.image('swipe_r', "assets/images/swipe_r.png");
        game.load.image('swipe_l', "assets/images/swipe_l.png");
        
        game.load.image('tromboneImg', "assets/images/trombone.png");
        
        game.load.image('arrowsImg', "assets/images/arrows.png");

        game.load.spritesheet("cont", "assets/images/cont.png", 814/2, 256);
        
        game.load.audio("note1", "assets/audio/note1.mp3");
        game.load.audio("note2", "assets/audio/note2.mp3");
        game.load.audio("note3", "assets/audio/note3.mp3");
        
        game.load.audio("hu", "assets/audio/hu.ogg");
        game.load.audio("ha", "assets/audio/ha.ogg");
        
        game.load.audio("trombone", "assets/audio/trombone.mp3");
    },
    
    create: function(){	
        this.game.state.start("Buttons"); 
    }
};
