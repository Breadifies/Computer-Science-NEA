
var canvas = document.querySelector("canvas");  //c stands for context
canvas.width = window.innerWidth;//setting the canvas area to be the entire window
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
var cBodies = [];
const UGC = 0.1; //global variable to change gravitational constant
const softeningConstant = 0;
function init() {//inititalidsses the entire simulation
    createBodies();
    setInterval(function(){//setInterval() is a prebuilt method which calls functions rep0eatredly with a time delay
        updateSystem();
        updateBodies(0.08);
        c.clearRect(0, 0, innerWidth, innerHeight);//clears entire window so that more objects can be "animated"
        drawBodies();
    }, 8)
    
}

window.addEventListener("resize", function(){ //function to resize canvas when you resize window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

var mouse = { //i will take values of mouse position on window
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", //all data about the mouse is retrieved
    function(event){
        mouse.x = event.x;//values relative to the window are retrieved from browser and copied to mouse variables
        mouse.y = event.y;
    })

window.addEventListener("mousedown",//event when user clicks the screen with the mouse once
    function(){//as of now, initialises bodt with preset velocities
    cBodies.push(new cObject(mouse.x, mouse.y, 5, 0 ,0, 1));
 })


function createBodies(){ //instantiate the prewritten bodies
    cBodies.push(new cObject(window.innerWidth/2, window.innerHeight/2, 15, 0, 0, 100));
    cBodies.push(new cObject(window.innerWidth/2 + 100, window.innerHeight/2, 2, 0, 0, 10));
}

function drawBodies(){ //separate function for drawing the new pointsfor each cObject
    for (var i = 0;i< cBodies.length;i++){ //iterates for every cObject in the array
    cBodies[i].draw(c);
    }
}

function updateBodies(dt){ //function for executing update method for every cObject
    for(var i = 0; i < cBodies.length;i++){
        cBodies[i].update(dt);
    }
}

function updateSystem(){
    for(var i = 0;i < cBodies.length;i++){ //more efficient than previous method, less checks, more comapct 
        for (var j = 0;j< cBodies.length;j++){
            if(i==j)continue; //continue terminates the exectuion and moves onto the next iterative loop, like previously made if (otherBody != this)
            var b1 = cBodies[i]; //like this and otherBody
            var b2 = cBodies[j];

            var distance = Math.sqrt(  //calculating via pythagoras
                (b1.x - b2.x)*(b1.x - b2.x) +
                (b1.y - b2.y)*(b1.y - b2.y)
            );

            var force = UGC*(b1.mass*b2.mass)/distance/(distance + softeningConstant);//Law of gravitation
            
            var nx = (b2.x - b1.x)/distance;
            var ny = (b2.y - b1.y)/distance;

            b1.ax += nx * force / b1.mass;
            b1.ay += ny * force / b1.mass;
            b2.ay -= nx * force / b2.mass;
            b2.ay -= ny * force / b2.mass;
        }
    }
}



function cObject(x, y, radius, v, angle, mass){ //class for creating objects
    this.x = x;
    this.y  = y;
    this.radius = radius;
    this.vx = v * Math.cos(angle); //locate the direction of the velocity for both x and y values in the absence of inbuilt functions
    this.vy = v * Math.sin(angle);
    this.mass = mass;
    this.ax = 0;
    this.ay = 0;

    this.draw = function(c){ //draws the object on the canvas
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.stroke();
        c.fill();

    }

    this.update = function(dt){ //updates the velocities and positions of the object with respect to time
        this.vx += this.ax * dt; //velocity = acceleration * time
        this.vy += this.ay * dt;

        this.x += this.vx * dt;//distance = velocity * time
        this.y += this.vy * dt;
    };



}
init();