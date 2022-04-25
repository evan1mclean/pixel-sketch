let dimension = 100;

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

function draw() {
    let grid = document.querySelectorAll('.grid');
    grid.forEach ((pixel) => pixel.addEventListener('mouseover', function(e) {
        if (e.buttons == 1) {
            pixel.style.backgroundColor = "black";
        }
    }));
}

makeGrid(dimension);
draw();