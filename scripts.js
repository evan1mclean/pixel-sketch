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

function penColor() {
    draw(color);
    document.getElementById('penColor').addEventListener('input', (e) => {
    draw(e.target.value);
});
}

function changeGridSize() {
    document.getElementById('gridSlider').addEventListener('input', (e) => {
        let container = document.querySelector('.container');
        let sketchpad = document.querySelector('.sketchpad');
        sketchpad.remove();
        sketchpad = document.createElement('div');
        sketchpad.classList.add('sketchpad');
        container.appendChild(sketchpad);
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

makeGrid(dimension);
changeBackgroundColor();
changeGridSize();
penColor();