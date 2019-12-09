



 const btnContainerFinger = document.getElementById("finger-container");
 const btnOpenStats = document.getElementById('openStats');
 const elementTime = document.getElementById('time');
 const timeList = document.getElementById("time-list");

 var tiempo = 0;
 var tiempoPulsado = 0;
 var intervalo;
 var bandera = false;
 var timesCant = 1;


 // PARA LEVANTAR EL USUARIOS
    // var xhReq = new XMLHttpRequest();
    // xhReq.open("GET", "users.json", false);
    // xhReq.send(null);
    // var datos = JSON.parse(xhReq.responseText);

    // for (var i = 0; i < datos.users[0].times.length; i++) {
    //     interface.insertTimeInList(datos.users[0].times[i], i);
    // }

 document.getElementById("btnShowLogIn").addEventListener("click", () => interface.showLogInModal());
 document.getElementById("btnCloseLogin").addEventListener("click", () => interface.hiddenLogInModal());

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

playStopCronometro = () => {
    if(tiempo === 0){
        elementTime.classList = "start";
        intervalo = setInterval( () => {
            tiempo += 0.01;
            elementTime.textContent = tiempo.toFixed(2);
        }, 10);
    }else{
        elementTime.classList = "stop";
        interface.insertTimeInList(tiempo, timesCant);
        bandera = false;
        timesCant++;
        tiempo = 0;
        clearInterval(intervalo);
    }
};


btnOpenStats.addEventListener('click', () => window.scrollTo({
    top: 500,
    behavior: 'smooth',
}));

timeList.addEventListener("click", (e) => {
    interface.showTimeInfo(e.target); 
    interface.deletTime(e.target); 
});

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


// ESTA FUNCTION SIRVE PARA QUE AL MANTENER PULSADO
// O DAR CLICK DERECHO EN UN CELULAR O PC NO APAREZCAN OPCIONES
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};


var interface =  {
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
    },
    deletTime(element){
        if(element.name === 'delete')element.parentElement.parentElement.remove();
    },
    showTimeInfo(element){
        //if(element.name === 'info')console.log(element.parentElement.parentElement);
    },
     showLogInModal(){
        document.getElementById("main").style.opacity = "0.3";
        document.removeEventListener("keypress", spaceEventPress);
        document.removeEventListener("keyup", spaceEventUp);
        document.getElementById("login").style.display = "block";

    },
    hiddenLogInModal(){
        document.getElementById("main").style.opacity = "1";
        document.addEventListener("keypress", spaceEventPress);
        document.addEventListener("keyup", spaceEventUp);
        document.getElementById("login").style.display = "none";   
    }
}