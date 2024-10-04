let turn = true;

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const winnerLabel = document.getElementById('winner');

const c1f1 = document.getElementById('c1-f1');
const c2f1 = document.getElementById('c2-f1');
const c3f1 = document.getElementById('c3-f1');

const c1f2 = document.getElementById('c1-f2');
const c2f2 = document.getElementById('c2-f2');
const c3f2 = document.getElementById('c3-f2');

const c1f3 = document.getElementById('c1-f3');
const c2f3 = document.getElementById('c2-f3');
const c3f3 = document.getElementById('c3-f3');

const cells = [
	c1f1, c2f1, c3f1,
	c1f2, c2f2, c3f2,
	c1f3, c2f3, c3f3
];

startButton.addEventListener('click', function () {
	cells.forEach(cell => {
		cell.addEventListener('click', function () {

			if (cell.textContent) {
				return;
			}

			let letter = changeLetter(turn);
			cell.textContent = letter;
			cell.style.color = 'white';

			if (letter == 'X') {
				cell.style.backgroundColor = 'red';
				cell.style.boxShadow = `2px 2px 5px ${cell.style.backgroundColor}`; // Desplazamiento más grande y difuminado

			}

			if (letter == 'O') {
				cell.style.backgroundColor = 'blue';
				cell.style.boxShadow = `2px 2px 5px ${cell.style.backgroundColor}`; // Desplazamiento más grande y difuminado

			}

			winnerLabel.textContent = winnerPatter(cells, letter);
			winnerLabel.style.color = cell.style.backgroundColor;

			turn = !turn;
		})
	});
});

resetButton.addEventListener('click', function () {
	location.reload();
});

function changeLetter(bool) {
	if (bool) {
		return 'X';
	}

	if (!bool) {
		return 'O';
	}
}

function winnerPatter(cells, letter) {
	const winningCombinations = [
		[0, 1, 2], //fila superior
		[3, 4, 5], //fila del medio
		[6, 7, 8], //fila inferior
		[0, 3, 6], //columna izquierda
		[1, 4, 7], //columna del medio
		[2, 5, 8], //columna derecha
		[0, 4, 8], //diagonal de izquierda a derecha
		[2, 4, 6]  //diagonal de derecha a izquierda
	];

	for (const combination of winningCombinations) {
		const [a, b, c] = combination;
		if (cells[a].textContent === letter && cells[b].textContent === letter && cells[c].textContent === letter) {
			cells[a].style.backgroundColor = 'yellow';
			cells[b].style.backgroundColor = 'yellow';
			cells[c].style.backgroundColor = 'yellow';
			return `${letter} won!`;
		}
	}

	return null;
}