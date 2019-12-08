
    class UI {

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
            if(element.name === 'info')console.log(element.parentElement.parentElement);

        }
    }




 const btnContainerFinger = document.getElementById("finger-container");
 const btnOpenStats = document.getElementById('openStats');
 const elementTime = document.getElementById('time');
 var tiempo = 0;
 var tiempoPulsado = 0;
 var intervalo;
 var bandera = false;
 var timesCant = 0;

 var interface = new UI;

 btnContainerFinger.addEventListener("click", () => playStopCronometro());


//     document.body.style.background = "#742121"; rojo
//     document.body.style.background = "#1F4B2A"; verde
//     document.body.style.background = "#1F334B"; azul
 


document.onkeypress = (e) => {
    e = e || window.event;
    let charCode = e.keyCode || e.which;
    if (charCode === 32) {
        tiempoPulsado++;
        document.body.style.background = "#742121";
        if(bandera === true)playStopCronometro();
        if(tiempoPulsado > 20 )document.body.style.background = "#1F4B2A";

        e.preventDefault();

    }
}

document.addEventListener("keyup", (e) => {
    e = e || window.event;
    let charCode = e.keyCode || e.which;
    if (charCode === 32) {
        document.body.style.background = "#1F334B";
        if(tiempoPulsado < 15)return;
        tiempoPulsado = 0;
        bandera = true;
        playStopCronometro();
    }
});


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

document.getElementById("time-list").addEventListener("click", (e) => {
    interface.showTimeInfo(e.target); 
    interface.deletTime(e.target); 
});

window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};