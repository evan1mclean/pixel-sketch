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

//If clear button is clicked, call the removeGrid function, clear the buttons and
//redraw the grid
function clearGrid() {
    let btn = document.querySelector('.clear');
    btn.addEventListener('click', function () {
        removeGrid();
        color = document.getElementById('penColor').value;
        bgColor = document.getElementById('bgColor').value;
        dimension = document.getElementById('gridSlider').value;
        toggleButtonOff();
        makeGrid(dimension, bgColor);
        //reinstantiates the draw function
        draw(color);
    })
}

//Function allowing you to draw in the sketchpad by changing the grid div's background
//colors to the color passed in.
function draw(color) {
    let grid = document.querySelectorAll('.grid');
    if (isButtonActive("eraser")) {
        bgColor = document.getElementById('bgColor').value;
        color = bgColor;
    }
    else {
        grid.forEach ((pixel) => pixel.addEventListener('mouseover', function(e) {
            pixel.addEventListener('mousedown', function() {
                //removes background class from grid div so changing background color doesn't override what you've drawn
                pixel.classList.remove('background');
                pixel.style.backgroundColor = color;
            });
            if (e.buttons == 1) {
                //removes background class from grid div so changing background color doesn't override what you've drawn
                pixel.classList.remove('background');
                pixel.style.backgroundColor = color;
            }
        }));
    }
}

//Function to check if the eraser is currently active
function isButtonActive(button) {
    let eraser = document.querySelector(`.${button}`);
    if (eraser.classList.contains('selected')) {
        return true;
    }
    else {
        return false;
    }
}

//Recieves input from the pen color picker to pass that value into the draw function
function changePenColor() {
    color = document.getElementById('penColor').value;
    draw(color);
    document.getElementById('penColor').addEventListener('input', (e) => {
        draw(e.target.value);
    });
}

//Takes input from grid slider to get a new dimension. Destroys the grid and rebuilds
//with new dimension value.
function changeGridSize() {
    document.getElementById('gridSlider').addEventListener('input', (e) => {
        removeGrid();
        bgColor = document.getElementById('bgColor').value;
        makeGrid(e.target.value, bgColor);
        color = document.getElementById('penColor').value;
        draw(color);
    });
}

//Recieves input value from background color picker and changes all divs with background class to have that value for background color
function changeBackgroundColor() {
    document.getElementById('bgColor').addEventListener('input', (e) => {
        let grid = document.querySelectorAll('.background');
        grid.forEach((cell) => {
            cell.style.backgroundColor = `${e.target.value}`;
        })
        changePenColor();
    });
}

//toggles all buttons off
function toggleButtonOff() {
    let selected = document.querySelectorAll('button');
    selected.forEach((button) => {
        if (button.classList.contains('selected') === true) {
            button.classList.remove('selected');
        }
    })
}

/* -------------- Button Functions are below this line  ---------------------- */

//When grid line button is clicked, button is toggled and grid borders are removed or added
function gridLines() {
    let btn = document.querySelector('.gridlines');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('selected') == false) {
            btn.classList.add('selected');
            let grid = document.querySelectorAll('.grid');
            grid.forEach((square) => square.style.border = "none");
        }
        else {
            toggleButtonOff();
            let grid = document.querySelectorAll('.grid');
            grid.forEach((square) => square.style.border = "1px rgba(0, 0, 0, 0.041) solid");
        }
    });
}

//Function for drawing divs as current background color
function eraser() {
    toggleButtonOff();
    let btn = document.querySelector('.eraser');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('selected')) {
            toggleButtonOff();
        }
        else {
            btn.classList.add('selected');
            bgColor = document.getElementById('bgColor').value;
            let grid = document.querySelectorAll('.grid');
            grid.forEach ((pixel) => pixel.addEventListener('mouseover', function(e) {
                pixel.addEventListener('mousedown', function() {
                    //adds background class so change background function works properly
                    pixel.classList.add("background");
                    pixel.style.backgroundColor = bgColor;
                });
                if (e.buttons == 1) {
                    //adds background class so change background function works properly
                    pixel.classList.add("background");
                    pixel.style.backgroundColor = bgColor;
                }
            }));
        }
        //reinstantiates the ability to draw
        changePenColor();
    });
}

makeGrid(dimension);
changeBackgroundColor();
changeGridSize();
changePenColor();
clearGrid();
eraser();
gridLines();