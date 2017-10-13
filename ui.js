
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function randomID() {
  return 'IDxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* UI Functions */
function logEl() {
    return document.querySelectorAll("#log")[0];
}
function log(s) {
    logEl().insertAdjacentHTML("beforeend", s.replace(/\n/g, "<br/>"));
};
function clearLog() {
    logEl().innerHTML = "";
};
function input(prompt, callback) {
    let log = logEl();
    log.insertAdjacentHTML("beforeend", prompt);

    let uuid = randomID();
    log.insertAdjacentHTML("beforeend", "<span class=\"input\" id=\"" + uuid + "\"></span>");

    let span = document.querySelector("#" + uuid);

    let input = "";
    function keydownHandler(event) {
        console.log(event);

        if(event.key.length == 1) {
            span.insertAdjacentHTML("beforeend", event.key);
            input += event.key;
        }

        if(event.key=="Enter") {
            span.insertAdjacentHTML("beforeend", "<br/>");
            callback(input);
            document.removeEventListener("keydown", keydownHandler);
        }

        if(event.key=="Backspace") {
            input = input.substring(0, input.length-1);
            span.innerHTML = span.innerHTML.substring(0, span.innerHTML.length - 1);
        }
    };

    document.addEventListener('keydown', keydownHandler);
};

const SELECT_LABELS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
function select(prompt, items, callback) {
    let log = logEl();
    let labels = items.map(function(item, idx){
        return SELECT_LABELS[idx];
    });

    log.insertAdjacentHTML("beforeend", "<p>" + prompt + "</p>");

    let list = "<ol style=\"list-style-type:none;\">";
    items.forEach(function(item, idx){
        list += "<li>" + labels[idx] + ". " + item + "</li>";
    });
    list += "</ol>";

    log.insertAdjacentHTML("beforeend", list);

    function listener(event) {
        console.log(event);
        if(labels.includes(event.key)) {
            let selectedIdx = SELECT_LABELS.indexOf(event.key);
            callback(items[selectedIdx], selectedIdx, event.key);
            document.removeEventListener("keydown", listener);
        }
    }

    document.addEventListener("keydown", listener);
}

function showArt(name) {
    let rqst = new XMLHttpRequest();

    rqst.addEventListener("load", function(){
        if(rqst.readyState==XMLHttpRequest.DONE) {
            document.querySelector("#screen").innerHTML = rqst.responseText;
        }
    });
    rqst.open("GET", "/art/" + name.replace(/ /g, "_") + ".html");
    rqst.send();
}

export default {
    log: log,
    input: input,
    showArt: showArt,
    clearLog: clearLog,
    select: select
};
