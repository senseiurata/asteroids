(function(root) {

    var Asteroids = root.Asteroids = (root.Asteroids || {});

    Function.prototype.inherits = function(parentClass) {
        function Surrogate() {}

        Surrogate.prototype = parentClass.prototype;
        this.prototype = new Surrogate();
    };

    var Asteroid = Asteroids.Asteroid = function (pos, vel) {
        Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
    }
    Asteroid.inherits(Asteroids.MovingObject);

    Asteroid.COLOR = "purple";
    Asteroid.RADIUS = 20;
    Asteroid.VELOCITY = 3;

    Asteroids.randomAsteroid = function (dimX, dimY) {
        return new Asteroid(Asteroids.randomPos(dimX, dimY),
            Asteroids.randomVec());
    }

    Asteroids.randomPos = function (dimX, dimY) {
        return [
            Math.floor(Math.random() * dimX),
            Math.floor(Math.random() * dimY)
        ];
    }

    Asteroids.randomVec = function () {
        return [
            Math.random() * Asteroid.VELOCITY - Asteroid.VELOCITY / 2,
            Math.random() * Asteroid.VELOCITY - Asteroid.VELOCITY / 2
        ];

    }
})(this);