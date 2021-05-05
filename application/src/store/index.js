import { createStore } from 'vuex'

export default createStore({
  state: {
    images: []
  },
  getters: {
    images(state) {
      return state.images
    },
    getImageById(state, { imageId }) {
      return state.images[imageId];
    }
  },
  mutations: {
    CREATE_IMAGE(state, { files }) {
      state.images.push(files);
    },

    DELETE_IMAGE(state, { index }) {
      state.images.splice(index, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
