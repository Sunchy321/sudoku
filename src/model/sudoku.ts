import { Coord } from './basic';

export type Sudoku = KillerSudoku | StandardSudoku;

export type StandardSudoku = {
    type: 'standard';
    initial: [Coord, number][];
};

export type KillerSudoku = {
    type: 'killer';
    initial: [Coord, number][];
    initialSums: [Coord[], number][];
};
