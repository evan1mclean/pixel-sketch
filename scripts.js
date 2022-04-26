let dimension = document.getElementById('gridSlider').value;
let color = document.getElementById('penColor').value;

function makeGrid(dimension) {
    let sketchpad = document.querySelector('.sketchpad');
    sketchpad.style.display = 'grid';
    sketchpad.style.gridTemplateColumns =  `repeat(${dimension}, 1fr)`;
    for (let i =0; i < (dimension * dimension); i++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        sketchpad.appendChild(grid);
    }
}

function draw(color) {
    let grid = document.querySelectorAll('.grid');
    grid.forEach ((pixel) => pixel.addEventListener('mouseover', function(e) {
        pixel.addEventListener('mousedown', function() {
            pixel.style.backgroundColor = color;
        });
        if (e.buttons == 1) {
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
        makeGrid(e.target.value);
        draw(color);
    });
}

makeGrid(dimension);
changeGridSize();
penColor();