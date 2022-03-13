const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const time = {start: 0, elapsed: 0, level: 1000 };

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;


ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Окно со следующие фигуркой
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 2 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);


let board = new Board(ctx, ctxNext);

let requestId;

let accountValues = {
    score: 0,
    lines: 0,
    level: 0
}

function updateAccount(key, value) {
    let element = document.getElementById(key);
    if(element) {
        element.textContent = value;
    }
}


function resetGame() {
    account.score = 0;
    account.lines = 0;
    account.level = 0;
    board.reset();
    let piece = new Piece(ctx);
    board.piece = piece;
    board.piece.setStartPosition();
}


let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
})



function play() {
    addEventListenerKey();
    if (document.querySelector('#play-btn').style.display == '') {
        resetGame();
    }
    animate();
    document.querySelector('#play-btn').style.display = 'none';
    document.querySelector('#pause-btn').style.display = 'block';
}

function gameOver() {
    cancelAnimationFrame(requestId);
    
    ctx.fillStyle = 'rgba(15,21,24,.85)';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.font = 'bold 1px Arial';
    ctx.fillStyle = 'Red'; // Временно
    ctx.fillText("GAME OVER", 1.8, 10);
}


const moves = {
    [KEY.SPACE]: p => ({...p, y: p.y + 1}),
    [KEY.UP]   : p => board.rotate(p, ROTATION.RIGHT),
    [KEY.LEFT] : p => ({...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
    [KEY.DOWN] : p => ({...p, y: p.y + 1})
}

function addEventListenerKey() {
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    if(event.keyCode === KEY.P) {
        pause();
    }
    if(event.keyCode === KEY.ESC) {
        gameOver();
    } else if(moves[event.keyCode]) {
        event.preventDefault();
        // получить новое состояние
        let p = moves[event.keyCode](board.piece);

        if(event.keyCode === KEY.SPACE) {
            while(board.valid(p)) {
                account.score += POINTS.HARD_DROP;
                
                board.piece.move(p);

                p = moves[KEY.DOWN](board.piece);
            }
            board.piece.hardDrop();
        } else if(board.valid(p)) {
            board.piece.move(p);
            if(event.keyCode === KEY.DOWN && 
                document.querySelector('#pause-btn').style.display === 'block') {
                account.score += POINTS.SOFT_DROP;
            }
        }
    }
}

function pause() {
    if(!requestId) {
        document.querySelector('#play-btn').style.display = 'none';
        document.querySelector('#pause-btn').style.display = 'block';
        animate();
        return;
    }
    cancelAnimationFrame(requestId);
    requestId = null;

    ctx.fillStyle = 'rgba(15,21,24,.85)';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.font = 'bold 1px Arial';
    ctx.fillStyle = 'blue'; // Временно
    ctx.fillText("PAUSED", 3, 10);
    document.querySelector('#play-btn').style.display = 'block';
    document.querySelector('#pause-btn').style.display = 'none';
    
}

function animate(now = 0) {
    time.elapsed = now - time.start;

    if(time.elapsed > time.level) {
        time.start = now;
        
        if(!board.drop()) {
            gameOver();
            return;
        }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    board.draw();
    requestId = requestAnimationFrame(animate);
}
