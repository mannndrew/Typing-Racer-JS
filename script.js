const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const infoDisplayElement = document.getElementById('infoDisplay')
infoDisplayElement.innerText = "Sentences Completed: 0\nWords Typed: 0\nTime Elapsed: 00:00"

var quote = ""
var quoteWords = ""
var previousCorrectWords = ""
var quoteLength = 0
var wordLength = 0
var previousCorrectNum = 0
var totalWordsTyped = 0
var totalSentencesCompleted = 0
var seconds = 0;
var checkNextWord = true;


quoteInputElement.addEventListener('input', () => {

    do
    {
        let correct = []
        let incorrect = []
        let unTyped = quote.split('')                               //Split the un-typed portion to compare against input.

        const Input = quoteInputElement.value.split('')             //Split user input to array to check against un-typed.
        let correctNum = 0;
        let complete = false
        checkNextWord = false;

        for (let i=0; i<Input.length; i++) {                        //Loop over user input, move each un-typed to either correct or incorrect arrays.
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

        if (wordLength+1 <= correctNum && Input[wordLength] == ' ') {   // Execute if correct word, but not last.
        
            previousCorrectWords = previousCorrectWords + quoteWords[0] + " "
            
            for(let i=0; i<wordLength; i++) {
                correct[i] = ''
            }

            previousCorrectNum += wordLength+1
            correctNum -= wordLength+1
            
            if (quoteInputElement.value.length == wordLength + 1)
                quoteInputElement.value = ""
            
            else {
                quoteInputElement.value = quoteInputElement.value.substring(wordLength+1, quoteInputElement.value.length)
                checkNextWord = true;
            }

            quoteWords.shift()
            wordLength = quoteWords[0].length
            quoteInputElement.setAttribute('maxlength', wordLength+6)
            totalWordsTyped++

            let info = infoDisplayElement.innerText.split("\n")
            info[1] = "Words Typed: " + totalWordsTyped
            infoDisplayElement.innerText = info.join("\n")
        }

        else if (wordLength == correctNum && quoteWords.length==1) {    // Execute if last correct word.
            totalWordsTyped++
            complete = true

            let info = infoDisplayElement.innerText.split("\n")
            info[1] = "Words Typed: " + totalWordsTyped
            infoDisplayElement.innerText = info.join("\n")
        }

        quote = quoteWords.join(" ")
        console.log(correctNum + previousCorrectNum)

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
    }
    while(checkNextWord);
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

