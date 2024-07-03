const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = [
    'O'
];
const TETROMINOES = {
    'O' : [
        [1]
    ]
};
let tetromino = {
    name: '',
    matrix: [],
    column: 0,
    row: 0
};

function generateTetromino() {
    const nameTetro = TETROMINO_NAMES[0];
    const matrix = TETROMINOES[0];

    const rowTetro = 5;
    const columnTetro = 3;

    tetromino = {
        name: nameTetro,
        matrix: matrix,
        column: columnTetro,
        row: rowTetro
    };
};

function drawPlayfield() {
    playfield[7][6] = 'O';
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if(!playfield[row][column]) continue;
            const nameFigure = 'O';
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(nameFigure);
        }

    }
}

function convertPositionToIndex(row, col) {
    return row * PLAYFIELD_COLUMNS + col 
}

function generatePlayfield() {
    for (let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i++) {
        const cell = document.createElement('div');
        cell.classList.add('tetris__cell');
        document.querySelector('.tetris').append(cell);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill().map(
        () => new Array(PLAYFIELD_COLUMNS).fill(0)
    );
};

generatePlayfield();
let cells = document.querySelectorAll('.tetris__cell');
generateTetromino();
drawPlayfield();