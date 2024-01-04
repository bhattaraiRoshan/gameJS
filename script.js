const rulesBtnElm = document.getElementById('rules-btn');
const closeBtnElm = document.getElementById('close-btn');
const rulesElm = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let score = 0

const brickRowCount = 9;
const brickColCount = 5;


const ball = {
    x: canvas.width /2,
    y: canvas.height /2,
    size: 10,
    speed: 4,
    dx:4,
    dy: -4
}


const paddle={

    x: canvas.width /2 - 40,
    y: canvas.height -20,
    width:80,
    height: 10,
    speed: 8,
    dx:0
}

const brickInfo = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visiable: true
}

// creating bricks

const bricks = [];
for(let i = 0; i<brickRowCount; i++){
    bricks[i] = [];
    for(let j = 0; j<brickColCount; j++){
        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x,y, ...brickInfo}
    }
}

// function to draw paddle on canva 

const paddleFun = ()=>{

    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "ADDFFF";
    ctx.fill();
    ctx.closePath();

}

// Function to drwa ball on canvas 

const ballFun = () =>{

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI *2);
    ctx.fillStyle = '#1ecbe1';
    ctx.fill();
    ctx.closePath();



}

const drawScore = () =>{

    ctx.font = '20px Arial',
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}


const drawBricksFun = () =>{

    bricks.forEach(col =>{
        col.forEach(brick =>{
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.width, brick.height);
            ctx.fillStyle = brick.visiable ? '#ADDFFF' : 'transparent';
            ctx.fill();
            ctx.closePath();

        })
    })
}

const moveBall = () =>{
    ball.x += ball.dx;
    ball.y += ball.dy;


    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1;

    } 

    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1

    }

    // paddle collison 

    if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.width && ball.y + ball.size > paddle.y){
        ball.dy = -ball.speed

    }
    bricks.forEach(column => {
        column.forEach(brick => {
            console.log(brick);
          if (brick.visiable) {
            if (
              ball.x - ball.size > brick.x && 
              ball.x + ball.size < brick.x + brick.width && 
              ball.y + ball.size > brick.y && 
              ball.y - ball.size < brick.y + brick.height
            ) {
              ball.dy *= -1;
              brick.visiable = false;
              increaseScore()
    
            }
          }
        });
      });

      if(ball.y + ball.size > canvas.height){
        showAllBricks();
        score = 0;
      }
    

}

const increaseScore = () =>{

    score++

    if(score % (brickRowCount * brickRowCount) === 0){
        showAllBricks();
    }
}

const showAllBricks = () =>{

    bricks.forEach(col =>{
        col.forEach(brick=>{
            brick.visiable = true
        })
    })
}

const movePaddle = () =>{

    paddle.x += paddle.dx;

    // Wall detection

    if(paddle.x + paddle.width > canvas.width){
        paddle.x = canvas.width - paddle.width;

    }

    if(paddle.x < 0){
        paddle.x = 0;
    }


}


const draw =()=>{

    ctx.clearRect(0,0,canvas.width, canvas.height)

    ballFun()
    paddleFun()
    drawScore()
    drawBricksFun()

}



const update = () =>{

    movePaddle();

    moveBall();

    draw()
    requestAnimationFrame(update)

}

update()


const keyDown = (e) =>{

   if(e.key === 'Right' || e.key === 'ArrowRight'){

    paddle.dx = paddle.speed

   } else if((e.key === 'left' || e.key === 'ArrowLeft')){
    paddle.dx = - paddle.speed
   }

}


const keyUp = (e) =>{

    if(e.key === 'Right' ||e.key === 'ArrowRight' || e.key === 'left' || e.key === 'ArrowLeft' ){
        paddle.dx = 0;

    }

}

// Keyboard even handlers

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)



rulesBtnElm.addEventListener('click', ()=>{

    rulesElm.classList.add('show')
    rulesBtnElm.remove()

})




closeBtnElm.addEventListener('click', ()=>{
    rulesElm.classList.remove('show')
    const newRulesBtnElm = document.createElement('button');
    newRulesBtnElm.id = 'rules-btn';
    newRulesBtnElm.className = 'btn rules-btn'
    newRulesBtnElm.innerText = 'Show Rules';

    // Insert the newRulesBtnElm back into the DOM after the rulesElm
    rulesElm.insertAdjacentElement('afterend', newRulesBtnElm);

    // Add event listener to the newRulesBtnElm
    newRulesBtnElm.addEventListener('click', () => {
        rulesElm.classList.add('show');
        newRulesBtnElm.remove();
    });
    
   

})