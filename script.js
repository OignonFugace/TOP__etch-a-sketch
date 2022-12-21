'use strict';

function makeApp() {

    /* VARIABLES DECLARATION */

    const rgbregex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
    const rgbaregex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

    const container = document.getElementById('container');
    const gridSizeBtn = document.getElementById('gridSizeBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    const drawBtn = document.getElementById('drawBtn');
    const colorPicker = document.getElementById('colorPicker');
    const multicolorBtn = document.getElementById('multicolorBtn');
    const clearBtn = document.getElementById('clearBtn');
    const lightenBtn = document.getElementById('lightenBtn');
    const darkenBtn = document.getElementById('darkenBtn');

    let isDrawing = false;
    let drawingOption = 'color';
    let currentColor = '#000';
    let numberOfDiv = 31;

    const colorPalette = ['#582f0e', '#7f4f24', '#936639', '#a68a64', '#b6ad90', '#c2c5aa', '#a4ac86', '#656d4a', '#414833', '#333d29'];

    function makeGrid(numberOfDiv) {
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
            case 'darken':
                let currentColorString = e.target.style.backgroundColor;
                let colorValues;
                let opacity;
                if (currentColorString.match(rgbregex)) {
                    opacity = '1';
                    colorValues = currentColorString.match(rgbregex)[1] + ',';
                } else if (currentColorString.match(rgbaregex)) {
                    opacity = currentColorString.match(rgbaregex)[27];
                    colorValues = currentColorString.match(rgbaregex)[1];
                } else {
                    opacity = '1';
                    colorValues = '255, 255, 255,';
                }
                let newOpacity = +opacity - 0.1;
                e.target.style.backgroundColor = `rgba(${colorValues} ${newOpacity})`;
                break;
            case 'lighten':
                let style = window.getComputedStyle(e.target, '::after');
                let colorString = style.getPropertyValue('background-color'); 
                let opacityValue = colorString.match(rgbaregex)[27];
                let newOpacityValue = +opacityValue + 0.1
                style.setProperty('background-color', `rgba(255, 255, 255, ${newOpacityValue})`);
                console.log(style);
                break;
        }
    }

    function changeGridSize(e) {
        numberOfDiv = prompt('Side size of the grid ? ');
        if (!numberOfDiv) numberOfDiv = 31;
        makeGrid(numberOfDiv);
    }


    function app() {
        window.addEventListener('mouseup', () => isDrawing = false);
        window.addEventListener('mouseleave', () => isDrawing = false);
        gridSizeBtn.addEventListener('click', changeGridSize);
        eraserBtn.addEventListener('click', () => drawingOption = 'erase');
        drawBtn.addEventListener('click', () => drawingOption = 'color');
        colorPicker.addEventListener('change', e => currentColor = e.target.value);
        multicolorBtn.addEventListener('click', () => drawingOption = 'multicolor');
        clearBtn.addEventListener('click', () => makeGrid(numberOfDiv));
        lightenBtn.addEventListener('click', () => drawingOption = 'lighten');
        darkenBtn.addEventListener('click', () => drawingOption = 'darken');

        makeGrid(numberOfDiv);
    }

    return app;
}

let app = makeApp();
app();
