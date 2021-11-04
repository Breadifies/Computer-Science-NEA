function showBtn() {//displays or removes the relevant div element using a button 
    let x = document.getElementById("objectTopChild");
    if (x.style.display === "none") {//changes the CSS style of the block depending on what it is currently
      x.style.display = "block";
    }else{
      x.style.display = "none";
    }
  }


  
  