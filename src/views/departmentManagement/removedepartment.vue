<template>
  <div>
    <a-modal
      v-model="removeVisibles"
      title=""
      @ok="handleOk"
      @cancel="closeModel"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    removeVisibles: {
      type: Boolean,
    },
  },
  methods: {
    closeModel() {
      this.$emit("closeRemoveModel", false);
    },
  },
};
</script>
