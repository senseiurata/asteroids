(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, vel) {
    Asteroids.MovingObject.call(
      this,
      pos,
      vel,
      Bullet.RADIUS,
      Bullet.COLOR
    );
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.COLOR = "yellow";
  Bullet.RADIUS = 1;

})(this);