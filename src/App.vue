<template>
  <router-view/>
</template>

<script>

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app, html, body {
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #141617;
}
* {
  box-sizing: border-box;
}
#app, html, body, p, div, ul, li {
  margin: 0;
  padding: 0;
}
ul, li {
  list-style: none;
}
p.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
div, p, li, h1, h2, h3, h4, h5, h6 {
  user-select: none;
}
</style>