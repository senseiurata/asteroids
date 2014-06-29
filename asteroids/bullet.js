(function (root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var Bullet = Asteroids.Bullet = function (pos, vel, game) {
        Asteroids.MovingObject.call(
            this,
            pos,
            vel,
            Bullet.RADIUS,
            Bullet.COLOR
          );

        this.game = game;
    };

    Bullet.inherits(Asteroids.MovingObject);

    Bullet.COLOR = "goldenrod";
    Bullet.RADIUS = 4;
    Bullet.VELOCITY = 20;

    Asteroids.Bullet.calcVel = function (shipVel) {
        return [Asteroids.Bullet.VELOCITY *
            shipVel[0] / 
            Math.sqrt(
                Math.pow(shipVel[0], 2) +
                Math.pow(shipVel[1], 2)
            ),
            Asteroids.Bullet.VELOCITY * 
            shipVel[1] /
            Math.sqrt(
                Math.pow(shipVel[0], 2) +
                Math.pow(shipVel[1], 2)
            )
        ];
    }


    Bullet.prototype.move = function () {
        Asteroids.MovingObject.prototype.move.call(this);
        this.hitAsteroids();
    }

    Bullet.prototype.hitAsteroids = function () {
        var asteroids = this.game.asteroids;

        for (var i = 0; i < asteroids.length; i++) {
            if (this.isCollidedWith(asteroids[i])) {
                this.game.removeAsteroid(asteroids[i]);
                this.game.removeBullet(this);
            }
          }
    }
})(this);