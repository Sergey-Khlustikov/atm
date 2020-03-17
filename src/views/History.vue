<template>
  <p v-if="!cashOutHistory.length">Вы еще не снимали средства</p>
  <table v-else class="table">
    <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Дата</th>
      <th scope="col">Сумма</th>
      <th scope="col">Номинал</th>
      <th scope="col" />
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, i) of cashOutHistory" :key="i">
      <th scope="row">{{ i + 1 }}</th>
      <td>{{ item.date }}</td>
      <td>{{ item.sum }} {{ currency }}</td>
      <td>{{ item.faceValue }} {{ currency }}</td>
      <td><router-link :to="`/receipt/${item.id}`">Посмотреть чек</router-link></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AtmHistory',
  computed: {
    ...mapGetters({
      currency: 'currency',
      cashOutHistory: 'cashOutHistory'
    })
  }
}
</script>

<style scoped>

</style>
