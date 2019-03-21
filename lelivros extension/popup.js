let bg = chrome.extension.getBackgroundPage();
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("buttonDownload").onclick = function(){
        if(this.innerText == "Start"){
            this.innerText = "Stop";
            bg.buttonState = true;
            
        }
        else{
            this.innerText = "Start";
            bg.buttonState = false;
            
        }
    };

}, false);