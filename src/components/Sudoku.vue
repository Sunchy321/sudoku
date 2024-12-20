<template>
    <div
        class="sudoku q-py-md"
        tabindex="0"
        @keyup="keyup"
        @click="click"
    >
        <render />
    </div>
</template>

<script setup lang="ts">
import { h, onMounted } from 'vue';

import { checkConflicts, SudokuState } from 'src/model/state';
import { Cell, mergeCell } from 'src/model/save';
import { debounce } from 'lodash';

const model = defineModel<SudokuState>({ required: true });

const range = (count: number) => Array.from({ length: count }, (_, i) => i);

const pixelCoordOf = (i: number) => ({ x: 50 + 100 * (i % 9), y: 50 + 100 * Math.floor(i / 9) });

const click = (e: MouseEvent) => {
    const x = e.offsetX;
    const y = e.offsetY;

    const i = Math.floor((x - 50) / 100) + 9 * Math.floor((y - 50) / 100);

    model.value.focus = i;
};

const keyup = debounce((e: KeyboardEvent) => {
    const { key, code } = e;

    console.log(code, code.startsWith('Digit') && '0123456789'.split('').includes(code.slice(-1)));

    if (code.startsWith('Digit') && '0123456789'.split('').includes(code.slice(-1))) {
        const input = parseInt(code.slice(-1), 10);

        if (model.value.focus == null) {
            return;
        }

        if (model.value.initial.some(([i]) => i === model.value.focus)) {
            return;
        }

        const cell = model.value.cells.find(([i]) => i === model.value.focus);

        const newCell = ((): Cell => {
            if (e.shiftKey) {
                return { type: 'candidate', values: [input] };
            } else {
                return { type: 'filled', value: input };
            }
        })();

        if (cell == null) {
            model.value.cells.push([model.value.focus, newCell]);
        } else {
            cell[1] = mergeCell(cell[1], newCell);
        }
    } else if (key === 'Backspace') {
        if (model.value.focus == null) {
            return;
        }

        if (model.value.initial.some(([i]) => i === model.value.focus)) {
            return;
        }

        model.value.cells = model.value.cells.filter(([i]) => i !== model.value.focus);
    }

    model.value.cells = model.value.cells.filter(([, v]) => v.type === 'filled' || v.values.length > 0);
    model.value.conflicts = checkConflicts(model.value);
}, 100);

const render = () => {
    const rect = h('rect', {
        'x':            50,
        'y':            50,
        'width':        900,
        'height':       900,
        'stroke':       'black',
        'stroke-width': 5,
        'fill':         'none',
    });

    const rows = range(8).map(i => h('line', {
        'x1':           50 + 100 * (i + 1),
        'y1':           50,
        'x2':           50 + 100 * (i + 1),
        'y2':           950,
        'stroke':       'black',
        'stroke-width': i % 3 === 2 ? 5 : 1,
    }));

    const columns = range(8).map(i => h('line', {
        'x1':           50,
        'y1':           50 + 100 * (i + 1),
        'x2':           950,
        'y2':           50 + 100 * (i + 1),
        'stroke':       'black',
        'stroke-width': i % 3 === 2 ? 5 : 1,
    }));

    const initialCells = model.value.initial.map(([i, v]) => {
        const coord = pixelCoordOf(i);

        return [
            h('rect', {
                ...coord,
                width:  100,
                height: 100,
                fill:   'lightgrey',
            }),
            h('text', {
                'x':                 coord.x + 50,
                'y':                 coord.y + 50,
                'class':             model.value.conflicts.includes(i) ? 'number-conflict' : '',
                'font-size':         80,
                'text-anchor':       'middle',
                'dominant-baseline': 'central',
            }, v),
        ];
    }).flat();

    const cells = model.value.cells.map(([i, v]) => {
        const coord = pixelCoordOf(i);

        if (v.type === 'filled') {
            return [
                h('rect', {
                    ...coord,
                    width:  100,
                    height: 100,
                    fill:   'none',
                }),
                h('text', {
                    'x':                 coord.x + 50,
                    'y':                 coord.y + 50,
                    'font-size':         80,
                    'class':             model.value.conflicts.includes(i) ? 'number-conflict' : '',
                    'text-anchor':       'middle',
                    'dominant-baseline': 'central',
                }, v.value),
            ];
        } else {
            return v.values.map(n => h('text', {
                'x':                 coord.x + 20 + 30 * ((n - 1) % 3),
                'y':                 coord.y + 20 + 30 * Math.floor((n - 1) / 3),
                'font-size':         30,
                'text-anchor':       'middle',
                'dominant-baseline': 'central',
            }, n));
        }
    }).flat();

    let focus;

    if (model.value.focus != null) {
        const coord = pixelCoordOf(model.value.focus);

        const focusShape = h('rect', {
            ...coord,
            id:     'focus',
            width:  100,
            height: 100,
            fill:   'none',
        });

        focus = [
            focusShape,
            h('clipPath', {
                id: 'focus-clip',
            }, [h('use', {
                'xlink:href': '#focus',
            })]),
            h('use', {
                'xlink:href':   '#focus',
                'stroke':       'skyblue',
                'stroke-width': 20,
                'fill':         'none',
                'clip-path':    'url(#focus-clip)',
            }),
        ];
    } else {
        focus = null;
    }

    const svg = h('svg', {
        width:  1000,
        height: 1000,
    }, [initialCells, cells, focus, rect, rows, columns]);

    return svg;
};

onMounted(() => {
    window.addEventListener('keyup', keyup);
});

</script>

<style lang="sass">

.sudoku
    height: 100%
    outline: none
    user-select: none

.number-conflict
    fill: red

</style>
