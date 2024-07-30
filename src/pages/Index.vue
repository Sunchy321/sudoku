<template>
    <q-page class="row items-center justify-evenly">
        <Sudoku v-model="sudoku" />
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Sudoku, { SudokuModel } from 'src/components/Sudoku.vue';

function defaultSudoku(): SudokuModel {
    const result = [];

    for (let i = 0; i < 81; i += 1) {
        result.push({ type: 'candidate' as const, value: [] });
    }

    return result;
}

const sudoku = ref(defaultSudoku());

</script>
