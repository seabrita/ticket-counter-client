var webSocket;
var counter; 

function openSocket(){
    if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED){
       writeResponse("WebSocket is already opened.");
        return;
    }  
    webSocket = new WebSocket("ws://hs-click-counter.herokuapp.com/click_counter_socket/");
    
    webSocket.onopen = function(event){
        if(event.data === undefined){
            return;
        }
        writeResponse(event.data);
    };

    webSocket.onmessage = function(event){
        writeResponse(event.data);
    };

    webSocket.onclose = function(event){
        writeResponse("Connection closed");
    };
}

/**
 * Sends the value of the text input to the server
 */
function increment(){
    var text = "increment";
    webSocket.send(text);
}

function closeSocket(){
    webSocket.close();
}

function writeResponse(text){
    if(counter==null){
        counter = document.getElementById("counter");
    }
    counter.innerHTML = text;
}