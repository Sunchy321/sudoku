import { intoCoord } from 'src/model/basic';
import { Cell } from 'src/model/save';
import { Sudoku } from 'src/model/sudoku';

export function standardSudokuSolver(sudoku: Sudoku): number[] {
    const grid = new Array<Cell>(81).fill({
        type:   'candidate',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    });

    for (const [i, v] of sudoku.initial) {
        grid[i] = { type: 'filled', value: v };
    }

    const newFilled = [...sudoku.initial];

    while (!grid.every((cell) => cell.type === 'filled')) {
        // fill candidates
        for (const [i, c] of grid.entries()) {
            if (c.type === 'filled') {
                continue;
            }

            const coord = intoCoord(i);

            let candidates = c.values;

            for (const [j, v] of newFilled) {
                if (i === j) {
                    continue;
                }

                const otherCoord = intoCoord(j);

                if (
                    coord.row === otherCoord.row
                    || coord.column === otherCoord.column
                    || coord.block === otherCoord.block
                ) {
                    candidates = candidates.filter((x) => x !== v);
                }
            }
        }

        // delete all just filled cells
        newFilled.splice(0, newFilled.length);

        // check for unique candidates in a cell
        for (const [i, c] of grid.entries()) {
            if (c.type === 'filled') {
                continue;
            }

            if (c.values.length === 1) {
                grid[i] = { type: 'filled', value: c.values[0] };
                newFilled.push([i, c.values[0]]);
            }
        }

        // check for unique candidates in a sector
        for (let i = 0; i < 9; i += 1) {
            const row = grid.map((v, i) => [i, v] as const).filter(([j]) => intoCoord(j).row === i);
            const column = grid.map((v, i) => [i, v] as const).filter(([j]) => intoCoord(j).column === i);
            const block = grid.map((v, i) => [i, v] as const).filter(([j]) => intoCoord(j).block === i);

            const findUniqueCandidates = (cells: (readonly [number, Cell])[]) => {
                const candidates: Record<number, number[] | 'filled'> = {};

                for (const [i, c] of cells) {
                    if (c.type === 'filled') {
                        candidates[c.value] = 'filled';
                        break;
                    }

                    for (const n of c.values) {
                        if (candidates[n] === 'filled') {
                            continue;
                        }

                        candidates[n] ??= [];

                        candidates[n].push(i);
                    }
                }

                for (const [n, v] of Object.entries(candidates)) {
                    if (v === 'filled') {
                        continue;
                    }

                    if (v.length === 1) {
                        const [i] = v;

                        grid[i] = { type: 'filled', value: Number.parseInt(n, 10) };
                        newFilled.push([i, Number.parseInt(n, 10)]);
                    }
                }
            };

            findUniqueCandidates(row);
            findUniqueCandidates(column);
            findUniqueCandidates(block);
        }
    }

    return grid.map((cell) => cell.value);
}
