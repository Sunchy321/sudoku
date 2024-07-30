<template>
    <router-view />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineOptions({
    name: 'App',
});

const i18n = useI18n();

i18n.locale.value = navigator.language;

</script>
