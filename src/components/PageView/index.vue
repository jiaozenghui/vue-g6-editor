<template>
    <div class="page">
      <div :id="pageId" class="graph-container" style="position: relative;"></div>
    </div>
  </template>
  
  
  <script>
  import G6 from "@antv/g6/build/g6";
  import { initBehavors } from "@/behavior";
  import eventBus from "@/utils/eventBus";
  import axios from "axios";
  export default {
    data() {
      return {
        pageId: "graph-container",
        graph: null
      };
    },
    props: {
      height: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 0
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    created() {
      initBehavors();
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
        this.bindEvent();
      });
    },
    methods: {
      init() {
        const height =  this.height -60;
        const width =  this.width;
  
        this.graph = new G6.Graph({
          container: "graph-container",
          height: height,
          width: width,
          modes: {
            // 支持的 behavior
            default: [
              "drag-canvas",
              "zoom-canvas",
              "hover-node",
              "select-node",
              "hover-edge",
              "keyboard",
              "customer-events",
              "add-menu"
            ],
            //mulitSelect: ["mulit-select"],
            //addEdge: ["add-edge"],
            moveNode:[ "drag-item"]
          }
        });
        const { editor, command } = this.$parent;
        editor.emit("afterAddPage", { graph: this.graph, command });
  
        //this.readData();
      },
      bindEvent() {
        const { command } = this.$parent;
        eventBus.$on("updateItem", item => {
            command.executeCommand("update", [item]);
        });
        eventBus.$on("addItem", item => {
            command.executeCommand("add", [item]);
        });
    },
    readData() {
/*         const { editor } = this.$parent;
        var url = '/topology/api/' + editor.tPageId + '.json';
        axios.get(url).then((res) => {
          let data = res.data;
          if (data) {
            this.graph.read(data);
          }
        }) */
        const { editor } = this.$parent;
        let pages = JSON.parse(window.localStorage.getItem('tpages'));
        let data = pages.filter(item=>item.page_id == editor.tPageId)[0].data;
        this.graph.read(data);

      }
    }
  };
  </script>
  
  <style >
  #graph-container canvas {
    border: 1px solid #ccc;
  }
  .node-event-demo  .header {
    font-size: 14px;
    margin: 10px 0;
  }
  .graph-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    position: absolute
  }
  .graph-tooltip p{
    line-height: 20px;
    padding: 0;
    margin: 0;
  }
  </style>