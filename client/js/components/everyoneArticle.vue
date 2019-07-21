<template>
  <div>
    <div v-for="article in articles">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col sm="6">
            <b-card-img :src="article.fileUrl" class="rounded-0"></b-card-img>
            <b-card-text class="articleDate">{{new Date(article.created_at).toString().substr(0,24)}}</b-card-text>
          </b-col>
          <b-col sm="6">
            <b-card-body :title="article.title">
              <b-card-text v-html="article.content"></b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000'

export default {
  data (){
    return {
      article : {
        title: "",
        content: "",
        created_at: new Date ()
      },
      articles: [],
    }
  },
  methods : {
    everyoneArticle(){
      axios({
        url: `${baseUrl}/articles/allUserArticle`,
        method: "get",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data)
        this.articles = data
        
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  created(){
    this.everyoneArticle()
  }
}
</script>

<style>

</style>
