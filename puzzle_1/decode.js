//node decode "A^3>>Cv3A3>>5<<C^^2>>CvA^^3>>2>Cv"
(async function main() {
    if (process.argv.length != 3) {
        console.log("Usage: node decode.js <string>");
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
    const cursorCoordinates = [2, 2];
    const X = ['1', '2', '3', '4', '5']
    const Y = ['A', 'B', 'C', 'D', 'E']
    let output = "";
    //printLayout(layout);

    let dumpCenter = 0;
    for (let i = 0; i < input.length;) {
        if (X.indexOf(input[i]) >= 0) {
            let row = X.indexOf(input[i]);
            let seek = 0;
            while (Y.indexOf(input[i + 1]) === -1 && X.indexOf(input[i + 1]) === -1 && input[i + 1] !== undefined) {
                seek++;
                i++;
            }
            if (seek === 0) {
                i++
                //output += layout[2][2];
                dumpCenter++
                continue
            } else if (input[i] == '>') {
                for (let j = 0; j < seek; j++) {
                    const hold = layout[row].pop()
                    layout[row].unshift(hold)
                }
            } else if (input[i] == '<') {
                for (let j = 0; j < seek; j++) {
                    const hold = layout[row].shift()
                    layout[row].push(hold)
                }
            }
            i++
            dumpCenter++
            //printLayout(layout);
        }
        if (dumpCenter === 2) {
            output += layout[2][2];
            dumpCenter = 0;
        }
        if (Y.indexOf(input[i]) >= 0) {
            let column = Y.indexOf(input[i]);
            let seek = 0;
            while (X.indexOf(input[i + 1]) === -1 && Y.indexOf(input[i + 1]) === -1 && input[i + 1] !== undefined){
                seek++;
                i++;
            }
            if (seek === 0) {
                i++
                //output += layout[2][2];
                dumpCenter++
                continue
            } else if (input[i] == 'v' || input[i] == 'V') {
                for (let j = 0; j < seek; j++) {
                    let hold = layout[layout.length - 1][column]
                    for (let j = 0; j < layout.length; j++) {
                        let nextHold = layout[j][column]
                        layout[j][column] = hold
                        hold = nextHold
                    }
                }
            } else if (input[i] == '^') {
                for (let j = 0; j < seek; j++) {
                    let hold = layout[0][column]
                    for (let j = layout.length - 1; j >= 0; j--) {
                        let nextHold = layout[j][column]
                        layout[j][column] = hold
                        hold = nextHold
                    }
                }
            }
            i++
            dumpCenter++
            //printLayout(layout);
        }
        if (dumpCenter === 2) {
            output += layout[2][2];
            dumpCenter = 0;
        }
    }
    console.log("Output: ", output);

})();


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