<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;"></div>
  </div>
</template>


<script>
import G6 from "@antv/g6/build/g6";
import { initBehavors } from "@/behavior";
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
    });
  },
  methods: {
    init() {
      const height =  this.height - 92 
      const width =  this.width - 400

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
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          moveNode:[ "drag-item"],
          changeNodeSize: ['adjust-item-size']
        }
      });
      const { editor, command } = this.$parent;
      editor.emit("afterAddPage", { graph: this.graph, command });

      this.readData();
    },
    readData() {
      const { editor } = this.$parent;
/*       var url = '/topology/api/' + editor.tPageId + '.json';
      axios.get(url).then((res) => {
        let data = res.data;
        if (data) {
          this.graph.read(data);
        }
      }) */
      let pages = JSON.parse(window.localStorage.getItem('tpages'));
        let data = pages.length>0&&pages.filter(item=>item.page_id == editor.tPageId)[0];
        this.graph.read(data.data);
    }
  }
};
</script>

<style scoped>
.page{
  margin-left:200px;
  margin-right: 200px;
}
.node-event-demo  .header {
    font-size: 14px;
    margin: 10px 0;
  }
  .graph-tooltip {
    display: none;
  }

</style>