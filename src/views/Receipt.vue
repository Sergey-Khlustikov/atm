<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Ваш чек</h5>
      <h6 class="card-subtitle mb-2 text-muted">Благодарим за доверие!</h6>
      <p class="card-text">Номинал: {{ receipt.faceValue }} {{ currency }}</p>
      <p class="card-text">Сумма: {{ receipt.sum }} {{ currency }}</p>
      <router-link :to="{ name: 'home' }" class="card-link">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Receipt',
  data () {
    return {
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      currency: 'currency'
    }),
    receipt () {
      return this.$store.getters.getReceipt(this.$route.params.id)
    }
  },
  created () {
    if (!this.receipt) {
      this.$router.push({ name: 'home' })
    }
    console.log(this.$router)
    this.interval = setInterval(() => this.$router.push({ name: 'home' }), 5000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>

</style>
