(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var Game = Asteroids.Game = function (ctx) {
        this.ctx = ctx;
        this.asteroids = [];
        this.bullets = [];
        this.images = [new Image(), new Image()];
        this.loadImages();

        this.ship = new Asteroids.Ship(
            [Game.DIM_X / 2, Game.DIM_Y / 2],
            [0, 0],
            this.images
        );
    }

    Game.DIM_X = 1000;
    Game.DIM_Y = 600;
    Game.FPS = 30;

    Game.prototype.loadImages = function () {
        var that = this;

        for (var i = 0; i < 2; i++) {
            (function() {
                var new_idx = i;

                that.images[new_idx].onload = function () {
                    that.ctx.drawImage(
                        that.images[new_idx],
                        this.DIM_X / 2,
                        this.DIM_Y / 2
                    );
                };
            })();
        }

        this.images[0].src = 'starship.png'
        this.images[1].src = 'starship2.png'
    }

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

        for(var j = 0; j < this.bullets.length; j++) {
            this.bullets[j].draw(this.ctx);
        }

        this.ship.draw(this.ctx);
    }

    Game.prototype.move = function () {
        for(var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].move();
        }

        for(var j = 0; j < this.bullets.length; j++) {
            this.bullets[j].move();
        }

        this.ship.move();
    }

    Game.prototype.step = function () {
        this.move();
        this.draw();
        this.checkCollisions();
        this.checkBounds();
        this.ship.wrap();
        this.isOutOfBounds();
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
                this.stop();
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
            this.asteroids[i].wrap();
        }
    }

    function computeAccel(currentVel, leftOrUp) {
        if(leftOrUp) {
            if (Asteroids.Ship.MAX_VELOCITY + currentVel > 0) {
                return -Math.sqrt(Asteroids.Ship.MAX_VELOCITY + currentVel) * Asteroids.Ship.ACCEL_COEFFICIENT;
            }
            return 0;
        }
        else {
            if (Asteroids.Ship.MAX_VELOCITY - currentVel > 0) {
                return Math.sqrt(Asteroids.Ship.MAX_VELOCITY - currentVel) * Asteroids.Ship.ACCEL_COEFFICIENT;
            }
            return 0;
        }
    }

    // var Key = Game.Key = function() {
    //     _pressed = {},
    // }

    // Key.KEY_MAP = {
    //     LEFT: 37,
    //     UP: 38,
    //     RIGHT: 39,
    //     DOWN: 40
    // }

    Game.prototype.bindKeyHandlers = function () {
        var $doc = $(document)
        var that = this;

        $doc.ready(function () {
            $doc.on('keydown', function(event) {

                var pressedKey = event.which;
                var ship = that.ship;

                switch(pressedKey) {
                    case 37: //left
                        ship.power([computeAccel(ship.vel[0], true), 0]);
                        break;
                    case 38: //up
                        ship.power([0, computeAccel(ship.vel[1], true)]);
                        break;
                    case 39: //right
                        ship.power([computeAccel(ship.vel[0], false), 0]);
                        break;
                    case 40: //down
                        ship.power([0, computeAccel(ship.vel[1], false)]);
                        break;
                    case 32: //spacebar
                        that.fireBullet();
                        break;
                }
            });
        });
    }



    Game.prototype.fireBullet = function () {
        var bullet = this.ship.fireBullet();

        if (bullet) {
            this.bullets.push(bullet);
        }
    }

    Game.prototype.removeAsteroid = function (asteroid) {
        var asteroidIdx = this.asteroids.indexOf(asteroid);

        if (asteroidIdx !== -1) {
            this.asteroids.splice(asteroidIdx, 1);
        }
    }

    Game.prototype.removeBullet = function (bullet) {
        var bulletIdx = this.bullets.indexOf(bullet);

        if (bulletIdx !== -1) {
            this.bullets.splice(bulletIdx, 1);
        }
    }

    Game.prototype.isOutOfBounds = function () {
        var bullets = this.bullets

        for (var i = 0; i < bullets.length; i++) {
            var pos = bullets[i].pos;

            if (pos[0] < 0 || pos[0] > Asteroids.Game.DIM_X ||
                pos[1] < 0 || pos[1] > Asteroids.Game.DIM_Y) {
                this.removeBullet(bullets[i]);
            }
        }
    }
})(this);