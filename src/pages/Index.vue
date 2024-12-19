<template>
    <q-page class="column items-center justify-evenly">
        <Sudoku v-model="save" />
    </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import Sudoku from 'src/components/Sudoku.vue';

import { useRoute } from 'vue-router';

import { emptySudoku, parseSudoku } from 'src/model/sudoku';
import { createSave, SudokuSave } from 'src/model/save';
import { createState, SudokuState } from 'src/model/state';

const route = useRoute();

const save = ref<SudokuState>(createState(createSave(emptySudoku())));

watch(() => route.query.grid, (grid) => {
    const saveString = localStorage.getItem(`save:${grid}`);

    if (saveString != null) {
        const saveJSON = JSON.parse(saveString) as SudokuSave;

        save.value = createState(saveJSON);
    } else {
        save.value = createState(createSave(parseSudoku(grid as string)));
    }
}, { immediate: true });

</script>
