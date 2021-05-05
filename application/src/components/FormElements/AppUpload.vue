<template>
  <div
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleFileInput"
  >
    <!-- Upload dropdown section -->
    <div class="upload-wrapper" :class="{ 'bg-white animate-pulse': over }">
      <div id="header" class="upload-header">
        <h1 class="text-xl mb-4">
          {{ heading }}
          <label for="fileupload" class="upload-label">Browse</label>
          <input
            id="fileupload"
            class="hidden"
            type="file"
            name="fileupload"
            @change="handleFileInput"
            multiple
          />
        </h1>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          :css="false"
        >
          <small v-if="fileItems.length > 0" class="text-base cursor-pointer"
            >Add to gallery</small
          >
        </transition>
      </div>

      <main class="upload-body relative">
        <transition-group
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          :css="false"
          tag="ul"
          appear
        >
          <app-upload-item
            v-for="(file, index) in fileItems"
            :key="file.name"
            :file="file"
            @FileClose="onFileClose(index)"
          />
        </transition-group>
      </main>
    </div>
  </div>
</template>

<script>
import Velocity from "velocity-animate";

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
    // Animation methods
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = "0em";
    },

    enter(el, done) {
      Velocity(
        el,
        {
          opacity: 1,
          height: "100%",
        },
        {
          duration: 2000,
          easing: [100, 5],
          complete: done,
        }
      );
    },

    leave(el, done) {
      Velocity(
        el,
        {
          opacity: 0,
          height: "0em",
          padding: 0,
          margin: 0,
          position: "absolute",
        },
        {
          duration: 500,
          easing: "ease-out",
          complete: done,
        }
      );
    },
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
  @apply shadow-md rounded-lg bg-white p-3 m-auto w-10/12 md:w-8/12 lg:w-4/12;
  @apply dark:bg-dark;
}

.upload-header {
  @apply text-center pt-8 pb-4 text-xl text-primary border-2 rounded border-dashed border-primary;
}

.upload-body {
  @apply transition-all;
}

.upload-footer {
  @apply text-right;
}

.upload-label {
  @apply items-center cursor-pointer transition-all text-white bg-secondary bg-opacity-60 px-2 py-1 rounded-full hover:bg-opacity-80;
}
</style>
