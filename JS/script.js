//Exercise number 1

function printDiamond(height, a){
    const length = a.length;
    var space = '';

    for(var i = 0; i < length; i++){
        space += ' ';
    }

    if(height%2 === 0){
        height++;
    }

    function shun_returner(num){
        if(num <= 0){
            return '';
        }
        return a + shun_returner(num - 1);
    }

    function space_returner(num){
        if(num <= 0){
            return '';
        }

        return space + space_returner(num - 1);
    }

    function up_drawer(num){
        if(num >= (height / 2) + 1){
            return '';
        }

        console.log(space_returner(height / 2 - ((num * 2) - 1) / 2) + shun_returner((num * 2) - 1));
        up_drawer(num + 1);
    }

    function down_drawer(num){
        if(num <= 0){
            return '';
        }

        console.log(space_returner((height - num - 2) - (height - 5)/2) + shun_returner((num*2)-2));
        down_drawer(num - 1);
    }

    up_drawer(1);
    down_drawer(height / 2);
}

//printDiamond(10, "bo");

//End of exercise number 1

//Exercise number 2

function printDiamond_with_for(height, a){
    const length = a.length;
    var space = '';

    for(var i = 0; i < length; i++){
        space += ' ';
    }

    if(height%2 === 0){
        height++;
    }

    function shun_returner(num){
        let f = '';
        for(let i=0;i<num;i++){
            f += a;
        }
        return f;
    }

    function space_returner(num){
        let f = '';
        for(let i=0;i<num;i++){
            f += space;
        }
        return f;
    }

    function up_drawer(){
        for(let i = 1;i < ((height / 2) + 1) ;i++){
            console.log(space_returner(height / 2 - ((i * 2) - 1) / 2) + shun_returner((i * 2) - 1));
        }
    }

    function down_drawer(num){
        for(let i=num;i>=0;i--){
            console.log(space_returner((height - i - 2) - (height - 5)/2) + shun_returner((i*2)-2));
        }
    }

    up_drawer();
    down_drawer(height / 2);
}

//printDiamond_with_for(5, "asa");

//End of exercise number 2

console.log("This is a simple tic tac toe game without ai, so don't judge ))");

let x_point = 0;
let o_point = 0;
let tie_point = 0;

const x_score = document.getElementById('x_score');
const o_score = document.getElementById('o_score');
const tie_score = document.getElementById('tie_score');

const reload_button = document.getElementById('button');

reload_button.onclick = function(){
    reloader();
};
const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function nextMove(board, isX){
    let returnNum;
    function returner(){
        let x = Math.floor(Math.random() * 3);
        let y = Math.floor(Math.random() * 3);
        if (board[x][y] === ' ') {
            returnNum = [x, y];
        } else {
            returner();
        }
    }

    returner();

    return returnNum;
}

function makeMove(board, arr, isX){
    if(isX === true){
        if(board[arr[0]][arr[1]] === ' '){
            board[arr[0]][arr[1]] = 'X';
        }else{
            return -1;
        }
    }else{
        if(board[arr[0]][arr[1]] === ' '){
            board[arr[0]][arr[1]] = 'O';
        }else{
            return -1;
        }
    }

    return 0;
}

function findWins(board){
    let winner;
    let winningLocation;
    for(let i = 0;i < 3;i++){
        if(board[i][0] === 'X' && board[i][1] === 'X' && board[i][2] === 'X'){
            winner = 'X';
            winningLocation = [[i,0],[i,1],[i,2]];
        }else if(board[i][0] === 'O' && board[i][1] === 'O' && board[i][2] === 'O'){
            winner = 'O';
            winningLocation = [[i,0],[i,1],[i,2]];
        }

        if(board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X'){
            winner = 'X';
            winningLocation = [[0,i],[1,i],[2,i]];
        }else if(board[0][i] === 'O' &&  board[1][i] === 'O' && board[2][i] === 'O'){
            winner = 'O';
        }
    }

    if(board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X'){
        winner = 'X';
        winningLocation = [[0,0],[1,1],[2,2]];
    }else if(board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O'){
        winner = 'O';
        winningLocation = [[0,0],[1,1],[2,2]];
    }

    if(board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X'){
        winner = 'X';
        winningLocation = [[0,2],[1,1],[2,0]];
    }else if(board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O'){
        winner = 'O';
        winningLocation = [[0,0],[1,1],[2,2]];
    }

    let zbaxvac = 0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] !== ' '){
                zbaxvac++;
            }
        }
    }
    if(zbaxvac === 9 && winner === undefined){
        winner = 'no_winner';
    }


    if(winner === undefined){
        return -1;
    }


    return {
        winner: winner,
        winningLocation: winningLocation
    }
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let X = new Image();
X.src="https://vignette.wikia.nocookie.net/grimm/images/a/a5/X.png/revision/latest?cb=20161103004859";

const O = new Image();
O.src="https://upload.wikimedia.org/wikipedia/commons/2/2d/O-Jolle_insigna.png";

const back = new Image().src="https://tesolatrennertnyc.files.wordpress.com/2012/07/tic-tac-toe-board.gif";
let done = false;

//Uncomment this for 1 player
// canvas.addEventListener('click', function(e) {
//         if(done === false) {
//             if (Math.floor(e.offsetY / 300) === 0) {
//                 if (Math.floor(e.offsetX / 300) === 0) {
//                     //1
//                     if (board[0][0] === ' ') {
//                         board[0][0] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 } else if (Math.floor(e.offsetX / 300) === 1) {
//                     //2
//                     if (board[1][0] === ' ') {
//                         board[1][0] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 } else if (Math.floor(e.offsetX / 300) === 2) {
//                     //3
//                     if (board[2][0] === ' ') {
//                         board[2][0] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 }
//             } else if (Math.floor(e.offsetY / 300) === 1) {
//                 if (Math.floor(e.offsetX / 300) === 0) {
//                     //4
//                     if (board[0][1] === ' ') {
//                         board[0][1] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 } else if (Math.floor(e.offsetX / 300) === 1) {
//                     //5
//                     if (board[1][1] === ' ') {
//                         board[1][1] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 } else if (Math.floor(e.offsetX / 300) === 2) {
//                     //6
//                     if (board[2][1] === ' ') {
//                         board[2][1] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 }
//             } else if (Math.floor(e.offsetY / 300) === 2) {
//                 if (Math.floor(e.offsetX / 300) === 0) {
//                     //7
//                     if (board[0][2] === ' ') {
//                         board[0][2] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 } else if (Math.floor(e.offsetX / 300) === 1) {
//                     //8
//                     if (board[1][2] === ' ') {
//                         board[1][2] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 } else if (Math.floor(e.offsetX / 300) === 2) {
//                     //9
//                     if (board[2][2] === ' ') {
//                         board[2][2] = 'X';
//                         board_drawer(board);
//                         win_checker();
//                         setTimeout("o_play()", 200);
//                     }
//                 }
//             }
//         }
// }, false);


function board_drawer(board){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] === 'X'){
                context.drawImage(X, i * 320, j * 320 , 300, 300);
            }else if(board[i][j] === 'O'){
                context.drawImage(O, i * 320, j * 320, 300, 300);
            }else if(board[i][j] === ' '){
                context.clearRect(i*320,j*320,300,300);
            }
        }
    }
}

function o_play(){
    if(done === false) {
        makeMove(board, nextMove(board, true), false);
        board_drawer(board);
        win_checker();
    }
}

function win_checker(){
    if(findWins(board).winner === 'X'){
        setTimeout("alert('X Won')" , 500);
        x_point += 1;
        done = true;
        x_score.innerText = "X: " + x_point;
    }else if(findWins(board).winner === 'O'){
        setTimeout("alert('O Won')" , 500);
        o_point += 1;
        done = true;
        o_score.innerText =  "O: " + o_point;
    }else if(findWins(board).winner === 'no_winner'){
        setTimeout("alert('Nobody Won')" , 500);
        tie_point += 1;
        done = true;
        tie_score.innerText = "Tie: " + tie_point;
    }
}


function reloader(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            board[i][j] = ' ';
        }
    }
    done = false;
    board_drawer(board);
    mozg();
}

let isX = false;

//Uncomment this for 0 player
// function mozg(){
//     if(findWins(board) === -1){
//         makeMove(board, nextMove(board, isX), !isX);
//         board_drawer(board);
//         win_checker();
//         isX = !isX;
//         setTimeout("mozg()", 500);
//     }
// }
//
// mozg();



