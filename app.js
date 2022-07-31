const timeLeftDisplay = document.querySelector("#time-left")
const resultDisplay = document.querySelector("#result")
const startButton = document.querySelector("#start-pause-button")
const resetButton = document.querySelector("#reset-button")
const frogsSavedDisplay = document.querySelector("#frogs-saved")
const squares = document.querySelectorAll(".grid div")
const crocsLeft = document.querySelectorAll(".croc-left")
const crocsRight = document.querySelectorAll(".croc-right")

let currentIndex = 76
const width = 9
let timerId
let outcomeTimer 
let currentTime = 15
let currentFrogs = 0

//moves the frog using the arrow keys, don't let it move outside the parameters
function moveFrog(e) {

    squares[currentIndex].classList.remove("frog")

    switch(e.key) {
        case "ArrowLeft" :
            if (currentIndex % width !== 0) currentIndex -= 1
            break
        case "ArrowRight" :
            if (currentIndex % width < width - 1) currentIndex += 1
            break
        case "ArrowUp" :
            if (currentIndex - width >=0) currentIndex -= width
            break
        case "ArrowDown" :
            if (currentIndex + width < width * width) currentIndex += width
            break
    }

     squares[currentIndex].classList.add("frog")

}

//displays time
function timeCountdown() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
}

//automoves the crocodiles (calls the move left and right functions) + displays frogs saved
function autoMoveCrocs () {
    frogsSavedDisplay.textContent = currentFrogs
    crocsLeft.forEach(crocLeft => moveCrocLeft(crocLeft))
    crocsRight.forEach(crocRight => moveCrocRight(crocRight)) 
    
}

//checks for win, loss and no time left
function checkOutcomes () {
    lose()
    win()
    notime() 
}

//moves the crocodiles left
function moveCrocLeft(crocLeft) {
    switch(true) {
        case crocLeft.classList.contains("c1") :
            crocLeft.classList.remove("c1")
            crocLeft.classList.add("c2")
             break
         case crocLeft.classList.contains("c2") :
             crocLeft.classList.remove("c2")
             crocLeft.classList.add("c3")
             break
         case crocLeft.classList.contains("c3") :
             crocLeft.classList.remove("c3")
             crocLeft.classList.add("c4")
             break
         case crocLeft.classList.contains("c4") :
             crocLeft.classList.remove("c4")
             crocLeft.classList.add("c5")
             break
         case crocLeft.classList.contains("c5") :
             crocLeft.classList.remove("c5")
             crocLeft.classList.add("c1")
             break
    }
}

//moves the crocodile right
function moveCrocRight(crocRight) {
     switch(true) {
         case crocRight.classList.contains("c1") :
             crocRight.classList.remove("c1")
             crocRight.classList.add("c5")
             break
         case crocRight.classList.contains("c2") :
             crocRight.classList.remove("c2")
             crocRight.classList.add("c1")
             break
         case crocRight.classList.contains("c3") :
             crocRight.classList.remove("c3")
             crocRight.classList.add("c2")
             break
         case crocRight.classList.contains("c4") :
             crocRight.classList.remove("c4")
             crocRight.classList.add("c3")
             break
         case crocRight.classList.contains("c5") :
             crocRight.classList.remove("c5")
             crocRight.classList.add("c4")
             break
     }
    }

//when start/pause button is clicked, it will start or pause the game
startButton.addEventListener("click", () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimer)
        outcomeTimer = null
        timerId = null
        document.removeEventListener("keyup", moveFrog)
    } else {
        timerId = setInterval(timeCountdown, 1000)
        document.addEventListener("keyup", moveFrog)
        outcomeTimer = setInterval (checkOutcomes, 50)
        }
})

//when reset button is clicked, it will reset frog, time and result
resetButton.addEventListener("click", () => {
    squares[currentIndex].classList.remove("frog")
    currentIndex = 76
    squares[currentIndex].classList.add("frog")
    clearInterval(timerId)
    clearInterval(outcomeTimer)
    outcomeTimer = null
    timerId = null
    document.removeEventListener("keyup", moveFrog)
    currentTime = 15
    timeLeftDisplay.textContent = " "
    resultDisplay.textContent = " "
})

//if the frog touches the crocodile, display the frog is eaten!
function lose() {
    if (
        squares[currentIndex].classList.contains("c1") ||
        squares[currentIndex].classList.contains("c2") ||
        squares[currentIndex].classList.contains("c3") 
    ) {
    resultDisplay.textContent = "The frog was eaten!"
    clearInterval(timerId)
    clearInterval(outcomeTimer)
    clearInterval(difficultyTime)
    squares[currentIndex].classList.remove("frog")
    document.removeEventListener("keyup", moveFrog)
    }
}

//if the time runs out, display you ran out of time!
function notime() {
    if (currentTime <= 0) 
    {
        resultDisplay.textContent = "You ran out of time!"
        clearInterval(timerId)
        clearInterval(outcomeTimer)
        clearInterval(difficultyTime)
        squares[currentIndex].classList.remove("frog")
        document.removeEventListener("keyup", moveFrog)  
    }
}

//if the frog gets to the end, display the frog is safe and add 1 to frogs saved
function win() {
    if (squares[currentIndex].classList.contains("ending-block"))
    {
        resultDisplay.textContent = "The frog is safe!"
        currentFrogs = currentFrogs + 1
        frogsSavedDisplay.textContent = currentFrogs
        clearInterval(timerId)
        clearInterval(outcomeTimer)  
        clearInterval(difficultyTime)
        document.removeEventListener("keyup", moveFrog)
        }
}




