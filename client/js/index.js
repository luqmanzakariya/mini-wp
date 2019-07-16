const baseUrl = 'http://localhost:3000'

const app = new Vue({
    el: '#app',
    components: {
      'editor': Editor
    },
    data: {
      message: 'Hello Vue!',
      userArticle: false,
      userCreateArticle: false,
      formRegister: false,
      formSignin: false,
      register: {
        name : "",
        email : "",
        password: ""
      },
      login: {
        username: "",
        password: ""
      },
      isLogin : localStorage.getItem('token') ? true : false,
      article : {
        title: "",
        content: "",
        created_at: new Date ()
      },
      articleList: [],
      page: ''
      
    },
    methods : {
      showRegisterForm(){
        console.log('masuk register form')
        this.formRegister = true,
        this.formSignin = false
      },
      showSigninForm(){
        console.log('masuk signin form')
        this.formSignin = true,
        this.formRegister = false
      },
      showAllArticleById(){
        console.log('masuk show article by id')
        this.userArticle = true
        axios({
          url: `${baseUrl}/articles/findAll`,
          method: "get",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          this.articleList = data
          this.userCreateArticle = false
          
        })
        .catch((err)=>{
          console.log(err)
        })
        // this.userCreateArticle = false
      },
      showFormCreateArticle(){
        console.log('masuk form create article')
        this.userCreateArticle = true
        this.userArticle = false
      },
      registerNewUser(){
        axios({
          url: `${baseUrl}/users/register`,
          method: "post",
          dataType: "json",
          data: this.register,
        })
          .then((newUser)=>{
            console.log(newUser)
          })
          .catch((err)=>{
            console.log('ini register', this.register)
            console.log(err.response.message)
          })
      },
      normalSignin (){
        axios({
          url: `${baseUrl}/users/login`,
          method: "post",
          dataType: "json",
          data: this.login,
        })
          .then(({data})=>{
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.userId)
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            this.isLogin = true
          })
          .catch((err)=>{
            console.log(err.response.message)
          })
      },
      logoutButton (){
        localStorage.clear()
        this.isLogin = false
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
        .then(function(){
          this.isLogin = false
        })
        .catch(function(err){
            console.log(err)
        })
      },
      formCreateArticle(){
        axios({
          url: `${baseUrl}/articles/create`,
          method: "post",
          dataType: "json",
          data: this.article,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((todo)=>{
          this.showAllArticleById()
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      deleteArticle(id){
        console.log(id)
        axios({
          url: `${baseUrl}/articles/${id}`,
          method: "delete",
          dataType: "json",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((data)=>{
          this.showAllArticleById()
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      editArticle(article){
        console.log('masuk edit article', article)
        Swal.fire({
          html: `
          <div class="card-body">
          <h5> ${article.title} </h5>
            <p v-html="article.content" class="card-text"></p>
            <i v-on:click="editArticle(article._id)" class="far fa-edit">Edit</i>
            <i v-on:click="deleteArticle(article._id)" class="fas fa-trash-alt">Delete</i>
          </div>
          `
        })
      }
    }
  
})

