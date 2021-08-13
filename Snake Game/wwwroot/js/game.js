// renkler
const board_border = 'black'
const board_background = 'white'
const snake_color = 'lightblue'
const snake_border = 'darkblue'
// canvas'ı al
const snakeBoard = document.getElementById("gameCanvas")
// 2 boyutlu çizim bağlamı döndür
const snakeBoard_ctx = gameCanvas.getContext("2d")
//------------------------------------------------------
snakeBoard.width = 600
snakeBoard.height = 600
//------------------------------------------------------
let changing_direction = false
let score = 0
let food_x;
let food_y;
let speed = 100;
// yatay hız
let dx = 0;
// dikey hız
let dy = 0;
let snake = [
    { x: snakeBoard.width / 2, y: snakeBoard.height / 2 },
    { x: snakeBoard.width / 2 - 10, y: snakeBoard.height / 2 - 10 }
]

main()
genFood()
document.addEventListener("keydown", changeDirection)
document.addEventListener("keydown", turbo)
//------------------------------------------------------
// oyunu çalışır durumda tutmak için kendi içinde çağır
function main() {
    if (hasGameEnded()) return
    // yön değiştiriyorsa -> true
    changing_direction = false;
    // yılanın önceki tüm konumlarını kaldırmak için setTimeout içinde clearCanvas() çağrılır
    setTimeout(function onTick() {
        clearCanvas()
        drawFood()
        moveSnake()
        drawSnake()
        // tekrar et
        main()
    }, speed)
}
//------------------------------------------------------
function clearCanvas() {
    // sayfanın rengi
    snakeBoard_ctx.fillStyle = board_background
    // canvas'ın kenarlarının rengi
    snakeBoard_ctx.strokeStyle = board_border
    // dikdörtgen oluştur. parametreler sırasıyla: (x, y, width, height)
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height)
    // dikdörtgenin kenarlarını oluştur. parametreler sırasıyle: (x,  y, width, height)
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height)
}
//------------------------------------------------------
function drawSnake() {
    snake.forEach(drawSnakePart)
}
//------------------------------------------------------
function drawFood() {
    snakeBoard_ctx.fillStyle = 'lightgreen'
    snakeBoard_ctx.strokeStyle = 'darkgreen'
    snakeBoard_ctx.fillRect(food_x, food_y, 10, 10)
    snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10)
}
//------------------------------------------------------
function drawSnakePart(snakePart) {
    // yılanın rengi
    snakeBoard_ctx.fillStyle = snake_color
    // yılanın sınırlarının rengi
    snakeBoard_ctx.strokeStyle = snake_border
    // yılanın parçasını oluştur
    snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10)
    // yılanın parçasının sınır çizgilerini oluştur
    snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10)
}
//------------------------------------------------------
function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake.x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0
    const hitRightWall = snake[0].x > snakeBoard.width - 10
    const hitTopWall = snake[0].y < 0
    const hitBottomWall = snake[0].y > snakeBoard.height - 10
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}
//------------------------------------------------------
function randomFood(max) {
    // random() ilerastgele sayı üret (0 <= sayı < 1) - round() ile sayıyı yuvarla
    return Math.round(Math.random() * max / 10) * 10
}
//------------------------------------------------------
function genFood() {
    // x kordinatında rastgele bir sayı üret
    food_x = randomFood(snakeBoard.width - 10)
    // y kordinatında rastgele bir sayı üret
    food_y = randomFood(snakeBoard.height - 10)
    // yeni food yeri yılanın bulunduğu yerdeyse yeni bir food yeri oluştur
    snake.forEach(function hasSnakeEatenFood(part) {
        const hasEaten = part.x == food_x && part.y == food_y
        if (hasEaten)
            genFood()
    })
}
//------------------------------------------------------
function changeDirection(event) {
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40

    // yılanın geri dönmesini engelle
    if (changing_direction) return
    changing_direction = true
    const keyPressed = event.keyCode
    const goingUp = dy === -10
    const goingDown = dy === 10
    const goingRight = dx === 10
    const goingLeft = dx === -10
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10
        dy = 0
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0
        dy = -10
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10
        dy = 0
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0
        dy = 10
    }
}
//------------------------------------------------------
function moveSnake() {
    // yılanın başını oluştur
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }

    // yeni başı yılan gövdesinin ilk sırasına koy
    snake.unshift(head)
    // dizinin son öğesini kaldır
    const hasEatenFood = snake[0].x === food_x && snake[0].y === food_y
    if (hasEatenFood) {
        score += 10
        document.getElementById('score').innerHTML = score
        genFood()
    }
    else snake.pop()
}
//------------------------------------------------------
function changeSize(value) {
    if (value == 'small') {
        snakeBoard.width = 300
        snakeBoard.height = 300
    }
    else if (value == 'medium') {
        snakeBoard.width = 600
        snakeBoard.height = 600
    }
    else {
        snakeBoard.width = 900
        snakeBoard.height = 900
    }
}

function turbo(event) {
    const SPACE_KEY = 32
    if (event.keyCode === SPACE_KEY && speed == 100)
        speed = 35
    else if (event.keyCode === SPACE_KEY && speed == 35)
        speed = 100
    else return
}