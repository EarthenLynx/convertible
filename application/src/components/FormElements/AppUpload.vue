<template>
  <div
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleFileInput"
  >
    <!-- Upload dropdown section -->
    <div class="upload-wrapper">
      <div id="header" class="upload-header">
        <h1 class="text-xl">
          {{ heading }}
          <label for="fileupload" class="upload-label">or Browse</label>
          <input
            id="fileupload"
            class="hidden"
            type="file"
            name="fileupload"
            @change="handleFileInput"
            multiple
          />
        </h1>
      </div>

      <main
        class="upload-body relative"
        :class="{ 'bg-white animate-pulse': over }"
      >
        <transition-group name="slideup" tag="ul" appear>
          <app-upload-item
            v-for="(file, index) in fileItems"
            :key="file.name"
            :file="file"
            @FileClose="onFileClose(index)"
          />
        </transition-group>
      </main>
      <div class="upload-footer">
        <app-button>Add to gallery</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/Buttons/AppButton.vue";
import AppUploadItem from "@/components/FormElements/AppUploadItem.vue";
export default {
  name: "AppUpload",
  components: { AppButton, AppUploadItem },
  props: {
    heading: { type: String, default: "Drag a file here" },
    uploadUrl: String,
    uploadQuery: String,
    allowedFormats: {
      type: Array,
      default: ["image"],
    },
  },

  data() {
    return {
      over: false,
      loaded: false,
      processing: false,
      fileItems: [
        // {
        //   name: "",
        //   size: "",
        //   type: "",
        //   buffer: "",
        // },
      ],
    };
  },

  methods: {
    // Drag & Drop methods
    handleDragOver() {
      this.over = true;
    },

    handleDragLeave() {
      this.over = false;
    },

    // Process the selected file and emit it back to the parent component as an ArrayBuffer
    handleFileInput(event) {
      const fileItem = this._getFiles(event);

      return fileItem.forEach((file) => {
        if (
          this.allowedFormats.length > 0 &&
          !this.allowedFormats.includes(file.type.split("/")[0])
        ) {
          this.over = false;
          this.loaded = true;
          this.$emit("fileError", `Filetype ${file.type} not supported.`);
        } else {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = (event) => {
            const fileItem = {
              name: file.name,
              size: (file.size / 1000).toFixed(2),
              type: file.type.split("/")[1],
              buffer: event.target.result,
            };
            this.over = false;
            this.loaded = true;
            this.fileItems.push(fileItem);
            this.$emit("fileLoaded", this.fileItem);
          };
        }
      });
    },

    _getFiles(event) {
      let files = [];

      if (event.type === "drop") {
        const items = event.dataTransfer.items;
        const length = items.length;
        for (let i = 0; i < length; i++) {
          files.push(items[i].getAsFile());
        }
      } else {
        const items = event.target.files;
        const length = items.length;
        for (let i = 0; i < length; i++) {
          files.push(items[i]);
        }
      }
      return files;
    },

    onFileClose(index) {
      this.fileItems.splice(index, 1);
    },

    // Upload a file and pass the server response back to the parent component
    async handleUploadFile() {
      this.processing = true;
      const url = this.uploadUrl + this.uploadQuery;

      // Do basic validation to check if relevant params are submitted
      const payload = await this.buffer;
      const options = { method: "post", body: payload };

      try {
        const response = await fetch(url, options);
        if (response.status !== 200) {
          const errorMsg = await response.json();
          this.$emit("imageError", errorMsg.error);
        } else {
          const image = await response.blob();
          const imageUrl = URL.createObjectURL(image);
          this.$emit("imageReceived", imageUrl);
        }
      } catch (e) {
        this.$emit("fileError", `Could not upload file: ${e}`);
      } finally {
        this.processing = false;
      }
    },

    // Helper methods
    checkAllowedFormats(filetype, allowedFiletypes) {
      return allowedFiletypes.includes(filetype) ? true : false;
    },
  },
};
</script>

<style scoped>
.upload-wrapper {
  @apply border shadow-md rounded-lg bg-white;
  @apply dark:bg-dark;
}

.upload-header {
  @apply text-center m-2 p-8 text-xl text-primary border-2 rounded border-dashed border-primary;
}

.upload-body {
  @apply m-2;
}

.upload-footer {
  @apply m-2 text-right;
}

.upload-label {
  @apply items-center cursor-pointer transition-all hover:text-secondary;
}
</style>
