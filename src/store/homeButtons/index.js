//Add Home Buttons Here: title and link 
export default {
  nameSpaced: true,
  state() {
    return {
      buttons: [
        {
          title: "Test View",
          link: "/components/views/testView",
        },
        {
          title: "Sample View",
          link: "/components/views/sampleView",
        }
      ],
    };
  },
  mutations: {},
  actions: {},
  getters: {},
};
