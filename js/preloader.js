var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){	
		game.load.image('bg', 'assets/images/bg.png');
		
        game.load.image('red', 'assets/images/red.png');
        game.load.image('green', 'assets/images/green.png');
        game.load.image('blue', 'assets/images/blue.png');
        
        game.load.image('button', "assets/images/large_orange_button.png");
        game.load.image('drag', "assets/images/drag.png");
        
        game.load.image('swipe_r', "assets/images/swipe_r.png");
        game.load.image('swipe_l', "assets/images/swipe_l.png");
        
        game.load.image('tromboneImg', "assets/images/trombone.png");
        
        game.load.image('wiper', "assets/images/wiper.png");

        game.load.spritesheet("cont", "assets/images/cont.png", 325/2, 102);
        
        game.load.audio("note1", "assets/audio/note1.mp3");
        game.load.audio("note2", "assets/audio/note2.mp3");
        game.load.audio("note3", "assets/audio/note3.mp3");
        
        game.load.audio("hu", "assets/audio/hu.ogg");
        game.load.audio("ha", "assets/audio/ha.ogg");
        
        game.load.audio("front", "assets/audio/front.mp3");
        game.load.audio("back", "assets/audio/back.mp3");
        
        game.load.audio("trombone", "assets/audio/trombone.mp3");
    },
    
    create: function(){		        
		loadSounds();
		initPlugIns();
		UIbuttons();
		
        this.game.state.start("Buttons"); 
    }
};
