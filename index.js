var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame(); //initialize the game
}

function setGame() {
    //clear the board
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    //clear the score
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create 2 to begin the game
    setTwo();
    setTwo();

}

function updateTile(tile, num) {
    tile.innerText = ""; //clear the innerText
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile"); //add the tile class
    if (num > 0) { //if the number is greater than 0
        tile.innerText = num.toString();
        if (num <= 4096) { //if the number is less than or equal to 4096
            tile.classList.add("x"+num.toString());
        } else { //if the number is greater than 4096
            tile.classList.add("x8192"); //add the x8192 class
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") { //if the key pressed is the left arrow key
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") { //if the key pressed is the right arrow key
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") { //if the key pressed is the up arrow key
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") { //if the key pressed is the down arrow key
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; //update the score
})

function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = filterZero(row); 
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } 
    return row;
}

function slideLeft() {
    //for each row
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num); //update the tile
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];        
        row.reverse(); //reverse the row          
        row = slide(row)            
        board[r] = row.reverse();   
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    //for each column
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    //if there is an empty tile
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    //check if there is at least one empty tile
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false; //no zeroes in the board
}