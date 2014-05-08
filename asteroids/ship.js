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
    Ship.RADIUS = 4;

    Ship.prototype.power = function(impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
    };


})(this);