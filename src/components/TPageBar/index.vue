<template>
    <div class="toolbar">
      <el-select v-model="tPageId" @change="changeTpage($event)" placeholder="请选择">
        <el-option
          v-for="item in tpages"
          :key="item.id"
          :label="item.properties.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button class="add-btn" @click="showModal('add')" v-if="pageMode =='edit'" type="primary">添加</el-button>
      <el-button class="add-btn" @click="showModal('edit')" v-if="pageMode =='edit'" type="primary">编辑</el-button>
      <el-button @click="deletePage()" v-if="pageMode =='edit'"  type="danger">删除</el-button>
      <el-dialog
                title="添加"
                :visible.sync="dialogVisible"
                @closed="hideModal()"
                width="30%"
                >
                <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="自动刷新">
            <el-switch
              v-model="form.auto_fresh">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="form.auto_fresh" label="刷新时间">
            <el-input v-model="form.fresh_time"></el-input>
          </el-form-item>
<!--           <el-form-item label="背景图片">
            <el-input v-model="form.bg_img"></el-input>
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-input v-model="form.bg_color"></el-input>
          </el-form-item>
          <el-form-item label="状态表达方式">
            <el-select v-model="form.status_type" placeholder="">
              <el-option label="颜色" value="color"></el-option>
              <el-option label="气泡" value="bubble"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="显示流量">
            <el-switch
              v-model="form.display_flow">
            </el-switch>
          </el-form-item>
          <el-form-item label="显示告警">
            <el-switch
              v-model="form.display_alert">
            </el-switch>
          </el-form-item>
<!--           <el-form-item>
            <el-button type="primary" @click="SavePage()">立即创建</el-button>
            <el-button @click="hideModal()">取消</el-button>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false;">取消</el-button>
          <el-button type="primary" @click="SavePage()">提交</el-button>
            
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import eventBus from "@/utils/eventBus";
  import pageService from './../../utils/pageService'
  export default {
    props: {
      pageMode: '',
    },
    data() {
        return {
        tpages: [],
        tPageId: '',
        dialogVisible: false,
        optType: 'add',
        form: {
          name: '',
          fresh_time: '',
          display_flow: 'no',
          display_alert: 'no'
        }
      }
    },
    created() {
      this.init();
      this.bindEvent();
    },
    watch: {
    },
    methods: {
      init() {
        const { editor, command } = this.$parent;
        this.editor = editor;
        this.command = command;
        this.getGraphs();
      },
      bindEvent() {
        let self = this;
        eventBus.$on("afterAddPage", page => {
          self.page = page;
          self.graph = self.page.graph;
          
          if (self.tpages&&self.tpages.length >0) {
            this.changeData(this.tpages[0].properties.layout)
          }
        });
      },
      changeTpage(e) {
        this.editor.tPageId = e;
        pageService.getGraphDetail(e).then((res)=>{
          let data = res.data;
          
          if (data.Result) {
            let resData = data.Data;
            this.editor.tPage = JSON.parse(JSON.stringify(resData))
            this.changeData(resData.properties.layout);
          }
        })  
      },
      changeData(data) {
        this.editor.graph.read(data?data:{'nodes': []});
      },
      getGraphs() {
        pageService.getGraphs().then((res)=>{
          let data = res.data;
          if (data.Result) {
            let resData = data.Data;
            this.tpages = resData.graphs;
          }
        }).finally(()=>{
          if (this.tpages&&this.tpages.length >0) {
            this.tPageId = this.tpages[0].id;
            this.editor.tPageId = this.tPageId;
            this.editor.tPage =JSON.parse(JSON.stringify(this.tpages[0]));
            //this.changeTpage(this.tPageId);
            
            this.graph&&this.changeData(this.tpages[0].properties.layout);
          }
        });
      },
      SavePage() {
        this.dialogVisible = false;
        if (this.optType == 'add') {
          let newGraph = {
            properties:{
              ...this.form,
              layout:{'nodes': []}
            }
          };
          pageService.addGraph(newGraph).then((res)=>{
            let resData = res.data;
            if (resData.Result) {
              this.tPageId = resData.Data.id;
              this.editor.tPageId = this.tPageId;
              this.tpages.push({
                id: this.tPageId,
                ...newGraph
              });
              this.changeData();
            }
          });
        } else {
          let params = {
            properties:{
              ...this.editor.tPage.properties, ...this.form
            }
          };
          delete params.id;
          pageService.updateGraph(this.editor.tPageId, params).then(res=>{
            let resData = res.data;
            if (resData.Result) {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
              this.tpages.forEach(element => {
                if (element.id == this.tPageId) {
                  element.properties = params.properties
                  this.editor.tPage.properties = params.properties;
                }
              });
              
            }
          });
        }
      },
      deletePage() {
        pageService.removeGraph(this.tPageId).then(res=>{
          let data = res.data;
          if (data.Result) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getGraphs();
          }
        });
      },
      showModal(type) {
        this.optType = type
        this.dialogVisible = true;
        var showdiv=document.createElement('div');

        showdiv.setAttribute('id','topdiv');

        showdiv.setAttribute("style",'display:block;position:absolute;z-index:99;width:100vw;height:100vh; left:0; top:0;overflow: auto; opacity: .5;background: #000;');

        window.parent.document.body.appendChild(showdiv);
        if (type == 'add') {
          this.form ={
            name: '',
            fresh_time: '',
            display_flow: 'no',
            display_alert: 'no'
          }
        } else {
          this.form = {
            ...this.editor.tPage.properties
          }
        }

      },
      hideModal() {
        window.parent.document.getElementById('topdiv').style.display ='none';
        window.parent.document.body.removeChild(window.parent.document.getElementById('topdiv'));       
      }
    }
  };
  </script>
  
  
  <style >
  .toolbar {
    box-sizing: border-box;
/*     padding: 8px 0px; */
    width: 100%;
    border: 1px solid #e9e9e9;
    height: 59px;
    line-height: 59px;
    z-index: 3;
    box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);

  }
  .el-input--mini .el-input__inner {
    height: 34px;
    line-height: 34px;
    font-size: 14px;
  }
  .toolbar .el-button {
    height: 32px;
    line-height: 18px;
  }
  .toolbar .add-btn{
    margin-left: 10px;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
  .el-form-item__label {
    text-align: left;
  }
  </style>