var canvas = document.querySelector('.game')
var context = canvas.getContext('2d')
let inputsXVelocity = 0;
let inputsYVelocity = 0;

// tao 1 diem 
apple = {x:200,y:200}

const bait= () =>{
    context.fillStyle = 'red'
    context.fillRect(apple.x,apple.y,20,20)
}
var count =0; score = 0
snake = {x:200,y:200}
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
SnakeParts = []
const baittarget = () =>{
    if( snake.x == apple.x && snake.y == apple.y){
      apple.x = Math.floor(Math.random() * 20)*20
      apple.y = Math.floor(Math.random() * 20)*20
    count++ 
    score++
    }
}

const run= () =>{
    context.clearRect(0,0,400,400)
    snake.x = snake.x +inputsXVelocity*20
    snake.y = snake.y +inputsYVelocity*20
    context.fillStyle = 'green'
    for ( var i = 0; i<SnakeParts.length;i++){
      var part = SnakeParts[i]
      context.fillRect(part.x,part.y,20,20) 
    }
    SnakeParts.push( new SnakePart(snake.x,snake.y))
    if( SnakeParts.length > count){
      SnakeParts.shift()
    }
    let result = gameover();
    if (result) {
      return;
    } 
  drawscore()
  bait()
  baittarget()
  setTimeout(run,100)
}
const drawscore = () =>{
  context.fillStyle = 'black'
  context.font = '20px Verdana'
  context.fillText("Score " + score, canvas.width - 100, 20);
}
const gameover = () =>{
  // console.log(snake);
  let game = false;
  if( snake.x<0 || snake.x+10>400 || snake.y < 0 || snake.y >400 )  {
    game = true
  }
  for ( var i = 0; i<SnakeParts.length;i++){
    for ( var j= i+1; j<SnakeParts.length;j++){
      var parti = SnakeParts[i]
      var partj = SnakeParts[j]
      if(parti.x == partj.x && parti.y == partj.y){
        game = true
      }
    }
  }
  if (game) {
    context.fillStyle = "white";
    context.font = "50px Verdana";

    if (game) {
      context.fillStyle = "white";
      context.font = "50px Verdana";

      var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      // Fill with gradient
      context.fillStyle = gradient;

      context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }
  return game
}



document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode == 38 || event.keyCode == 87) {
    //87 is w
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down
  if (event.keyCode == 40 || event.keyCode == 83) {
    // 83 is s
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left
  if (event.keyCode == 37 || event.keyCode == 65) {
    // 65 is a
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right
  if (event.keyCode == 39 || event.keyCode == 68) {
    //68 is d
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}
run()