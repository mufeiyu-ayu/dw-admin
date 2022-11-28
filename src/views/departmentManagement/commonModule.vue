<template>
  <div>
    <a-modal v-model="visible.visible" :title="title" :footer="null">
      <a-form-model :model="form" :rules="rules" class="inputRules1">
        <a-form-model-item
          ref="name"
          label="部门名称"
          prop="name"
          style="display: flex; margin-left: -40px"
        >
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="排序:" style="display: flex">
          <a-input v-model="sortValue"></a-input>
        </a-form-model-item>
      </a-form-model>
      <div class="btnCreate">
        <a-button type="primary" @click="create"> 创建 </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { fetch, isExits } from "@/service/departmentManagement";
export default {
  props: {
    visible: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  mounted() {
    console.log(this.$props);
  },
  data() {
    return {
      fetchS: [],
      form: {
        name: "",
      },
      sortValue: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    create() {
      isExits({
        name: this.form.name,
        parent_id: 0,
        sort: this.sortValue,
      }).then(() => {
        fetch().then((res) => {
          this.$emit("fetchsChange", res.data.rows);
          this.visible.visible = false;
        });
      });
    },
  },
};
</script>

<style scoped>
.inputRules1 {
  padding: 0 100px;
}
.btnCreate {
  padding: 0 200px;
}
</style>
