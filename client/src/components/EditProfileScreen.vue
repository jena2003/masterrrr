<template>
<div>
  <div class="profile">
    <div class="menu">
      <router-link class="menu__item" to="/MyProfileScreen">Мой профиль</router-link>
      <div class="menu__item">Мои статьи</div>
      <div class="menu__item menu__item_checked">Редактировать профиль</div>
    </div>
    <div class="profile__container">
      <div class="profile__avatar-and-data">
        <div>
          <img class="profile__avatar" src="../assets/img/default-user.jpg">
          <div class="edit-photo">Изменить аватар</div>
        </div>
        <div class="profile__main-data" v-for="item in AUTHOR">
          <input
            class="profile__input"
            placeholder="Имя"
           v-bind:value="name" @input="name = $event.target.value" 
           
          />
          <input
            class="profile__input"
            placeholder="Фамилия"
            v-bind:value="surname" 
            @input="surname = $event.target.value"
          />
          <input
            class="profile__input"
            placeholder="Отчество"
            v-bind:value="patronymic" 
            @input="patronymic = $event.target.value"
          />
        </div>
      </div>
      <div class="profile__subtitle">Образование</div>
      <div class="profile__education">
        <input
          class="profile__input profile__input_long"
          placeholder="Наименование учреждения"
          v-bind:value="education" 
          @input="education = $event.target.value"  
        />
         <input
            class="profile__input profile__input_long"
            placeholder="Код специальности"
            v-bind:value="specialityCode" 
            @input="specialityCode = $event.target.value"
          />
      </div>
      <div class="profile__subtitle">Адрес</div>
      <div class="profile__data">
        <input
          class="profile__input profile__input_long"
          placeholder="Город"
          v-bind:value="city" 
          @input="city = $event.target.value"
          />
        <input
          class="profile__input profile__input_long"
          placeholder="Адрес"
          v-bind:value="adress" 
          @input="adress = $event.target.value"
        />
        <input
          class="profile__input profile__input_long"
          placeholder="Почтовый индекс"
          v-bind:value="posteCode" 
          @input="posteCode = $event.target.value"  
        />
      </div>
      <div class="profile__subtitle">Работа</div>
      <div class="profile__education">
        <input
          class="profile__input profile__input_long"
          placeholder="Место работы"
          v-bind:value="work" 
          @input="work = $event.target.value"   
        />
        <input
          class="profile__input profile__input_long"
          placeholder="Должность"
          v-bind:value="position" 
          @input="position = $event.target.value" 
        />
        <input
          class="profile__input profile__input_long"
          placeholder="Ученая степень"
          v-bind:value="academicDegree" 
          @input="academicDegree = $event.target.value" 
        />
        <button class="profile__button" @click="editUser" >Подтвердить</button>
      </div>
    </div>
  </div>
  <Footer />
</div>
  
</template>

<script>
import store from '../store.js'
import Footer from './Footer.vue'
import {addAuthor} from "@/api/authorAPI"
import {mapGetters} from 'vuex';


export default {
  name: 'EditProfileScreen',
  components: {
    Footer
  },
  data: function() {
    return {
      store:store,
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
      }
    }
  },
  computed : {
  ...mapGetters(['AUTHOR']),
  // Другие вычисляемые свойства
},
  methods: {
     editUser() {
     addAuthor(
       this.name ,
       this.surname ,
       this.patronymic ,
       this.city ,
       this.adress,
       this.postecode ,
       this.education ,
       this.specialityCode ,
       this.work ,
       this.position ,
       this.academicDegree 
        ).then((response)=>{
          console.log(response.data)
          this.author=response.data
        this.store.dispatch('SET_AUTHOR', {author: this.author})
        if (response.data){
          window.location.href = 'http://localhost:8080/#/MyProfileScreen';
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../utils/const.less';
@import '../utils/mixins.less';

.profile {
  margin: 0 auto;
  display: flex;
  width: 100%;
  background-color: @utility-border;
  &__education {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  &__subtitle {
    .title-big-bold();
    text-align: center;
    margin-top: 40px;
  }
  &__avatar-and-data {
    display: flex;
  } 
  &__data {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  &__avatar {
    width: 200px;
    height: 200px;
    .nice-shadow();
    border-radius: 32px;
  }
  &__container {
    padding: 30px 30px 30px 0;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
  }
  &__input {
      text-align: center;
      margin: 16px 0 0;
      border: none;
      outline: none;
      background-color: @utility-border-input;
      height: 25px;
      padding: 8px;
      border-radius: 8px;
      .nice-shadow();
      &_long {
        width: 300px;
      }
  }
  &__button {
    text-align: center;
      margin: 32px 0 0;
      border: none;
      outline: none;
      .nice-shadow();
      padding: 8px;
      border-radius: 8px;
      background-color: rgba(1, 68, 97,0.8);
      color: @utility-white;
  }
  &__main-data {
    display: flex;
    flex-direction: column;
    margin-left: 45px;
  }
}

.edit-photo {
  .subtitle-big-bold();
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  color: @text-grey;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 48px;
}

.menu {
    width: 200px;
    margin-left: 100px;
    height: 100%;
    display: flex;
    margin-top: 30px;
    background-color: @dark-text-secondary;
    flex-direction: column;
    &__item {
      border: 1px solid @utility-border;
      padding: 8px 8px 14px;
      background-color: rgba(1, 68, 97,0.7);
      color: @utility-white;
      text-decoration: none;
      cursor:pointer;
      &:hover {
        background-color: rgba(1, 68, 97);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
      } 
      &_checked {
      background-color: rgba(1, 68, 97);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
    }
    }
  }
</style>