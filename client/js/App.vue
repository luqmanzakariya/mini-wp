<template>
  <div>
    <div class="mainBody row-sm-12">
      <b-navbar toggleable="lg" type="dark">
        <img @click="home" src="https://s.w.org/style/images/about/WordPress-logotype-simplified.png" style="height: 30px; width: 30px" class="m-1">
        <b-navbar-brand @click="home">Mini Wordpress</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form v-if="isLogin">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-button v-if="!isLogin" @click="toLogin" size="sm" class="my-2 my-sm-1 m-1" type="submit">Login</b-button>
            <b-button v-if="!isLogin" @click="toRegister" size="sm" class="my-2 my-sm-1 m-1" type="submit">Register</b-button>
            <b-button v-if="isLogin" @click="toLogout" size="sm" class="my-2 my-sm-1 m-1" type="submit">Logout</b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <!-- Login & Register (Before Login)-->
    <div v-if="!isLogin" class="row-sm-12 d-flex justify-content-center align-items-center flex-column ">
      <div v-if="page === 'login'" class="col-sm-3">
        <FormLogin @changeLogin="changeLogin" @loginDefault="loginDefault"></FormLogin>
      </div>
      <div v-if="page === 'register'" class="col-sm-3">
        <FormRegister @currentPage="currentPage"></FormRegister>
      </div>
    </div>
    
    <!-- After Login -->
    <div v-if="isLogin" class="row" style="height: 100%">
      <div class="sideNav col-sm-3">
        <SideNav @currentPage="currentPage"></SideNav>
      </div>
      <div class="col-sm-8 m-1">
        <div v-if="isLogin">
          <EveryoneArticle @currentPage="currentPage" v-if="page === 'EveryoneArticle'"></EveryoneArticle>
          <ListArticle @currentPage="currentPage" v-if="page === 'ListArticle'"></ListArticle>
          <FormCreateArticle @currentPage="currentPage" v-if="page === 'FormCreateArticle'"></FormCreateArticle>
          <EditArticle @currentPage="currentPage" v-if="page === 'EditArticle'" :id="idEdit"></EditArticle>
        </div>
      </div>
    </div>

    <div class="footer">
      <Footer></Footer>
    </div>



  </div>
</template>

<script>
import axios from 'axios'
import FormLogin from './components/formLogin'
import FormRegister from './components/formRegister'
import SideNav from './components/sideNav'
import FormCreateArticle from './components/formCreateArticle'
import ListArticle from './components/listArticle'
import EditArticle from './components/editArticle'
import Footer from './components/footer'
import EveryoneArticle from './components/everyoneArticle'
//WYSIWYG
import Editor from '@tinymce/tinymce-vue';

export default {
  data() {
    return {
      page: 'login',
      isLogin: false,
      idEdit: ''
    }
  },
  created() {
    if (localStorage.getItem('token')){
      this.isLogin = true
      this.page = 'EveryoneArticle'
    }
  },
  components: {
    FormLogin, FormRegister,
    SideNav, FormCreateArticle, EveryoneArticle,ListArticle, EditArticle,
    Footer
  },
  methods: {
    toLogin (){
      this.page = 'login'
    },
    toRegister(){
      this.page = 'register'
    },
    toLogout(){
      localStorage.clear()
      this.$gAuth.signOut()
      .then(() => {
        this.isLogin = false
        this.page = 'login'
        // things to do when sign-out succeeds
      })
      .catch(error  => {
        // things to do when sign-out fails
      })
    },
    changeLogin(val){
      this.isLogin = val
    },
    home(){
      this.page = 'EveryoneArticle'
    },
    loginDefault(val){
      this.page = val
    },
    currentPage(val, id){
      console.log('masuk current page')
      this.page = val
      this.idEdit = id
    }
  }
}

</script>

<style>
  body {
    background-color: #ecf0f1 !important;
    margin-bottom: 50px
  }
  .navbar {
    background-color: #262147 !important;
    padding: 0 15 15 0px;
    color: white !important;
  }
  span {
    color: white !important;
  }
  a.nav-link {
    color: white !important;
  }
  .sideNav {
    background-color:#6C6F8C;
    position: fixed;
    height:100vh;
  }
  .footer {
    top:0cm
  }
</style>
