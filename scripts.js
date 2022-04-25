let dimension = 16;

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

makeGrid(dimension);