<template>
    <div class="sudoku">
        <Cell
            v-for="(_, index) in 81" :key="index"
            v-model="sudoku[index]"
            :row="Math.floor((index) / 9)"
            :column="index % 9"
            @click="current = index"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Cell, { CellModel } from './Cell.vue';

export type SudokuModel = CellModel[];

const model = defineModel<SudokuModel>();

const sudoku = computed<SudokuModel>({
    get() {
        if (model.value == null) {
            return Array.from({ length: 81 }, () => ({ type: 'candidate', value: [] }));
        }

        if (model.value.length < 81) {
            return model.value.concat(Array.from({ length: 81 - model.value.length }, () => ({ type: 'candidate', value: [] })));
        }

        if (model.value.length > 81) {
            return model.value.slice(0, 81);
        }

        return model.value;
    },

    set(newValue) {
        model.value = newValue;
    },
});

const current = ref(0);

</script>

<style lang="sass">

.sudoku
    display: grid
    grid-template-columns: repeat(9, 90px)
    grid-template-rows: repeat(9, 90px)
    gap: 1px
    border-right: 2px solid black
    border-bottom: 2px solid black

    & > .cell
        border-left: 1px solid black
        border-top: 1px solid black

        &[row="0"], &[row="3"], &[row="6"]
            border-top-width: 2px

        &[column="0"], &[column="3"], &[column="6"]
            border-left-width: 2px

</style>
