import Vuex from 'vuex';

const store = () => {
    return new Vuex.Store({
        state: {
            apiTab: [null, null, null],
            info: null,
            liked: [false, false, false, false, false, false],
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
            }
        }
    })
}

export default store