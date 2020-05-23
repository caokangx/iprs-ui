<template>
  <div class="upload-wrapper">
    <input ref="uploadedFile" type="file" name="upload-doc-input" id="upload-input" />
    <button class="btn-primary" @click="handleUploading">Upload</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { uploadFile } from '@/service';

const FILE_ERROR_MESSAGE = 'error file, please upload correct file endwith ".csv"';
const FILE_CSV_SUFFIX = '.csv';
const FILE_CSV_TYPENAME = 'csv';
const UPLOADING_MESSAGE = 'uploading, please wait in patience';

export default {
  name: 'Upload',
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async handleUploading() {
      const file = this.$refs.uploadedFile.files[0];
      if (!file || !file.name.endsWith(FILE_CSV_SUFFIX)
        || file.type.indexOf(FILE_CSV_TYPENAME) < 0) {
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
  margin: 20px;
}
</style>
