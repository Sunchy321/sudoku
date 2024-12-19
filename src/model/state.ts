import { SudokuSave } from './save';

export type SudokuState = SudokuSave & {
    focus?: number;
};

export function createState(save: SudokuSave): SudokuState {
    return save;
}
