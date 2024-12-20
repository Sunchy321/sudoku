import { uniq } from 'lodash';
import { StandardSudokuSave, SudokuSave } from './save';
import { intoCoord } from './basic';

export type SudokuState = SudokuSave & {
    focus?: number;
    conflicts: number[];
};

export function checkStandardConflicts(state: StandardSudokuSave): number[] {
    const conflicts: number[] = [];

    const numbers = [
        ...state.initial,
        ...state.cells
            .map(c => [
                c[0],
                c[1].type === 'filled' ? c[1].value : undefined,
            ])
            .filter(c => c[1] !== undefined) as [number, number][],
    ];

    for (const [i, n] of numbers) {
        const coord = intoCoord(i);

        const sameSector = numbers.filter(([k]) => {
            if (k === i) {
                return false;
            }

            const otherCoord = intoCoord(k);

            return (
                coord.row === otherCoord.row
                || coord.column === otherCoord.column
                || coord.block === otherCoord.block
            );
        });

        if (sameSector.some(([, m]) => m === n)) {
            conflicts.push(i);
        }
    }

    return uniq(conflicts).sort();
}

export function checkConflicts(state: SudokuSave): number[] {
    if (state.type === 'standard') {
        return checkStandardConflicts(state);
    } else {
        throw new Error('Not implemented');
    }
}

export function createState(save: SudokuSave): SudokuState {
    return {
        ...save,
        conflicts: checkConflicts(save),
    };
}
