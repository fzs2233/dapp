<template>
  <h1>账户信息：</h1>
  <el-divider />
  <p>账户地址：0xB94b84de351711686B2E6Da78fB9bA245d68c357</p>
  <p>账户私钥：{{ privateKeyShow }}</p>
  <p>余额：{{ mount }}</p>
  <el-divider />
  <h1>转账操作</h1>
  <el-button type="primary" @click="send">转账</el-button>
</template>

<script setup>
// import { ref } from 'vue'
import { ref } from 'vue'
import Web3 from 'web3'
import Tx from 'ethereumjs-tx'
import { Buffer } from 'buffer'
// import { signTransaction } from 'web3/lib/commonjs/eth.exports'

// 实例化Web3
var web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545')
// const account = web3.eth.accounts.create('123456')
// console.log(account)
// console.log(account.address)
// console.log(account.privateKey)
// console.log(web3.eth.getBalance(account.address))
const address = ref('0xB94b84de351711686B2E6Da78fB9bA245d68c357')
const privateKeyShow = ref('0fda72450b100f19238c6aab37a9ad619bea45cc874808842d458798787d0e7c')
console.log(privateKeyShow.value)
const mount = ref(0)
web3.eth.getBalance(address.value).then((res) => {
  mount.value = web3.utils.fromWei(res, 'ether')
})
console.log(mount.value)
const send = async () => {
  const nonce = Number(await web3.eth.getTransactionCount(address.value))
  // console.log(nonce)
  const gasPrice = Number(await web3.eth.getGasPrice())
  const value = web3.utils.toWei('0.1', 'ether')
  // console.log(value)
  const rawTx = {
    from: address.value,
    to: '0x80F3166f7626aFA1edA03606218993Fb9d372bF3',
    nonce,
    gasPrice,
    value,
    data: '0x0000',
  }
  const privateKey = Buffer(privateKeyShow.value, 'hex')
  // console.log(privateKey)
  const gas = Number(await web3.eth.estimateGas(rawTx))
  rawTx.gas = gas
  // ethereumjs-tx 实现私钥加密
  const tx = new Tx(rawTx)
  tx.sign(privateKey)
  const serializedTx = '0x' + tx.serialize().toString('hex')
  // console.log(serializedTx)

  // 开始转账
  const trans = web3.eth.sendSignedTransaction(serializedTx)
  trans.on('transactionHash', async (txid) => {
    console.log('交易ID', txid)
    const transaction = await web3.eth.getTransaction(txid)
    console.log(`Transaction Details:`, transaction)
  })

  trans.on('receipt', (receipt) => {
    console.log('Receipt:', receipt)
  })

  trans.on('confirmation', (confirmationNumber, receipt) => {
    console.log('confirmationNumber:', confirmationNumber)
    console.log('receipt:', receipt)
  })
}
</script>

<style lang="scss" scoped></style>
