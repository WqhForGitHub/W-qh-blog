<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
const props = defineProps({
    iconName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: '#409eff'
    }
})

const iconClassName = computed(() => {
    return `#${props.iconName}`
})

const svgClass = computed(() => {
    return `svg-icon`
})
</script>

<style scoped lang="scss"></style>