
 const btnContainerFinger = document.getElementById("finger-container");
 const btnOpenStats = document.getElementById('openStats');
 const elementTime = document.getElementById('time');
 var tiempo = 0;
 var intervalo;

 btnContainerFinger.addEventListener("click", () => playCronometro());


document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    if (charCode === 32) {
        playCronometro();
        e.preventDefault();
        return false;
    }
}

 playCronometro = () =>{
    if(tiempo === 0){
        intervalo = setInterval( () => {
            tiempo +=0.01;
            elementTime.textContent = tiempo.toFixed(2);
        }, 10);
    }else{
        tiempo = 0;
        clearInterval(intervalo);
    }
};


 btnOpenStats.addEventListener('click', () => window.scrollTo({
    top: 500,
    behavior: 'smooth',
}));

