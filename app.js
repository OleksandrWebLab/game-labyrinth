// Поле
var field;

// Параметры поля
const CELLSIZE = 10;
const MAXROW = 21;
const MAXCOL = 21;

// Игрок
var successful = false;

var playerRow = 1;
var playerCol = 1;

var finishRow = MAXROW - 2;
var finishCol = MAXCOL - 2;

document.addEventListener('DOMContentLoaded', function () {
    // Создаем поле с начальнымим элементами
    field = makeStartFiled();

    // Прокладываем маршруты
    trace(1, 1);

    // Отображаем поле
    renderField();
});

// Передвижение игрока
window.addEventListener("keydown", function (event) {
    var keyCode = event.keyCode;

    var newPlayerRow = playerRow;
    var newPlayerCol = playerCol;

    switch (keyCode) {
        case 87:
        case 38:
            // w
            newPlayerRow--;
            break;
        case 68:
        case 39:
            // d
            newPlayerCol++;
            break;
        case 83:
        case 40:
            // s
            newPlayerRow++;
            break;
        case 65:
        case 37:
            // a
            newPlayerCol--;
            break;
    }

    if (successful === false && field[newPlayerRow][newPlayerCol] === 0) {
        playerRow = newPlayerRow;
        playerCol = newPlayerCol;

        renderField();

        if (playerRow === finishRow && playerCol === finishRow) {
            successful = true;
            alert('Победа!');
        }
    }
});

function makeStartFiled() {
    var field = new Array();
    for (var row = 0; row < MAXROW; row++) {
        field[row] = new Array();

        for (var col = 0; col < MAXCOL; col++) {
            // Значение по умолчанию
            field[row][col] = 1;

            // Границы поля
            if (row === 0 || row === MAXROW - 1 || col === 0 || col === MAXCOL - 1) {
                field[row][col] = 3;
            }

            // Точки поворота маршрута
            if (field[row][col] === 1 && row % 2 === 0 && col % 2 === 0) {
                field[row][col] = 2;
            }

            // Место появления игрока
            if (row === playerRow && col === playerCol) {
                field[row][col] = 0;
            }
        }
    }

    return field;
}

function trace(headerRow, headerCol) {
    var newHeaderDirArr = [0, 1, 2, 3];

    do {
        var newHeaderRow1x = headerRow;
        var newHeaderRow2x = headerRow;
        var newHeaderCol1x = headerCol;
        var newHeaderCol2x = headerCol;

        var newHeaderDir = newHeaderDirArr[Math.floor(Math.random() * newHeaderDirArr.length)];
        newHeaderDirArr.splice(newHeaderDirArr.indexOf(newHeaderDir), 1);

        switch (newHeaderDir) {
            case 0:
                newHeaderRow1x = headerRow - 1;
                newHeaderRow2x = headerRow - 2;
                break;
            case 1:
                newHeaderCol1x = headerCol + 1;
                newHeaderCol2x = headerCol + 2;
                break;
            case 2:
                newHeaderRow1x = headerRow + 1;
                newHeaderRow2x = headerRow + 2;
                break;
            case 3:
                newHeaderCol1x = headerCol - 1;
                newHeaderCol2x = headerCol - 2;
                break;
        }

        if (
            1 <= newHeaderRow2x &&
            newHeaderRow1x <= MAXROW - 1 &&
            1 <= newHeaderCol2x &&
            newHeaderCol2x <= MAXCOL - 1 &&

            field[newHeaderRow1x][newHeaderCol1x] === 1 &&
            field[newHeaderRow2x][newHeaderCol2x] === 1
        ) {
            field[newHeaderRow1x][newHeaderCol1x] = 0;
            field[newHeaderRow2x][newHeaderCol2x] = 0;

            trace(newHeaderRow2x, newHeaderCol2x);
        } else if (newHeaderDirArr.length === 0) {
            return;
        }
    } while (newHeaderDirArr.length > 0);
}

function renderField() {
    var field_html = document.getElementById("field"),
        ctx = field_html.getContext('2d');

    field_html.width = MAXCOL * CELLSIZE;
    field_html.height = MAXROW * CELLSIZE;

    for (var row = 0; row < MAXROW; row++) {
        for (var col = 0; col < MAXCOL; col++) {
            if (field[row][col] === 0) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE);
            }

            if (field[row][col] === 1) {
                ctx.fillStyle = '#212121';
                ctx.fillRect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE);
            }

            if (field[row][col] === 2) {
                ctx.fillStyle = '#212121';
                ctx.fillRect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE);
            }

            if (field[row][col] === 3) {
                ctx.fillStyle = '#212121';
                ctx.fillRect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE);
            }

            if (row === finishRow && col === finishCol) {
                ctx.fillStyle = '#f44336';
                ctx.fillRect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE);
            }

            if (row === playerRow && col === playerCol) {
                ctx.fillStyle = '#4caf50';
                ctx.fillRect(col * CELLSIZE, row * CELLSIZE, CELLSIZE, CELLSIZE);
            }
        }
    }
}