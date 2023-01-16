<template>
  <div class="home">
    <section class="">
      <a href="#" class="go-top"><i class="fa-solid fa-arrow-up text-dark"></i></a>
      <div class="row">
        <!-- side bar -->
        <div
          :class="[ { 'd-none': !isShow }, 'd-md-block', 'col-12', 'col-md-3', 'col-lg-2', 'side-bar', { 'open': isShow }]">
          <div class="title d-flex align-items-center justify-content-between mt-5">
            <h4 class="mb-0 ms-md-4">Categories</h4>
            <h4 class="d-md-none" @click="isShow = false"><i class="fa-solid fa-xmark opacity-50"></i></h4>
          </div>
          <!-- list group items -->
          <div class="mt-4 ms-md-4">
            <ul class="list-group list-group-flush">
                <a href="" :class="['list-group-item','bold',{'text-color' : !isClicked}]"><li style=" list-style-type: none;">All</li></a>
                <li :class="['list-group-item','bold',{'text-color' : category.isActive}]" style=" cursor: pointer;" v-for="(category,index) in categoryLists" :key="index" @click="categoryFilter(category.name,index)">{{ category.name }}</li>
            </ul>
          </div>
        </div>

        <!-- content  -->
        <div class="col-12 col-md-9 col-lg-10 content-container bg-light">

          <!-- nav bar -->
          <div class="row mt-2 p-2 content-nav align-items-center">

            <div class="col-1 ms-2 d-md-none mt-1 bolder" @click="isShow = true"><i class="fa-solid fa-bars"></i>
            </div>

            <div class=" col-3 offset-3 me-3 col-md-4 offset-md-0">
              <img src="../../public/assets/img/ngakalayLogo.png" alt="" style=" width: 100px;" class=" img-thumbnail shop-logo">
            </div>
            <div :class="['col-1','offset-3','d-md-none','mt-1','bolder',{'d-none': !isShowSearch}]" @click="isShowSearch = false"><i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <!-- search bar -->
            <div :class="[{'d-none' : !isShowSearch},'d-md-block','col-md-6','offset-md-1']">
              <div class="d-flex align-items-center justify-content-center">
                <input type="text" name="" id="" class=" form-control shadow-none" placeholder="Search..." v-model="searchKey" v-on:keyup.enter="search">
                <button class=" btn btn-sm btn-secondary ms-1 search-btn" @click="enter"><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>

            <div :class="['col-1','offset-3','d-md-none','mt-1','bolder',{'d-none': isShowSearch}]" @click="isShowSearch = true"><i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
       
          <!-- content-items -->
          <div class="text-center mt-2">
            <h1 v-if="thisCategoryName =='' ">All</h1>
            <h1 v-else>{{ thisCategoryName }}</h1>
          </div>
          <div class="items mt-2">
            <div class="row align-items-end">
              
              <div class="text-center" v-if="allPostsList.length === 0 && !isPostsListNull">
                 <h1 class="text-color">Loading...</h1>
                  <div class="loader loader--style2" title="1">
                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                      <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"/>
                      </path>
                    </svg>
                  </div>
              </div>

              <div class="text-center my-5" v-if="allPostsList.length === 0 && isPostsListNull">
                <h1 class="text-danger">Opps! Nothing Was Found!</h1>
              </div>

              <div class="col-sm-6 col-md-4 bg-white mb-2 item" v-else v-for="(post,index) in allPostsList" :key="index" >
                <div class="image-container">
                    <img :src="post.image" alt="" style=" width: 100%;">
                    <div class="img-info">
                      <h4 class="item-title">{{ post.name }}</h4>
                      <span class=" text-color">Ks-{{ post.price }}</span>
                      <h5>{{ post.brand }}</h5>
                    </div>
                </div>
              </div>

            </div>
          </div>
                
          <footer>
            <div class="container-fluid footer-container mt-4 pt-3">
              <div class="row">
                <div class="col-6 offset-4 col-md-3 offset-md-1 mt-3">
                  <h4 class="text-white">Reach Us</h4>
                  <div class="d-flex flex-column justify-content-center align-items-start">
                    <a href="https://www.facebook.com/%E1%80%84%E1%80%AB%E1%80%B8%E1%80%80%E1%80%9C%E1%80%B1%E1%80%B8-Fishing-Gear-2090894777875782/?mibextid=ZbWKwL" target="_blank" class=" me-5 text-dark social mb-1"><i class="fa-brands fa-facebook text-primary opacity-50 me-1"></i><span class="text-white">Facebook</span></a>
                    <a href="" class=" me-5 text-dark social mb-1" target="_blank"><i class="fa-brands fa-facebook-messenger text-primary opacity-50 me-1"></i><span class="text-white">Messenger</span></a>                 
                    <a href="https://www.youtube.com/@MahseerKachinState" class=" me-5 text-dark social mb-1" target="_blank"><i class="fa-brands fa-youtube social text-danger opacity-50"></i><span class="text-white">YouTube</span></a>   
                    <span class="me-5 text-dark social text-white"><i class="fa-solid fa-phone socail text-white opacity-50"></i>09&nbsp;955&nbsp;070062</span>         
                  </div>
                </div>
                <div class="col-10 offset-1 col-md-3 offset-md-1 mt-3">
                  <h4 class="text-white">Map</h4>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1515.7464126450827!2d97.39297131522967!3d25.368875261332516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x373073d6cca7f509%3A0xdc8dd3d26b994d4c!2z4YCE4YCr4YC44YCA4oCL4oCL4YCc4YCx4YC4RmlzaGluZyBHZWFy!5e0!3m2!1sen!2smm!4v1672726708632!5m2!1sen!2smm" width="100%" height="auto" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div class="col-10 offset-1 col-md-3 offset-md-1 mt-3">
                  <h4 class="text-white">Check!!</h4>
                  <iframe width="100%" height="auto" style="min-width: 420;" src="https://www.youtube.com/embed/pB17IiRCa8Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>          
              </div>
              <div class="row mt-4">
                <div class="">
                  <h4 class="text-color text-center">NgaKalay Say</h4>
                  <p class="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quas nam adipisci nisi suscipit, animi ducimus labore excepturi voluptates iure, ea soluta dolores nostrum? Quibusdam in magnam ratione ipsa quam.</p>
                </div>
              </div>
            </div>
          </footer>


        </div>
      </div>
    </section>

  </div>
</template>

<script src="../assets/js/HomeView.js"></script>
