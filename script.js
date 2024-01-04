const rulesBtnElm = document.getElementById('rules-btn');
const closeBtnElm = document.getElementById('close-btn');
const rulesElm = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let score = 0


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

// function to draw paddle on canva 

const paddleFun = ()=>{

    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

}

// Function to drwa ball on canvas 

const ballFun = () =>{

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI *2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();



}


const draw =()=>{

    ballFun()
    paddleFun()
    drawScore()

}


const drawScore = () =>{

    ctx.font = '20px Arial',
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

draw()




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