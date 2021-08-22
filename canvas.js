var canvas = document.querySelector("canvas")
    ;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
 
var c = canvas.getContext("2d");    //c stands for context













// // How to draw lines
// c.beginPath(); //begins path
// c.moveTo(50, 300); //where to start
// c.lineTo(300, 100); //where to end
// c.lineTo(500, 200) //extends the line more
// c.strokeStyle = "#fac324" //cange colors using css
// c.stroke(); //draws its

// // How to draw rectangles
// c.fillStyle = "rgba(255, 2, 4, 0.8)"; //can also use hex like before
// c.fillRect(700, 200, 14, 58); //draws rectangle

// //How to draw arcs and Circles
// c.beginPath(); //creates new separate path
// c.arc(600, 500, 30, 0, Math.PI*2, false); 
// c.strokeStyle = "blue";
// //draws circle (x, y, radius, startAngle, endAngle, drawCounterClockwise)
// c.stroke(); //draws circle

// var colorpalette = ["red", "yellow", "blue", "green", "purple", "cyan"];
// for (var i = 0;i < 50;i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var color = colorpalette[Math.floor(Math.random() * colorpalette.length)];
//     c.beginPath(); 
//     c.arc(x, y, 30, 0, Math.PI*2, false); 
//     c.strokeStyle = color;
//     c.stroke(); 
// }

//CTRL + K + U to uncomment

var mouse = {
    x: undefined,
    y: undefined
}


var colorpalette = ["cyan", "brown", "black", "darkblue", "white", ];



var maxRadius = 40;
var minRadius= 5;
window.addEventListener("mousemove",
     function(event){ //event argument takes the positions of associated events (mouse)onscreen
    mouse.x = event.x;
    mouse.y = event.y;
     })

window.addEventListener("resize", function(){  //function to resize canvas when you resize window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


function Circle(x, y, dx, dy, radius,) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorpalette[Math.floor(Math.random() * colorpalette.length)];
    this.draw = function(){  //function to draw circle
        c.beginPath(); 
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); 
        c.strokeStyle = this.color;
        c.stroke(); 
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius< 0) {
            this.dx = -this.dx;
            }
        
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
            }

        this.y += this.dy;
        this.x += this.dx;

        //this is where interactivity occurs

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
            this.radius += 1;
            }
        }else if (this.radius > this.innerHeightRadius) {
            this.radius-= 0.1;
        }




        this.draw(); //calls draw function

    }
}


var circleArray = [];  //stores all instances of circles into array

function init() { //calls function every time (compensates for resized windows)

    circleArray = []
    for (var i = 0;i < 500; i++){ 
        var radius = Math.random()*10 + 1;
        var x = Math.random()*(innerWidth-radius*2)+radius;//stops spawning outside screen
        var y = Math.random()*(innerHeight-radius*2)+radius;
        var dx = (Math.random()-0.5) * 8;
        var dy= (Math.random()-0.5) * 5;
    
        circleArray.push(new Circle(x, y, dx, dy, radius));  //adds a circle to the array
    }    

};


function animate() { //animating the object
    requestAnimationFrame(animate); //loops again
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update(); //every time this loop is called, it goes through each circle in the array
    }
   
}

init();
animate();
