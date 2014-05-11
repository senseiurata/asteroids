(function(root){
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var Ship = Asteroids.Ship = function (pos, vel, img) {
        Asteroids.MovingObject.call(
            this,
            pos,
            vel,
            Ship.RADIUS,
            Ship.COLOR
        );

        this.img = img;
        this.bulletDelay = 0;
    };
    Ship.inherits(Asteroids.MovingObject);
    Ship.COLOR = "pink";
    Ship.RADIUS = 12;
    Ship.MAX_VELOCITY = 7;
    Ship.ACCEL_COEFFICIENT = 0.35;
//    Ship.BULLET_DELAY = 10;    

    Ship.prototype.power = function (impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
    };

    Ship.prototype.draw = function (ctx) {
        ctx.drawImage(
            this.img,
            this.pos[0] - 22,
            this.pos[1] - 20
        );

        // ctx.fillStyle = this.color;
        // ctx.beginPath();

        // ctx.arc(
        //     this.pos[0],
        //     this.pos[1],
        //     this.radius,
        //     0,
        //     2 * Math.PI
        // );
        // ctx.fill();
    };

    // var TO_RADIANS = Math.PI/180; 
    // function drawRotatedImage(image, x, y, angle) { 
    //     context.save(); 
    //     context.translate(x, y);
    //     context.rotate(angle * TO_RADIANS);
    //     context.drawImage(image, -(image.width/2), -(image.height/2));
    //     context.restore(); 
    // }

    Ship.prototype.fireBullet = function () {
        if (this.vel[0] || this.vel[1]) {
            var bulletVel = [10 * this.vel[0] / Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)),
                             10 * this.vel[1] / Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2))]

            // if (this.bulletDelay > Ship.BULLET_DELAY) {
            //     this.bulletDelay -= Ship.BULLET_DELAY;

                return new Asteroids.Bullet(
                    this.pos.slice(),
                    bulletVel,
                    game
                );
            // }
            // this.bulletDelay += 1;
        }
        return null;
    }
})(this);