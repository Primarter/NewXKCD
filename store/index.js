import Vuex from 'vuex';

const store = () => {
    return new Vuex.Store({
        state: {
            apiTab: [null, null, null],
            info: null,
            liked: [false, false, false, false, false, false],
        },
        computed: {
            getImg: function (index) {
              return (state.apiTab[index - 1].data.img);
            },
            getTitle: function (index) {
              return (state.apiTab[index - 1].data.title);
            },
            getAlt: function (index) {
              return (state.apiTab[index - 1].data.alt);
            },
            getNum: function (index) {
              return (state.apiTab[index - 1].data.num);
            }
        },
        mutations: {
            setTab(state, values) {
                state.apiTab[values.index] = values.info;
            },
            setInfo(state, info) {
                state.info = info;
            },
            inverseLike(state, index) {
                state.liked[index - 1] = !state.liked[index - 1];
            },
            getImg: function (index) {
                return (state.apiTab[index - 1].data.img);
              },
              getTitle: function (index) {
                return (state.apiTab[index - 1].data.title);
              },
              getAlt: function (index) {
                return (state.apiTab[index - 1].data.alt);
              },
              getNum: function (index) {
                return (state.apiTab[index - 1].data.num);
              }
        }
    })
}

export default store