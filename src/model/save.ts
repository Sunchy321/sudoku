import { KillerSudoku, StandardSudoku, Sudoku } from './sudoku';

import { intersection, uniq } from 'lodash';

export type SudokuSave = KillerSudokuSave | StandardSudokuSave;

export type Cell = {
    type: 'candidate';
    value: number[];
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
        type:  'candidate',
        value: uniq(intersection(cell.value, other.value)).sort(),
    };
}
