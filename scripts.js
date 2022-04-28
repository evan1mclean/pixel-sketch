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
        toggleButton('eraser');
        makeGrid(dimension, bgColor);
        draw(color);
    })
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
    draw(color);
    document.getElementById('penColor').addEventListener('input', (e) => {
    draw(e.target.value);
});
}

function changeGridSize() {
    document.getElementById('gridSlider').addEventListener('input', (e) => {
        removeGrid();
        bgColor = document.getElementById('bgColor').value;
        makeGrid(e.target.value, bgColor);
        color = document.getElementById('penColor').value;
        draw(color);
    });
}

function changeBackgroundColor() {
    document.getElementById('bgColor').addEventListener('input', (e) => {
        let grid = document.querySelectorAll('.background');
        grid.forEach((cell) => {
            cell.style.backgroundColor = `${e.target.value}`;
        })
    });
}

function toggleButton(button) {
    let selected = document.querySelector(`.${button}`);
    if (selected.classList.contains(selected)) {
        selected.classList.remove('selected');
    }
    else {
        selected.classList.toggle('selected');
    }
}

function eraser() {
    let btn = document.querySelector('.eraser');
        btn.addEventListener('click', (e) => {
            toggleButton('eraser');
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
        });
    changeBackgroundColor();
}

makeGrid(dimension);
changeBackgroundColor();
changeGridSize();
changePenColor();
clearGrid();
eraser();