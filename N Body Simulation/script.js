
//nBodySimulation creates an isolated instance of an n body simulation
class nBodySimulation {
    //encapsulating the previously global variables this way allow for easier manipulation especially when the user starts to change the values of of these parameters for themselves
    constructor(params) {
      this.UGC = params.UGC;
      this.dt = params.dt;
      this.softeningConstant = params.softeningConstant;
      this.cBodies = params.cBodies;
    }
  
    updatePos() { //separate function to update cObject positions
      const cBodiesLen = this.cBodies.length;
        //for loop for every element in cBodies array
      for (let i = 0; i < cBodiesLen; i++) {
        const thisBody = this.cBodies[i];
  
        thisBody.x += thisBody.vx * this.dt; //v = d/t
        thisBody.y += thisBody.vy * this.dt;
      }
  
      return this;
    }
  
    updateVel() { //separate function to update cObject velocities
      const cBodiesLen = this.cBodies.length;
  
      for (let i = 0; i < cBodiesLen; i++) {
        const thisBody = this.cBodies[i];
  
        thisBody.vx += thisBody.ax * this.dt; //a = v/t
        thisBody.vy += thisBody.ay * this.dt;
      }
    }
  
    updateAccel() { //acceleration update utlising law of gravitation
      const cBodiesLen = this.cBodies.length;
  
      for (let i = 0; i < cBodiesLen; i++) {
           //initialising acceleration which is reset to 0 after loop after its calculation has been passed onto velocity.
        let ax = 0;
        let ay = 0;
        
        //defining this body and the body acting on it
        const thisBody = this.cBodies[i];
  
        //nested for loop checks 1 object against all other objects then repeats for every other object
        for (let j = 0; j < cBodiesLen; j++) {
          if (i !== j) { //more concise than (thisBody != otherBody) prevents checking the same object against itself
            const otherBody = this.cBodies[j];
  
            const dx = otherBody.x - thisBody.x;
            const dy = otherBody.y - thisBody.y;
            
            //sum of the distances between the objects squared
            const distSq = dx * dx + dy * dy;
  
            const force = (this.UGC * otherBody.m) / (distSq * Math.sqrt(distSq + this.softeningConstant));
            //Law of gravitation for one body's force acting on another, softening constant exists to prevent error of infintesimaly small distances as the objects are treated as particles rather than objects with pass

            ax += dx * force;
            ay += dy * force;
          }
        }
  
        thisBody.ax = ax;
        thisBody.ay = ay;
      }
  
      return this;
    }
  }

  
  const UGC = 30;
  const dt = 0.008; 
  const softeningConstant = 0.15;
  
  //a scale reference is made when basing upon what the values of the cObjects should be, in this scenarion, m is equal to 1 solar mass
  const cBodies = [{
      m: 1,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 20,
      color:"249, 215, 28,",
    },
    {
      m: 1.66e-7,
      x: -0.346,
      y: -0.272,
      vx: 4.251,
      vy: -7.62,
      radius: 7,
      color:"0, 12, 153,",
    },
    {
      m: 2.45e-6,
      x: -0.168,
      y: 0.698,
      vx: -7.21,
      vy: -1.77,
      radius: 7,
      color:"100, 240, 150,",
    },
    {
      m: 3e-6,
      x: 0.649,
      y: 0.748,
      vx: -4.85,
      vy: 4.97,
      radius: 7,
      color:"210, 200, 24,",
    },
    {
      m: 3.2e-7,
      x: -0.57,
      y: -1.39,
      vx: 4.92,
      vy: -1.51,
      radius: 7,
      color:"230, 230, 200,",
    }
  ];
  




 
//function to create an nBodySimulation using the parameters provided
  const nBodyInstance = new nBodySimulation({
    UGC,
    dt,
    cBodies: JSON.parse(JSON.stringify(cBodies)), //passing a copy of cBodies as set in the JSON format, stringified then parsed so that its interpreted as objects, prevents original cBodies from being affected  
    softeningConstant
  });
  
  






  
  class cObject { //class for construction of a cObject 
    constructor(c, trailLength, radius, color) {
      this.c = c; //retrieves drawing context from canvas
      this.trailLength = trailLength;
      this.radius = radius;
      this.color = color;
      this.positions = []; //array of x and y value pairs
    }
  
    storePosition(x, y) {
      this.positions.push({x, y}); //inserts cObject x and y values as an object into positions array
  
      if (this.positions.length > this.trailLength)
      this.positions.shift();//shift() method removes the first element from positions array, ensures only newest trail is shown
    }
  
    draw(x, y) {
      this.storePosition(x, y);
  
      const positionsLen = this.positions.length;
  
      for (let i = 0; i < positionsLen; i++) {
        let transparency;
        let circleScaleFactor;
  
        const scaleFactor = (i / positionsLen);  //this scale factor determines how faded away the trail circle is by comparing its position in the positions array with the length of the array, with smaller values resulting in more faded values (as closer to the beginning of the array would be further away from the current position)
  
        if (i === positionsLen - 1) {
          transparency = 1;
          circleScaleFactor = 1;
        } else {
          transparency = scaleFactor / 2 -0.18;      
          circleScaleFactor = scaleFactor;
        }
  
        this.c.beginPath(); //drawing of the actual circle on canvas
        this.c.arc(
          this.positions[i].x,
          this.positions[i].y,
          (circleScaleFactor) * this.radius,
          0,
          Math.PI*2,
          false
        );
        this.c.fillStyle = `rgb(${this.color} ${transparency})`,
  
        this.c.fill();
      }
    }
  }
  
  
  const canvas = document.querySelector("canvas"); //c stands for context
  const c = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  
  window.addEventListener("resize", function(){ //function to resize canvas when you resize window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

  
  const scale = 70;
  const radius = 7;
  const trailLength = 50;
  
  //takes objects from cBodies array and instantiates a cObject 
  const populatecObjects = function(cBodies){
    cBodies.forEach(
      function(cBody){
      (cBody["cobject"] = new cObject(c,trailLength, cBody.radius, cBody.color))
    });
  };
  
  populatecObjects(nBodyInstance.cBodies);

//animates and iteratively draws the objects visually on the canvas
  const animate = () => {
    nBodyInstance.updatePos().updateAccel().updateVel();
  
    c.clearRect(0, 0, width, height);  //clears the canvas screen of any objects (to input new psotions of objects)
  
    const cBodiesLen = nBodyInstance.cBodies.length;
  
    for (let i = 0; i < cBodiesLen; i++) {
        const thisBody = nBodyInstance.cBodies[i];
  
     //centers the postion of the bodies relative to the canvas screen
        const x = width / 2 + thisBody.x * scale;
        const y = height / 2 + thisBody.y * scale;
  
      thisBody.cobject.draw(x, y);
  
      
    }
  
    requestAnimationFrame(animate);
  };
  
  animate();


