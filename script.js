const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const infoDisplayElement = document.getElementById('infoDisplay')
var quote = ""
var quoteWords = ""
var previousCorrectWords = ""
var quoteLength = 0
var wordLength = 0
var previousCorrectNum = 0
var totalWordsTyped = 0
var totalSentencesCompleted = 0
var seconds = 0;

quoteInputElement.addEventListener('input', () => {

    
    let correct = []
    let incorrect = []
    let unTyped = quote.split('')

    const Input = quoteInputElement.value.split('')
    let correctNum = 0;
    let complete = false
    
    
    for (let i=0; i<Input.length; i++) {
        const character = Input[i]

        if (character == quote[i] && i==correctNum) {
            unTyped[i] = ''
            correct[i] = quote[i]
            correctNum++
        }

        else {
            unTyped[i] = ''
            incorrect[i] = quote[i]
        }
    }

    if (wordLength+1 <= correctNum && Input[wordLength] == ' ') {
    
        previousCorrectWords = previousCorrectWords + quoteWords[0] + " "
        correct = []

        previousCorrectNum += wordLength+1
        correctNum = 0
        
        if (quoteInputElement.value.length == wordLength + 1)
            quoteInputElement.value = ""
        
        else {
            quoteInputElement.value = quoteInputElement.value.substring(wordLength+1, quoteInputElement.value.length)
        }

        

        quoteWords.shift()
        wordLength = quoteWords[0].length
        quoteInputElement.setAttribute('maxlength', wordLength+6)
        totalWordsTyped++

        let info = infoDisplayElement.innerText.split("\n")
        info[1] = "Words Typed: " + totalWordsTyped
        infoDisplayElement.innerText = info.join("\n")
    }

    else if (wordLength == correctNum && quoteWords.length==1) {
        totalWordsTyped++
        complete = true

        let info = infoDisplayElement.innerText.split("\n")
        info[1] = "Words Typed: " + totalWordsTyped
        infoDisplayElement.innerText = info.join("\n")
    }

    quote = quoteWords.join(" ")

    const TC = document.createElement('span')
    TC.classList.add('correct')
    TC.innerText = previousCorrectWords + correct.join("") 
    
    const TI = document.createElement('span')
    TI.classList.add('incorrect')
    TI.innerText = incorrect.join("")

    const TU = document.createElement('span')
    TU.classList.add('unTyped')
    TU.innerText = unTyped.join("")

    quoteDisplayElement.replaceChild(TC, quoteDisplayElement.querySelector('.correct'))
    quoteDisplayElement.replaceChild(TI, quoteDisplayElement.querySelector('.incorrect'))
    quoteDisplayElement.replaceChild(TU, quoteDisplayElement.querySelector('.unTyped'))
  
    if (complete) {
        totalSentencesCompleted++

        let info = infoDisplayElement.innerText.split("\n")
        info[0] = "Sentences Completed: " + totalSentencesCompleted
        infoDisplayElement.innerText = info.join("\n")

        renderNewQuote()
    }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
  }

async function renderNewQuote() {
    quote = await getRandomQuote()
    quoteWords = quote.split(" ")
    
    quoteLength = quote.length
    wordLength = quoteWords[0].length
    
    quoteDisplayElement.innerHTML = ''
    quoteInputElement.setAttribute('maxlength', wordLength+6)

    const correct = document.createElement('span')
    correct.innerText = ''
    correct.classList.add('correct')

    const incorrect = document.createElement('span')
    incorrect.innerText = ''
    incorrect.classList.add('incorrect')

    const unTyped = document.createElement('span')
    unTyped.innerText = quote
    unTyped.classList.add('unTyped')

    quoteDisplayElement.appendChild(correct)
    quoteDisplayElement.appendChild(incorrect)
    quoteDisplayElement.appendChild(unTyped)

    quoteInputElement.value = null
    previousCorrectWords = ""
    previousCorrectNum = 0
}

function stopWatch() {
    let info = infoDisplayElement.innerText.split("\n")
    let minString = Math.floor(seconds/60)
    let secString = seconds%60

    if (seconds/60 < 10) {
        minString = "0" + Math.floor(seconds/60)
    }
        

    if (seconds%60 < 10) {
        secString = "0" + seconds%60
    }
        

    info[2] = "Time Elapsed: " + minString + ":" + secString
    infoDisplayElement.innerText = info.join("\n")
    seconds++;
        
    setTimeout(stopWatch, 1000);
}

renderNewQuote()
stopWatch()

