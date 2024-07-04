const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = [
    'O',
    'L',
    'J',
    'T',
    'I',
    'S',
    'Z',
    'M'
];
const TETROMINOES = {
    'O' : [
        [1, 1],
        [1, 1]
    ],
    'L' : [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'J' : [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    'T' : [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    'I' : [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    'S' : [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    'Z' : [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
    ,
    'M' : [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ]
};
let tetromino = {
    name: '',
    matrix: [],
    column: 0,
    row: 0
};

//COMMON
function convertPositionToIndex(row, col) {
    return row * PLAYFIELD_COLUMNS + col 
}

function randomFigure(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// GENERATION
function generateTetromino() {
    const nameTetro = randomFigure(TETROMINO_NAMES);
    const matrix = TETROMINOES[nameTetro];

    const rowTetro = 0;
    const columnTetro = Math.floor(PLAYFIELD_COLUMNS / 2 - matrix.length / 2);

    tetromino = {
        name: nameTetro,
        matrix: matrix,
        column: columnTetro,
        row: rowTetro
    };
};

function generatePlayfield() {
    for (let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i++) {
        const cell = document.createElement('div');
        document.querySelector('.tetris').append(cell);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill().map(
        () => new Array(PLAYFIELD_COLUMNS).fill(0)
    );
};


// DRAW
function drawPlayfield() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if(!playfield[row][column]) continue;
            const nameFigure = tetromino.name;
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(nameFigure);                    
        }
    }
}

function drawTetromino() {
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;
    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if(!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function draw() {
    cells.forEach(element => {
        element.removeAttribute('class');
    });
    drawPlayfield();
    drawTetromino();
}

function placeTetromino() {
    const tetrominoMatrixSize = tetromino.matrix.length;
    for(let row = 0; row < tetrominoMatrixSize; row++) {
        for(let column = 0; column < tetrominoMatrixSize; column++) {
            if(tetromino.matrix[row][column]) {
                playfield[tetromino.row + row][tetromino.column + column] = tetromino.name;
            }
        }
    }
    generateTetromino();
}

// KEYBOARD
document.addEventListener('keydown',onKeyDown);
function onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        tetromino.column -= 1;
        if(!isValid()) tetromino.column += 1;
    }
    if (event.key === 'ArrowRight') {
        tetromino.column += 1;
        if(!isValid()) tetromino.column -= 1;
    }
    if (event.key === 'ArrowUp') {
        rotate();
    }
    if (event.key === 'ArrowDown') {
        tetromino.row += 1;
        if(!isValid()) {
            tetromino.row -= 1;
            placeTetromino();
        }
    }
    draw();
}

// COLLISIONS

function isValid() {
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++) {
        for(let column = 0; column < matrixSize; column++) {
            if(isOutsideOfGameboard(row, column)) return false;
            if(hasCollisions(row, column)) return false;
        }
    }

    return true;
}

function isOutsideOfGameboard(row, column) {
    return tetromino.matrix[row][column] && (tetromino.row + row >= PLAYFIELD_ROWS || tetromino.column + column < 0 || tetromino.column + column >= PLAYFIELD_COLUMNS);
}

function hasCollisions(row, column) {
    return tetromino.matrix[row][column] && playfield[tetromino.row + row]?.[tetromino.column + column];
}

// ROTATE
function rotate() {
    rotateTetromino();
    draw();
}

function rotateTetromino(){
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetromino.matrix);
    tetromino.matrix = rotatedMatrix;
    if(!isValid()) {
        tetromino.matrix = oldMatrix;
    }
}

function rotateMatrix(matrixTetromino) {
    const N = matrixTetromino.length;
    const rotateMatrix = [];
    for(let i = 0; i < N; i++) {
        rotateMatrix[i] = [];
        for(let j = 0; j < N; j++) {
            rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
        }
    }

    return rotateMatrix;
}


generatePlayfield();
let cells = document.querySelectorAll('.tetris > div');
generateTetromino();
draw();