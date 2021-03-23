<template>
  <div class="home-container">
    <div class="header common-space">
      <div class="left">
        
      </div>
      <div class="right">
        <p class="username">{{ userName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  padding: 0 80px;
  & > .header {
    height: 80px;
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>