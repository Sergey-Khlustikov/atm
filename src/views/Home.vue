<template>
  <div class="row align-items-center">
    <div class="col-md-6">
      <app-form />
    </div>
    <div class="col-md-6">
      <atm-info />
    </div>
  </div>
</template>

<script>
import appForm from '@/components/Form'
import AtmInfo from '@/components/AtmInfo'
export default {
  name: 'Home',
  components: {
    appForm, AtmInfo
  }
}
</script>

<style scoped>

</style>
