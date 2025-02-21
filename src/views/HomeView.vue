<script setup>
import { ref } from 'vue'
import Web3 from 'web3'
const string = ref('hello web3')

var web3 = new Web3(Web3.givenProvider || '')
</script>

<template>
  <main>
    <h1>{{ string }}</h1>
    <el-button type="primary">转账</el-button>
  </main>
</template>

<style scoped lang="less">
h1 {
  color: red;
}
</style>
