//////
/////
// This store is not very moduluar A lot of functions have data that is hard coded I.E. Home button if statements
/////
//////
import { createStore } from "vuex";
//Importing the Home button store modules here
import HomeButtonModule from "./homeButtons/index.js";
import exampleStoreModule from "./exampleStore/index"
// Create a new store instance.
const store = createStore({
  state() {
    return {
      //sets the v-if to show index module or not
      showSlideIndex: false,
      //set the current home slide for the index to populate
      currentSelectedHomeButton: "",
      //sets array for index titles
      currentIndexTitles: [],
      indexSlideSelected: "",
      indexOfSlide: 0,
      totalNumberOfSlides: 0,
      //this is for questions, "unanswered", "true", "false" all flags for setting correct
      // image to display after guess
      isQuestionCorrect: "unAnswered",
      //check for forward and back buttons on the portal, if false it disables user from going forward
      questionAnswered: true,
      // this is to keep track of which term needs to be shown
      activeTermId: 0,
    };
  },
  //declared home buttons here
  modules: {
    homeButtonGroup: HomeButtonModule,
    exampleStore : exampleStoreModule
    
  },
  mutations: {
    setSelectedHomeButton(state, payload) {
      state.currentSelectedHomeButton = payload.title;
    },
    setIndexSlideSelected(state, payload) {
      state.indexSlideSelected = payload.slide;
      for (let index = 0; index < state.currentIndexTitles[0].length; index++) {
        if (state.indexSlideSelected === state.currentIndexTitles[0][index]) {
          store.commit("setIndexOfSlide", index);
        }
      }
    },
    setIndexOfSlide(state, payload) {
      state.indexOfSlide = payload;
    },
    //This Function is hard coded, if check for what home button is being clicked.
    openCurrentIndex(state) {
      state.showSlideIndex = !state.showSlideIndex;
      // on open we set the array back to 0
      state.currentIndexTitles = [];
      //since the button opens a new window we use localstorage to find the current pressed button
      console.log(window.localStorage.getItem("name"));
       if (window.localStorage.getItem("name") === "Test View") {
        //set the currentindex title to the correct slide
         state.currentIndexTitles.push(state.exampleStore.slideNames);
         console.log(state.currentIndexTitles)
         state.totalNumberOfSlides = state.currentIndexTitles[0].length;
         return;
        }

    },
    closeCurrentIndex(state) {
      state.showSlideIndex = !state.showSlideIndex;
    },
    setQuestionAnswered(state, payload) {
      state.questionAnswered = payload;
    },
    setIsQuestionCorrect(state, payload) {
      state.isQuestionCorrect = payload;
    },
    setActiveTermId(state, payload) {
      state.activeTermId = payload;
    },
  },

  actions: {
    setIndexOfSlide(context, payload) {
      context.commit("setIndexOfSlide", payload);
    },
    openCurrentIndex(context) {
      context.commit("openCurrentIndex");
    },
    closeCurrentIndex(context) {
      context.commit("closeCurrentIndex");
    },
    setSelectedHomeButton(context, payload) {
      context.commit("setSelectedHomeButton", payload);
    },
    setIndexSlideSelected(context, payload) {
      context.commit("setIndexSlideSelected", payload);
    },
    setIndexLength(contex) {
      contex.commit("setIndexLength");
    },
    setQuestionAnswered(context, payload) {
      context.commit("setQuestionAnswered", payload);
    },
    setIsQuestionCorrect(context, payload) {
      context.commit("setIsQuestionCorrect", payload);
    },
    setActiveTermId(context, payload) {
      context.commit("setActiveTermId", payload);
    },
  },
  getters: {
    getShowSlide(state) {
      return state.showSlideIndex;
    },
    getIndexTitles(state) {
      return state.currentIndexTitles;
    },
    getCurrentSelectedHomeButton(state) {
      return state.currentSelectedHomeButton;
    },
    getTitleCount(state) {
      return state.introductionF.titleCount;
    },
    getIndexSlideSelected(state) {
      return state.indexOfSlide;
    },
    getTotalNumberOfSlides(state) {
      return state.totalNumberOfSlides;
    },
    getQuestionAnswered(state) {
      console.log(state.questionAnswered)
      return state.questionAnswered;
    },
    getIsQuestionCorrect(state) {
      
      return state.isQuestionCorrect;
    },
    getActiveTermId(state) {
      return state.activeTermId;
    },
  },
});
export default store;
