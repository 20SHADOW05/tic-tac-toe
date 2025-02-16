let GameObj = (function () {
    let gameboard = [
        ["1","2","3"],
        ["4","5","6"],
        ["7","8","9"]
    ];
    return { gameboard };
})()

function resetBoard(){
    GameObj.gameboard = [
        ["1","2","3"],
        ["4","5","6"],
        ["7","8","9"]
    ];
    return GameObj.gameboard;
}
 
function displayBoard(){
    console.log(`\n \n ${GameObj.gameboard[0][0]} | ${GameObj.gameboard[0][1]} | ${GameObj.gameboard[0][2]} \n ---------- \n ${GameObj.gameboard[1][0]} | ${GameObj.gameboard[1][1]} | ${GameObj.gameboard[1][2]} \n ---------- \n ${GameObj.gameboard[2][0]} | ${GameObj.gameboard[2][1]} | ${GameObj.gameboard[2][2]} \n  \n`);
}

displayBoard();

function createPlayer(Inputname){
    let name = Inputname;
    let score = 0;
    const getScore = () => {
        return score;
    }
    const increaseScore = () => {
        score++;
    }
    return { name , getScore , increaseScore }; 
}

let player1 = prompt("Enter the name of the first player")?.toLowerCase() || "player1";
let player2 = prompt("Enter the name of the second player ( click CANCEL to play with the computer )") ?.toLowerCase() || "computer";

let player_1 = createPlayer(player1);
let player_2 = createPlayer(player2);

console.log(`Player 1 : ${player_1.name}`);
console.log(`Player 2 : ${player_2.name}`);
console.log("\nThe match consists of three rounds, and the player who wins the most rounds is declared the winner.\n")

function toEnd(gameboard){

    let winPattern = [

        //diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],

        //rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]], 
        [[2, 0], [2, 1], [2, 2]], 
    
        //columns
        [[0, 0], [1, 0], [2, 0]], 
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]]
        
    ];

    for(let moves of winPattern) {
        let [a,b,c] = moves;
        let v1 = gameboard[a[0]][a[1]];
        let v2 = gameboard[b[0]][b[1]];
        let v3 = gameboard[c[0]][c[1]];

        if(v1 !== "" && v1===v2 && v2===v3){
            if(v1==="❌"){
                player_1.increaseScore();
                console.log(`\nRound ended.${player_1.name} won\n`);
                console.log(`${player_1.name} score : ${player_1.getScore()}`);
                console.log(`${player_2.name} score : ${player_2.getScore()}`);
            }
            else{
                player_2.increaseScore();
                console.log(`\nRound ended.${player_2.name} won\n`);
                console.log(`${player_1.name} score : ${player_1.getScore()}`);
                console.log(`${player_2.name} score : ${player_2.getScore()}`);
            }
            return true;
        }
    }    
}

let Board = [ //messed up. directly modified the object, so had to create this variable to check for invalid input.
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"]
];

function isInvalidInput(gameboard,position){
    for(let j=0;j<3;j++){
        for(let k=0;k<3;k++){
            if(gameboard[j][k] === position){
                    return (GameObj.gameboard[j][k] === "❌" || GameObj.gameboard[j][k] ==="⭕");  
            }   
        }
    }
}

function gameflow() {

    for(let i=0;i<9;i++){

        let symbol = "❌";
        let is_player1 = true;
        
        if(i%2 !== 0){
            symbol = "⭕";
            is_player1 = false;
        }

        let player = is_player1 ? player_1.name : player_2.name;
        let otherPlayer = !is_player1 ? player_1.name : player_2.name;

        let choice;
        let isEmptySpot = false;
        if(player_2.name !== "computer"){
            while(!isEmptySpot){
                choice = prompt(` ${player},choose the number to place your symbol.`);

                if(isInvalidInput(Board,choice)){
                    alert("\nInvalid input.The spot is taken.\n")
                    continue;
                }
                isEmptySpot = true;
            }
        }
        else{
            if(i%2 === 0){
                while(!isEmptySpot){
                    choice = prompt(` ${player},choose the number to place your symbol.`);
    
                    if(isInvalidInput(Board,choice)){
                        alert("\nInvalid input.The spot is taken.\n")
                        continue;
                    }
                    isEmptySpot = true;
                }
            }
            else{
                do{
                    choice = computerPlay();
                } while(isInvalidInput(Board,choice));
            }
        }
        for(let j=0;j<3;j++){
            for(let k=0;k<3;k++){
                if(GameObj.gameboard[j][k] == choice){

                    GameObj.gameboard[j][k] = symbol;
                    displayBoard();
                    if(i !== 8) console.log(`${player} chose position ${choice}.\n${otherPlayer},it's your turn. \n`);
                    if(toEnd(GameObj.gameboard)) return;
                    
                }
            }
        }
    }
    console.log("\nGame ended. It's a tie!\n");
    console.log(`${player_1.name} score : ${player_1.getScore()}`);
    console.log(`${player_2.name} score : ${player_2.getScore()}`);
}

const play = ( function(){

    for(let i=1;i<=3;i++){
        console.log(`\n---- ROUND ${i} ----\n`);
        gameflow();
        if(player_1.getScore()==2 || player_2.getScore()==2){
            break;
        }
        resetBoard();
        displayBoard();
    }

    if(player_1.getScore() > player_2.getScore()){
        console.log(`\nThe match winner is ${player_1.name}`);
    }
    else if(player_1.getScore() < player_2.getScore()){
        console.log(`\nThe match winner is ${player_2.name}`);
    }
    else{
        console.log("\nMatch ended.it's a tie");
    }

})()

function computerPlay() {
    let cPick = Math.floor(Math.random() * 90);
    
    if (cPick <= 10) return "1";
    else if (cPick <= 20) return "2";
    else if (cPick <= 30) return "3";
    else if (cPick <= 40) return "4";
    else if (cPick <= 50) return "5";
    else if (cPick <= 60) return "6";
    else if (cPick <= 70) return "7";
    else if (cPick <= 80) return "8";
    else return "9";
}

// function computerPlay() {            // check this. didn't include it in the code because I didn't write it.
//     let availableMoves = [];
    
//     for (let j = 0; j < 3; j++) {
//         for (let k = 0; k < 3; k++) {
//             if (GameObj.gameboard[j][k] !== "❌" && GameObj.gameboard[j][k] !== "⭕") {
//                 availableMoves.push(GameObj.gameboard[j][k]);
//             }
//         }
//     }
//     return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
// }

