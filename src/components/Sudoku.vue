<template>
    <div class="sudoku q-py-md">
        <render />
    </div>
</template>

<script setup lang="ts">
import { SudokuState } from 'src/model/state';
import {
    h,
} from 'vue';

const model = defineModel<SudokuState>({ required: true });

const range = (count: number) => Array.from({ length: count }, (_, i) => i);

const pixelCoordOf = (i: number) => ({ x: 50 + 100 * (i % 9), y: 50 + 100 * Math.floor(i / 9) });

const click = (e: MouseEvent) => {
    console.log(e);
};

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
                'font-size':         80,
                'text-anchor':       'middle',
                'dominant-baseline': 'central',
            }, v),
        ];
    }).flat();

    const svg = h('svg', {
        width:   1000,
        height:  1000,
        onClick: click,
    }, [initialCells, rect, rows, columns]);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    model.value;

    return svg;
};

</script>

<style lang="sass">

.sudoku
    height: 100%

    user-select: none

</style>
