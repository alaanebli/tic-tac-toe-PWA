const board = document.getElementById("Board") ;
const cells = document.querySelectorAll('[cell-data]') ; 
const _alerte= document.getElementById("alerte-message") ; 
const _message = document.getElementById("message") ; 
let player="x"  ;
let play_count = 0 ; 

const WinningState = [
    [0,1,2], // row 1
    [3,4,5], // row 2
    [6,7,8], // row 3
    [0,3,6], // col 1
    [1,4,7], // col 2
    [2,5,8], // col 3 
    [0,4,8], // diag 1
    [6,4,2], // diag 2 
]

function startGame(){
    cells.forEach( cell => {
        cell.addEventListener('click',onclickCell, {once: true}); 
    }); 

    board.classList.add("x")
}

function onclickCell(cell){
    play_count++; 
    playerMove(cell); //player
    
    if(checkState(player)){
        alerteMessage(`${player} Win! `) ;
    }
    
    if(play_count>8 && !(checkState(player))){
        alerteMessage("draw");
    }

    if(player === "x" ){
        player= "o" ; 
    }else{
        player= "x" ; 
    }
                
}

function playerMove(cell){
    if(player === "o" ){
        //player 1  
        cell.path[0].classList.add("o") ;
        board.classList.remove("o"); 
        board.classList.add("x") ; 
        
         
    }else{
        // player 2 
        cell.path[0].classList.add("x") ;
        board.classList.remove("x"); 
        board.classList.add("o") ;
        
    }

}

function checkState(current_player){
    return WinningState.some( (state) => { // arr.some() => Determines whether the specified callback function returns true for any element of an array.
        return state.every(index => { // arr.every =>  Determines whether all the members of an array satisfy the specified test.
            return cells[index].classList.contains(current_player); // arr.contains() => Returns true if token is present, and false otherwise .
        })
    })
}

function alerteMessage(msg){
    _alerte.classList.remove("hide") ; 
    _message.innerHTML = "<h1>"+msg+"</h1>"
}


function restart(){
    cells.forEach( cell => {
        if(cell.classList.contains("o")){
            cell.classList.remove("o");
        }
        if(cell.classList.contains("x")){
            cell.classList.remove("x");
        }
    }); 
    
    if(board.classList.contains("o")){
        board.classList.remove("o");
        board.classList.add("x") ; 
    }
    
    _alerte.classList.add("hide") ; 
    play_count = 0 ;
    player = "x"
    startGame()
}
startGame()