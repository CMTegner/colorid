var delegate = require('component-delegate');
var toArray = require('lodash.toarray');

delegate.bind(document.body, 'div', 'click', function(event) {
    var tile = event.target;
    var row = tile.parentNode;
    var tiles = toArray(row.children);
    var x = tiles.indexOf(tile);
    var rows = toArray(row.parentNode.children);
    var y = rows.indexOf(row);
    var coords = getAdjacentCoords(x, y);
    var adjacentTiles = pickTiles(coords, rows);
    tile.style.backgroundColor = 'teal';
    adjacentTiles.forEach(function(tile) {
        tile.style.backgroundColor = 'cyan';
    });
});

function getAdjacentCoords(x, y) {
    var coords = [];
    var rowStart = y - 1;
    var rows = 3;
    if (y === 0) {
        rowStart = 0;
        rows = 2;
    } else if (y === 3) {
        rows = 2;
    }
    var colStart = x - 1;
    var cols = 3;
    if (x === 0) {
        colStart = 0;
        cols = 2;
    } else if (x === 4) {
        cols = 2;
    }
    for (var i = 0; i < rows; i++) {
        for (var t = 0; t < cols; t++) {
            var coord = {
                x: colStart + t,
                y: rowStart + i
            };
            if (coord.x !== x || coord.y !== y) {
                coords.push(coord);
            }
        }
    }
    return coords;
}

function pickTiles(coords, rows) {
    return coords.map(function(coord) {
        return rows[coord.y].children[coord.x];
    });
}
