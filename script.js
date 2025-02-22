let GameObj = (function () {
    let gameboard = [
        ["1","2","3"],
        ["4","5","6"],
        ["7","8","9"]
    ];
    return { gameboard };
})()

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

let player1;
let player2;
let p1;
let p2;

const twoPlayer = document.querySelector(".twoPlayer");
const onePlayer = document.querySelector(".bot");

const p1s = document.querySelectorAll(".replace")[0];
const p2s = document.querySelectorAll(".replace")[1];

const cells = Array.from(document.querySelectorAll(".cells"));
let info = document.querySelector(".info");
let score1 = document.querySelector(".score1");
let score2 = document.querySelector(".score2");


function resetBoard(){
    GameObj.gameboard = [
        ["1","2","3"],
        ["4","5","6"],
        ["7","8","9"]
    ];
    cells.forEach((cell) => {
        cell.textContent = '';
    })
    return GameObj.gameboard;
}

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
                p1.increaseScore();
                console.log(`\nRound ended.${p1.name} won\n`);
                info.textContent = `Round ended. ${p1.name} won`;
                console.log(`${p1.name} score : ${p1.getScore()}`);
                score1.textContent = `${p1.name} Score ➝ ${p1.getScore()}`;
                console.log(`${p2.name} score : ${p2.getScore()}`);
                score2.textContent = `${p2.name} Score ➝ ${p2.getScore()}`;
            }
            else{
                p2.increaseScore();
                console.log(`\nRound ended.${p2.name} won\n`);
                info.textContent = `Round ended. ${p2.name} won`;
                console.log(`${p1.name} score : ${p1.getScore()}`);
                score1.textContent = `${p1.name} Score ➝ ${p1.getScore()}`;
                console.log(`${p2.name} score : ${p2.getScore()}`);
                score2.textContent = `${p2.name} Score ➝ ${p2.getScore()}`;
            }
            return true;
        }
    }
    return false;
}

let Board = [
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
    return true;
}

function isBoardFull(gameboard) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameboard[i][j] !== "❌" && gameboard[i][j] !== "⭕") {
                return false;
            }
        }
    }
    return true;
}

function gameflow(){
    let round = 1;
    twoPlayer.remove();
    onePlayer.remove();
    p1s.innerHTML = `<div class="p1s">Player 1 ➝ ${p1.name}</div>`;
    p2s.innerHTML = `<div class="p2s">Player 2 ➝ ${p2.name}</div>`;
    
    let is_player1 = true;
    let gameActive = true;
    let position;

    function RoundCheck() {
        round++;
        if(round > 3 || p1.getScore()==2 || p2.getScore()==2) {
            declareWinner();
            return true;
        }
        info.textContent = `ROUND ${round}`;
        return false;
    }

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if(!gameActive) return;
            position = cell.dataset.pos;
            if(isInvalidInput(Board,position)){
                alert("Invalid input.The spot is taken.")
                return;
            }
            cell.textContent = is_player1 ? '❌' : '⭕';
            for(let j=0;j<3;j++){
                for(let k=0;k<3;k++){
                    let symbol;
                    is_player1 ? symbol = '❌' : symbol =  '⭕';
                    if(GameObj.gameboard[j][k] == position){
                        GameObj.gameboard[j][k] = symbol;
                        if (toEnd(GameObj.gameboard)) {
                            gameActive = false;
                            setTimeout(() => {
                                resetBoard();
                                if( RoundCheck() ) return;
                                gameActive = true;
                            }, 1000);
                            return;
                        }
                        if (isBoardFull(GameObj.gameboard)) {
                            console.log("\nRound ended. It's a tie!\n");
                            info.textContent = "Round ended. It's a tie!"; 
                            console.log(`${p1.name} score : ${p1.getScore()}`);
                            score1.textContent = `${p1.name} Score ➝ ${p1.getScore()}`;
                            console.log(`${p2.name} score : ${p2.getScore()}`);
                            score2.textContent = `${p2.name} Score ➝ ${p2.getScore()}`;
                            gameActive = false;
                            setTimeout(() => {
                                resetBoard();
                                if( RoundCheck() ) return;
                                gameActive = true;
                            }, 1000);
                            return;
                        }
                    }
                }
            }
            is_player1 = !is_player1;
        })
    })
}

function cp_gameflow() { // i hate this function. absolute trash.
    let round = 1;
    info.textContent = `ROUND ${round}`;
    twoPlayer.remove();
    onePlayer.remove();
    p1s.innerHTML = `<div class="p1s">Player 1 ➝ ${p1.name}</div>`;
    p2s.innerHTML = `<div class="p2s">Player 2 ➝ ${p2.name}</div>`;

    let is_bot = false;
    let gameActive = true;
    let position;

    function RoundCheck() {
        round++;
        if(round > 3 || p1.getScore()==2 || p2.getScore()==2) {
            declareWinner();
            return true;
        }
        info.textContent = `ROUND ${round}`;
        return false;
    }

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (!gameActive) return;

            if (!is_bot) {
                position = cell.dataset.pos;
                if(isInvalidInput(Board,position)){
                    alert("Invalid input.The spot is taken.")
                    return;
                }
                cell.textContent = '❌';
            }
            runLoop(is_bot,position)

            if (toEnd(GameObj.gameboard)) {
                
                gameActive = false;
                setTimeout(() => {
                    resetBoard();
                    if( RoundCheck() ) return;
                    gameActive = true;
                }, 1000);
                return;
            }
            if (isBoardFull(GameObj.gameboard)) {
                
                console.log("\nRound ended. It's a tie!\n");
                info.textContent = "Round ended. It's a tie!"; 
                console.log(`${p1.name} score : ${p1.getScore()}`);
                score1.textContent = `${p1.name} Score ➝ ${p1.getScore()}`;
                console.log(`${p2.name} score : ${p2.getScore()}`);
                score2.textContent = `${p2.name} Score ➝ ${p2.getScore()}`;
                gameActive = false;
                setTimeout(() => {
                    resetBoard();
                    if( RoundCheck() ) return;
                    gameActive = true;
                }, 1000);
                return true;
            }
            
            is_bot = !is_bot; 
            
            if (p2.name === "computer" && is_bot ) {
            // had to remove the timeout to prevent a bug
                    let cPos;
                    do{
                        cPos = computerPlay();
                    } while(isInvalidInput(Board,cPos));
                    position = cPos;

                    for (let box of cells) {
                        if (box.dataset.pos == cPos) {
                            box.textContent = '⭕'; 
                            break;
                        }
                    }
                    runLoop(is_bot,position)
                    
                    if (toEnd(GameObj.gameboard)) {
                        
                        gameActive = false;
                        setTimeout(() => {
                            resetBoard();
                            if( RoundCheck() ) return;
                            gameActive = true;
                        }, 1000);
                        return;
                    }
                    if (isBoardFull(GameObj.gameboard)) {
                        
                        console.log("\nRound ended. It's a tie!\n");
                        info.textContent = "Round ended. It's a tie!"; 
                        console.log(`${p1.name} score : ${p1.getScore()}`);
                        score1.textContent = `${p1.name} Score ➝ ${p1.getScore()}`;
                        console.log(`${p2.name} score : ${p2.getScore()}`);
                        score2.textContent = `${p2.name} Score ➝ ${p2.getScore()}`;
                        gameActive = false;
                        setTimeout(() => {
                            resetBoard();
                            if( RoundCheck() ) return;
                            gameActive = true;
                        }, 1000);
                        return true;
                    }

                    is_bot = !is_bot; 
               
            }
        });
    });
}

function declareWinner() {
    if (p1.getScore() > p2.getScore()) {
        info.textContent = `Game Over! ${p1.name} Wins 🎉`;
    } else if (p1.getScore() < p2.getScore()) {
        info.textContent = `Game Over! ${p2.name} Wins 🎉`;
    } else {
        info.textContent = `Game Over! It's a tie! 🤝`;
    }
}

function runLoop(is_bot,position){
    let symbol = !is_bot ? '❌' : '⭕';

    let playerMoved = false;
                    for (let j = 0; j < 3; j++) {
                        for (let k = 0; k < 3; k++) {
                            if (GameObj.gameboard[j][k] == position) {
                                GameObj.gameboard[j][k] = symbol;
                                playerMoved = true;
                                break;
                            }
                        }
                        if (playerMoved) break;
                    }
}

function createDialog(isTwoPlayer) {
    const play2Dialog = document.createElement("dialog");
    play2Dialog.classList.add("play2Dialog");

    play2Dialog.innerHTML = `
        <form class="form" id="myForm">
            <div class="odd">
                <p>Player 1 will be assigned ❌ and Player 2 will be assigned ⭕.<br>A match has three rounds, and the player who wins the most rounds wins the match.</p>          
            </div>
            
            <div class="names">
                <label for="player1">Player 1 name</label>
                <input class="box" type="text" id="player1" required>          
            </div>
            <div class="names"> 
                ${isTwoPlayer ? '<label for="player2">Player 2 name</label>' : '<span>Player 2 name</span>'}
                ${isTwoPlayer ? '<input class="box" type="text" id="player2" required>' : '<p style="display: inline;">computer</p>'}
            </div>
        </form>
        <div>
            <div class="each_diff">
                <button class="cancel" type="button">Cancel</button>
                <button class="submit" type="submit" form="myForm">Submit</button>
            </div>
        </div>
    `;

    document.body.appendChild(play2Dialog);
    play2Dialog.showModal();

    const cancel = play2Dialog.querySelector(".cancel");
    cancel.addEventListener("click", () => {
        play2Dialog.close();
        play2Dialog.remove();
    });

    const form = play2Dialog.querySelector(".form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const player1 = document.getElementById("player1").value.toLowerCase();
        const player2 = isTwoPlayer ? document.getElementById("player2").value.toLowerCase() : "computer";

        p1 = createPlayer(player1);
        p2 = createPlayer(player2);

        play2Dialog.close();
        play2Dialog.remove();
        form.reset();
        isTwoPlayer ? gameflow() : cp_gameflow();
    });
}

twoPlayer.addEventListener("click", () => {
    createDialog(true);
})

onePlayer.addEventListener("click", () =>{
    createDialog(false);
})

let restart = document.querySelector(".restart");
restart.addEventListener("click", () => {
    location.reload();  // bored, not in the mood to write the logic for this
})




