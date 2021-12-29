import { Commit, createStore } from 'vuex'

export default createStore({
  state: {
    authenticated: false,
            //  sample response
    // {
    //     "refreshToken": "101b3f71-6ba2-4983-a2a0-7c5f3439ea22",
    //     "id": 1,
    //     "username": "aaa",
    //     "email": "ccc@l.com",
    //     "roles": [
    //         "ROLE_MODERATOR",
    //         "ROLE_ADMIN"
    //     ],
    //     "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWEiLCJpYXQiOjE2NDA3MTU4OTgsImV4cCI6MTY0MDcxNTk1OH0.9Eet0lqUY4Bf8FJhI4FTCrrkL8GW8-152AdJH_OYTqQnNEOCgyN4EvPtvO01UI8ayN-1T4UB0LZAA8uui0FWOg",
    //     "type": "Bearer"
    // }
    username: '',
    email: '',
    roles: [],
    token: '',
    refreshToken: '',
    userData: {},
  },
  mutations: {
    SET_AUTH: (state: {authenticated: boolean }, auth: boolean) => state.authenticated = auth,
    SET_USER_DATA: (state, data) => {
      if (data == {}) {
        state.username= ''
        state.email = ''
        state.roles = []
        state.token = ''
        state.refreshToken = ''
      } else {
        state.username = data.username
        state.email = data.email
        state.roles = data.roles
        state.token = data.token
        state.refreshToken = data.refreshToken
      }
    },
    SET_TOKEN_DATA: (state, data) => {
      if (data == null) {
        state.token = ''
        state.refreshToken = ''
      } else {
        state.token =  data.accessToken
        state.refreshToken =  data.refreshToken
      }
    }
  },
  actions: {
    setAuth: ({commit}: {commit: Commit}, auth: boolean) => commit('SET_AUTH', auth),
    setUserData: ({commit}: {commit: Commit}, userData: unknown) => commit('SET_USER_DATA', userData),
    setTokenData: ({commit}: {commit: Commit}, tokenData: unknown) => commit('SET_TOKEN_DATA', tokenData)
  },
  modules: {
  }
})
