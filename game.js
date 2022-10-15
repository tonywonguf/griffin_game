let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
// unit_resolution is the sqrt(number of pixels) in a single cell
let unit_resolution = 200;
// Uses unit_resolution to get full canvas size
let canvas_width = 65*unit_resolution;
let canvas_height = 37*unit_resolution;
// How the grid actually looks on the page
let canvas_style_width = 1900;
let canvas_style_height = 945;
// Sets attributes through js so I can use variables, tbh don't know how to do it otherwise
canvas.width = canvas_width;
canvas.height = canvas_height;
canvas.style.width = canvas_style_width.toString()+"px";
canvas.style.height = canvas_style_height.toString()+"px";
// Fill with green for now
ctx.fillStyle = "rgb(0,255,0)";
// Create canvas
ctx.fillRect(0,0,canvas_width,canvas_height)
// Set how thicc the line drawn is, change this to use math later
ctx.lineWidth = 10;
window.scrollTo((canvas_style_width-screen.width)/2,(canvas_style_height-screen.height)/2);


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

// Creating griffin sprite
let griffin = document.getElementById("griffin");
griffin.width = unit_resolution*(canvas_style_width/canvas_width)
griffin.height = unit_resolution*(canvas_style_height/canvas_height)
griffin.style.marginLeft = ((canvas_style_width/2)-unit_resolution*(canvas_style_width/canvas_width)/2).toString()+"px";
griffin.style.marginTop = ((canvas_style_height/2)-unit_resolution*(canvas_style_height/canvas_height)/2).toString()+"px";

// Creating steak sprite
let steak = document.getElementById("steak");
steak.width = unit_resolution*(canvas_style_width/canvas_width);
steak.height = unit_resolution*(canvas_style_height/canvas_height);

window.addEventListener("keydown", getKeyPress);

window.addEventListener("keydown", (e) => {if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {e.preventDefault();}}, false);

function getKeyPress(event) {
    var scaled_pixel_width = (unit_resolution*(canvas_style_width/canvas_width));
    var scaled_pixel_height = (unit_resolution*(canvas_style_height/canvas_height));
    switch (event.code){
        case 'KeyA': case 'ArrowLeft':
            griffin.style.marginLeft = (parseFloat(griffin.style.marginLeft)-scaled_pixel_width).toString()+"px";
            window.scrollTo(window.scrollX-scaled_pixel_width, window.scrollY);
            break;
        case 'KeyS': case 'ArrowDown':
            griffin.style.marginTop = (parseFloat(griffin.style.marginTop)+scaled_pixel_height).toString()+"px";
            window.scrollTo(window.scrollX, window.scrollY+scaled_pixel_height);
            break;
        case 'KeyD': case 'ArrowRight':
            griffin.style.marginLeft = (parseFloat(griffin.style.marginLeft)+scaled_pixel_width).toString()+"px";
            window.scrollTo(window.scrollX+scaled_pixel_width, window.scrollY);
            break;
        case 'KeyW': case 'ArrowUp':
            griffin.style.marginTop = (parseFloat(griffin.style.marginTop)-scaled_pixel_height).toString()+"px";
            window.scrollTo(window.scrollX, window.scrollY-scaled_pixel_height);
            break;
    }

}

