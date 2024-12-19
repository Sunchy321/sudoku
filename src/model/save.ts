import { KillerSudoku, StandardSudoku, Sudoku } from './sudoku';

export type SudokuSave = KillerSudokuSave | StandardSudokuSave;

export type StandardSudokuSave = StandardSudoku & {
    cells: number[];
    cadidates: number[][];
};

export type KillerSudokuSave = KillerSudoku & {
    cells: number[];
    cadidates: number[][];
};

export function createSave(sudoku: Sudoku): SudokuSave {
    return {
        ...sudoku,
        cells:     [],
        cadidates: [],
    };
}
