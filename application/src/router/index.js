import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Convert from '@/views/Convert.vue'
import Gallery from '@/views/Gallery.vue'
import Upload from '@/views/Upload.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/convert',
    name: 'Convert',
    component: Convert
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
