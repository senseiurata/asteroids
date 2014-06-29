(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
        this.color = color;
    };

    MovingObject.prototype.move = function () {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
    };

    MovingObject.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            0,
            2 * Math.PI
        );
        ctx.fill();
    };

    MovingObject.prototype.isCollidedWith = function (otherObject) {
        var collidingDistance = otherObject.radius + this.radius;
        var xSquared = Math.pow(otherObject.pos[0] - this.pos[0], 2);
        var ySquared = Math.pow(otherObject.pos[1] - this.pos[1], 2);
        var distanceBetween = Math.sqrt(xSquared + ySquared);
        return collidingDistance >= distanceBetween;
    };

    function wrap (coord, max) {
        if (coord < 0) {
            return max - (coord % max);
        }
        else if (coord > max) {
            return coord % max;
        }
        else {
            return coord;
        }
    }

    MovingObject.prototype.wrap = function () {
        this.pos[0] = wrap(this.pos[0], Asteroids.Game.DIM_X);
        this.pos[1] = wrap(this.pos[1], Asteroids.Game.DIM_Y);
    },

    MovingObject.prototype.calcRadian = function (x, y) { 
        return Math.atan2(y, x);
    }


})(this);

