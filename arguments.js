function sum () {
    var args = Array.prototype.slice.call(arguments);
    var total = 0;

    for(var i = 0; i < args.length; i++) {
        total += args[i];
    }

    return total;
}

// console.log(sum(1,2,3,4));

Function.prototype.myBind = function () {
    var that = this;
    var obj = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        return that.apply(obj, args);
    };
}


function Cat () {
    this.name = "blah";
}

function printName (arg1, arg2, arg3, arg4) {
    return this.name + arg1 + arg2 + arg3 + arg4;
}
cat = new Cat();


var myBoundFunction = printName.myBind(cat, "georgie", "is", "the", "boss");
// console.log( myBoundFunction() );

function curriedSum (numArgs) {
    var numbers = [];

    function _curriedSum (num) {
        numbers.push(num);
        if (numbers.length == numArgs){
            var total = 0;
            for( var i = 0; i < numbers.length; i++ ){
                total += numbers[i];
            }
            return total;
        } else {
            return _curriedSum;
        }
    }

    return _curriedSum;
}


Function.prototype.curry = function(numArgs){
    var args = [];
    var that = this;

    function _curry (arg) {
        args.push(arg);

        if (args.length == numArgs){
            return that.apply(this, args);
        } else {
            return _curry;
        }
    }
    return _curry;
};



Function.prototype.inherits = function(parentClass) {
    function Surrogate() {}

    Surrogate.prototype = parentClass.prototype;
    this.prototype = new Surrogate();
};

function MovingObject(velocity, size) {
    this.velocity = velocity;
    this.size = size;
};

MovingObject.prototype.move = function() {
    console.log("Hey i'm a moving OBJECT...that can talk!");
};




function Ship (velocity, size, name) {
    MovingObject.apply(this, arguments)
};
Ship.inherits(MovingObject);



function Asteroid (velocity, size, mass) {
    MovingObject.call(this, velocity, size);
    this.mass = mass;
};

Asteroid.inherits(MovingObject);

Asteroid.prototype.move = function() {
    console.log("Hey i'm a moving ASTEROID...that can talk!");
};


var bob = new Asteroid(5, "5 meters", "1 gram");
var sally = new Ship(100, "1 centimeter", "100 tons" );
var mover = new MovingObject(10000, "5 kilometers", "1 milligram");
bob.move();
sally.move();
mover.move();


// var summation = curriedSum(4);
// console.log( summation(5)(30)(20)(1) );

// var summation = sum.curry(4);
// console.log(summation(5)(2)(4)(3));

// console.log( summation(5)(30)(20)(1) );


// equivalent to `obj.myFunction(1, 2, 3)`
// myBoundFunction(3);
//
// Cat.meow.myBind(obj, 1, 2)
//
// obj.meow(1, 2);
//
// arguments[0] = obj
// arguments[1..end] = args