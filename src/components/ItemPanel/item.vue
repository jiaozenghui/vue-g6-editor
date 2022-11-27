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
              <div style="text-align: center; overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;">{{item.node_type}}</div>
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
import sub4alertSvg from "@/assets/icons/sub4-red.svg";
import companySvg from "@/assets/icons/company-green.svg";
import companyAlertSvg from "@/assets/icons/company-red.svg";
import companyWarnSvg from "@/assets/icons/company-yellow.svg";
import acSvg from "@/assets/icons/ac-green.svg";
import agentserverSvg from "@/assets/icons/agentserver-green.svg";
import appserverSvg from "@/assets/icons/appserver-green.svg";
import clientSvg from "@/assets/icons/client-green.svg";

import cloudSvg from "@/assets/icons/cloud-green.svg";
import dataSvg from "@/assets/icons/data-green.svg";
import databaseSvg from "@/assets/icons/database-green.svg";
import dirSvg from "@/assets/icons/dir-green.svg";
import dnsSvg from "@/assets/icons/dns-green.svg";
import firewallSvg from "@/assets/icons/firewall-green.svg";
import hubSvg from "@/assets/icons/hub-green.svg";
import loadbalanceSvg from "@/assets/icons/loadbalance-green.svg";
import mailserverSvg from "@/assets/icons/mailserver-green.svg";
import pingSvg from "@/assets/icons/ping-green.svg";
import routerSvg from "@/assets/icons/router-green.svg";
import routerWarnSvg from "@/assets/icons/router-yellow.svg";
import routerAlertSvg from "@/assets/icons/router-red.svg";

import routerHubSvg from "@/assets/icons/router-hub-green.svg";
import routerHubWarnSvg from "@/assets/icons/router-hub-yellow.svg";
import routerHubAlertSvg from "@/assets/icons/router-hub-red.svg";

import routerwallblueSvg from "@/assets/icons/routerwallblue-green.svg";
import serverSvg from "@/assets/icons/server-green.svg";

import storageSvg from "@/assets/icons/storage-green.svg";
import sublogicSvg from "@/assets/icons/sublogic-green.svg";

import switch1Svg from "@/assets/icons/switch1-green.svg";
import switch1AlertSvg from "@/assets/icons/switch1-red.svg";

import switch2Svg from "@/assets/icons/switch2-green.svg";
import switch3Svg from "@/assets/icons/switch3-green.svg";
import switch7blueSvg from "@/assets/icons/switch7blue-green.svg";
import urlSvg from "@/assets/icons/url-green.svg";

import urlblueSvg from "@/assets/icons/urlblue-green.svg";
import vcenterSvg from "@/assets/icons/vcenter-green.svg";
import vesselSvg from "@/assets/icons/vessel-green.svg";
import vpnSvg from "@/assets/icons/vpn-green.svg";
import webserverSvg from "@/assets/icons/webserver-green.svg";


export default {
  data() {
    return {
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      list: [
        {
          name: "datacenter",
          node_type: 'datacenter',
          label: "datacenter",
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          sub4Svg,
          alert: sub4alertSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],

        },

        {
          name: "componany",
          label: "componany",
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
          warn: companyWarnSvg,
          alert:companyAlertSvg,
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
          name: "agent",
          label: "agent",
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
          name: "app server",
          label: "app server",
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
          name: "client",
          label: "client",
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
        },
        {
          name: "cloud",
          label: "cloud",
          node_type: 'cloud',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          cloudSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },

        {
          name: "data",
          label: "data",
          node_type: 'data',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          dataSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "database",
          label: "database",
          node_type: 'database',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          databaseSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "dir",
          label: "dir",
          node_type: 'dir',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          dirSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "dns",
          label: "dns",
          node_type: 'dns',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          dnsSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "firewall",
          label: "firewall",
          node_type: 'firewall',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          firewallSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "hub",
          label: "hub",
          node_type: 'hub',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          hubSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "loadbalance",
          label: "loadbalance",
          node_type: 'loadbalance',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          loadbalanceSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "mailserver",
          label: "mailserver",
          node_type: 'mailserver',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          mailserverSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "ping",
          label: "ping",
          node_type: 'ping',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          pingSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "router",
          label: "router",
          node_type: 'router',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          routerSvg,
          stateImage: okSvg,
          warn: routerWarnSvg,
          alert:routerAlertSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "routerwallblue",
          label: "routerwallblue",
          node_type: 'routerwallblue',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          routerwallblueSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "router-hub",
          label: "router-hub",
          node_type: 'routerHub',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          routerHubSvg,
          warn: routerHubWarnSvg,
          alert:routerHubAlertSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "server",
          label: "server",
          node_type: 'server',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          serverSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "storage",
          label: "storage",
          node_type: 'storage',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          storageSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "sublogic",
          label: "sublogic",
          node_type: 'sublogic',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          sublogicSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },

        
        {
          name: "switch1",
          label: "switch1",
          node_type: 'switch1',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          switch1Svg,
          alert:switch1AlertSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "switch2",
          label: "switch2",
          node_type: 'switch2',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          switch2Svg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "switch3",
          label: "switch3",
          node_type: 'switch3',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          switch3Svg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "switch7blue",
          label: "switch7blue",
          node_type: 'switch7blue',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          switch7blueSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "url",
          label: "url",
          node_type: 'url',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          urlSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "urlblue",
          label: "urlblue",
          node_type: 'urlblue',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          urlblueSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "vcenter",
          label: "vcenter",
          node_type: 'vcenter',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          vcenterSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "vessel",
          label: "vessel",
          node_type: 'vessel',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          vesselSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "vpn",
          label: "vpn",
          node_type: 'vpn',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          vpnSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
        {
          name: "webserver",
          label: "webserver",
          node_type: 'webserver',
          width: 40,
          height: 40,
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          backImage:
          webserverSvg,
          stateImage: okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]],
          isDoingEnd: true
        },
      ],
      index:0
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
        const nodes = graph.findAll('node', node => {
          return true;
        });
        data['node_id'] = nodes.length;
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