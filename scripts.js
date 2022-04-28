let dimension = document.getElementById('gridSlider').value;
let color = document.getElementById('penColor').value;
let bgColor = document.getElementById('bgColor').value;

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

function removeGrid() {
    let container = document.querySelector('.container');
        let sketchpad = document.querySelector('.sketchpad');
        sketchpad.remove();
        sketchpad = document.createElement('div');
        sketchpad.classList.add('sketchpad');
        container.appendChild(sketchpad);
}

function clearGrid() {
    let btn = document.querySelector('.clear');
    btn.addEventListener('click', function () {
        removeGrid();
        color = document.getElementById('penColor').value;
        bgColor = document.getElementById('bgColor').value;
        dimension = document.getElementById('gridSlider').value;
        toggleButtonOff();
        makeGrid(dimension, bgColor);
        draw(color);
    })
}

function gridLines() {
    let btn = document.querySelector('.gridlines');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('selected') == false) {
            btn.classList.add('selected');
            let grid = document.querySelectorAll('.grid');
            grid.forEach((square) => square.style.border = "none");
        }
        else {
            btn.classList.remove('selected');
            let grid = document.querySelectorAll('.grid');
            grid.forEach((square) => square.style.border = "1px rgba(0, 0, 0, 0.041) solid");
        }
    });
}

function draw(color) {
    let grid = document.querySelectorAll('.grid');
    grid.forEach ((pixel) => pixel.addEventListener('mouseover', function(e) {
        pixel.addEventListener('mousedown', function() {
            pixel.classList.remove('background');
            pixel.style.backgroundColor = color;
        });
        if (e.buttons == 1) {
            pixel.classList.remove('background');
            pixel.style.backgroundColor = color;
        }
    }));
}

function changePenColor() {
    color = document.getElementById('penColor').value;
    draw(color);
    document.getElementById('penColor').addEventListener('input', (e) => {
        toggleButtonOff();
        draw(e.target.value);
    });
}

function changeGridSize() {
    document.getElementById('gridSlider').addEventListener('input', (e) => {
        removeGrid();
        toggleButtonOff();
        bgColor = document.getElementById('bgColor').value;
        makeGrid(e.target.value, bgColor);
        color = document.getElementById('penColor').value;
        draw(color);
    });
}

function changeBackgroundColor() {
    document.getElementById('bgColor').addEventListener('input', (e) => {
        toggleButtonOff();
        let grid = document.querySelectorAll('.background');
        grid.forEach((cell) => {
            cell.style.backgroundColor = `${e.target.value}`;
        })
        changePenColor();
    });
}

function toggleButtonOff() {
    let selected = document.querySelectorAll('button');
    selected.forEach((button) => {
        if (button.classList.contains('selected') === true) {
            button.classList.remove('selected');
        }
    })
}

function eraser() {
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
                        pixel.classList.add("background");
                        pixel.style.backgroundColor = bgColor;
                    });
                    if (e.buttons == 1) {
                        pixel.classList.add("background");
                        pixel.style.backgroundColor = bgColor;
                    }
                }));
            }
        });
}
makeGrid(dimension);
changeBackgroundColor();
changeGridSize();
changePenColor();
clearGrid();
eraser();
gridLines();