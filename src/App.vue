<template>
  <div id="app">
    <div class="container">
      <ul class="nav nav-tabs pt-5">
        <router-link active-class="active" exact tag="li" class="nav-item" :to="{ name: 'home' }">
          <a class="nav-link" href="#">Главная страница</a>
        </router-link>
        <router-link active-class="active" v-if="atmHistory.length" tag="li" class="nav-item" :to="{ name: 'atmHistory' }">
          <a class="nav-link" href="#">История обналичивания</a>
        </router-link>
      </ul>
      <div class="router d-flex flex-column justify-content-center align-items-center">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <notifications group="alert" />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    atmHistory () {
      return this.$store.getters.cashOutHistory
    }
  }
}
</script>

<style lang="scss">
  #app {
    background: floralwhite;
    min-height: 100vh;
  }
  .navigation {
    padding: 10px 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .router {
    margin-top: 100px;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .nav-tabs .active .nav-link {
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
