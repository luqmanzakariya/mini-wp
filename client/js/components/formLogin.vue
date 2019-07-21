<template>
  <div>
    <h2>Sign In</h2>
    <form>
      <label for="email">Email</label>
      <input v-model="login.email" type="text" placeholder="email" id="email" class="form-control">
      <label for="password">Password</label>
      <input v-model="login.password" type="password" placeholder="password" id="password" class="form-control"><br>
      <button @click="loginUser" type="button" class="btn btn-primary">Submit</button>
      <div style="margin-top: 5px;">
          <label style="text-align:center">Or<br>Sign In with google</label>
          <button @click.prevent="googleSignin" class="btn btn-danger">Sign in with google</button>
      </div>
    </form>
  </div>
</template>

<script>
// const baseUrl = 'http://35.240.221.23'
const baseUrl = `http://localhost:3000`

export default {
  data() {
      return {
        login: {
          email: '',
          password: '',
        },
        isSignIn: null
      }
    },
    methods: {
      googleSignin(){
        console.log('klik google signin')
        this.$gAuth.signIn()
        .then(GoogleUser => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log('user', GoogleUser)
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
          this.isSignIn = this.$gAuth.isAuthorized
          const idToken= {idToken: GoogleUser.getAuthResponse().id_token}
          console.log('ini idToken', idToken)
          axios({
            url: `${baseUrl}/users/login/google`,
            method: "post",
            dataType: "json",
            data: idToken,
          })
          .then(({data})=>{

            console.log('masuk data',data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            swal.fire('Login Succes')
            this.$emit('changeLogin', true)
            this.$emit('loginDefault', 'EveryoneArticle')
          })
          .catch((err)=>{
            swal.fire(err.response.data.message)
          })

        })
        .catch(error  => {
          //on fail do something
        })
      },
      loginUser (){
        axios({
          url: `${baseUrl}/users/login`,
          method: "post",
          dataType: "json",
          data: this.login,
        })
        .then(({data})=>{
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          swal.fire('Login Succes')
          this.$emit('changeLogin', true)
          this.$emit('loginDefault', 'EveryoneArticle')
        })
        .catch((err)=>{
          swal.fire(err.response.data.message)
        })
      },
      onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
    }
}
</script>

<style>
  h2 {
    text-align: center
  }
</style>
