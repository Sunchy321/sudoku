<template>
    <div class="cell">

    </div>
</template>

<script setup lang="ts">

export type CellModel = {
    type: 'candidate';
    value: number[];
} | {
    type: 'preset' | 'value';
    value: number;
};

</script>
