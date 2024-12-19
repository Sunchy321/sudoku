import { StandardSudoku } from './sudoku';

export type StandardSudokuSave = StandardSudoku & {
    cells: number[];
    cadidates: number[][];
};
