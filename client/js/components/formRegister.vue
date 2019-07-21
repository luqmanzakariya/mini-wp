<template>
  <div>
    <h2>Register</h2>
    <form>
      <label for="email">Name</label>
      <input v-model="register.name" type="text" placeholder="name" class="form-control">
      <label for="email">Email</label>
      <input v-model="register.email" type="email" placeholder="email" class="form-control">
      <label for="password">Password</label>
      <input v-model="register.password" type="password" placeholder="password" class="form-control"><br>
      <button @click="registerUser" type="button" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
// const baseUrl = 'http://35.240.221.23'
const baseUrl = `http://localhost:3000`

export default {
  data () {
    return {
      register : {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods : {
    registerUser (){
      console.log('masuk register')
      axios ({
        url: `${baseUrl}/users/register`,
        method: "post",
        dataType: "json",
        data: this.register
      })
      .then(({data})=>{
        swal.fire('Registered Succesfully, Please Login')
        this.$emit('currentPage', 'login')
      })
      .catch((err)=>{
        swal.fire(err.response.data.message)
        console.log('ini masuk error')
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
