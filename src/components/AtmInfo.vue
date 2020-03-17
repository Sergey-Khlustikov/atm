<template>
  <div>
    <p class="alert alert-dark font-weight-bold text-center">В банкомате: {{ atmTotal }} {{ currency }}</p>
    <table class="table table-dark">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Номинал</th>
        <th scope="col">Остаток</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) of faceValues" :key="item.amount">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ item.amount }} {{ currency }}</td>
        <td>{{ item.left }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AtmInfo',
  computed: {
    ...mapGetters({
      atmTotal: 'atmTotal',
      faceValues: 'faceValues',
      currency: 'currency'
    })
  }
}
</script>

<style scoped>

</style>
