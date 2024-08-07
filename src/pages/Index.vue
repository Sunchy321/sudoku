<template>
    <q-page class="column items-center justify-evenly">
        <Sudoku v-model="sudoku" />

        <q-input
            class="q-mx-lg q-my-md"
            outlined
            v-model="code"
            @keypress.enter="applyCode"
        />
    </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import Sudoku, { SudokuModel } from 'src/components/Sudoku.vue';

const router = useRouter();
const route = useRoute();

function defaultSudoku(): SudokuModel {
    const result = [];

    for (let i = 0; i < 81; i += 1) {
        result.push({ type: 'candidate' as const, value: [] });
    }

    return result;
}

const sudoku = ref(defaultSudoku());

const code = ref('');

const parseBoard = (board: string) => {
    const digits = board.split(/(\[[^[\]]*\]|.)/).filter(x => x !== '').map(d => {
        if (/^[0-9]$/.test(d)) {
            return parseInt(d, 10);
        }

        if (/^\[[0-9]+\]$/.test(d)) {
            return d.slice(1, -1).split('').map(Number).sort();
        }

        return null;
    });

    if (digits.length < 81) {
        digits.push(...Array(81 - digits.length).fill(null));
    }

    if (digits.length > 81) {
        digits.splice(81, digits.length - 81);
    }

    return digits;
};

const applyCode = () => {
    const digits = parseBoard(code.value);

    const board = digits.map(d => {
        if (typeof d === 'number') {
            return d.toString();
        } else if (Array.isArray(d)) {
            return `[${d.join('')}]`;
        } else {
            return '.';
        }
    });

    router.replace({ query: { board } });
};

watch(() => route.query.board, () => {
    const digits = parseBoard(route.query.board as string);

    console.log(digits);

    sudoku.value = digits.map(d => {
        if (typeof d === 'number') {
            return { type: 'value', value: d };
        } else if (Array.isArray(d)) {
            return { type: 'candidate', value: d };
        } else {
            return { type: 'candidate', value: [] };
        }
    });
}, { immediate: true });

</script>
