import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      accessToken: "",
      isAuth: false,
    };
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    login(state, accessToken) {
      state.isAuth = true;
      state.accessToken = accessToken;
    },
    logout(state) {
      state.isAuth = false;
      state.accessToken = "";
    },
  },
  actions: {},
});

export default store;
