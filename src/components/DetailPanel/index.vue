<template>
  <div class="detailpannel">
    <div>
      <div v-if="status=='node-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">模型详情</div>
        <div class="block-container">
          <el-row :gutter="10">
            <el-col :span="8">名称</el-col>
            <el-col :span="16">
              <el-input v-model="node.label"  />
            </el-col>
            <el-col :span="8">字体大小</el-col>
            <el-col :span="16">
              <el-input v-model="node.fontSize" />
            </el-col>
            <el-col :span="8">颜色</el-col>
            <el-col :span="16">
              <el-input v-model="node.color" />
            </el-col>
            <el-col :span="8">重要级别</el-col>
            <el-col :span="16">
              <el-select v-model="node.level" placeholder="">
                <el-option label="5级" value="5"></el-option>
                <el-option label="4级" value="4"></el-option>
                <el-option label="3级" value="3"></el-option>
                <el-option label="2级" value="2"></el-option>
                <el-option label="1级" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">选择设备</el-col>
            <el-col :span="16">
              <el-select v-model="node.device" placeholder="">
                <el-option label="设备1" value="5"></el-option>
                <el-option label="设备2" value="4"></el-option>
                <el-option label="设备3" value="3"></el-option>
                <el-option label="设备4" value="2"></el-option>
                <el-option label="设备5" value="1"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-button type="primary" style="margin-left:60px" @click="handleChangeName()">确定</el-button>
        </div>
      </div>
      <div v-if="status=='edge-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">模型详情</div>
        <div class="block-container">
          <el-row :gutter="10">
            <el-col :span="8">名称</el-col>
            <el-col :span="16">
              <el-input v-model="node.label"  />
            </el-col>
            <el-col :span="8">字体大小</el-col>
            <el-col :span="16">
              <el-input v-model="node.fontSize" />
            </el-col>
            <el-col :span="8">文本颜色</el-col>
            <el-col :span="16">
              <el-input v-model="node.color" />
            </el-col>
            <el-col :span="8">线宽</el-col>
            <el-col :span="16">
              <el-input v-model="node.lineWidth" />
            </el-col>
            <el-col :span="8">线颜色</el-col>
            <el-col :span="16">
              <el-input v-model="node.lineColor" />
            </el-col>
            <el-col :span="8">动态效果</el-col>
            <el-col :span="16">
              <el-switch v-model="node.dynamic"></el-switch>
            </el-col>
            <el-col :span="8">重要级别</el-col>
            <el-col :span="16">
              <el-select v-model="node.level" placeholder="">
                <el-option label="5级" value="5"></el-option>
                <el-option label="4级" value="4"></el-option>
                <el-option label="3级" value="3"></el-option>
                <el-option label="2级" value="2"></el-option>
                <el-option label="1级" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">选择关联</el-col>
            <el-col :span="16">
              <el-select v-model="node.level" placeholder="">
                <el-option label="逻辑线" value="logic"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">监测点1</el-col>
            <el-col :span="16">
              <el-select v-model="node.device1" placeholder="">
                <el-option label="设备1" value="5"></el-option>
                <el-option label="设备2" value="4"></el-option>
                <el-option label="设备3" value="3"></el-option>
                <el-option label="设备4" value="2"></el-option>
                <el-option label="设备5" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">监测点2</el-col>
            <el-col :span="16">
              <el-select v-model="node.device2" placeholder="">
                <el-option label="设备1" value="5"></el-option>
                <el-option label="设备2" value="4"></el-option>
                <el-option label="设备3" value="3"></el-option>
                <el-option label="设备4" value="2"></el-option>
                <el-option label="设备5" value="1"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-button type="primary" style="margin-left:60px" @click="handleChangeName()">确定</el-button>
        </div>
      </div>
      <div v-if="status==='canvas-selected'" class="pannel" id="canvas_detailpannel">
        <div class="pannel-title">画布</div>
        <div class="block-container">
          <el-checkbox v-model="showGrid" @change="changeGridState">网格对齐</el-checkbox>
        </div>
      </div>
      <!-- <div v-if="status==='group-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">群组详情</div>
        <div class="block-container">
          <div class="p">
            名称：
            <el-input v-model="name" />
          </div>
          <div class="p">
            任意属性：
            <el-input v-model="color" />
          </div>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import Grid from "@antv/g6/build/grid";
export default {
  data() {
    return {
      status: "canvas-selected",
      showGrid: false,
      page: {},
      graph: {},
      item: {},
      node: {},
      grid: null
    };
  },
  created() {
    this.init();
    this.bindEvent();
  },
  methods: {
    init() {
      this.node.fontSize = '12px arial, sans-serif, 文本字体';
      this.node.color = '#eee';
      this.node.level =5;
      this.node.device = 5
    },
    bindEvent() {
      let self = this;
      eventBus.$on("afterAddPage", page => {
        self.page = page;
        self.graph = self.page.graph;
        eventBus.$on("nodeselectchange", item => {
          if (item.select === true && item.target.getType() === "node") {
            self.status = "node-selected";
            self.item = item.target;
            self.node = item.target.getModel();
            self.node.fontSize = '12px arial, sans-serif, 文本字体';
            self.node.color = '#eee';
            self.node.level =5;
            self.node.device = 5
          } else if(item.select === true && item.target.getType() === "edge"){
            self.status = "edge-selected";
            self.item = item.target;
            self.node = item.target.getModel();
            self.node.fontSize = '12px arial, sans-serif, 文本字体';
            self.node.color = '#eee';
            self.node.level =4;
            self.node.device1 = 3
            self.node.device2 = 5
          } else {
            self.status = "canvas-selected";
            self.item = null;
            self.node = null;
          }
        });
      });
    },
    handleChangeName(e) {
      const model = {
        label: e
      };

      this.graph.update(this.item, model);
    },
    changeGridState(value) {
      if (value) {
        this.grid = new Grid();
        this.graph.addPlugin(this.grid);
      } else {
        this.graph.removePlugin(this.grid);
      }
    }
  }
};
</script>

<style scoped>
.detailpannel {
  height: 100%;
  position: absolute;
  right: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  border-left: 1px solid #e6e9ed;
}
.detailpannel .block-container {
  padding: 16px 8px;
}
.block-container .el-col {
  height: 28px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.pannel-title {
  height: 32px;
  border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8;
  background: #ebeef2;
  color: #000;
  line-height: 28px;
  padding-left: 12px;
}
</style>
