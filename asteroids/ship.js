(function(root){
    var Asteroids = root.Asteroids = (root.Asteroids || {});

    var Ship = Asteroids.Ship = function (pos, vel, images) {
        Asteroids.MovingObject.call(
            this,
            pos,
            vel,
            Ship.RADIUS,
            Ship.COLOR
        );

        this.images = images;
        this.imgSwapCounter = 0;
        this.bulletDelay = 0;
        this.pendingFireBullet = false;
    };

    Ship.inherits(Asteroids.MovingObject);

    Ship.COLOR = "pink";
    Ship.RADIUS = 12;
    Ship.MAX_VELOCITY = 10;
    Ship.ACCEL_COEFFICIENT = 0.35;
    Ship.BULLET_COOLDOWN = 7;

    Ship.prototype.power = function (impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
    };

    Ship.prototype.draw = function (ctx) {
        var img = null;

        if (this.imgSwapCounter < 10) {
            img = this.images[0];
        } 
        else if (this.imgSwapCounter < 20) {
            img = this.images[1];
        }
        else {
            img = this.images[1];
            this.imgSwapCounter -= 20;
        }
            
        // ctx.drawImage(
        //     img,
        //     this.pos[0] - 22,
        //     this.pos[1] - 20
        // );

        var radian = null;

        if (this.vel[0] || this.vel[1]) {
            radian = this.calcRadian(this.vel[0], this.vel[1]);
        }
        else {
            radian = 0;
        }


        drawRotatedImage(
            img,
            this.pos[0],
            this.pos[1],
            radian
        );

        this.imgSwapCounter++;

        //test hit box

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

    function drawRotatedImage(image, x, y, radian) { 
        context.save(); 
        context.translate(x, y);
        context.rotate(radian + Math.PI/2);
        context.drawImage(image, -(image.width/2), -(image.height/2));
        context.restore(); 
    }

    Ship.prototype.fireBullet = function () {
        if (this.vel[0] || this.vel[1]) {

            this.bulletDelay += 1;

            if (this.pendingFireBullet && 
                this.bulletDelay >= Ship.BULLET_COOLDOWN) {

                this.bulletDelay = 0;
                this.pendingFireBullet = false;

                var bulletVel = Asteroids.Bullet.calcVel(this.vel); 

                var newPos = this.pos.slice();

                // Single bullet
                // return [new Asteroids.Bullet(
                //     newPos,
                //     bulletVel,
                //     game
                // )];

                var radian = this.calcRadian(this.vel[0], this.vel[1]);
                
                return [
                    (new Asteroids.Bullet(
                        [newPos[0] + 15 * Math.sin(radian), newPos[1] - 15 * Math.cos(radian)],
                        bulletVel,
                        game
                        )
                    ),
                    (new Asteroids.Bullet(
                        [newPos[0] - 15 * Math.sin(radian), newPos[1] + 15 * Math.cos(radian)],
                        bulletVel,
                        game
                        )
                    )
                ];
            }
            else {
                this.pendingFireBullet = false;
            }

        }
        return null;
    }


})(this);