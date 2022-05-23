/*
/////
// Import your Views and link them here
////
 I.E.:
 import Introduction from "../components/views/Introduction.vue"
 routes: [
  {
    path:"/introductions/"
    name:"introductions"
    component: Introduction
  },
 ]

 NOTE: Make sure the newly created button's name is the same with link from: store -> homeButtons -> index.js 
*/
import { createRouter, createWebHistory } from "vue-router";
import HomeViewVue from "../components/views/HomeView.vue";
import TestViewVue from "../components/views/testView.vue";
import SampleViewVue from "../components/views/sampleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeViewVue,
    },
    {
      path: "/components/views/testView",
      component: TestViewVue,
    },
    {
      path: "/components/views/sampleView",
      component: SampleViewVue,
    }

  ],
});

export default router;
