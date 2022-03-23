import Vuex from 'vuex'
import Vue from 'vue'
import Axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
      lang: 'EN',
      author: {
        name: '',
        surname: '',
        patronymic: '',
        city: '',
        adress: '',
        posteCode: '',
        education: '',
        specialityCode: '',
        work: '',
        position: '',
        academicDegree: ''
      },
      user:{
        email:'',
        password:''
    }
    
  }
},

computed: {
  authorList() {
    return this.$store.getters.AUTHOR;
  },
},
  mutations: {
    SET_AUTHOR:(state,authors)=>{
      state.author = authors
    },
    ADD_AUTHOR:(state,authors)=>{
      state.author.push(authors)
    },
     set(state, data) {
       Object.assign(state, data)
     },
     update(state, data) {
       state = { ...state, ...data }
     }
  },
  actions:{
    SET_AUTHOR: async (context, authors)=>{
    let {data} = await Axios.get(' http://localhost:8080/api/authorAPI',{author:authors});
    context.commit('SET_AUTHOR',data);
    },
    SAVE_AUTHOR: async (context, authors)=>{
      let {data} = await Axios.post(' http://localhost:8080/api/authorAPI',{author:authors});
      context.commit('ADD_AUTHOR',data);
      }
  },
  getters:{
   AUTHOR:state=>{
     return state.author
   }
  },
})

