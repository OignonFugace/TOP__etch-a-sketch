
const container = document.getElementById('container');

let numberOfDiv = prompt('Side size of the grid? ');

container.style.setProperty('grid-template-columns', `repeat(${numberOfDiv}, 1fr)`);

for (let i = 0; i < numberOfDiv ** 2; i++) {
    const div = document.createElement('div');
    container.appendChild(div);
}