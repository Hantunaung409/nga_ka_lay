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
        <div class="col-12 col-md-9 col-lg-10 content-container ">

          <!-- nav bar -->
          <div class="row p-2 content-nav align-items-center">

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
                <button class=" btn btn-sm btn-secondary ms-1 search-btn" @click="search"><i class="fa-solid fa-magnifying-glass"></i></button>
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
          <div class="items mt-2 mx-2 mx-md-4">
            <div class="row align-items-end">
              
              <div class="text-center mt-5" v-if="allPostsList.length === 0 && !isPostsListNull">
                <LoadingSpinner></LoadingSpinner>
              </div>

              <div class="text-center my-5" v-if=" isPostsListNull">
                <h1 class="text-danger">Opps!There is no reslut for "{{ thisCategoryName }}"</h1>
              </div>

              <div class="col-12 col-sm-6 col-md-4 col-lg-3 bg-white mb-5 item" v-else v-for="(post,index) in allPostsList.data" :key="index" >
                <div class="image-container border">
                    <img :src="post.image" alt="" style=" width: 100%;">
                    <div class="img-info">
                      <div class="item-title">{{ post.name }}</div>
                      <span class="item-price text-color">Ks-{{ post.price }}</span>
                      <div class="item-brand opacity-75">{{ post.brand }}</div>
                      <router-link :to="{name : 'detail', params:{ postId: post.id}}" v-if="post.count != 0" @click="scrollToTopWhenClicked()"><div class="text-center mt-3"><button class="btn btn-sm btn-outline-secondary text-black">View Details</button></div></router-link>
                      <div class="text-center mt-3" style="cursor:not-allowed" v-if="post.count == 0"><button class="btn btn-sm btn-outline-secondary" disabled>Out of stock</button></div>
                    </div>
                </div>
              </div>

            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center mt-5">
            <Bootstrap5Pagination :data="allPostsList"  @pagination-change-page="getAllPosts" size="large"/>
          </div>

         <FooterSection></FooterSection>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="../assets/js/HomeView.js"></script>
