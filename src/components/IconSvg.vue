<template>
    <svg class="svg-icon" aria-hidden="true" :style="'fill:'+fill">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
    name: 'icon-svg',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        fill: {
            type: String,
            default: 'currentColor'
        },
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        }
    }
}
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
}
</style>