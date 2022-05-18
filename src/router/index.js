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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeViewVue,
    },
  ],
});

export default router;
