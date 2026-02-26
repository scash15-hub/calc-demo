//What the user is currently typing (as text)
let typeNumberText = ''

//The number we store for calculations
let storedNumber = null

//The operator currently selected (+ - * /)
let currentOperator = ''

//Used only for displaying the history line
//Example: ["5", "+", "3"]
let historyParts = []

//----------------
//HELPER FUNCTION
//----------------

function setStatus(message) {
    document.getElementById('statusLine').textContent = message
}

function showSymbol(op) {
    if (op === '*') return 'x'
    if (op === '/') return '÷'
    if (op === '-') return '−'
    return op
}

function updateScreen() {
    const display = document.getElementById('displayLine')
    const history = document.getElementById('historyLine')
    const status = document.getElementById('statusLine')

    if (typeNumberText !== '') {
        display.textContent = typeNumberText
    } else {
        display.textContent = '0'
    }


    if (historyParts.length === 0) {
        history.textContent = ''
    }
    if (historyParts.length === 1) {
        history.textContent = historyParts[0]
    }
    if (historyParts.length === 2) {
        history.textContent = historyParts[0] + ' ' + showSymbol(historyParts[1])
    }
    if (historyParts.length === 3) {
        history.textContent = historyParts[0] + ' ' + showSymbol(historyParts[1]) + ' ' + historyParts[2]
    }

    if (status.textContent === '') status.textContent = 'Ready'

}

function pressNumber(digit) {
    setStatus('')
    if (typeNumberText === '0') {
        typeNumberText = digit
    } else {
        typeNumberText = typeNumberText + digit
    }
    updateScreen()
}

function pressOperator(op) {
    setStatus('')

    if (typeNumberText === '' && storedNumber === null) {
        setStatus('Enter a number first')
        updateScreen()
    }

    if (storedNumber === null) {
        storedNumber = Number(typeNumberText)
        currentOperator = op
        historyParts = [String(storedNumber), currentOperator]
        typeNumberText = ''
        updateScreen();
    }

    if (storedNumber !== '') {
        const secondNumber = typeNumberText

        if(currentOperator === '/' && secondNumber === 0) {
            setStatus('Cannot divide by 0.')
            updateScreen()
            return
        }
    }
}

function clearAll() {
    typeNumberText = ''
    storedNumber = null
    currentOperator = ''
    historyParts = []

    setStatus('Cleared')
    updateScreen()
}