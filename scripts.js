//Global variables for initial values
let dimension = document.getElementById('gridSlider').value;
let color = document.getElementById('penColor').value;

//Draws a grid of divs in the sketchpad container div.
function makeGrid(dimension, bgColor) {
    let sketchpad = document.querySelector('.sketchpad');
    let gridSize = document.getElementById('gridSize');
    gridSize.textContent = `Grid Size: ${dimension} x ${dimension}`;
    sketchpad.style.display = 'grid';
    sketchpad.style.gridTemplateColumns =  `repeat(${dimension}, 1fr)`;
    for (let i =0; i < (dimension * dimension); i++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        grid.classList.add('background');
        grid.style.backgroundColor = bgColor;
        sketchpad.appendChild(grid);
    }
}

//Removes the sketchpad container and then adds it again
function removeGrid() {
    let container = document.querySelector('.container');
        let sketchpad = document.querySelector('.sketchpad');
        sketchpad.remove();
        sketchpad = document.createElement('div');
        sketchpad.classList.add('sketchpad');
        container.appendChild(sketchpad);
}

//Function passed into an event listener allowing you to draw in the sketchpad by changing the grid div's background colors when the mouse is clicked
function drawWithClick(e) {
    color = document.getElementById('penColor').value;
    bgColor = document.getElementById('bgColor').value;
    //checks for the different drawing modifiers and draws different colors depending on what's selected
    if (isModifierActive("eraser")) {
        e.target.classList.add('background');
        e.target.style.backgroundColor = bgColor;
    }
    else if (isModifierActive("shader")) {
        e.target.classList.remove('background');
        color = e.target.style.backgroundColor;
        let hex = RGBToHex(color);
        let newColor = adjust(hex, -10);
        e.target.style.backgroundColor = newColor;
    }
    else if (isModifierActive("lighten")) {
        e.target.classList.remove('background');
        color = e.target.style.backgroundColor;
        let hex = RGBToHex(color);
        let newColor = adjust(hex, 10);
        e.target.style.backgroundColor = newColor;
    }
    else {
        //removes background class from grid div so changing background color doesn't override what you've drawn
        e.target.classList.remove('background');
        e.target.style.backgroundColor = color;
    }
}

//Function passed into an event listener allowing you to draw in the sketchpad by changing the grid div's background colors when the mouse is passed over a div with the mouse down
function drawWithHover(e) {
    color = document.getElementById('penColor').value;
    bgColor = document.getElementById('bgColor').value;
    if (e.buttons == 1) {
        //checks for the different drawing modifiers and draws different colors depending on what's selected
        if (isModifierActive("eraser")) {
            e.target.classList.add('background');
            e.target.style.backgroundColor = bgColor;
        }
        else if (isModifierActive("shader")) {
            e.target.classList.remove('background');
            color = e.target.style.backgroundColor;
            let hex = RGBToHex(color);
            let newColor = adjust(hex, -10);
            e.target.style.backgroundColor = newColor;
        }
        else if (isModifierActive("lighten")) {
            e.target.classList.remove('background');
            color = e.target.style.backgroundColor;
            let hex = RGBToHex(color);
            let newColor = adjust(hex, 10);
            e.target.style.backgroundColor = newColor;
        }
        else {
            //removes background class from grid div so changing background color doesn't override what you've drawn
            e.target.classList.remove('background');
            e.target.style.backgroundColor = color;
        }
    }
}

//Function to set the listeners on all of the items in the sketchpad
function setGridListeners() {
    let grid = document.querySelectorAll('.grid');
    grid.forEach((pixel) => {
        pixel.addEventListener('mousedown', drawWithClick);
        pixel.addEventListener('mouseenter', drawWithHover);
    });
}

//Function to check if drawing modifier button is currently active
function isModifierActive(button) {
    let btn = document.querySelector(`.${button}`);
    if (btn.classList.contains('selected')) {
        return true;
    }
    else {
        return false;
    }
}

//Takes input from grid slider to get a new dimension. Destroys the grid and rebuilds
//with new dimension value.
function changeGridSize() {
    document.getElementById('gridSlider').addEventListener('input', (e) => {
        removeGrid();
        bgColor = document.getElementById('bgColor').value;
        makeGrid(e.target.value, bgColor);
        color = document.getElementById('penColor').value;
        setGridListeners();
    });
}

//Recieves input value from background color picker and changes all divs with background class to have that value for background color
function changeBackgroundColor() {
    document.getElementById('bgColor').addEventListener('input', (e) => {
        let grid = document.querySelectorAll('.background');
        grid.forEach((cell) => {
            cell.style.backgroundColor = `${e.target.value}`;
        })
        setGridListeners();
    });
}

//toggles buttons off except for the grid lines button
function toggleButtonOff() {
    let selected = document.querySelectorAll('button');
    selected.forEach((button) => {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
        }
    })
}

/* These two functions are stolen completely from online. Had no idea how to parse
rgb colors and shift them so I figured, why reinvent the wheel? */

//Taken from: https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}

//Taken from user supersan: https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

/* -------------- Button Functions are below this line  ---------------------- */

//When grid line button is clicked, button is toggled and grid borders are removed or added
function gridLines() {
    let btn = document.querySelector('.gridlines');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('gridbutton')) {
            btn.classList.remove('gridbutton');
            let grid = document.querySelectorAll('.grid');
            grid.forEach((square) => square.style.border = "1px rgba(0, 0, 0, 0.041) solid");
        }
        else {
            btn.classList.add('gridbutton');
            let grid = document.querySelectorAll('.grid');
            grid.forEach((square) => square.style.border = "none");
        }
    });
}

//Function for toggling drawing modifier buttons on or off
function modifier(button) {
    let btn = document.querySelector(`.${button}`);
    btn.addEventListener('click', () => {
        if (btn.classList.contains('selected')) {
            toggleButtonOff();
        }
        else {
            toggleButtonOff();
            btn.classList.toggle('selected');
        }
    });
}

//If clear button is clicked, call the removeGrid function, clear the buttons and
//redraw the grid
function clearGrid() {
    let btn = document.querySelector('.clear');
    let gridbutton = document.querySelector('.gridlines')
    btn.addEventListener('click', function () {
        removeGrid();
        color = document.getElementById('penColor').value;
        bgColor = document.getElementById('bgColor').value;
        dimension = document.getElementById('gridSlider').value;
        toggleButtonOff();
        gridbutton.classList.remove('gridbutton');
        makeGrid(dimension, bgColor);
        setGridListeners();
    })
}

makeGrid(dimension, "rgb(255,255,255)");
setGridListeners();
changeBackgroundColor();
changeGridSize();
clearGrid();
gridLines();
//instantiate each of the drawing modifier buttons
modifier("eraser");
modifier("shader");
modifier("lighten");
modifier("rainbow");