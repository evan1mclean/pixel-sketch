let dimension = 20;

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
        pixel.addEventListener('mousedown', function() {
            pixel.style.backgroundColor = "black";
        });
        if (e.buttons == 1) {
            pixel.style.backgroundColor = "black";
        }
    }));
}

makeGrid(dimension);
draw();