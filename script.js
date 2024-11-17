let duckieParts = document.querySelectorAll(".duckie");
let duckie = document.querySelector('#theduckie')
let health = 100;
let yhealth = 100;
let aggression = 0;
let ducksize = 1;
let aggressionDisplay = document.getElementById("agr");
let healthDisplay = document.getElementById("opponenthealth");
let yhealthDisplay = document.getElementById("yourhealth");
let mouse = document.getElementById("mouse");
if (document.getElementById("enterspeak")) {
    document.getElementById("enterspeak").addEventListener("click", enteryourspeak);
}

duckieParts.forEach(part => {
    part.addEventListener("click", engage);
});

let maxresponse = "QUACK-A-DOODLE-DOO!";
let typingresponse = "<i>Banana Duck is typing...</i>";
let yourresponse;
let engaged = false;
let duckresponse = document.getElementById("duckspeak").innerText;
function engage() {
  if (!engaged) {
    engaged = true;
    document.getElementById("engage").style.display = "inline";
    mouse.setAttribute('visible', false);
    document.getElementById("duckspeak").innerHTML = typingresponse;
    setTimeout(()=>{document.getElementById("duckspeak").innerText = "quack";}, 1500);
  }

}

let anum = 0;
let qnum = 0;
let angryduck = false;

let chosenquack = "quackie";
function choosequack() {
  switch (Math.floor(Math.random() * 9)) {
    case 1:
      chosenquack = "quack";
      break;
    case 2:
      chosenquack = "QUACK";
      break;
    case 3:
      chosenquack = "quackey";
      break;
    case 4:
      chosenquack = "quack quack";
      break;
    case 5:
      chosenquack = "QUACK QUACK";
      break;
    case 6:
      chosenquack = "quick quack";
      break;
    case 7:
      chosenquack = "quack quick";
      break;
    case 8:
      if(Math.floor(Math.random() * 9) == 8) {
        chosenquack = "BEEP!";
      } else {
        chosenquack = "quack quack quack";
      }
      break;
  }
  document.getElementById("duckspeak").innerText = chosenquack;
}

let counter = 0;
function enteryourspeak() {
    if (yourresponse = document.getElementById("youspeak").value) {
    yourresponse = document.getElementById("youspeak").value;
  }
  anum = Math.floor(Math.random() * 10);
  for (let i=0; i<yourresponse.length; i++) {
    if (yourresponse[i] == "q" || yourresponse[i] == "Q") {
      qnum++;
    }
  }
  aggression += Math.abs(anum - qnum);
  document.getElementById("agr").innerText = "Aggression: " + aggression;
  document.getElementById("youspeak").value = "";
  document.getElementById("duckspeak").innerHTML = typingresponse;
    setTimeout(()=>{if(!(aggression >= 15)) {choosequack();}}, 1500);
  if (aggression >= 15) {
    if(angryduck) {
      document.getElementById("agr").style.display = "none";
      document.getElementById("popup").style.display = "inline";
      document.getElementById("engage").style.display = "none";
    } else {
      document.getElementById("duckspeak").innerText = maxresponse;
      angryduck = true;
    }
  }
  counter++;
  if (counter >= 9) {
    duckieParts.forEach(part => {part.setAttribute('visible', 'false');});
      document.getElementById("popup").style.display = "inline";
      document.getElementById("fightmode").style.display = "none";
      document.getElementById("fightmode").style.display = "engage";
      document.getElementById("pfightmode").innerText = "Successful Peaceful Negotiation!";
  }
}

if(document.getElementById("fightmode")) {document.getElementById("fightmode").addEventListener("click", ()=> {
  aggressionDisplay.style.display = "none";
  healthDisplay.style.display = "inline";
  yhealthDisplay.style.display = "inline";
  document.getElementById("popup").style.display = "none";
  document.getElementById("fightinstruct").style.display = "inline";
})}




function changeDuckSize(newsize) {
  ducksize = newsize;
  duckie.setAttribute('scale', ducksize + " " + ducksize + " " + ducksize);
}
 
document.addEventListener('keydown', function(event) {
  if (event.key === " ") {
    health -= Math.floor((Math.random() * 20) + 5);
    changeDuckSize(health*0.01);
    healthDisplay.textContent = `Opponent Health: ${Math.max(0, health)}`;

    if (health <= 0) {
      duckieParts.forEach(part => {part.setAttribute('visible', 'false');});
      document.getElementById("popup").style.display = "inline";
      document.getElementById("fightmode").style.display = "none";
      document.getElementById("fightinstruct").style.display = "none";
      document.getElementById("yourhealth").style.display = "none";
      document.getElementById("opponenthealth").style.display = "none";
      document.getElementById("pfightmode").innerText = "Banana Duck Defeated!";
    }
    
    setTimeout(()=>{
      yhealth -= Math.floor((Math.random() * 20) + 5);
      document.getElementById("exploded").style.display = "inline";
      document.getElementById("exploded").style.animation = "explodey 3s";
      setTimeout(()=>{document.getElementById("exploded").style.display = "none";}, 3000);
      yhealthDisplay.textContent = `Your Health: ${Math.max(0, yhealth)}`;
    }, 1000);
    
    if (yhealth <= 0) {
      duckieParts.forEach(part => {part.setAttribute('visible', 'false');});
      document.getElementById("popup").style.display = "inline";
      document.getElementById("fightmode").style.display = "none";
      document.getElementById("fightinstruct").style.display = "none";
      document.getElementById("yourhealth").style.display = "none";
      document.getElementById("opponenthealth").style.display = "none";
      document.getElementById("pfightmode").innerText = "You Were Defeated!";
    }
  }
}); 