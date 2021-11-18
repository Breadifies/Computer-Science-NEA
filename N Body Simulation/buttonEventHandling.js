////////////////////////

function showBtnPhysics() {//displays or removes the relevant div element using a button 
    let x = document.querySelector("#physicsChild");
    if (x.style.display === "none") {//changes the CSS style of the block depending on what it is currently
      x.style.display = "block";
    }else{
      x.style.display = "none";
    }
  }

document.querySelector("#ugcChange").value = nBodyInstance.UGC; //sets textbox value to that of default

document.querySelector("#updateUGC").addEventListener("click",function() {
  if ((document.querySelector("#ugcChange").value) >= 750){
    document.querySelector("#ugcChange").value = 750;
  }else if ((document.querySelector("#ugcChange").value) <= -750){
    document.querySelector("#ugcChange").value = -750;
  }
  //validation check for in range
  nBodyInstance.UGC = document.querySelector("#ugcChange").value;
  //replaces the value of UGC with what is in the textbox
});


function slideUpdateUGC(value) { //updates textbox value based on slider value
  document.querySelector("#ugcChange").value = value;
}

//////////////////////////

function showBtnTime() {
  let x = document.querySelector("#timeChild");
  if (x.style.display ==="none") {
    x.style.display = "block";
  }else{
    x.style.display = "none";
  }
}

document.querySelector("#timeChange").value = nBodyInstance.dt;

document.querySelector("#updateTime").addEventListener("click", function()
{
  if ((document.querySelector("#timeChange").value) >= 10){
    document.querySelector("#timeChange").value = 10;
  }else if ((document.querySelector("#timeChange").value) <= -10){
    document.querySelector("#timeChange").value = -10;
  }
  nBodyInstance.dt = document.querySelector("#timeChange").value * dt;
   //normalises scale for time relative to the original time
});

function slideUpdateTime(value) {
  document.querySelector("#timeChange").value = value;
}