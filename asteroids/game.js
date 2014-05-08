(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var Game = Asteroids.Game = function (ctx) {
        this.ctx = ctx;
        this.asteroids = [];
        this.ship = new Asteroids.Ship(
            [Game.DIM_X / 2, Game.DIM_Y / 2],
            [0, 0]
        );
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

        this.ctx.rect(0, 0, Game.DIM_X, Game.DIM_Y);
        this.ctx.fillStyle = "black";
        this.ctx.fill();

        for(var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw(this.ctx);
        }

        this.ship.draw(this.ctx);
    }

    Game.prototype.move = function () {
        for(var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].move();
        }

        this.ship.move();
    }

    Game.prototype.step = function () {
        this.move();
        this.draw();
        this.checkCollisions();
        this.checkBounds();
    }

    Game.prototype.start = function () {
        this.timer = setInterval(this.step.bind(this), Game.FPS);
    }

    Game.prototype.stop = function () {
        clearInterval(this.timer);
    };

    Game.prototype.checkCollisions = function () {
        for(var i = 0; i < this.asteroids.length; i++) {
            if (this.asteroids[i].isCollidedWith(this.ship)) {
                // alert("Game has ended!");
                // this.stop();
            }
        }
    };

    Game.prototype.checkBounds = function () {
        for(var i = 0; i < this.asteroids.length; i++) {
            var asteroid = this.asteroids[i];
            if (asteroid.pos[0] < (0 - asteroid.radius) ||
                asteroid.pos[1] < (0 - asteroid.radius) ||
                asteroid.pos[0] > (Game.DIM_X + asteroid.radius) ||
                asteroid.pos[1] > (Game.DIM_Y + asteroid.radius)
               ) {

                this.asteroids[i] = Asteroids
                    .randomAsteroid(Game.DIM_X, Game.DIM_Y);
            }
        }
    }

    Game.prototype.bindKeyHandlers = function () {
        var that = this;
        key('up', function() {
            that.ship.power( [ 0, -.25 ] );
        });
        key('left', function() {
            that.ship.power( [ -.25, 0 ] );
        });
        key('right', function() {
            that.ship.power( [ .25, 0 ] );
        });
        key('down', function() {
            that.ship.power( [ 0, .25 ] );
        });

    }

})(this);