const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
var quote = ""
var quoteChars = ""
var quoteLength = 0
//quoteDisplayElement.read = true;
quoteInputElement.setAttribute('maxlength', '10')

quoteInputElement.addEventListener('input', () => {

    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correctLetters = 0;
    let correct = true
    
    

    //document.remove
    //arrayQuote[0].classList.remove
    //quoteDisplayElement.removeChild(characterSpan)
    
    //arrayQuote.forEach((characterSpan, index) => {
        //if(index==) {
        //    characterSpan.innerText = 'a'
        //}

        //const character = arrayValue[index]
        //if (character == null) {
        //    characterSpan.classList.remove('correct')
        //    characterSpan.classList.remove('incorrect')
        //    correct = false
        //} else if (character === characterSpan.innerText) {
        //    characterSpan.classList.add('correct')
        //    characterSpan.classList.remove('incorrect')
        //} else {
        //    characterSpan.classList.remove('correct')
        //    characterSpan.classList.add('incorrect')
        //    correct = false
        //}
    //})
    
    

    for (let i=0; i<arrayQuote.length; i++) {
        const character = arrayValue[i]
        
        //arrayQuote[0].characterSpan.innerText = 'a'
        //arrayQuote[0].classList.innerText = 'a'
        
        

        if (character == null) {
            arrayQuote[i].classList.remove('correct')
            arrayQuote[i].classList.remove('incorrect')
            correct = false
        }

        else if (character == quote[i] && i==correctLetters) {
            arrayQuote[i].classList.add('correct')
            arrayQuote[i].classList.remove('incorrect')
            //arrayQuote[i].innerText = ''
            correctLetters++
        }

        else {
            arrayQuote[i].classList.remove('correct')
            arrayQuote[i].classList.add('incorrect')
            correct = false
        }
    }
  
    if (correct) {
        renderNewQuote()
    }

    console.log(correctLetters)
})


function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
  }

async function renderNewQuote() {
    quote = quoteChars = await getRandomQuote()
    quoteLength = quoteChars.length
    quoteDisplayElement.innerHTML = ''
    quoteChars.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })

    

    quoteInputElement.value = null
}

renderNewQuote()

