// ==========================================
// H ADV WEB DESIGN 2 - CALCULATOR
// Supports chaining: 3 + 4 + 5 + 3 + 5 =
// No loops. No objects.
// ==========================================

// What the user is currently typing (as text)
let typedNumberText = ''

// The number we store for calculations
let storedNumber = null

// The operator currently selected (+ - * /)
let currentOperator = ''

// Used only for displaying the history line
// Example: ["3", "+", "4"]
let historyParts = []

// --------------------
// SCREEN HELPERS
// --------------------
function setStatus (message) {
  document.getElementById('statusLine').textContent = message
}

function showSymbol (op) {
  if (op === '*') return '×'
  if (op === '/') return '÷'
  if (op === '-') return '−'
  return op
}

function updateScreen () {
  const display = document.getElementById('displayLine')
  const history = document.getElementById('historyLine')
  const status = document.getElementById('statusLine')

  // Main display
  if (typedNumberText !== '') {
    display.textContent = typedNumberText
  } else if (storedNumber !== null) {
    display.textContent = String(storedNumber)
  } else {
    display.textContent = '0'
  }

  // History (max 3 pieces, so no loop needed)
  if (historyParts.length === 0) history.textContent = ''
  if (historyParts.length === 1) history.textContent = historyParts[0]
  if (historyParts.length === 2)
    history.textContent = historyParts[0] + ' ' + showSymbol(historyParts[1])
  if (historyParts.length === 3)
    history.textContent =
      historyParts[0] +
      ' ' +
      showSymbol(historyParts[1]) +
      ' ' +
      historyParts[2]

  if (status.textContent === '') status.textContent = 'Ready'
}

// --------------------
// INPUT BUTTONS
// --------------------
function pressNumber (digit) {
  setStatus('')

  // Prevent numbers like 0007
  if (typedNumberText === '0') {
    typedNumberText = digit
  } else {
    typedNumberText = typedNumberText + digit
  }

  updateScreen()
}

function pressDecimal () {
  setStatus('')

  if (typedNumberText === '') {
    typedNumberText = '0.'
    updateScreen()
    return
  }

  if (typedNumberText.includes('.')) {
    setStatus('Decimal already used.')
    return
  }

  typedNumberText = typedNumberText + '.'
  updateScreen()
}

// --------------------
// OPERATOR (CHAINING HAPPENS HERE)
// --------------------
function pressOperator (op) {
  setStatus('')

  // If nothing typed and nothing stored, do nothing
  if (typedNumberText === '' && storedNumber === null) {
    setStatus('Type a number first.')
    updateScreen()
    return
  }

  // FIRST operator press: store first number
  if (storedNumber === null) {
    storedNumber = Number(typedNumberText)
    currentOperator = op

    historyParts = [String(storedNumber), currentOperator]

    typedNumberText = ''
    updateScreen()
    return
  }

  // CHAINING: if second number was typed, calculate immediately
  if (typedNumberText !== '') {
    const secondNumber = Number(typedNumberText)

    // Division by zero guard
    if (currentOperator === '/' && secondNumber === 0) {
      setStatus('Cannot divide by 0.')
      updateScreen()
      return
    }

    let result = storedNumber

    if (currentOperator === '+') result = storedNumber + secondNumber
    else if (currentOperator === '-') result = storedNumber - secondNumber
    else if (currentOperator === '*') result = storedNumber * secondNumber
    else if (currentOperator === '/') result = storedNumber / secondNumber

    storedNumber = result
    currentOperator = op

    historyParts = [String(storedNumber), currentOperator]

    typedNumberText = ''
    updateScreen()
    return
  }

  // If operator pressed twice in a row, just replace operator
  currentOperator = op
  historyParts = [String(storedNumber), currentOperator]
  updateScreen()
}

// --------------------
// EQUALS
// --------------------
function calculate () {
  setStatus('')

  // Need: storedNumber, operator, and a second number typed
  if (
    storedNumber === null ||
    currentOperator === '' ||
    typedNumberText === ''
  ) {
    setStatus('Incomplete expression.')
    updateScreen()
    return
  }

  const secondNumber = Number(typedNumberText)

  // Division by zero guard
  if (currentOperator === '/' && secondNumber === 0) {
    setStatus('Cannot divide by 0.')
    updateScreen()
    return
  }

  historyParts = [String(storedNumber), currentOperator, String(secondNumber)]

  let result = storedNumber

  if (currentOperator === '+') result = storedNumber + secondNumber
  else if (currentOperator === '-') result = storedNumber - secondNumber
  else if (currentOperator === '*') result = storedNumber * secondNumber
  else if (currentOperator === '/') result = storedNumber / secondNumber

  storedNumber = result
  currentOperator = ''
  typedNumberText = ''

  setStatus('Done.')
  updateScreen()
}

// --------------------
// UTILITIES
// --------------------
function clearAll () {
  typedNumberText = ''
  storedNumber = null
  currentOperator = ''
  historyParts = []

  setStatus('Cleared.')
  updateScreen()
}

function backspace () {
  setStatus('')

  if (typedNumberText === '') {
    setStatus('Nothing to delete.')
    updateScreen()
    return
  }

  typedNumberText = typedNumberText.slice(0, typedNumberText.length - 1)
  updateScreen()
}

function toggleSign () {
  setStatus('')

  if (typedNumberText !== '') {
    if (typedNumberText.startsWith('-')) {
      typedNumberText = typedNumberText.slice(1)
    } else {
      typedNumberText = '-' + typedNumberText
    }
    updateScreen()
    return
  }

  if (storedNumber !== null) {
    storedNumber = storedNumber * -1

    // Update history if it is showing storedNumber
    if (historyParts.length >= 1) historyParts[0] = String(storedNumber)

    updateScreen()
    return
  }

  setStatus('Type a number first.')
  updateScreen()
}

// --------------------
// START
// --------------------
updateScreen()