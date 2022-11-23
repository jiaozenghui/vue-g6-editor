<template>

  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>设备</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-row :gutter="10">
          <el-col :span="8"
            v-for="(item,index) in list"
            :key="index"

          >
            <div class="getItem"
              :data-shape="item.shape"
              :data-type="item.type"
              :data-size="item.size"
              draggable
              @dragstart="handleDragstart"
              @dragend="handleDragEnd($event,item)"

            
            >
              <span class="pannel-type-icon" :style="{'background-image':'url('+item.backImage+')'}"></span>
              <div style="text-align: center; ">{{item.node_type}}</div>
            </div>
          </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import okSvg from "@/assets/icons/ok.svg";
import bgImg from "@/assets/bg.jpg";
import sub4Svg from "@/assets/icons/sub4-green.svg";
import companySvg from "@/assets/icons/company-green.svg";
import acSvg from "@/assets/icons/ac-green.svg";
import agentserverSvg from "@/assets/icons/agentserver-green.svg";
import appserverSvg from "@/assets/icons/appserver-green.svg";
import clientSvg from "@/assets/icons/client-green.svg";

export default {
  data() {
    return {
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      list: [
        {
          name: "数据中心",
          node_type: 'datacenter',
          label: "数据中心",
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          sub4Svg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],

        },

        {
          name: "城市",
          label: "城市",
          node_type: 'componany',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          companySvg,
          stateImage: okSvg,
          //backImage: companySvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingStart: true,
        },
        {
          name: "AC",
          label: "AC",
          node_type: 'AC',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          acSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]],
          isDoingEnd: true
        },
        {
          name: "agent服务器",
          label: "服务器",
          node_type: 'agent',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          agentserverSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "app服务器",
          label: "app服务器",
          node_type: 'app',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          appserverSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingStart: true,
        },
        {
          name: "客户端",
          label: "客户端",
          node_type: 'client',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          clientSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        }
      ]
    };
  },
  created() {
    this.bindEvent();
  },
  methods: {
    handleDragstart(e) {
      
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
    },
    handleDragEnd(e, item) {
      
      let data = {};
      Object.assign(data, item);
      data.offsetX = this.offsetX;
      data.offsetY = this.offsetY;
      if (this.page) {
        const graph = this.page.graph;
        // const size = e.target.dataset.size.split("*");
        const xy = graph.getPointByClient(e.x, e.y);
        data.x = xy.x;
        data.y = xy.y;
        //data.size = item.size.split("*");
        data.width = item.width;
        data.height = item.height;
        data.type = "node";
        this.command.executeCommand("add", [data]);
      }
    },
    bindEvent() {
      eventBus.$on("afterAddPage", page => {
        this.page = page;
        this.command = page.command;
      });
    }
  }
};
</script>

<style scoped>
.el-col-8 {
  text-align: center;
  margin-bottom: 10px
}
.itempannel {
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  padding-top: 8px;
  border-right: 1px solid #e6e9ed;
}
.itempannel ul {
  padding: 0px;
  padding-left: 16px;
}
.itempannel li {
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  width: 160px;
  height: 28px;
  line-height: 26px;
  padding-left: 8px;
  border: 1px solid rgba(0, 0, 0, 0);
  list-style-type: none;
}
.itempannel li:hover {
  background: white;
  border: 1px solid #ced4d9;
  cursor: move;
}

.itempannel .pannel-type-icon {
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;
  background-size: cover;

}
.itempannel .pannel-type-icon:hover {
  outline: 1px dashed #83C2AA;
  cursor: move;
}
</style>