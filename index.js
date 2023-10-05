const boxes=document.querySelectorAll(".box");  //fetched all boxes
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;

let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initialize the game 

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    // after winning the game i have to reinitialize the game i.e i have to clear all the cells after clicking on newGame button

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

         // initialize box with css properties and reapply all the css properties on all boxes
        box.classList=`box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();

// function for swapping 

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }

    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

// function for checking whether the game is over or not 

// There are basically 3 things that should be noticed 
// 1.Game is currently running
// 2.Game is win by any of the currentPlayer 
// 3.Game is tie

function checkGameOver(){
    let answer="";

    // by iterating through winningpositions i am checking each position
    winningPositions.forEach((position)=>{

        // all 3 boxes should not be empty and also they should have same values 

        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){

            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            // after getting the winner i am disabling all the Mouse Actions i.e pointerEvents

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });

        
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner then i will render the winner name on ui and display the new game button 
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // We know no winner found,lets check whether there is tie
    // checkGameOver fxn is calling at each click then i have to verify what is the fillCount after each click 
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });

    // board is filled game is TIE
    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){

    // if my gameGrid is empty for particular index then i will go in this if condition or do processing 
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;  // update currentPlayer into the box means i have to update on ui as well
        gameGrid[index]=currentPlayer;  //no changes on ui after adding currentPlayer to gameGrid
        boxes[index].style.pointerEvents="none";

        // swap the turns
        swapTurn();

        // check if somebody win or not 

        checkGameOver();
    }
}

// adding event listener at each box and the event listener is based on click event i.e we took the box and its particular index which tells which index box is selected 
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

// after clicking on new Game button it will reinitialize the game 
newGameBtn.addEventListener("click",initGame);