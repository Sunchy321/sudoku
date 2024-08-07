<template>
    <div class="cell" :class="`type-${type}`">
        <template v-if="type === 'candidate'">
            <div
                v-for="value in 9" :key="value"
                class="candidate"
                v-show="candidateAllows(value)"
            >{{ value }}</div>
        </template>
        <template v-else>
            <div class="value">{{ model.value }}</div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type CellModel = {
    type: 'candidate';
    value: number[];
} | {
    type: 'preset' | 'value';
    value: number;
};

const model = defineModel<CellModel>({ required: true });

const type = computed(() => model.value?.type ?? 'candidate');

const candidateAllows = (value: number) => {
    if (model.value?.type !== 'candidate') {
        return false;
    }

    return model.value.value.includes(value);
};

</script>

<style lang="sass">

.cell
    display: grid
    place-items: center
    width: 100%
    height: 100%

    &.type-candidate
        display: grid
        grid-template-columns: repeat(3, 1fr)
        grid-template-rows: repeat(3, 1fr)

.value
    top: 0
    left: 0
    width: 100%
    height: 100%

    text-align: center

    font-size: 400%

.candidate
    font-size: 120%

.value::before, .candidate::before
        content: ''
        display: inline-block
        vertical-align: middle

</style>
