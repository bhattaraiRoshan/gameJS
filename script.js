const rulesBtnElm = document.getElementById('rules-btn');
const closeBtnElm = document.getElementById('close-btn');
const rulesElm = document.getElementById('rules');


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