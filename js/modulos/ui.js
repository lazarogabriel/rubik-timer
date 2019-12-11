export default class UI{

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