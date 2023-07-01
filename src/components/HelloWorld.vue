<template>
  <div class="hello">
    <p>{{ count }}</p>
    <button @click="counterStore.add">Click me</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/store'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)

function test() {
  console.log(test)
}
test()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
