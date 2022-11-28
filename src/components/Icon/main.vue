<template>
  <svg class="svg-icon">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: "icon",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor !important;
}
</style>
