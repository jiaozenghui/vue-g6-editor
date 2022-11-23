<template>
      <G6Editor mode="edit">
  
      </G6Editor>
  </template>
  
  <script>
  import G6Editor from '@/components/G6Editor'
  export default {
    name: 'editor',
    components:{G6Editor}
  }
  </script>
  
  <style>
  html, body {
      overflow: hidden;
      margin: 0;
      font-size: 12px;
  }
  #app{
    margin: 0;
    padding: 0;
  }
  .el-card__body {
  padding: 6px;
}
  </style>
  