 import UI from './modulos/ui.js'
 const ui = new UI;    

 const btnContainerFinger = document.getElementById("finger-container");
 const btnOpenStats = document.getElementById('openStats');
 const elementTime = document.getElementById('time');
 const timeList = document.getElementById("time-list");
 const loginModal = document.getElementById("login");

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
 // var xhReq = new XMLHttpRequest();
 // xhReq.open("GET", "users.json", false);
 // xhReq.send(null);
 // var datos = JSON.parse(xhReq.responseText);

 // for (var i = 0; i < datos.users[0].times.length; i++) {
 //     ui.insertTimeInList(datos.users[0].times[i], i);
 // }


 // EVENTS /////////////////////////////////////////////////////////////////////
 document.getElementById("btnShowLogIn").addEventListener("click", () => {
     ui.showLogInModal(loginModal)
     document.removeEventListener("keypress", spaceEventPress);
     document.removeEventListener("keyup", spaceEventUp);
    });

 document.getElementById("btnCloseLogin").addEventListener("click", () => {
     ui.hiddenLogInModal(loginModal)
     document.addEventListener("keypress", spaceEventPress);
     document.addEventListener("keyup", spaceEventUp);
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

// ESTA FUNCTION SIRVE PARA QUE AL MANTENER PULSADO
// O DAR CLICK DERECHO EN UN CELULAR O PC NO APAREZCAN OPCIONES
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
