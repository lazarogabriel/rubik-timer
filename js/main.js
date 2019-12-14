class UI{

    insertTimeInList(tiempo, timesCant){
        const list = document.getElementById("time-list");
        const elementTime = document.createElement('div');
        elementTime.innerHTML = `
            <span>${timesCant}- ${tiempo.toFixed(2)}</span>
            <span class="float-right">
                <button type="button" name="info" class="font-weight-bold text-dark btn btn-warning btn-sm">Info</button>
                <button type="button" name="delete" class="font-weight-bold btn btn-danger btn-sm">X</button>
            </span>
        `;
        list.appendChild(elementTime);
    }

    deletTime(element){
        if(element.name === 'delete')element.parentElement.parentElement.remove();
    }

    showTimeInfo(element){
        //if(element.name === 'info')console.log(element.parentElement.parentElement);
    }
    
    animationIn(element){
      var i = -50;
      var animationTimeOut = setInterval( () => {
          i += 2;
          element.style.top = i +"%";
          if(i > 49)clearInterval(animationTimeOut);
      }, 5);
    }

    animationOut(element){
      var i = 50;
      var animationTimeOut = setInterval( () => {
          i -= 2;
          element.style.top = i + "%";
          if(i < -49)clearInterval(animationTimeOut);
      }, 5);
    }
}


 const ui = new UI;
 const mainContainer = document.getElementById("main");
 const btnContainerFinger = document.getElementById("finger-container");
 const btnOpenStats = document.getElementById('openStats');
 const elementTime = document.getElementById('time');
 const timeList = document.getElementById("time-list");
 const loginModal = document.getElementById("loginModal");
 const registerModal = document.getElementById("registerModal");

 var tiempo = 0;
 var tiempoPulsado = 0;
 var intervalo;
 var bandera = false;
 var timesCant = 1;

 // PARA LEVANTAR EL USUARIOS
 
 // fetch('./users.json')
 //     .then( (resp) => {
 //         return resp.json();
 //     })
 //     .then( (data) => {
 //         datos = data.users;
 //     });

//  var xhReq = new XMLHttpRequest();
//  xhReq.open("GET", "users.json", false);
//   xhReq.send(null);
//   var datos = JSON.parse(xhReq.responseText);

//  for (var i = 0; i < datos[0].times.length; i++) {
//      ui.insertTimeInList(datos[0].times[i], i);
//   }
//   console.log(datos);


 // EVENTS /////////////////////////////////////////////////////////////////////
document.getElementById("btnShowLogIn").addEventListener("click", () => {
    ui.animationIn(loginModal);
    mainContainer.style.opacity = "0.3";
    document.removeEventListener("keypress", spaceEventPress);
    document.removeEventListener("keyup", spaceEventUp);
});

document.getElementById("btnCloseLogin").addEventListener("click", () => {
    ui.animationOut(loginModal);
    mainContainer.style.opacity = "1";
    document.addEventListener("keypress", spaceEventPress);
    document.addEventListener("keyup", spaceEventUp);
});

document.getElementById("btnShowRegister").addEventListener("click", () => {
    ui.animationIn(registerModal);
    ui.animationOut(loginModal);
});

document.getElementById("btnCloseRegister").addEventListener("click", () => {
    ui.animationOut(registerModal);
    mainContainer.style.opacity = "1";
    document.removeEventListener("keypress", spaceEventPress);
    document.removeEventListener("keyup", spaceEventUp);
}); 


 btnContainerFinger.addEventListener("click", () => {
     bandera ? playStopCronometro() : "";
 });

// CLICK EVENT
Pressure.set(btnContainerFinger,  {
    start: () => {
        tiempoPulsado++;
        document.body.style.background = "#742121";  //ROJO
        if(bandera === true)playStopCronometro();
    },
    end: () => {
        document.body.style.background = "#1F334B"; //AZUL
    },
    endDeepPress: () => {
        document.body.style.background = "#1F334B"; //AZUL
        bandera = true;
        playStopCronometro();
    },
    startDeepPress : () => {
        document.body.style.background = "#1F4B2A";  // VERDE
   }

 }, {only: 'mouse'});
// END CLICK EVENT


// TOUCH SCREEN EVENT
  Pressure.set(btnContainerFinger, {
    change: () => {
        tryPlay();
      },
      end: () => {
        Play();
      }
  }, {only: 'touch'});
// END TOUCH SCREEN EVENT

// SPACE KEY EVENT
document.addEventListener("keypress", spaceEventPress);
document.addEventListener("keyup", spaceEventUp);

function spaceEventPress (e){
    e = e || window.event;
    let charCode = e.keyCode || e.which;
    if (charCode === 32)tryPlay();
    e.preventDefault();
};

function spaceEventUp(e) {
    e = e || window.event;
    let charCode = e.keyCode || e.which;
    if (charCode === 32)Play();

};
// END SPACE KEY EVENT

btnOpenStats.addEventListener('click', () => window.scrollTo({
    top: 500,
    behavior: 'smooth',
}));

timeList.addEventListener("click", (e) => {
    ui.showTimeInfo(e.target);
    ui.deletTime(e.target);
});

// END EVEENTSSS /////////////////////////////////////////////////////////////


// CRONOMETER FUNCTIONS //////////////////////////////////////////////////////
function tryPlay(){
    tiempoPulsado++;
    document.body.style.background = "#742121";
    if(bandera)playStopCronometro();
    if(tiempoPulsado > 20 )document.body.style.background = "#1F4B2A";
}

function Play(){
    document.body.style.background = "#1F334B";
    if(tiempoPulsado < 20)return;
    tiempoPulsado = 0;
    bandera = true;
    playStopCronometro();
}

function playStopCronometro() {
    if(tiempo === 0){
        elementTime.classList = "start";
        intervalo = setInterval( () => {
            tiempo += 0.01;
            elementTime.textContent = tiempo.toFixed(2);
        }, 10);
    }else{
        elementTime.classList = "stop";
        ui.insertTimeInList(tiempo, timesCant);
        bandera = false;
        timesCant++;
        tiempo = 0;
        clearInterval(intervalo);
    }
};


// REMOVE OPTIONS DEFAULTS WHEN TOUCH LONG IN MOBILE DEVICESS
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};


////// PRELOEADER
window.onload = () => {
    const preloaderElement = document.getElementById("preloader");
    var i = 1;

    var fadeInAnimation = setInterval(() => {
        i -= 0.1;
        preloaderElement.style.opacity = i;
        if(i <= 0){
            clearInterval(fadeInAnimation);
            preloaderElement.style.display = "none";
        }
    }, 20);
};