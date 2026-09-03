game.GameOverScreen = me.ScreenObject.extend({
    init: function() {
        this.savedData = null;
        this.handler = null;
    },

    onResetEvent: function() {
        //save section
        this.savedData = {
            score: game.data.score,
            steps: game.data.steps
        };
        me.save.add(this.savedData);

        if (!me.save.topSteps) me.save.add({topSteps: game.data.steps});
        if (game.data.steps > me.save.topSteps) {
            me.save.topSteps = game.data.steps;
            game.data.newHiScore = true;
        }
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.SPACE, "enter", false)
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

        this.handler = me.event.subscribe(me.event.KEYDOWN,
            function (action, keyCode, edge) {
                if (action === "enter") {
                    me.state.change(me.state.MENU);
                }
            });

        // pt-BR: "gameover" was a PNG with "Game Over" baked in; replaced
        // with text in the game's own "gamefont" (see also play.js).
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [0, 0, 100, 100]);
                this.font = new me.Font('gamefont', 40, '#000', 'center');
            },
            draw: function (renderer) {
                this.font.draw(renderer, 'FIM DE JOGO', me.game.viewport.width/2, me.game.viewport.height/2 - 130);
            }
        }))(), 12);

        var gameOverBG = new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2,
            {image: 'gameoverbg'}
        );
        me.game.world.addChild(gameOverBG, 10);

        me.game.world.addChild(new BackgroundLayer('bg', 1));

        // ground
        this.ground1 = me.pool.pull('ground', 0, me.game.viewport.height - 96);
        this.ground2 = me.pool.pull('ground', me.game.viewport.width,
            me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        // add the dialog witht he game information
        if (game.data.newHiScore) {
            // pt-BR: "new" was a small "NEW!" ribbon PNG; replaced with text.
            var newRect = new (me.Renderable.extend({
                init: function() {
                    this._super(me.Renderable, 'init', [0, 0, 100, 100]);
                    this.font = new me.Font('gamefont', 22, '#cc3333', 'center');
                },
                draw: function (renderer) {
                    this.font.draw(renderer, 'NOVO RECORDE!', gameOverBG.width/2, gameOverBG.height/2);
                }
            }))();
            me.game.world.addChild(newRect, 12);
        }

        this.dialog = new (me.Renderable.extend({
            // constructor
            init: function() {
                this._super(me.Renderable, 'init',
                    [0, 0, me.game.viewport.width/2, me.game.viewport.height/2]
                );
                this.font = new me.Font('gamefont', 40, 'black', 'left');
                this.steps = 'Pontos: ' + game.data.steps.toString();
                this.topSteps= 'Recorde: ' + me.save.topSteps.toString();
            },

            draw: function (renderer) {
                var stepsText = this.font.measureText(renderer, this.steps);
                var topStepsText = this.font.measureText(renderer, this.topSteps);
                var scoreText = this.font.measureText(renderer, this.score);

                //steps
                this.font.draw(
                    renderer,
                    this.steps,
                    me.game.viewport.width/2 - stepsText.width/2 - 60,
                    me.game.viewport.height/2
                );

                //top score
                this.font.draw(
                    renderer,
                    this.topSteps,
                    me.game.viewport.width/2 - stepsText.width/2 - 60,
                    me.game.viewport.height/2 + 50
                );
            }
        }));
        me.game.world.addChild(this.dialog, 12);
    },

    onDestroyEvent: function() {
        // unregister the event
        me.event.unsubscribe(this.handler);
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindPointer(me.input.pointer.LEFT);
        this.ground1 = null;
        this.ground2 = null;
        this.font = null;
        me.audio.stop("theme");
    }
});
