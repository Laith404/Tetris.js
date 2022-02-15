class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    spawn() {
        this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 0;
        this.y = 0;
        this.hardDropped = false;
    }

    setStartPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
    }
    
    move(p) {
        if(!this.hardDropped) {
            this.x = p.x;
            this.y = p.y;
        }
        this.shape = p.shape;
    }

    hardDrop() {
        this.hardDropped = true;
    }


    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    console.log(value)
                    this.ctx.fillStyle = this.color[0];
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                    this.ctx.fillStyle = this.color[1];
                    this.ctx.fillRect(this.x + x + .1, this.y + y + .1, .8, .8);
                    this.ctx.fillStyle = this.color[2];
                    this.ctx.fillRect(this.x + x + .2, this.y + y + .2, .6, .6);
                }
            });
        });
    }

 
    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes)
    }
}