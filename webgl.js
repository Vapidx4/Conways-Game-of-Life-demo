webgl();

//
// start here
//

var gridHeight = 10;
var gridWidth = 10;
var grid = new Array(gridWidth);
for (var i = 0; i < gridWidth; i++) {
    grid[i] = new Array(gridHeight);
}

function webgl() {
    setupCanvas();

}

function setupCanvas() {
    const canvas = document.querySelector("#glcanvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert(
            "Unable to initialize WebGL. " +
            "Your browser may not support it, " +
            "or you may have to enable Hardware Acceleration."
        );
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawGrid();
}

// draws a white grid on the canvas
function drawGrid() {

}