<template>
    <div class="toolbar">
      <el-select v-model="tPageId" @change="changeTpage($event)" placeholder="请选择">
        <el-option
          v-for="item in tpages"
          :key="item.page_id"
          :label="item.name"
          :value="item.page_id">
        </el-option>
      </el-select>
      <el-button @click="showModal()" v-if="pageMode =='edit'" type="primary">添加</el-button>
      <el-dialog
                title="添加"
                :visible.sync="dialogVisible"
                width="30%"
                >
                <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="刷新时间">
            <el-input v-model="form.fresh_time"></el-input>
          </el-form-item>
          <el-form-item label="背景图片">
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
          </el-form-item>
          <el-form-item label="是否显示流量">
            <el-select v-model="form.display_flow" placeholder="">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否显示告警">
            <el-select v-model="form.display_alert" placeholder="">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNewPage()">立即创建</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
<!--         <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span> -->
      </el-dialog>
    </div>
  </template>
  
  <script>
  import eventBus from "@/utils/eventBus";
  import axios from "axios";
  export default {
    props: {
      pageMode: '',
    },
    data() {
        return {
        tpages: [],
        tPageId: '',
        dialogVisible: false,
        form: {
          name: '',
          fresh_time: '',
          bg_img: '',
          bg_color: '#fff',
          status_type: 'color',
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
        this.tpages = JSON.parse(window.localStorage.getItem('tpages'));
        this.tPageId = this.tpages&&this.tpages.length>0&&this.tpages[0].page_id;
        this.editor.tPageId = this.tPageId;
        this.command = command;
      },
      bindEvent() {
        let self = this;
        eventBus.$on("afterAddPage", page => {
          self.page = page;
          self.graph = self.page.graph;
        });
      },
      changeTpage(e) {
        this.editor.tPageId = e;
        this.changeData();
      },
      changeData() {
        const { editor } = this.$parent;
/*         var url = '/topology/api/' + editor.tPageId + '.json';
        axios.get(url).then((res) => {
          let data = res.data;
          if (data) {
            this.graph.read(data);
          }
        }) */

        let pages = JSON.parse(window.localStorage.getItem('tpages'));
        let data = pages.filter(item=>item.page_id == editor.tPageId)[0].data;
        this.graph.read(data);


      },
      addNewPage() {
        this.dialogVisible = false;
        let pages = window.localStorage.getItem('tpages');
        pages = pages? JSON.parse(pages):[];
        let index =0;
        if (pages && pages.length >0) {
          index = pages.length;
        }
        let newp = {page_id: index, ...this.form, data:{} };
        pages.push(newp);
        this.tpages = pages;
        this.tPageId = index;
        window.localStorage.setItem('tpages', JSON.stringify(pages))
        this.changeTpage(this.tPageId);
        
      },
      showModal() {
        this.dialogVisible = true;
        this.form ={
          name: '',
          fresh_time: '',
          bg_img: '',
          bg_color: '#fff',
          status_type: 'color',
          display_flow: 'no',
          display_alert: 'no'
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
  .toolbar {
    box-sizing: border-box;
    padding: 8px 0px;
    width: 100%;
    border: 1px solid #e9e9e9;
    height: 42px;
    z-index: 3;
    box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);

  }
  </style>