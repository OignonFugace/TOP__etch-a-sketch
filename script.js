'use strict';

function makeApp() {

    /* VARIABLES DECLARATION */
    const container = document.getElementById('container');
    const gridSizeBtn = document.getElementById('gridSizeBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    const drawBtn = document.getElementById('drawBtn');
    const colorPicker = document.getElementById('colorPicker');
    const multicolorBtn = document.getElementById('multicolorBtn');
    let isDrawing = false;
    let drawingOption = 'color';
    let currentColor = 'black';
    let numberOfDiv = 31;
    const colorPalette = ['#582f0e', '#7f4f24', '#936639', '#a68a64', '#b6ad90', '#c2c5aa', '#a4ac86', '#656d4a', '#414833', '#333d29'];

    function makeGrid(e, numberOfDiv) {
        container.style.setProperty('grid-template-columns', `repeat(${numberOfDiv}, 1fr)`);
        Array.from(container.children).forEach(element => element.remove());
        for (let i = 0; i < numberOfDiv ** 2; i++) {
            const div = document.createElement('div');
            div.addEventListener('mousedown', (e) => {
                isDrawing = true;
                draw(e);
            });
            div.addEventListener('mouseup', () => isDrawing = false);
            div.addEventListener('mouseover', e => {
                if (isDrawing === true) draw(e);
            });
            container.appendChild(div);
        }
    }

    function draw(e) {
        switch (drawingOption) {
            case 'color':
                e.target.style.backgroundColor = currentColor;
                break;
            case 'erase':
                e.target.style.backgroundColor = '';
                break;
            case 'multicolor':
                let index = Math.floor(Math.random() * colorPalette.length)
                e.target.style.backgroundColor = colorPalette[index];
                break;
        }
    }

    function changeGridSize(e) {
        numberOfDiv = prompt('Side size of the grid ? ');
        if (!numberOfDiv) numberOfDiv = 31;
        makeGrid(e, numberOfDiv);
    }


    function app() {
        window.addEventListener('mouseup', () => isDrawing = false);
        window.addEventListener('mouseleave', () => isDrawing = false);
        gridSizeBtn.addEventListener('click', changeGridSize);
        eraserBtn.addEventListener('click', () => drawingOption = 'erase');
        drawBtn.addEventListener('click', () => drawingOption = 'color');
        colorPicker.addEventListener('change', (e) => currentColor = e.target.value);
        multicolorBtn.addEventListener('click', () => drawingOption = 'multicolor');
        makeGrid(null, numberOfDiv);
    }

    return app;
}

let app = makeApp();
app();
