<template>
  <div class="upload-wrapper">
    <h2 class="upload-title">数据上传</h2>
    <IvUpload
      :on-progress="handleUploadingProgress"
      :on-success="handleUploadingSuccess"
      :on-error="handleUploadingError"
      name="uploadedFile"
      type="drag"
      :action="uploadUrl"
      :format="['csv']"
    >
      <div class="upload-icon-wrapper">
        <Icon type="ios-cloud-upload" size="52" class="upload-icon"></Icon>
        <p>点击或拖拽文件到此上传</p>
      </div>
    </IvUpload>
    <!-- <input ref="uploadedFile" type="file" name="upload-doc-input" id="upload-input" />
    <button class="btn-primary" @click="handleUploading">Upload</button>
    <p>{{ message }}</p> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { uploadFile } from '@/service';
import { Upload as IvUpload } from 'view-design';
import { DATA_ANALYSIS_FILE_UPLOAD_URL } from '../service/constants';

const FILE_ERROR_MESSAGE = 'error file, please upload correct file endwith ".csv"';
const FILE_CSV_SUFFIX = '.csv';
const FILE_CSV_TYPENAME = 'csv';
const UPLOADING_MESSAGE = 'uploading, please wait in patience';
const MAX_FILE_SIZE = 1024 * 1024 * 2;

export default {
  name: 'Upload',
  data() {
    return {
      message: '',
      uploadUrl: DATA_ANALYSIS_FILE_UPLOAD_URL,
      uploadingCb: {}
    };
  },
  components: {
    IvUpload
  },
  methods: {
    handleUploadingProgress(event, file) {
      const { uid, name, size } = file;
      let content;
      if (!this.uploadingCb[uid]) {
        if (size > MAX_FILE_SIZE) {
          content = `${name} 正在上传并分析，请耐心等候...`;
        } else {
          content = `${name}正在上传并分析，因文件较大可能需要数分钟，请耐心等候...`;
        }
        this.uploadingCb[uid] = this.$Message.loading({
          content,
          duration: 0
        });
      }
    },
    handleUploadingSuccess({ msg }, file) {
      const { uid, name } = file;
      setTimeout(this.uploadingCb[uid], 400);
      // this.uploadingCb[uid]();
      this.$Message.success({
        content: `${name} 上传成功，${msg}`
      });
    },
    handleUploadingError(error, { msg = '' } = {}, file) {
      const { uid, name } = file;
      this.uploadingCb[uid]();
      this.$Message.error({
        content: `${name} 上传失败。${msg}`
      });
    },
    async handleUploading() {
      const file = this.$refs.uploadedFile.files[0];
      if (
        !file ||
        !file.name.endsWith(FILE_CSV_SUFFIX) ||
        file.type.indexOf(FILE_CSV_TYPENAME) < 0
      ) {
        this.message = FILE_ERROR_MESSAGE;
        return;
      }

      this.message = UPLOADING_MESSAGE;

      const { msg } = await uploadFile(file);
      this.message = msg;
    }
  }
};
</script>

<style lang="less" scoped>
.upload-wrapper {
  margin: 150px 30% 0;

  .upload-title {
    margin-bottom: 10px;
  }
  .upload-icon-wrapper {
    padding: 20px 0;
    .upload-icon {
      color: #3399ff;
    }
  }
}
</style>
