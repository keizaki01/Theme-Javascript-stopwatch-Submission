const timeElement = document.getElementById("time");
const start = document.getElementById("start");
const stop= document.getElementById("stop");
const reset = document.getElementById("reset");

let elapsedTime = 0;
let intervalId = null;

function updateTime(){
    const ms = Math.floor(elapsedTime) % 1000;
    const s = Math.floor(elapsedTime / 1000) % 60;
    const m = Math.floor(elapsedTime / (1000*60)) %60;
    const h = Math.floor(elapsedTime / (1000*60*60));
    
    const msStr = ms.toString().padStart(1,"0");
    const sStr = s.toString().padStart(1,"0");
    const mStr = m.toString().padStart(1,"0");
    const hStr = h.toString().padStart(1,"0");
    
    timeElement.innerHTML = `${hStr}:${mStr}:${sStr}:${msStr}`;
}

start.addEventListener("click", function(){
    if(intervalId !== null) {return; }
    let pre = new Date();
    intervalId = setInterval(function(){
        const now = new Date();
        elapsedTime += now - pre;
        pre = now;
        updateTime();
    },10);
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.remove("inactive");
});

stop.addEventListener("click", function() {
    clearInterval(intervalId)
    intervalId = null;
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.remove("inactive");
});

reset.addEventListener("click",function(){
    elapsedTime = 0;
    updateTime()
    start.classList.remove("inactive");
    stop.classList.remove("inactive");
    reset.classList.add("inactive");
});