'use strict';

function makeApp() {

    const rgbregex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
    const forestPalette = ['#582f0e', '#7f4f24', '#936639', '#a68a64', '#b6ad90', '#c2c5aa', '#a4ac86', '#656d4a', '#414833', '#333d29'];
    const warmPalette = ['#f4e409', '#eeba0b', '#c36f09', '#a63c06', '#710000'];
    const christmasPalette = ['#da2c38', '#226f54', '#87c38f', '#f4f0bb', '#43291f'];

    const container = document.getElementById('container');
    const gridSizeRange = document.getElementById('gridSizeRange');
    const eraserBtn = document.getElementById('eraserBtn');
    const drawBtn = document.getElementById('drawBtn');
    const colorPicker = document.getElementById('colorPicker');
    const multicolorBtn = document.getElementById('multicolorBtn');
    const clearBtn = document.getElementById('clearBtn');
    const lightenBtn = document.getElementById('lightenBtn');
    const darkenBtn = document.getElementById('darkenBtn');
    const forestTheme = document.getElementById('forestTheme');
    const warmTheme = document.getElementById('warmTheme');
    const christmasTheme = document.getElementById('christmasTheme');

    let isDrawing = false;
    let drawingOption = 'color';
    let currentColor = '#212121';
    let numberOfDiv = 31;

    function makeGrid(numberOfDiv) {
        container.style.setProperty('grid-template-columns', `repeat(${numberOfDiv}, 1fr)`);
        Array.from(container.children).forEach(element => element.remove());
        for (let i = 0; i < numberOfDiv ** 2; i++) {
            const div = document.createElement('div');
            div.style.backgroundColor = 'rgb(255, 255, 255)';
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
        let index;
        switch (drawingOption) {
            case 'color':
                e.target.style.backgroundColor = currentColor;
                break;
            case 'erase':
                e.target.style.backgroundColor = '';
                break;
            case 'multicolor':
                let red = Math.floor(Math.random() * 256);
                let green = Math.floor(Math.random() * 256);
                let blue = Math.floor(Math.random() * 256);
                e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
                break;
            case 'forestTheme':
                index = Math.floor(Math.random() * forestPalette.length)
                e.target.style.backgroundColor = forestPalette[index];
                break;
            case 'warmTheme':
                index = Math.floor(Math.random() * warmPalette.length)
                e.target.style.backgroundColor = warmPalette[index];
                break;
            case 'christmasTheme':
                index = Math.floor(Math.random() * christmasPalette.length)
                e.target.style.backgroundColor = christmasPalette[index];
                break;
            case 'darken':
                e.target.style.backgroundColor = shadeColor(e.target.style.backgroundColor, 'darken',  10);
                break;
            case 'lighten':
                e.target.style.backgroundColor = shadeColor(e.target.style.backgroundColor, 'lighten', 10);
                break;
        }
    }

    function shadeColor(color, mode, percent) {
        let colorValues = color.match(rgbregex)[1].split(', ');
        let R = +colorValues[0];
        let G = +colorValues[1];
        let B = +colorValues[2];
        if (mode === 'lighten') {
            R += (255 - R) * percent / 100;
            G += (255 - G) * percent / 100;
            B += (255 - B) * percent / 100;

            R = Math.round(R);
            G = Math.round(G);
            B = Math.round(B);

            R = (R < 255) ? R : 255;
            G = (G < 255) ? G : 255;
            B = (B < 255) ? B : 255;
        } else if (mode === 'darken') {
            R -= R * percent / 100;
            G -= G * percent / 100;
            B -= B * percent / 100;

            R = Math.round(R);
            G = Math.round(G);
            B = Math.round(B);

            R = (R > 0) ? R : 0;
            G = (G > 0) ? G : 0;
            B = (B > 0) ? B : 0;
        }
        return `rgb(${R} ,${G}, ${B})`
    }

    function app() {
        window.addEventListener('mouseup', () => isDrawing = false);
        window.addEventListener('mouseleave', () => isDrawing = false);
        gridSizeRange.addEventListener('input', e => makeGrid(e.target.value));
        eraserBtn.addEventListener('click', () => drawingOption = 'erase');
        drawBtn.addEventListener('click', () => drawingOption = 'color');
        colorPicker.addEventListener('change', e => {
            drawingOption = 'color';
            currentColor = e.target.value;
        });
        multicolorBtn.addEventListener('click', () => drawingOption = 'multicolor');
        clearBtn.addEventListener('click', () => makeGrid(numberOfDiv));
        lightenBtn.addEventListener('click', () => drawingOption = 'lighten');
        darkenBtn.addEventListener('click', () => drawingOption = 'darken');
        forestTheme.addEventListener('click', () => drawingOption = 'forestTheme');
        warmTheme.addEventListener('click', () => drawingOption = 'warmTheme');
        christmasTheme.addEventListener('click', () => drawingOption = 'christmasTheme');

        makeGrid(numberOfDiv);
    }

    return app;
}

let app = makeApp();
app();


