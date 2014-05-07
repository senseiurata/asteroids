(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var Game = Asteroids.Game = function (ctx) {
        this.ctx = ctx;
        this.asteroids = [];
    }

    Game.DIM_X = 400;
    Game.DIM_Y = 400;
    Game.FPS = 30;

    Game.prototype.addAsteroids = function (numAsteroids) {
        for(var i = 0; i < numAsteroids; i++) {
            this.asteroids.push(Asteroids.randomAsteroid(
                Game.DIM_X,
                Game.DIM_Y)
            );
        }
    }

    Game.prototype.draw = function () {
        this.ctx.clearRect(0, 0, Game.DIM_X,
                Game.DIM_Y);

        for(var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw(this.ctx);
        }
    }

    Game.prototype.move = function () {
        for(var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].move();
        }
    }

    Game.prototype.step = function () {
        this.move();
        this.draw();
    }

    Game.prototype.start = function () {
        setInterval(this.step.bind(this), Game.FPS);
    }


})(this);