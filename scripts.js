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
    //checks if eraser is still toggled
    if (isModifierActive("eraser")) {
        e.target.classList.add('background');
        e.target.style.backgroundColor = bgColor;
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
        if (isModifierActive("eraser")) {
            e.target.classList.add('background');
            e.target.style.backgroundColor = bgColor;
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

makeGrid(dimension);
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