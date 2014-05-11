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

  Bullet.prototype.move = function () {
    Asteroids.MovingObject.prototype.move.call(this);
    this.hitAsteroids();
  }

  Bullet.COLOR = "yellow";
  Bullet.RADIUS = 3;

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