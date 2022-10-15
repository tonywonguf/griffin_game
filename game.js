let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
// unit_resolution is the sqrt(number of pixels) in a single cell
let unit_resolution = 200;
// Uses unit_resolution to get full canvas size
let canvas_width = 32*unit_resolution;
let canvas_height = 33*unit_resolution;
// Sets attributes through js so I can use variables, tbh don't know how to do it otherwise
canvas.setAttribute("width",canvas_width)
canvas.setAttribute("height",canvas_height)
canvas.setAttribute("style","width:500px; height:500px;")
// Fill with green for now
ctx.fillStyle = "rgb(0,255,0)";
// Create canvas
ctx.fillRect(0,0,canvas_width,canvas_height)
// Set how thicc the line drawn is, change this to use math later
ctx.lineWidth = 10;
// Drawing the veritcal grid lines
for (let i = 0; i <= canvas_width/unit_resolution; i++) {
    ctx.strokeStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(unit_resolution*i,0);
    ctx.lineTo(unit_resolution*i,canvas_height)
    ctx.closePath();
    ctx.stroke();
}
// Drawing the horizontal grid lines
for (let i = 0; i <= canvas_height/unit_resolution; i++) {
    ctx.strokeStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(0,unit_resolution*i);
    ctx.lineTo(canvas_width,unit_resolution*i);
    ctx.closePath();
    ctx.stroke();
}

// Draws the sprite for griffin with parameters (x, y) with x and y being the top-left coordinates of image
function make_griffin(x, y) {
    griffin = new Image();
    griffin.src = "sprites/griffin_final.png";
    griffin.onload = function(){
        ctx.drawImage(griffin, x, y, unit_resolution, unit_resolution);
    }
}

// Draws the sprite for steak with parameters (x, y) with x and y being the top-left coordinates of image
function make_steak(x,y) {
    steak = new Image();
    steak.src = "sprites/steak_devil_final.png";
    steak.onload = function(){
        ctx.drawImage(steak, x, y, unit_resolution, unit_resolution);
    }
}

make_steak(0,0);
make_griffin(unit_resolution,unit_resolution)




// Below is boiler-plate code for future use
// Game loop

function update(progress) {
    // Update the state of the world for the elapsed time since last render
}

function draw() {
    // Draw the state of the world
}

function loop(timestamp) {
    var progress = timestamp - lastRender

    update(progress)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)