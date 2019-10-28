var number = 1;
var seconds = 0;
var numberList = [0, 1, 2];

var indexClicks = [];
var indexRight = [];
var indexWrong = [];

var tableRows;
var tableColumns;
var imagesAmount;

var doNotNoticed;
var audio;

function setNumber(n) {
    number = n;
    audio.pause();
}

var playing;
function random() {
    // Start couting the time
    startTime();
    var table = document.getElementById("table");
    var escolhidos = document.getElementById("escolhidos");
    table.innerHTML = "";
    escolhidos.innerHTML = "";
    renderTable();
    setClickListener(table);
}

// Add click listener to the img
function setClickListener(table, ){
    table.addEventListener("click", function (e) {
        if (e.target.nodeName == "IMG") {
            e.target.style.opacity = 0.1;
            indexClicks.push(e.target.id);
            for (var i = 0; i < 4; i++) {
                if (e.target.alt == numberList[i]) {
                    //console.log('Certo');
                    indexRight.push(e.target.id);
                    return;
                }else if(i == 3 && e.target.alt != numberList[i]){
                    //console.log('Errou');
                    indexWrong.push(e.target.id);
                }
            }
        }
        //console.log(indexWrong);
    });
}

//Set random images to each table data
function renderTable(){
    audio = new Audio('audios/tic-tac.mp3');
    audio.loop = true;
    audio.play();
    
    var escolhido_row = escolhidos.insertRow(0);
    for (var i = 0; i < 3; i++) {
        var cell = escolhido_row.insertCell(0);
        var img = document.createElement("img");
        img.src = "images/" + number + "/" + i + ".png";
        cell.appendChild(img);
    }

    /**
     * Generate the rows according to the
     * @param {number} tableRows value.
     */
    var count = 0;
    for (var i = 0; i < tableRows; i++) {
        var row = table.insertRow(i);

        // TODO: ADD A ARRAY HERE TO PUT THE RANDOMS NUMBERS
        //       TO DON'T PUT THE SAME SIGN TOGUETER

        /**
         * Generate the cells according to the
         * @param {number} tableColumns value;
         * Generating and setting for each img 
         * the random value into the img.alt;
         * Setting img.id with the 
         * @param {number} count value.
         */
        for (var j = 0; j < tableColumns; j++) {
            var cell = row.insertCell(j);
            var img = document.createElement("img");
            var random = Math.floor((Math.random() * imagesAmount));
            img.alt = random;
            img.id = count++;
            img.src = "images/" + number + "/" + random + ".png";
            cell.appendChild(img);
        }
    }
}

function startTime() {
    if (number <= 2) {
        tableRows = 21;
        tableColumns = 11;
        imagesAmount = 8;
        playing = setTimeout(finish, 180000);
    } else if (number <= 4) {
        tableRows = 21;
        tableColumns = 11;
        imagesAmount = 8;
        
    } else if(number==5){
        tableRows = 21;
        tableColumns = 21;
        imagesAmount = 11;
        playing = setTimeout(finish, 300000);

    }
}

function finish() {
    seeResults();
    clearTimeout(playing);
}

function seeResults() {
    /** 
     *  Highlight the signs that the player
     *  doesn't noticed with a gray 
     *  background color.
     */
    var biggestIdImg = indexClicks.slice(-1)[0];
    doNotNoticed = 0;
    for (var i = 0; i < biggestIdImg; i++) {
        var img = document.getElementById(i);
        if( img.alt == 0 ||
            img.alt == 1 ||
            img.alt == 2){
            img.style.opacity = 1;
            img.src = "images/0.png";
            doNotNoticed++;
        }
    }
    /** 
     *  Highlight the signs that the player
     *  choosed right with a red
     *  background color.
     */
    for (var i = 0; i < indexWrong.length; i++) {
        var img = document.getElementById(indexWrong[i]);
        img.style.opacity = 1;
        img.src = "images/1.png";
    }

    /** 
     *  Highlight the signs that the player
     *  choosed right with a green
     *  background color.
     */
    for (var i = 0; i < indexRight.length; i++) {
        var img = document.getElementById(indexRight[i]);
        img.style.opacity = 1;
        img.src = "images/2.png";
    }

    var alert = setTimeout(function(){
        alert("Acertos: "+ indexRight.length+"\n"
            + "Erros: "+ indexWrong.length);
        clearTimeout(alert);
    }, 500);
}