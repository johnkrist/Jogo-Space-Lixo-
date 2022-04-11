let laserInterval
const yourShip = document.querySelector('#player');
const playArea = document.querySelector('#main_play_area')
const laser = document.querySelector('.laser')
const aleatorEnemie = [' ', './src/img/hotdog1.png', './src/img/lata.png', './src/img/banana1.png', './src/img/litro.png']
const instructionsTxt = document.querySelector('.game-instructions')
const startButton = document.querySelector('.start-button')


function flyShip() {
    document.addEventListener('keydown', (event) => {
        const keyName = event.key

        if (keyName === 'ArrowUp') {

            event.preventDefault()
            moveUp()
        } else if (keyName === 'ArrowDown') {

            event.preventDefault()
            moveDown()
        } else if (keyName === ' ') {

            event.preventDefault()
            fireLaser()
        }
    })
}

// function flyShip(event) {
// if (event.key === 'arrowUp') {
// console.log('cima')
// event.preventDefault()
// moveUp()
// } else if (event.key === 'arrowDown') {
// console.log('baixo')
// event.preventDefault()
// moveDown()
// } else if (event.key === ' ') {
// console.log('space')
// event.preventDefault()
// fireLaser()
// }
// }

function moveUp() {
    let topPosition = getComputedStyle(document.getElementById('player')).getPropertyValue('top')
    if (topPosition === '0px') {
        return
    } else {
        let position = parseInt(topPosition)
        position -= 10
        document.getElementById('player').style.top = `${position}px`
    }
}

function moveDown() {
    let topPosition = getComputedStyle(document.getElementById('player')).getPropertyValue('top')
    if (topPosition === '510px') {
        return
    } else {
        let position = parseInt(topPosition)
        position += 10
        document.getElementById('player').style.top = `${position}` + 'px'

    }
}

function fireLaser() {
    let laser = createLaser()
    playArea.appendChild(laser)
    moveLaser(laser)
}

function createLaser() {


    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = './src/img/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition - 20}px`
    newLaser.style.top = `${yPosition - 20}px`
    return newLaser

}




function moveLaser(laser) {
    laserInterval = setInterval(() => {
        let zPosition = parseInt(laser.style.left)
        let enemies = document.querySelectorAll('.enemie')



        if (zPosition === 1200) {
            //lasers.forEach((laser) => playArea.removeChild(laser))
            laser.remove()
        } else {
            laser.style.left = `${zPosition + 8}px`
        }


        //comparando se cada inimigo foi atingido, se sim, troca o src da imagem
       enemies.forEach((enemie) => {
            if (checkLaserCollision(laser, enemie)) {
                enemie.src = "./src/img/explosao.png"
                enemie.classList.remove('enemie')
                enemie.classList.add('dead-enemie')
            }

        })


    }, 15);
}


function createEnemies() {
    let newEnemie = document.createElement('img')

    let randomEnemie = Math.floor(Math.random() * (4) + 1)

    newEnemie.src = aleatorEnemie[randomEnemie]

    newEnemie.classList.add('enemie')
    // newEnemie.classList.add('enemie-transition')
    newEnemie.style.left = '1270px'
    newEnemie.style.top = `${Math.floor(Math.random() * 350) + 25}px`
    playArea.appendChild(newEnemie)
    moveEnemie(newEnemie)
}


function moveEnemie(enemie) {
    let moveInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(enemie).getPropertyValue('left'))

        if (Array.from(enemie.classList).includes('dead-enemie')) {
            setTimeout(() => {
                enemie.remove()
            }, 500);
        } else if (xPosition <= 40) {
            gameOver()
        } else {
        }
        enemie.style.left = `${xPosition - 4}px`
    }, 40)

}

//função colisão
function checkLaserCollision(laser, enemie) {
    let laserTop = parseInt(laser.style.top)
    let laserLeft = parseInt(laser.style.left)
    let laserBotttom = laserTop - 20
    let enemieTop = parseInt(enemie.style.top)
    let enemieLeft = parseInt(enemie.style.left)
    let enemieBotton = enemieTop - 30
    if (laserLeft != 340 && laserLeft + 40 >= enemieLeft) {
        if (laserTop <= enemieTop && laserTop >= enemieBotton) {
            return true

        } else {
            return false
        }
    } else {
        return false
    }
}




//inicio do jogo
startButton.addEventListener('click', playGame)
let enemieInterval
function playGame() {
    flyShip()
    startButton.style.display = 'none'
    instructionsTxt.style.display = 'none'
    //window.addEventListener('keydown')

    enemieInterval = setInterval(() => {
        createEnemies()
    }, 2000)

}



//gameover
function gameOver() {
    window.removeEventListener('keydown', flyShip)
    clearInterval(enemieInterval)
    clearInterval(laserInterval)
    let enemies = document.querySelectorAll('.enemie')
    let lasers = document.querySelectorAll('.laser')
    enemies.forEach((enemie) => playArea.removeChild(enemie))
    lasers.forEach((laser) => playArea.removeChild(laser))
    setTimeout(() => {
        alert('Game Over!')
        yourShip.style.top = '250px'
        startButton.style.display = 'block'
        instructionsTxt.style.display = 'block'
    }, 1000)
}

