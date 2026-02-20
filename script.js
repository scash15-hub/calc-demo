//What the user is currently typing (as text)
let typeNumberText = ''

//The number we store for calculations
let storedNumber = null

//The operator currently selected (+ - * /)
let currentOperator = ''

//Used only for dispayinmg the history line
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
    if (op === '-') return '&#x2212'
    return op
}

function updateScreen() {
    const display = document.getElementById('displayLine')
    const history = document.getElementById('historyLine')
    const status = document.getElementById('statusLine')

    display.textContent = typeNumberText
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
