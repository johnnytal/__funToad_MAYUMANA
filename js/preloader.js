var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){	
		game.load.image('bg', 'assets/images/bg.png');
		
        game.load.image('red_circle', 'assets/images/red.png');
        game.load.image('green_circle', 'assets/images/green.png');
        game.load.image('blue_circle', 'assets/images/blue.png');
        
        game.load.image('button', "assets/images/large_orange_button.png");
        game.load.image('drag', "assets/images/drag.png");
        
        game.load.image('swipe_r', "assets/images/swipe_r.png");
        game.load.image('swipe_l', "assets/images/swipe_l.png");
        
        game.load.image('tromboneImg', "assets/images/trombone.png");
        
        game.load.image('wiper', "assets/images/wiper.png");
        
        game.load.image('plus', "assets/images/plus.png");
        game.load.image('minus', "assets/images/minus.png");
        
        game.load.image('red', "assets/images/red_square.png");
        game.load.image('blue', "assets/images/blue_square.png");

        game.load.spritesheet("cont", "assets/images/cont.png", 325/2, 102);
        
        game.load.audio("note1", "assets/audio/vibeC.mp3");
        game.load.audio("note2", "assets/audio/vibeE.mp3");
        game.load.audio("note3", "assets/audio/vibeG.mp3");
        
        game.load.audio("hu", "assets/audio/hu.mp3");
        game.load.audio("ha", "assets/audio/ha.mp3");
        
        game.load.audio("front", "assets/audio/front.mp3");
        game.load.audio("back", "assets/audio/back.mp3");
        
        game.load.audio("tromb_long", "assets/audio/tromb_long.mp3");
        game.load.audio("tromb_short", "assets/audio/tromb_short.mp3");
    },
    
    create: function(){
		initPlugIns();
		UIbuttons();
		
        this.game.state.start("Buttons"); 
    }
};
