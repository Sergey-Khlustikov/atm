<template>
  <form @submit.prevent="submitHandler">
    <div>
      <p>1. Выберите номинал</p>
      <p class="alert alert-danger" v-if="errFaceValue">Выберите, пожалуйста, номинал</p>
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label
          v-for="item of faceValues"
          :key="item.amount"
          class="btn btn-secondary"
          :class="{ disabled: item.left <= 0, active: item.amount === checkedFaceValue }"
        >
          <input
            type="radio"
            name="values"
            :id="`val${item.amount}`"
            :value="item.amount"
            autocomplete="off"
            v-model="checkedFaceValue"
          >
          {{ item.amount }} {{ currency }}
        </label>
      </div>
    </div>
    <div class="form-group mt-4">
      <label for="amount">2. Введите сумму</label>
      <input type="text" class="form-control" :class="{ 'is-invalid': errSum }" id="amount" v-model.number.trim="sum">
      <div class="invalid-feedback" v-if="errSum">
        {{ $v.sum.$params.minValue.min > sum ?
        `Минимальное значение - ${$v.sum.$params.minValue.min}` :
        'Введите валидное значение' }}
      </div>
    </div>
    <button type="submit" class="btn btn-secondary btn-lg btn-block">
      <div v-if="loading" class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span v-else>Снять</span>
    </button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'Form',
  data () {
    return {
      checkedFaceValue: null,
      sum: null
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      currency: 'currency',
      faceValues: 'faceValues',
      atmTotal: 'atmTotal'
    }),
    errFaceValue () {
      return this.$v.checkedFaceValue.$error
    },
    errSum () {
      return this.$v.sum.$error
    }
  },
  methods: {
    ...mapActions({
      cashOut: 'cashOut'
    }),
    submitHandler () {
      const fV = this.faceValues.find(item => item.amount === this.checkedFaceValue)
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      } else if (this.atmTotal < this.sum) {
        this.$notify({
          group: 'alert',
          title: 'В банкомате недостаточно средств'
        })
        return
      } else if (this.sum / this.checkedFaceValue > fV.left) {
        this.$notify({
          group: 'alert',
          title: 'Недостаточно купюр'
        })
        return
      } else if (this.sum % this.checkedFaceValue) {
        this.$notify({
          group: 'alert',
          title: `Введите число кратное ${this.checkedFaceValue}`
        })
        return
      }
      const date = new Date().toLocaleString('ru',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      const formData = {
        faceValue: this.checkedFaceValue,
        sum: this.sum,
        date: date,
        id: '_' + Math.random().toString(36).substr(2, 9)
      }
      this.cashOut(formData)
    }
  },
  validations () {
    return {
      checkedFaceValue: { required },
      sum: { required, minValue: minValue(this.checkedFaceValue || 10) }
    }
  }
}
</script>

<style scoped>

</style>
