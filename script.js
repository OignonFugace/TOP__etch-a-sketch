'use strict';

function makeApp() {

    /* VARIABLES DECLARATION */
    const container = document.getElementById('container');
    const gridSizeBtn = document.getElementById('gridSizeBtn');
    let isDrawing = false;
    let numberOfDiv = 16;

    function makeGrid(e, numberOfDiv) {
        container.style.setProperty('grid-template-columns', `repeat(${numberOfDiv}, 1fr)`);
        Array.from(container.children).forEach(element => element.remove());
        for (let i = 0; i < numberOfDiv ** 2; i++) {
            const div = document.createElement('div');
            div.addEventListener('mousedown', e => isDrawing = true);
            div.addEventListener('mouseup', e => isDrawing = false);
            div.addEventListener('mousemove', e => {
                if (isDrawing === true) draw(e, 'black');
            });
            container.appendChild(div);
        }
    }

    function draw(context) {
        colorDiv(context, 'black');
    }

    function colorDiv(e, color) {
        e.target.style.backgroundColor = color;
    }

    function uncolorDiv(e) {
        e.target.style.backgroundColor = '';
    }

    function changeGridSize(e) {
        numberOfDiv = prompt('Side size of the grid ? ');
        makeGrid(e, numberOfDiv);
    }

    function app() {
        window.addEventListener('mouseup', e => isDrawing = false);
        window.addEventListener('mouseleave', e => isDrawing = false);
        gridSizeBtn.addEventListener('click', changeGridSize);
        makeGrid(null, numberOfDiv);
    }

    return app;
}

let app = makeApp();
app();
