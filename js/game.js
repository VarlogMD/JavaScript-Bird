var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/PipeBottom.png";


//Sound Files
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";


var score = 0;

//Pipes Gap
var gap = 120;


//Buttons and Move
document.addEventListener("keydown", moveUp);
document.addEventListener("mousedown", moveUp);


//Move Up
function moveUp() {
	yPos -= 25;
	fly.play();
}


//Blocks creating
var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0,
}

//Bird Position and Gravity
var xPos = 10;
var yPos = 150;
var grav = 1.5;



function draw() {
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

//Pipes Spawn Randomly		
		if(pipe[i].x == 90) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
			});
		}


// Loose condition
		if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height || yPos < 0 + bird.height) {
				location.reload();	//Reload
			}

// Score Add
		if(pipe[i].x == 5) {
			score++;	
			score_audio.play();
		}	

	}
	
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

// Falling Down	
	yPos += grav;

//Score Style
	ctx.fillStyle = "#000";
	ctx.font = "24px Arial";
	ctx.fillText("Score: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;