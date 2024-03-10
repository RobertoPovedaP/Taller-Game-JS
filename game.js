const canvas=document.querySelector('#game');
const game=canvas.getContext('2d');
let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const btnUp= document.querySelector('#up');
const btnLeft= document.querySelector('#left');
const btnRight= document.querySelector('#right');
const btnDown= document.querySelector('#down');

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function startGame(){
    console.log({canvasSize,elementsSize});
    game.font=(elementsSize-8)+'px Verdana';
    game.textAlign='end';
    
    const map=maps[0];
    const mapRows=map.trim().split('\n');
    console.log({map, mapRows});
    const mapRowCols=mapRows.map(row=>row.trim().split(''));

    game.clearRect(0,0,canvasSize,canvasSize);
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI)=>{
            const emoji= emojis[col];
            console.log({row, col});
            const posX=elementsSize*(colI+1);
            const posY=elementsSize*(rowI+1);
            
            if(col=='O'){
               if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x=posX;
                    playerPosition.y=posY;
                    console.log({playerPosition});
               }
            }
            
            game.fillText(emoji, posX, posY);
        });
    });
    //for(let row=1;row<=10;row++){
    //    for(let col=1;col<=10;col++){
    //    game.fillText(emojis[mapRowCols[row-1][col-1]],elementsSize*col,elementsSize*row);
    //    }
    //}
    movePlayer();
    }

function setCanvasSize(){
    if(window.innerHeight>window.innerWidth){
        canvasSize=window.innerWidth*0.75;
    }else{
        canvasSize=window.innerHeight*0.75;
    }
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
    elementsSize=(canvasSize/10);
    startGame();
}

function movePlayer(){
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);


}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event){
    if (event.key=='ArrowUp') moveUp();
    else if (event.key=='ArrowLeft') moveLeft();
    else if (event.key=='ArrowRight') moveRight();
    else if (event.key=='ArrowDown') moveDown();
}

function moveUp(){
    console.log("Me muevo arriba"); 
    playerPosition.y-=elementsSize;
    startGame();  
}

function moveLeft(){
    console.log("Me muevo a la izquierda"); 
    playerPosition.x-=elementsSize;
    startGame();
}

function moveRight(){
    console.log("Me muevo a la derecha"); 
    playerPosition.x+=elementsSize;
    startGame();
}

function moveDown(){
    console.log("Me muevo abajo"); 
    playerPosition.y+=elementsSize;
    startGame();
}