<script setup lang="ts">
    defineProps<{
        name: string;
        emoji?: string;
    }>();
</script>

<template>
    <h1>Hello, {{ name }}!{{ emoji ? ' ' + emoji : '' }}</h1>
</template>