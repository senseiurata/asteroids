(function(root){
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var Ship = Asteroids.Ship = function (pos, vel) {
        Asteroids.MovingObject.call(
            this,
            pos,
            vel,
            Ship.RADIUS,
            Ship.COLOR
        );
    };
    Ship.inherits(Asteroids.MovingObject);
    Ship.COLOR = "pink";
    Ship.RADIUS = 6;
    Ship.MAX_VELOCITY = 7;
    Ship.ACCEL_COEFFICIENT = 0.35;

    Ship.prototype.power = function (impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
    };


    Ship.prototype.fireBullet = function () {
        if (this.vel[0] || this.vel[1]) {
            var bulletVel = [10 * this.vel[0] / Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)),
                             10 * this.vel[1] / Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2))]

            return new Asteroids.Bullet(
                this.pos,
                bulletVel,
                Asteroids.Bullet.RADIUS,
                Asteroids.Bullet.COLOR
            )
        }
        return null;
    }
})(this);