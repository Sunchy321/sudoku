export type Sudoku = KillerSudoku | StandardSudoku;

export type SudokuType = Sudoku['type'];

export type StandardSudoku = {
    type: 'standard';
    initial: [number, number][];
};

export type KillerSudoku = {
    type: 'killer';
    initial: [number, number][];
    initialSums: [number[], number][];
};

export function emptySudoku(type: SudokuType = 'standard'): Sudoku {
    switch (type) {
    case 'standard':
        return {
            type:    'standard',
            initial: [],
        };
    case 'killer':
        return {
            type:        'killer',
            initial:     [],
            initialSums: [],
        };
    default:
        throw new Error(`Unknown sudoku type: ${type}`);
    }
}

export function parseSudoku(text: string): Sudoku {
    const cells = text
        .split('')
        .map((v, i) => [i, Number.parseInt(v, 10)] as [number, number])
        .filter(([, v]) => !Number.isNaN(v));

    return {
        type:    'standard',
        initial: cells,
    };
}
