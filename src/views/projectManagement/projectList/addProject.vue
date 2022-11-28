<!--  HACK 创建新项目 -->
<template>
  <div id="components-modal-demo-position">
    <a-modal
      v-model="modal2Visible.bol"
      title="添加项目"
      width="360px"
      centered
      @ok="sendCreateProject"
    >
      <div class="uploadcenter">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else class="styleImg">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">添加封面</div>
          </div>
        </a-upload>
      </div>
      <a-form-model :model="form" :rules="rules">
        <a-form-model-item ref="name" prop="name">
          <a-input
            class="input"
            placeholder="项目名称(必填)"
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
      </a-form-model>
      <a-select
        default-value="请选择项目模板(必选)"
        style="width: 276px; margin-left: 18px"
        @change="handleChange1"
      >
        <a-select-option
          v-for="item in projectType"
          :key="item.id"
          :value="item.name"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
      <div>
        <div style="margin: 24px 0" />
        <a-textarea
          class="text"
          placeholder="项目简介"
          :auto-size="{ minRows: 1, maxRows: 6 }"
          v-model="textValue"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { addProject } from "@/service/createProject";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  props: {
    modal2Visible: {
      type: Object,
    },
    projectType: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      imageUrl: "",
      form: {
        name: "",
      },
      textValue: "",
      proType: "",
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange1(value) {
      this.proType = value;
    },
    sendCreateProject() {
      this.modal2Visible.bol = false;
      addProject({
        cover:
          "https://s1.momo.moda/2015/04/10/1efa39bcaec6f3900149160693694536.jpg",
        id: "",
        intro: this.textValue,
        manager_id: 79,
        name: this.form.name,
        project_template_id: 18,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  width: 276px;
  margin-left: 19px;
}
.uploadcenter {
  margin-left: 20px;
}
.avatar-uploader > .ant-upload {
  display: flex;
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.avatar-uploader .styleImg {
  margin-left: -25px;
  width: 280px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.input-ant {
  width: 276px;
  margin-left: 18px;
}
.levelLinkage {
  width: 276px;
  margin-left: 18px;
}
.text {
  width: 276px;
  margin-left: 18px;
}

.ant-cascader-menu {
  width: 160px !important;
}
</style>
