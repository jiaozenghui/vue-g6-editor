<template>
    <div id="mountNode" :style="{width:width}">
      <div class="editor" >
        <t-page-bar :pageMode="'view'"></t-page-bar>
        <div class="bottom-container">
          <!--itempannel-->
          <!--detailpannel-->

          <!--miniMap-->
          <minimap />
          <!--page-->
          <page-view :height="height" :width="width"  :data="data" />
        </div>
      </div>
      <Flow />
    </div>
  </template>
  
  <script>
  import TPageBar from "../TPageBar";
  import Minimap from "../Minimap";
  import PageView from "../PageView";
  import Flow from "../Flow"
  import Editor from "@/components/Base/Editor";
  import command from "@/command";
  
  export default {
    name: "G6Chart",
    components: {
      TPageBar,
      Minimap,
      PageView,
      Flow
    },
    props: {
      height: {
        type: Number,
        default: document.documentElement.clientHeight
      },
      width: {
        type: Number,
        default: document.documentElement.clientWidth
      },
      data: {
        type: Object,
        default: () => {
          
        }
      },
      tPageId: {
        type: String,
        default: ''
      }
    },
    created() {
      this.init();
    },
    data() {
      return {
        editor: {},
        command: null
      };
    },
    methods: {
      init() {
        this.editor = new Editor();
        this.command = new command(this.editor);
      }
    }
  };
  </script>
  
  <style scoped>
  .editor {
    position: relative;
    width: 100%;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .bottom-container {
    position: relative;
  }
  </style>