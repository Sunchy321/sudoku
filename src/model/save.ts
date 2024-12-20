import { KillerSudoku, StandardSudoku, Sudoku } from './sudoku';

import { uniq, xor } from 'lodash';

export type SudokuSave = KillerSudokuSave | StandardSudokuSave;

export type Cell = {
    type: 'candidate';
    values: number[];
} | {
    type: 'filled';
    value: number;
};

export type StandardSudokuSave = StandardSudoku & {
    cells: [number, Cell][];
};

export type KillerSudokuSave = KillerSudoku & {
    cells: [number, Cell][];
};

export function createSave(sudoku: Sudoku): SudokuSave {
    return {
        ...sudoku,
        cells: [],
    };
}

export function mergeCell(cell: Cell, other: Cell): Cell {
    if (other.type === 'filled') {
        return { ...other };
    }

    if (cell.type === 'filled') {
        return { ...cell };
    }

    return {
        type:   'candidate',
        values: uniq(xor(cell.values, other.values)).sort(),
    };
}
