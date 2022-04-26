const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;
const board_state = new Array(BOARD_HEIGHT);
const next_state = new Array(BOARD_HEIGHT);
const $start_button = document.getElementById("start_button");
const $squareList = document.querySelectorAll(".square");

const DIRECTIONS = [
    [-1, 0], // UP
    [-1, -1], // UPLEFT
    [0, -1], // LEFT
    [1, -1], // DOWNLEFT
    [1, 0], // DOWN
    [1, 1], // DOWNRIGHT
    [0, 1], // RIGHT
    [-1, 1], // UPRIGHT
];

const initBoard = () => {
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        board_state[i] = new Array(BOARD_WIDTH).fill(false);
        next_state[i] = new Array(BOARD_WIDTH).fill(false);
    }
    $squareList.forEach((sq, i) => {
        sq.classList.remove("alive");
        sq.classList.add("dead");
    });
    $squareList.forEach((sq, i) => {
        sq.addEventListener("click", () => {
            sq.classList.toggle("alive");
            sq.classList.toggle("dead");
            const yi = Math.floor(i / BOARD_HEIGHT);
            const xi = i % BOARD_WIDTH;
            // console.log(yi, xi);
            board_state[yi][xi] = !board_state[yi][xi];
            // console.log(board_state);
        });
    });
};

$start_button.addEventListener("click", () => {
    for (let yi = 0; yi < BOARD_HEIGHT; yi++) {
        for (let xi = 0; xi < BOARD_WIDTH; xi++) {
            const cnt = countAliveNeighbors(yi, xi);
            if (cnt <= 1 || 4 <= cnt) {
                next_state[yi][xi] = false;
            }
            if (cnt == 3) {
                next_state[yi][xi] = true;
            }
            if (cnt == 2) {
                next_state[yi][xi] = board_state[yi][xi];
            }
        }
    }

    for (let yi = 0; yi < BOARD_HEIGHT; yi++) {
        for (let xi = 0; xi < BOARD_WIDTH; xi++) {
            board_state[yi][xi] = next_state[yi][xi];
        }
    }
});

const drawBoard = () => {
    $squareList.forEach((sq, i) => {
        sq.classList.remove("alive");
        sq.classList.remove("dead");
        const yi = Math.floor(i / BOARD_HEIGHT);
        const xi = i % BOARD_WIDTH;
        if (board_state[yi][xi]) {
            sq.classList.add("alive");
        } else {
            sq.classList.add("dead");
        }
    });
};

const countAliveNeighbors = (yi, xi) => {
    let _cnt = 0;
    for (let [dy, dx] of DIRECTIONS) {
        const y = (BOARD_HEIGHT + yi + dy) % BOARD_HEIGHT;
        const x = (BOARD_WIDTH + xi + dx) % BOARD_WIDTH;
        if (board_state[y][x]) {
            _cnt++;
        }
    }
    return _cnt;
};

initBoard();
