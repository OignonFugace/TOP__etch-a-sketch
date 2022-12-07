
const container = document.getElementById('container');
const gridSizeBtn = document.getElementById('gridSizeBtn');
let isDrawing = false;

gridSizeBtn.addEventListener('click', changeGridSize);

let numberOfDiv = 16;

makeGrid(null, numberOfDiv);

function changeGridSize(e) {
    numberOfDiv = prompt('Side size of the grid ? ');
    makeGrid(e, numberOfDiv);
}

function makeGrid(e, numberOfDiv) {
    container.style.setProperty('grid-template-columns', `repeat(${numberOfDiv}, 1fr)`);
    Array.from(container.children).forEach(element => {
        element.remove();
    });
    for (let i = 0; i < numberOfDiv ** 2; i++) {
        const div = document.createElement('div');
        // div.addEventListener('mouseover', function(e) { colorDiv(e, 'black') });
        // div.addEventListener('mouseenter', function(e) { colorDiv(e, '#999') })
        // div.addEventListener('mouseleave', function(e) { uncolorDiv(e) });
        div.addEventListener('mousedown', e => isDrawing = true);
        div.addEventListener('mouseup', e => isDrawing = false);
        div.addEventListener('mousemove', e => {
            if (isDrawing) draw(e, 'black');
        });
        container.addEventListener('mouseleave', e => isDrawing = false);
        container.appendChild(div);
    }
}

function colorDiv(e, color) {
    e.target.style.backgroundColor = color;
}

function uncolorDiv(e) {
    e.target.style.backgroundColor = '';
}

function draw(context) {
    colorDiv(context, 'black');
}