import Vue from 'vue'
import Router from 'vue-router'

import index from '~/components/index'
import readFile from '~/components/fileOperations/readFile'
import drawCanvas from '~/components/other/drawCanvas'
import snake from '~/components/games/snake'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/readFile',
      name: 'readFile',
      component: readFile
    },
    {
      path: '/drawCanvas',
      name: 'drawCanvas',
      component: drawCanvas
    },
    {
      path: '/snake',
      name: 'snake',
      component: snake
    }
  ]
})
