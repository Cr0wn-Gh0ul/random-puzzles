(async function main() {
    if (process.argv.length != 3) {
        console.log("Usage: node encode.js <string>");
        process.exit(1);
    }
    let input = process.argv[2].toUpperCase();
    let layout = [
        ['0', '1', '2', '3', '4'],
        ['5', '6', '7', '8', '9'],
        ['A', 'B', 'C', 'D', 'E'],
        ['F', 'G', 'H', 'I', 'J'],
        ['K', 'L', 'M', 'N', 'O']
    ];
    let output = "";
    let cursor = {
        x: null,
        y: null
    }
    for (let i = 0; i < input.length; i++) {
        console.log(`Processing ${input[i]}`)
        //printLayout(layout);
        if (Math.random() >= 0.5) {
            cursor = await getCursorXY(layout, input[i]);
            let {x, y} = cursor;
            //console.log(`Cursor at ${x}, ${y}`)
            const [newLayoutX, movesX] = await xRotate(layout, x, y);
            layout = newLayoutX;
            output += movesX;
            cursor = await getCursorXY(layout, input[i]);
            x = cursor.x;
            y = cursor.y;
            const [newLayoutY, movesY] = await yRotate(layout, x, y);
            layout = newLayoutY;
            output += movesY;
        } else {
            cursor = await getCursorXY(layout, input[i]);
            let {x, y} = cursor;
            //console.log(`Cursor at ${cursor.x}, ${cursor.y}`)
            let [newLayoutY, movesY] = await yRotate(layout, x, y);
            layout = newLayoutY;
            output += movesY;
            cursor = await getCursorXY(layout, input[i]);
            x = cursor.x;
            y = cursor.y;
            let [newLayoutX, movesX] = await xRotate(layout, x, y);
            layout = newLayoutX;
            output += movesX;
        }
    }
    console.log(output);

})();

async function xRotate(layout, x, y) {
    let moves = ''
    switch (y) {
        case 0:
            moves += '1'
            break;
        case 1:
            moves += '2'
            break;
        case 2:
            moves += '3'
            break;
        case 3:
            moves += '4'
            break;
        case 4:
            moves += '5'
            break;
    }
    if (x === 2) {
        return [layout, moves]
    }
    else if (x < 2) {
        for (let i = 0; i < 2 - x; i++) {
            const hold = layout[y].pop()
            layout[y].unshift(hold)
            moves += '>'
        }
    }
    else {
        for (let i = 0; i < x - 2; i++) {
            const hold = layout[y].shift()
            layout[y].push(hold)
            moves += '<'
        }
    }
    return [layout, moves]
}

async function yRotate(layout, x, y) {
    let moves = ''
    switch (x) {
        case 0:
            moves += 'A'
            break;
        case 1:
            moves += 'B'
            break;
        case 2:
            moves += 'C'
            break;
        case 3:
            moves += 'D'
            break;
        case 4:
            moves += 'E'
            break;
    }
    if (y === 2) {
        return [layout, moves]
    }
    else if (y < 2) {
        for (let i = 0; i < 2 - y; i++) {
            let hold = layout[layout.length - 1][x]
            for (let j = 0; j < layout.length; j++) {
                let nextHold = layout[j][x]
                layout[j][x] = hold
                hold = nextHold
            }
            moves += 'v'
        }
    }
    else {
        for (let i = 0; i < y - 2; i++) {
            let hold = layout[0][x]
            for (let j = layout.length - 1; j > 0; j--) {
                let nextHold = layout[j][x]
                layout[j][x] = hold
                hold = nextHold
            }
            moves += '^'
        }
    }
    return [layout, moves]

}

async function getCursorXY(layout, input) {
    let cursorX, cursorY;
    for (let j = 0; j < layout.length; j++) {
        cursorX = layout[j].indexOf(input);
        if (cursorX > -1) {
            cursorY = j;
            break;
        }
    }
    return {x: cursorX, y: cursorY};
}

function printLayout(layout) {
    for (let i = 0; i < layout.length; i++) {
        let row = '';
        for (let j = 0; j < layout[i].length; j++) {
            row += `[${layout[i][j]}]`;
        }
        console.log(row);
    }
    console.log('\n');
}



/*
   A  B  C  D  E
1 [ ][ ][ ][ ][ ]
2 [ ][ ][ ][ ][ ]
3 [ ][ ][X][ ][ ]
4 [ ][ ][ ][ ][ ]
5 [ ][ ][ ][ ][ ]
*/