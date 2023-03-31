<template>
  <div id="singleItemView">
    <a href="#" class="go-top"><i class="fa-solid fa-arrow-up text-dark"></i></a>

    <div class="nav-bar">
      <div class="row">
        <div class="col-1"><button class=" btn btn-sm btn-secondary" onclick="history.back()"><i class="fa-solid fa-arrow-left"></i></button></div>
      </div>
    </div>
    <div class="text-center my-5" v-if="postData == ''">
      <LoadingSpinner></LoadingSpinner>
    </div>
     <div class="row p-2 content-section" v-else>
      <!-- image section -->
      <div class="col-12 col-sm-6">
        <div class=" my-5 border">
          <img :src="mainImage" alt="" class="mainImage">
        </div>
        <div class="small-images row">
           <div class="first-image col-3 offset-1 me-1" @click="mainImage = postData.image">
            <img :src="postData.image" alt="">
           </div>
           <div class="second-image col-3 me-1" v-if="postData.image2" @click="mainImage = postData.image2">
            <img :src="postData.image2" alt="">
           </div>
           <div class="third-image col-3 me-1" v-if="postData.image3" @click="mainImage = postData.image3">
            <img :src="postData.image3" alt="">
           </div>
        </div>
      </div>

      <div class="col-12 col-sm-6">
          <div class="my-5 mx-3 mx-sm-0">
            <div class="name text-center fs-3 fw-bolder text-color">{{ postData.name }}</div>
            <div class="brand my-3" v-if="postData.brand">
              <div class="row">
                <div class="col-4"><span class=" opacity-75">Brand</span></div>
                <div class="col-7 offeset-1"><span class="fw-bolder">{{ postData.brand }}</span></div>
              </div>            
            </div>
            <div class="price my-3">
              <div class="row">
                <div class="col-4"><span class=" opacity-75">Price</span></div>
                <div class="col-7 offeset-1"><span class="text-color fw-bolder">{{ postData.price }}&nbsp; MMks</span></div>
              </div>
            </div>
            <div class="count my-3">
              <div class="row">
                <div class="col-4"><span class=" opacity-75">Available</span></div>
                <div class="col-7 offeset-1"><span class="fw-bolder">{{ postData.count }}</span></div>
              </div>
            </div>
            <table class="table table-striped">
              <tbody>
                <tr v-for="detail in details" :key="detail">
                <td>{{ detail }}</td>
                </tr>                
              </tbody>
            </table>
          </div>
      </div>
     </div>
     <FooterSection></FooterSection>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner'
import FooterSection from '../components/FooterSection'
import axios from 'axios'
  export default {
  components: {
    LoadingSpinner, FooterSection },
    name: 'SingleItemView',
    props: ["postId"],
    data() {
      return {
        postData: "",
        mainImage: "",
        details: []
      }
    },
    methods: {
      getSingleData() {
        axios.post(`https://tackle-admin.tackle-mm.com/api/post/singlePost`, { id : this.postId}).then((response) => {
                    response.data.singlePost.image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.singlePost.image ;
                    if (response.data.singlePost.image2 !== null) {
                    response.data.singlePost.image2 = "https://tackle-admin.tackle-mm.com/storage/secImage/"+response.data.singlePost.image2 ;
                    }
                    if (response.data.singlePost.image3 !== null) {
                    response.data.singlePost.image3 = "https://tackle-admin.tackle-mm.com/storage/thirdImage/"+response.data.singlePost.image3 ;
                    }

                    response.data.singlePost.price = Number(response.data.singlePost.price).toLocaleString();
                this.postData = response.data.singlePost;
                this.mainImage = this.postData.image;
                this.details = this.postData.details.split("+");

            }).catch(e => {
                console.log(e);
            })
      }
    },
    mounted () {
      this.getSingleData();
    },
  }
</script>

<style lang="scss" scoped>
.nav-bar{
  background-color: #dddddd;
  padding: 15px;
}
.content-section{
  background-color: white;
}
.main-image{
  width: 100%;
}
.small-images img:hover{
  transform: scale(1.1);
}

img {
  width: 100%;
}
</style>
