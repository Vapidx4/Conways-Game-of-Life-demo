class Cell {
    //sets dimensions of cell
    static height = 1;
    static width = 1;

    //constructor
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        //makes random squares alive or dead
        this.alive = Math.random() < 0.3;
    }

    //draws the cell
    draw() {
        this.ctx.fillStyle = this.alive ? "#c2abfc" : "#000000";
        this.ctx.fillRect(this.x * Cell.width, this.y * Cell.height, Cell.width, Cell.height);
    }
}

class GameWorld {
    mapSize = document.getElementById("mapSize").value;
    cellSize = document.getElementById("cellSize").value;
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];

        this.cellWidth = Cell.width;
        this.cellHeight = Cell.height;
        this.numCols = Math.floor(this.canvas.width / this.cellWidth);
        this.numRows = Math.floor(this.canvas.height / this.cellHeight);

        //creates the grid
        this.createGrid();

        window.requestAnimationFrame(() => this.gameLoop());
    }


    createGrid() {
        for (let y = 0; y < this.numRows; y++){
            for (let x = 0; x < this.numCols; x++){
                this.gameObjects.push(new Cell(this.ctx, x, y));
            }
        }
    }

    isAlive(x, y) {
        if (x < 0 || x >= this.numCols || y < 0 || y >= this.numRows) {
            return false;
        }

        return this.gameObjects[y * this.numCols + x].alive;
    }

    gridToIndex(x, y) {
        return x + (y * this.numCols);
    }

    checkSurrounding() {
        //checks the surrounding cells
        for (let x = 0; x < this.numCols; x++){
            for (let y = 0; y < this.numRows; y++){
                this.countNearbyPopulation(x, y);
            }
        }
        this.applyNewState();
    }

    /**
     * Counts the number of living cells around the given cell.
     *
     * THIS IS WHERE THE MAGIC HAPPENS
     * @param x
     * @param y
     */
    countNearbyPopulation(x, y) {
        let numAlive =
            this.isAlive(x - 1, y - 1) + this.isAlive(x, y - 1) +
            this.isAlive(x + 1, y - 1) + this.isAlive(x - 1, y) +
            this.isAlive(x + 1, y) + this.isAlive(x - 1, y + 1) +
            this.isAlive(x, y + 1) + this.isAlive(x + 1, y + 1);

        let centerIndex = this.gridToIndex(x, y);

        switch (numAlive) {
            case 2: //if 2 neighbors, keep current state
                this.gameObjects[centerIndex].newState = this.gameObjects[centerIndex].alive;
                break;
            case 3: //if 3 neighbors, become alive
                this.gameObjects[centerIndex].newState = true;
                break;
            default: //if 0, 1, 4, 5, 6, 7, 8 neighbors, become dead
                this.gameObjects[centerIndex].newState = false;
        }
    }

    gameLoop() {
        //checks the surrounding cells
        this.checkSurrounding();

        //clears the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.mapSize = document.getElementById("mapSize").value;
        this.cellSize = document.getElementById("cellSize").value;

        document.getElementById("mapSizeLabel").innerHTML = "Map Size: " + this.mapSize;
        document.getElementById("cellSizeLabel").innerHTML = "Cell Size: " + this.cellSize;

        //draws the cells
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        //adjust the cell size
        Cell.width = this.cellSize;
        Cell.height = this.cellSize;

        //recalculate the number of rows and columns if either the cell width or height changes


        //sets the loop
        setTimeout(() => {
            window.requestAnimationFrame(() => this.gameLoop());
        }, 100);


    }

    applyNewState() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].alive = this.gameObjects[i].newState;
        }
    }
}

window.onload = () => {
    let gameWorld = new GameWorld("canvas");
}