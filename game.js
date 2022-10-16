let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
// unit_resolution is the sqrt(number of pixels) in a single cell
let unit_resolution = 200;
// Uses unit_resolution to get full canvas size
let canvas_width = 65*unit_resolution;
let canvas_height = 37*unit_resolution;
// How the grid actually looks on the page
let canvas_style_width = 1900;
let canvas_style_height = 920;
window.scrollTo(0,0);
// Sets attributes through js so I can use variables, tbh don't know how to do it otherwise
canvas.width = canvas_width;
canvas.height = canvas_height;
canvas.style.width = canvas_style_width.toString()+"px";
canvas.style.height = canvas_style_height.toString()+"px";

// Creating griffin sprite
let griffin = document.getElementById("griffin");
griffin.width = unit_resolution*(canvas_style_width/canvas_width)
griffin.height = unit_resolution*(canvas_style_height/canvas_height)
griffin.style.marginLeft = ((canvas_style_width/2)-unit_resolution*(canvas_style_width/canvas_width)/2-8).toString()+"px";
griffin.style.marginTop = ((canvas_style_height/2)-unit_resolution*(canvas_style_height/canvas_height)/2).toString()+"px";

// Creating steak sprite
let steak = document.getElementById("steak");
steak.width = unit_resolution*(canvas_style_width/canvas_width);
steak.height = unit_resolution*(canvas_style_height/canvas_height);
steak.style.marginLeft = ((canvas_style_width-47)/2).toString()+"px";
steak.style.marginTop = "-25px"

draw();

const wall = [[]];
let placed_walls = [[]];
let griffin_position_x  = (griffin.getBoundingClientRect().left+griffin.width/2)*(canvas_width/canvas_style_width);
let griffin_position_y  = (griffin.getBoundingClientRect().top-griffin.height/2)*(canvas_height/canvas_style_height);
// Get the horizontal wall points above and below griffin
for (let i = 0; i < 2; i++) for (let j = 0; j < 31; j++){
    (i === 0) ? wall.push([j*unit_resolution+griffin_position_x-15*unit_resolution,griffin_position_y-16*unit_resolution]) : wall.push([j*unit_resolution+griffin_position_x-15*unit_resolution,griffin_position_y+16*unit_resolution]);
    }
// Get the vertical line points to the left and right of griffin
for (let i = 0; i < 2; i++) for (let j = 0; j < 31; j++) {
    (i === 0) ? wall.push([griffin_position_x-16*unit_resolution,griffin_position_y-15*unit_resolution+j*unit_resolution]) : wall.push([griffin_position_x+16*unit_resolution,griffin_position_y-15*unit_resolution+j*unit_resolution]);
    }
// for (let i = 1; i < 33*2+33*2+1; i++) {
//     ctx.fillStyle = "green";
//     ctx.fillRect(wall[i][0]-100,wall[i][1]-100,200,200)
// }

function draw(walls = [[]]) {
    ctx.lineWidth = 15;
    // Gradient around griffin
    var griffin_position_x  = (griffin.getBoundingClientRect().left+griffin.width/2)*(canvas_width/canvas_style_width);
    var griffin_position_y  = (griffin.getBoundingClientRect().top-griffin.height/2)*(canvas_height/canvas_style_height);
    var grd = ctx.createRadialGradient(griffin_position_x, griffin_position_y, 500,griffin_position_x,griffin_position_y,2000);
    grd.addColorStop(0, "white");
    grd.addColorStop(1, "orange");
    ctx.fillStyle = grd;
    //  Create canvas
    ctx.fillRect(0,0,canvas_width,canvas_height)
    ctx.fillStyle = "red";
    walls.forEach(p => ctx.fillRect(p[0]-100,p[1]-100,200,200));
    if (walls.length !== 1) {
        steak.style.marginLeft = ((walls[walls.length - 1][0]-150)*(canvas_style_width/canvas_width)).toString() + "px";
        steak.style.marginTop = ((walls[walls.length - 1][1]-100)*(canvas_style_height/canvas_height)).toString() + "px";
    }
    // Set how thicc the line drawn is, change this to use math later
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
}

window.addEventListener("keydown", getKeyPress);

window.addEventListener("keydown", (e) => {if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {e.preventDefault();}}, false);

let turn = false;

function getKeyPress(event) {
    var scaled_pixel_width = (unit_resolution*(canvas_style_width/canvas_width));
    var scaled_pixel_height = (unit_resolution*(canvas_style_height/canvas_height));
    switch (event.code){
        case 'KeyA': case 'ArrowLeft':
            griffin.style.marginLeft = (parseFloat(griffin.style.marginLeft)-scaled_pixel_width).toString()+"px";
            turn = true;
            // window.scrollTo(window.scrollX-scaled_pixel_width, window.scrollY);
            break;
        case 'KeyS': case 'ArrowDown':
            griffin.style.marginTop = (parseFloat(griffin.style.marginTop)+scaled_pixel_height).toString()+"px";
            turn = true;
            // window.scrollTo(window.scrollX, window.scrollY+scaled_pixel_height);
            break;
        case 'KeyD': case 'ArrowRight':
            griffin.style.marginLeft = (parseFloat(griffin.style.marginLeft)+scaled_pixel_width).toString()+"px"
            turn = true;
            // window.scrollTo(window.scrollX+scaled_pixel_width, window.scrollY);
            break;
        case 'KeyW': case 'ArrowUp':
            griffin.style.marginTop = (parseFloat(griffin.style.marginTop)-scaled_pixel_height).toString()+"px";
            turn = true;
            // window.scrollTo(window.scrollX, window.scrollY-scaled_pixel_height);
            break;
    }
    if (turn) {
        let devil_move = [wall[1][0], wall[1][1], 1]
        let griffin_position_x = (griffin.getBoundingClientRect().left + griffin.width / 2) * (canvas_width / canvas_style_width);
        let griffin_position_y = (griffin.getBoundingClientRect().top - griffin.height / 2) * (canvas_height / canvas_style_height);
        for (let i = 1; i < wall.length; i++) {
            let wall_pytha_from_griffin = Math.sqrt((griffin_position_x - wall[i][0]) * (griffin_position_x - wall[i][0]) + (griffin_position_y - wall[i][1]) * (griffin_position_y - wall[i][1]));
            let curr_pytha_from_griffin = Math.sqrt((griffin_position_x - devil_move[0]) * (griffin_position_x - devil_move[0]) + (griffin_position_y - devil_move[1]) * (griffin_position_y - devil_move[1]));
            if (wall_pytha_from_griffin < curr_pytha_from_griffin) {
                devil_move[0] = wall[i][0];
                devil_move[1] = wall[i][1];
                devil_move[2] = i;
            }
        }
        wall.splice(devil_move[2], 1)
        placed_walls.push([devil_move[0], devil_move[1]]);
        draw(placed_walls)
        turn = false
        placed_walls.forEach(p => {if (parseInt(griffin_position_x) == parseInt(p[0]) && parseInt(griffin_position_y) == parseInt(p[1])) {window.alert("griffin died")}});
        if (placed_walls.length === 31*4+1)
            setTimeout(() => {window.alert('griffin is trapped');}, 50);
    }
}
