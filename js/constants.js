const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;

const KEY = {
    SPACE: 32,
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    ESC: 27,
    P: 80,
}

const COLORS = [
    ['rgb(59,84,165)', 'rgb(118,137,196)', 'rgb(79,111,182)'],
    ['rgb(214,30,60)', 'rgb(241,108,107)', 'rgb(236,42,75)'],
    ['rgb(88,178,71)', 'rgb(150,204,110)', 'rgb(115,191,68)'],
    ['rgb(62,170,212)', 'rgb(120,205,244)', 'rgb(54,192,240)'],
    ['rgb(236,94,36)', 'rgb(234,154,84)', 'rgb(228,126,37)'],
    ['rgb(220,159,39)', 'rgb(246,197,100)', 'rgb(242,181,42)'],
    ['rgb(158,35,126)', 'rgb(193,111,173)', 'rgb(179,63,151)']
];

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
}


const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 450,
    5: 450,
    6: 450,
    7: 400,
    8: 350
}

const SHAPES = [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
    [[4, 4], [4, 4]],
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
]

const ROTATION = {
    LEFT: 'left',
    RIGHT: 'right'
  };

  [COLORS, SHAPES, KEY, POINTS, LEVEL, ROTATION].forEach(item => Object.freeze(item));