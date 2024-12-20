import { uniq } from 'lodash';
import { StandardSudokuSave, SudokuSave } from './save';

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
        // check line
        const line = Math.floor(i / 9);

        const sameLine = numbers.filter(([k]) => Math.floor(k / 9) === line && k !== i);

        if (sameLine.some(([, m]) => m === n)) {
            conflicts.push(i);
        }

        // check column
        const column = i % 9;

        const sameColumn = numbers.filter(([k]) => k % 9 === column && k !== i);

        if (sameColumn.some(([, m]) => m === n)) {
            conflicts.push(i);
        }

        // check block
        const block = Math.floor(line / 3) * 3 + Math.floor(column / 3);

        const sameBlock = numbers.filter(([k]) => Math.floor(k / 27) * 3 + Math.floor((k % 9) / 3) === block && k !== i);

        if (sameBlock.some(([, m]) => m === n)) {
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
