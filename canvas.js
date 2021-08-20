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

var colorpalette = ["cyan", "brown", "black", "darkblue", "white", "turquoise"];
var color = colorpalette[Math.floor(Math.random() * colorpalette.length)];






function Circle(x, y, dx, dy, radius,) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function(){  //function to draw circle
        c.beginPath(); 
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); 
        c.strokeStyle = color;
        c.stroke(); 
        c.fillStyle = color;
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

        this.draw(); //calls draw function

    }
}




var circleArray = [];  //stores all instances of circles into array

for (var i = 0;i < 1000; i++){ 
    var radius = Math.random()*5;
    var x = Math.random()*(innerWidth-radius*2)+radius;//stops spawning outside screen
    var y = Math.random()*(innerHeight-radius*2)+radius;
    var dx = (Math.random()-0.5) * 20;
    var dy= (Math.random()-0.5) * 5;

    circleArray.push(new Circle(x, y, dx, dy, radius));  //adds a circle to the array
}




function animate() { //animating the object
    requestAnimationFrame(animate); //loops again
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update(); //every time this loop is called, it goes through each circle in the array
    }
   
}
animate();
