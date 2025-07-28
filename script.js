let startButton = document.querySelector('.start')
let endButton = document.querySelector('.end')
let cells = []
let matrixValues = []
const emojis = ['🎃', '👽', '🤡', '👑', '🦀', '🍀', '🦚', '🌏', '🍬', '⛱️', '⏰', '🧿', '🎀', '🥑', '🍩', '🏈', '🏀', '📷', '🪔', '💡', '🗝️', '🔍']
let isRunning = false;
const clock = document.createElement('div')
let messege = null
let pair = []
let remaining = 18
let timer

startButton.addEventListener('click', function (e) {
    if (isRunning) {
        endGame()
    }
    isRunning = true
    setBoard()
    addTimer()
    if (messege !== null) {
        // console.log('msg not null');
        document.querySelector('.playArea').removeChild(messege)
        messege = null
    }
})

endButton.addEventListener('click', function (e) {
    endGame()
})

document.querySelector('.matrix').addEventListener('click', function (e) {
    if (!isRunning || e.target.className === 'matrix') { return }
    const currCell = (e.target.className === 'cell') ? e.target.children[0] : e.target

    // console.log(currCell);
    if (pair.length === 0) {
        pair.push(currCell)
        // console.log(pair);
        currCell.style.transform = 'rotateY(0deg)'
    } else {
        currCell.style.transform = 'rotateY(0deg)'
        setTimeout(() => {
            currCell.style.transform = 'rotateY(90deg)'
            pair[0].style.transform = 'rotateY(90deg)'

            if (pair[0] !== currCell && pair[0].innerHTML === currCell.innerHTML && currCell.innerHTML !== '') {
                // console.log(pair[0].parentNode);
                // console.log(currCell.parentNode);

                currCell.parentNode.style.backgroundColor = 'grey'
                pair[0].parentNode.style.backgroundColor = 'grey'
                pair[0].innerHTML = ''
                currCell.innerHTML = ''
                remaining--
                if (remaining === 0) {
                    endGame()
                    showMessege('Congratulations!! You won :)')
                }
            }
            pair.pop()
        }, 800);
    }
})

function setBoard() {
    for (let i = 0; i < 36; i++) {
        cells.push(i)
    }
    remaining = 18
    for (let i = 0; i < 18; i++) {
        const randomEmoji = Math.round(Math.random() * (emojis.length - 1))
        randomCellMarker(emojis[randomEmoji])
        randomCellMarker(emojis[randomEmoji])
    }
}

function randomCellMarker(emoji) {
    const randomIndex = Math.round(Math.random() * (cells.length - 1))
    const cell = document.querySelectorAll(`.cellValue`)[cells[randomIndex]]
    cell.innerHTML = emoji
    console.log(cell.parentNode);

    cell.parentNode.style.backgroundColor = 'lightgrey'

    cells.splice(randomIndex, 1)
    // console.log(cells);
    // console.log(matrixValues);

}

function addTimer() {
    clock.classList.add('pipe')
    clock.innerHTML = '<div class="fluid"></div>'
    // console.log(clock);
    document.querySelector('.playArea').appendChild(clock)
    const fluid = document.querySelector('.fluid')
    fluid.style.animation = 'timeOut 120s linear'
    timer = setTimeout(() => {
        console.log("Game Over!! :(");
        endGame()
        showMessege("Ooops! Time's up, try again :(")

    }, 120000);
}

function endGame() {
    clearTimeout(timer)
    const matrix = document.querySelectorAll('.cellValue')
    matrix.forEach(cell => {
        cell.innerHTML = ''
        console.log(cell);

        cell.parentNode.style.backgroundColor = 'grey'
        cell.style.display = 'none'
    });
    document.querySelector('.playArea').removeChild(clock)
    pair = []
    isRunning = false
}

function showMessege(string) {
    messege = document.createElement('h2')
    messege.innerText = string
    document.querySelector('.playArea').appendChild(messege)
}