var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth; //setting the canvas area to be the entire window
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");  //c stands for context

window.addEventListener("resize", function(){ //function to resize canvas when you resize window
    canvas.width = window.innerHeight;
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
    function(){
    cBodies.push(new cObject(mouse.x, mouse.y, 2, 1, 30, 20, 0, false));
 })


var UGC = -10;
var sun = new cObject(450, 400, 0, 0, 50, 50, 0, false);
sun.static = true;
var cBodies = [sun];






function cObject(x, y, dx, dy, radius, mass, size, collide){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.mass = mass;
    this.size = size;
    this.collide = collide;
    this.ax = 0;
    this.ay = 0;
    this.static = false;

    this.draw = function(){ //function to "draw" the cObject circle on the canvas
        c.beginPath(); 
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); //drawing a circle using arcs, taking positions, radius and direction of arc drawing
        c.strokeStyle = "black"; //colour of circle border
        c.stroke();
        c.fillStyle = "black";//colour of circle
        c.fill();
    }

    this.updateVel = function(otherBody) {//
        if (this.static == true){
            return null;
         }else if (cBodies.length > 1){
        for (var i = 0; i< cBodies.length;i++){
            if (otherBody != this){
            var distx = this.x - otherBody.x
            var disty = this.y - otherBody.y
            var forcex = (UGC*this.mass*otherBody.mass)/(distx*distx);
            var forcey = (UGC*this.mass*otherBody.mass)/(disty*disty);
            if (distx<0){
                forcex = -forcex;
            }
            if (disty<0){
                forcey = -forcey;
            }
            this.ax = (forcex/mass);
            this.ay = (forcey/mass);
            this.dx += this.ax;
            this.dy += this.ay;
            
            }
         }
    
    }

    }
    
    this.updatePos = function() {
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }


   
    
   


    
 };



function animate() { //function which animates the objects, looping through time steps
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);//resets the state of the entire window
    // for (var i = 0; i < cBodies.length; i++){
    //     for (var j = 0; j < cBodies.length;j++){
    //     cBodies[i].updateVel();
    //     }
    // }

    for (var i = 0; i < cBodies.length; i++){
        for (var j = 0;j < cBodies.length; j++){
            cBodies[i].updateVel(cBodies[j]); //every time this loop is called, it goes through each circle in the array
        }
       
    }



    for (var i = 0;i < cBodies.length; i++){//dynamic arrays in javascript, loops for every cBodies object
        cBodies[i].updatePos()
    }
    
}


animate();




//TIMELINE
//Initialse as usual accroding to template for circles
//Put in variables as put before
//use vairavbles for x and y directions opposed to vectors
//integrate mouseclick events


