const score = $('#pointsEarned')
const wormSegs = $('#blocksAdded')
const lastScore = $('#lastSnakeScore')

const gameBoard = $('.gameBoard')

let direction
let gameisActive 
let interval

let wormBody
let apple

//

function initialState(){

wormBody = [ [15, 3], [16, 3] ]
apple = [ [9, 12] ];

direction = "left";
gameisActive = false;

score.text(0)
wormSegs.text(2)

}


//

function makeGrid(){//working
    xCoord = 1
    yCoord = 23


    for (let i=0; i<529; i++){
        let newPix = $('<div></div>').attr('id', `${xCoord}-${yCoord}`)//creates new div holding pixel

        if (i%2===1){
            newPix.addClass('odd')
        } //adds class to odd ones to make it checkerboard

        $(gameBoard).append(newPix) //appends new pixel
        xCoord++
        if (xCoord > 23){
            xCoord = 1
            yCoord--
        }
    }

    console.log(gameBoard)
}
    
makeGrid();


//

function buildInitialState() {//working

    initialState()

    for (let i=0; i<wormBody.length; i++){
        let x = wormBody[i][0]
        let y = wormBody[i][1]
        $(`#${x}-${y}`).addClass('worm')
    }
    
    for (let i=0; i<apple.length; i++){
        let applex = apple[i][0]
        let appley = apple[i][1]
        $(`#${applex}-${appley}`).addClass('apples')
    }
}

buildInitialState()


//

$('.startButton').click( function (){//working
    gameisActive = true;
    interval = setInterval(tick, 110)
    console.log(interval)
    buildInitialState()
})

//

$('#restartButton').click( function (){
    for (let i=0; i<wormBody.length; i++){
        let x = wormBody[i][0]
        let y = wormBody[i][1]
        $(`#${x}-${y}`).removeClass('worm')
    }
    for (let i=0; i<apple.length; i++){
        let x = apple[i][0]
        let y = apple[i][1]
        $(`#${x}-${y}`).removeClass('apples')
    }

    $('.startButton').removeClass('hidden')
    $('#restartButton').addClass('hidden')
    $('#hitWall').addClass('hidden')
    $('#bitSelf').addClass('hidden')
    
    buildInitialState()
})

//

function endGame(){//working

    lastScore.text(wormSegs.text())

    clearInterval(interval)
}

//

function renderState() {//working

if (gameisActive = true){

if (direction === "up"){
    let xCoord = wormBody[0][0]
    let yCoord = wormBody[0][1]
    let newSeg = [xCoord, yCoord+1]
        wormBody.unshift(newSeg)

    } else if (direction === "down"){
        let xCoord = wormBody[0][0]
        let yCoord = wormBody[0][1]
        let newSeg = [xCoord, yCoord-1]
        wormBody.unshift(newSeg)

    } else if (direction === "right"){
        let xCoord = wormBody[0][0]
        let yCoord = wormBody[0][1]
        let newSeg = [xCoord+1, yCoord]
        wormBody.unshift(newSeg)

    } else if (direction === "left"){
        let xCoord = wormBody[0][0]
        let yCoord = wormBody[0][1]
        let newSeg = [xCoord-1, yCoord]
        wormBody.unshift(newSeg)
    }

for (let i=0; i<wormBody.length; i++){
        let x = wormBody[i][0]
        let y = wormBody[i][1]
        $(`#${x}-${y}`).addClass('worm')
    }
  } else {
   buildInitialState()
}


}

//

function makeRandomApple(){//working
    
    let newX = Math.ceil(Math.random()*21)
    let newY = Math.ceil(Math.random()*21)

    if ($(`#${newX}-${newY}`).hasClass('worm')){
        makeRandomApple()
    }
    console.log(newX, newY)
    apple.push([newX, newY])
        for (let i=0; i<apple.length; i++){
            let applex = apple[i][0]
            let appley = apple[i][1]
            $(`#${applex}-${appley}`).addClass('apples')
        }

        let nextScore = Number(score.text())
        nextScore += 1
        score.text(nextScore)
        let nextSeg = Number(wormSegs.text())
        nextSeg += 1
        wormSegs.text(nextSeg)

}


//

function didEatApple(){//working

    if (wormBody[0][0] === apple[0][0] && wormBody[0][1] === apple[0][1]){
        makeRandomApple()
        let eaten = apple.shift()
        let x = eaten[0]
        let y = eaten[1]
        $(`#${x}-${y}`).removeClass('apples')
    } else {
        let lastSeg = wormBody.pop()
        let x = lastSeg[0]
        let y = lastSeg[1]
        $(`#${x}-${y}`).removeClass('worm')
    }

}

//

function ouroboros(){//working

    if (direction === "up"){
        let head = wormBody[0]
        let x = head[0]
        let y = head[1]
        y += 1
        if ($(`#${x}-${y}`).hasClass('worm')){
            endGame()
            $('#bitSelf').removeClass('hidden')
            $('#restartButton').removeClass('hidden')
            $('.startButton').addClass('hidden')
        }
    }

    if (direction === "down"){
        let head = wormBody[0]
        let x = head[0]
        let y = head[1]
        y -= 1
        if ($(`#${x}-${y}`).hasClass('worm')){
            endGame()
            $('#bitSelf').removeClass('hidden')
            $('#restartButton').removeClass('hidden')
            $('.startButton').addClass('hidden')
        }
    }

    if (direction === "right"){
        let head = wormBody[0]
        let x = head[0]
        x += 1
        let y = head[1]
        if ($(`#${x}-${y}`).hasClass('worm')){
            endGame()
            $('#bitSelf').removeClass('hidden')
            $('#restartButton').removeClass('hidden')
            $('.startButton').addClass('hidden')
        }
    }

    if (direction === "left"){
        let head = wormBody[0]
        console.log(head)
        let x = head[0]
        x -= 1
        let y = head[1]
        if ($(`#${x}-${y}`).hasClass('worm')){
            endGame()
            $('#bitSelf').removeClass('hidden')
            $('#restartButton').removeClass('hidden')
            $('.startButton').addClass('hidden')
        }
  }
}

//

function hitWall(){//working

    if (wormBody[0][0]>23 || wormBody[0][1]>23){
        $('#hitWall').removeClass('hidden')
        $('#restartButton').removeClass('hidden')
        $('.startButton').addClass('hidden')
    endGame()
    } else if (wormBody[0][0]<1 || wormBody[0][1]<1){
        $('.startButton').addClass('hidden')
        $('#hitWall').removeClass('hidden')
        $('#restartButton').removeClass('hidden')
    endGame()
}
 }

//

function tick() {
    renderState()
    ouroboros()
    didEatApple()
    hitWall()
    }

//

$(window).on('keydown', function (e) {
    if (e.keyCode === 38 && direction !== "down"){
        direction = "up"
    } else if (e.keyCode === 40 && direction !=="up"){
        direction = "down"
    } else if (e.keyCode === 39 && direction !== "left"){
        direction = "right"
    } else if (e.keyCode === 37 && direction !== "right"){
        direction = "left"
    }
    
})