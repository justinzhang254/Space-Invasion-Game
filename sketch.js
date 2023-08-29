let monsters = [];
let timer = 0;
let window_change_time;
let announcements = [];
let duration = 2000;
let start_time;
let force;
let gravity;
let launched;
let score=0;
let lifecount=10;
let scorecount=0;
let rando;
let ult =0;

let level1_trigger = true;
let level2_trigger = false;
let level3_trigger = false;
let level4_trigger = false;
let final_trigger = false;
let level1_passed = false;
let level2_passed = false;

let level_complete = true;


function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(100);
  background(0);
  catapult = new Catapult(windowWidth/7,2*windowHeight/3);
  ball = new Ball(windowWidth/7,2*windowHeight/3+50,40);
  fill(255);
}

function draw(){
  background(0); 
  life = new Stats('Life', lifecount,100,100);
  life.display();
  score = new Stats('Score', scorecount,100,150);
  score.display();
  if (monsters.length > 100){
    monsters.splice(99);
  }

  if(level2_passed == true){
    ultcount = new Stats('Ult Count', ult,100,200);
    ultcount.display();
  }
  mission = new Announcement('Welcome to the game! Your mission is to use the catapult to defeat all the invaders and prevent them from reaching the left side.',windowWidth,100);
  mission.display();
  
  if (lifecount == 0){
    noLoop();
    gameover = new Announcement('Game is Over. Refresh window to restart.',windowWidth,windowHeight);
    gameover.display();
  }

  if (level1_trigger == true && level_complete == true){
    announcements.push(new Announcement('LEVEL 1',windowWidth,windowHeight))
    level_complete = false;
    for (let i=1; i<10; i++){

        console.log(rando);
        monsters.push(new Monster(random(windowWidth,windowWidth+500),random(50,windowHeight-50),1));  
      
    }
    level1_trigger = false; 
    level2_trigger = true;
  }
  
  if (level2_trigger == true && level_complete == true){
    announcements.push(new Announcement('LEVEL 2',windowWidth,windowHeight))
    announcements.push(new Announcement('Congratulations! You have unlocked [INCREASE_BALLSIZE]',windowWidth,windowHeight+120))
    level_complete = false;
    for (let i=1; i<20; i++){
      let rando = random(0,5);
      if (rando>1){
        console.log(rando);
        monsters.push(new Monster(random(windowWidth,windowWidth+500),random(50,windowHeight-50),1.5));  
      } else {
        console.log(rando);
        monsters.push(new Fast(random(windowWidth,windowWidth+500),random(50,windowHeight-50),1.5));
      }
    level2_trigger = false; 
    level1_passed = true;
    level3_trigger = true;
  }
}

  if (level3_trigger == true && level_complete == true){
    announcements.push(new Announcement('LEVEL 3',windowWidth,windowHeight))
    announcements.push(new Announcement('Congratulations! You have unlocked [ANNILIATE], clearing all monsters by pressing on the return key. You can only use it twice!',windowWidth,windowHeight+120))

    monsters.push(new Shield(windowWidth,windowHeight/2,1));
    level_complete = false;
    for (let i=1; i<25; i++){
      let rando = random(0,15);
      if (rando<2){
        monsters.push(new Fast(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      } else if (rando >2 && rando <5){
        monsters.push(new Strong(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      } else {
        monsters.push(new Monster(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      }
    }
    ult = ult + 2;
    level3_trigger = false;
    level4_trigger = true; 
    level2_passed = true;
  }

  if (level4_trigger == true && level_complete == true){
    announcements.push(new Announcement('LEVEL 4',windowWidth,windowHeight))
    level_complete = false;
    monsters.push(new Shield(windowWidth,windowHeight/2,1));
    monsters.push(new Shield(windowWidth+20,windowHeight/2,1));
    for (let i=1; i<40; i++){
      let rando = random(0,15);
      if (rando<2){
        monsters.push(new Fast(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      } else if (rando >2 && rando <5){
        monsters.push(new Strong(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      } else {
        monsters.push(new Monster(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      }
    }
    level4_trigger = false; 
    final_trigger = true;

  }

  if (final_trigger == true && level_complete == true){
    announcements.push(new Announcement('INFINITY MODE',windowWidth,windowHeight));
    announcements.push(new Announcement('You have beaten all the current levels! Enjoy the infinity mode. See the highest score you can get!',windowWidth,windowHeight+120))
    if (millis() >= 1000+timer) {
      rando = random(0,20)
      if (rando<3){
        monsters.push(new Fast(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      } else if (rando >3 && rando <7){
        monsters.push(new Strong(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      } else if (rando >7 && rando <9){
        monsters.push(new Shield(windowWidth,windowHeight/2,1));
      } else {
        monsters.push(new Monster(random(windowWidth,windowWidth+2000),random(50,windowHeight-50),1.5));  
      }
      timer = millis();
    }

  }

  if (monsters.length==0){
    level_complete = true;
  }

  if (ball.dead == true) {
    if (level1_passed == true){
      ball = new Ball(windowWidth/7,2*windowHeight/3+50, 50);
    } else {
      ball = new Ball(windowWidth/7,2*windowHeight/3+50, 40);
    }
    
  }
  
  catapult.display();
  ball.display();
  ball.connect(catapult);
  
  for (let i=monsters.length-1; i>=0; i--){
      monsters[i].display();
      if (monsters[i].pos.x<0 || monsters[i].isDead(ball) == true){
        if (monsters[i].pos.x<0){
          lifecount = lifecount-1;
        }
        if (monsters[i].isDead(ball)){
          scorecount = scorecount + 10;

        }
         monsters.splice(i,1);    
      }
  }


  for (let i=0; i<announcements.length; i++){
      announcements[i].display();
      announcements[i].destroy();
      if (announcements[i].dead == true){
        announcements.splice(i);
      }
  }

}

class Monster {
  constructor(x,y,speed){
    this.pos = createVector(x, y);
    this.speed = speed;
    this.dead = false;
    this.radius = 10;
    this.lineend = this.pos.y-10;
    this.color = color(125, 249, 255);
    this.color2 = color(102, 130, 147);
  }
  display(){
    push();
    fill(this.color);
    circle(this.pos.x,this.pos.y,20);
    fill(this.color2)
    ellipse(this.pos.x,this.pos.y+5,40,10)
    fill(this.color);
    circle(this.pos.x-12,this.pos.y+9,7);
    circle(this.pos.x,this.pos.y+9,7);
    circle(this.pos.x+12,this.pos.y+9,7);
    pop();
    
    this.pos.x = this.pos.x - this.speed;
  }   

  isDead(ball){
    if (dist(ball.pos.x,ball.pos.y,this.pos.x,this.pos.y) < ball.radius + this.radius){
      return true;
    }
  }
}

class Strong extends Monster{
  constructor(x,y,speed){
    super(x,y,speed);
    this.color = color(255,165,0);
    this.life = 5; 
  }

  isDead(ball){
    if (dist(ball.pos.x,ball.pos.y,this.pos.x,this.pos.y) < ball.radius + this.radius){
      this.life = this.life -1;
      this.color = color(125, 249, 255);
    if (this.life == 0){
      return true;
    }
}
  }
}

class Shield extends Monster{
  constructor(x,y,speed){
    super(x,y,speed);
  }
  display(){
    push();
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x,this.pos.y,5,700);
    pop();
    this.pos.x = this.pos.x - this.speed;
  }
  isDead(ball){
    if (ball.pos.x+ball.radius > this.pos.x){
      console.log(ball.pos.y-this.pos.y)
      ball.speedx = -7;
      return true;
  }
}
}

class Fast extends Monster{
  constructor(x,y,speed){
    super(x,y,speed);
    this.color = color(20,165,0);
  }
  display(){
    circle(this.pos.x, this.pos.y,this.radius)
    this.pos.x = this.pos.x - random(0,5);
    this.pos.y = this.pos.y + random(-5,5);
  }   
}


class Catapult {
  constructor(x,y){
    this.anchor = createVector(x,y);
    this.k = 0.1 
    this.length = 5;
    this.radius = 30;

  }
    display(){
      push();
      fill(200,200,200);
      rectMode(CENTER);  
      rect(this.anchor.x,this.anchor.y,10,10);
      pop();    
    }
    
}

class Ball {
  constructor(x,y,radius){
    this.pos = createVector(x,y);
    this.radius = radius;
    this.dead = false;
    this.launched = false;
  }
  display(){
    push();
    fill(200,200,200);
    circle(this.pos.x,this.pos.y,this.radius);
    pop();
    if (this.launched == true){
      this.pos.x = this.pos.x + 2*this.speedx;
      this.pos.y = this.pos.y + 2*this.speedy;
      this.speedy = this.speedy + this.gravity;
    }
    if (this.pos.x > windowWidth+this.radius/2 || this.pos.x < 0-this.radius/2 || this.pos.y > windowHeight+this.radius/2 || this.pos.y < 0-this.radius/2){
      this.dead=true;
    }
    console.log(this.speedx);
  }
  connect(catapult) {
    if (this.launched == false){
      push();
      stroke(200,200,200);

      line(catapult.anchor.x, catapult.anchor.y, this.pos.x, this.pos.y);
      pop();
    }
  }
  dragged(){
    let distance = dist(this.pos.x,this.pos.y,mouseX,mouseY);
    if (distance<this.radius) {
        this.pos.x = mouseX;
        this.pos.y = mouseY;     
    }
  }
  released(catapult){
    this.speedx = (catapult.anchor.x - mouseX)/10;
    this.speedy = (catapult.anchor.y - mouseY)/10;
    this.launched = true;
    this.gravity = 0.5;
  } 
}

class Announcement{
  constructor(word,width,height){
    this.word=word;
    this.width=width/2;
    this.height=height/4;
    this.time=millis();
    this.dead=false;
  }
  display(){
    push();
    strokeWeight(1.5);
    text(this.word,this.width,this.height);
    textAlign(CENTER);
    pop();
  }
  destroy(){
    if (millis()>this.time+duration){
      this.dead=true;
    }
  }
}

class Stats {
  constructor(name1, number1, x,y){
    this.pos = createVector(x,y);
    this.textsize = 20;
    this.name = name1;
    this.number = number1;
  }
  display(){
    fill(255);
    text(this.name + ": " + this.number, this.pos.x,this.pos.y);
    textAlign(CENTER);
    textSize(this.textsize);
  }
}

function mouseDragged(){
    ball.dragged();

}

function mouseReleased(){
    ball.released(catapult);
}

function keyPressed(){
    if (keyCode === RETURN) {
      if (ult>0) {
        monsters = [];
        ult = ult -1;
      }
    }
}


// windowResized() is called whenever the browser size changes.
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  for (let i=0; i<monsters.length; i++){
    monsters.splice(i);
  }
  fill(255)
  announcements = [];
  announcements.push(new Announcement('(Window is resized. Game has been restarted)',windowWidth,windowHeight+200))
  level1_trigger = true;
  level2_trigger = false;
  level3_trigger = false;
  level4_trigger = false;
}
