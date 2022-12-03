import Util from '@antv/g6/src/util'
import eventBus from "@/utils/eventBus";
let tooltipEl=null;
export default {
    
    getEvents() {
        return {
            'node:mouseover': 'onMouseover',
            'node:mouseleave': 'onMouseleave',
            "node:mousedown": "onMousedown"
        };
    },
    onMouseover(e) {
        const self = this;
        const item = e.item;
        const graph = self.graph;
        const group = item.getContainer()
        if (e.target._attrs.isOutPointOut || e.target._attrs.isOutPoint) {
            group.find(g => {
                if (g._attrs.isInPoint || g._attrs.isOutPoint) {
                    g.attr("fill", "#fff")
                }
                if (g._attrs.isOutPoint) {
                    if (g._attrs.id === e.target._attrs.parent) {
                        group.find(gr => {
                            if (gr._attrs.id === g._attrs.id) {
                                gr.attr('fill', "#1890ff")
                                gr.attr('opacity',1)
                            }
                        })
                    }
                    if (g._attrs.id === e.target._attrs.id) {
                        g.attr("fill", "#1890ff")
                        g.attr('opacity',1)
                    }

                }
            });
            e.target.attr("cursor", "crosshair");
            this.graph.paint();
        }
        if (item.hasState('selected')) {
            return
        } else {
            if (self.shouldUpdate.call(self, e)) {
                graph.setItemState(item, 'hover', true);
            }
        }
        graph.paint();
        var node = e.item;
        var nodeId = node.get("model").id;
        var shape = e.target;
        if (window.location.href.indexOf('topology/page/view') >-1) {
            this.showTooltip(node.get("model"), {
                x: e.canvasX,
                y: e.canvasY
              });
        }

    },
    
    hideTooltip() {
        if (!tooltipEl) {
            return;
        }
        tooltipEl.style.display = "none";
    },
    // 在指定的位置显示tooltip
    showTooltip(model, position) {
        let des =`<div style="width:300px">
        <p>名称：${model.label}</p>
        <p>资源类型：${model.name}</p>
        <p>绑定设备ID：f33a4154-7909-463e-a171-fc91b02fe07a</p>
        <p>设备资源详情</p>
        <p>运行时长：3day 5hour 33min 56sec</p>
        <p>IP地址：192.168.2.124</p>
        <p>告警摘要</p>
        <p>严重：0</p>
        <p>次要：3</p>
        <p>一般：0</p>
        <p>【设备监控跳转链接】</p>
        <p>告警跳转链接】</p>
        </div>`
      if (!tooltipEl) {
        var container = document.getElementById('graph-container');
        tooltipEl = document.createElement("div");

        tooltipEl.innerHTML= des;
        tooltipEl.setAttribute("class", "graph-tooltip");
        container.appendChild(tooltipEl);
      }
      tooltipEl.innerHTML = des;
      // tooltip是相对于画布canvas element绝对定位，所以position的x，y必须是相对于画布的坐标
      tooltipEl.style.left = position.x + "px";
      tooltipEl.style.top = position.y + "px";
      tooltipEl.style.display = "block";
    },
    onMouseleave(e) {
        const self = this;
        const item = e.item;
        const graph = self.graph;
        const group = item.getContainer()
        group.find(g => {
            if (g._attrs.isInPoint || g._attrs.isOutPoint) {
                g.attr("fill", "#fff")
            }
        });
        if (self.shouldUpdate.call(self, e)) {
            if(!item.hasState('selected'))
            graph.setItemState(item, 'hover', false);
        }
        graph.paint();
        this.hideTooltip();
    },
    onMousedown(e) {

        if(e.target._attrs.isOutPoint ||e.target._attrs.isOutPointOut){
            this.graph.setMode('addEdge')
        }else{
            this.graph.setMode('moveNode')
        }
        const self = this;
        const item = e.item;
        const graph = self.graph;
        const autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        const selectedEdges = graph.findAllByState('edge', 'selected');
        Util.each(selectedEdges, edge => {
            graph.setItemState(edge, 'selected', false);
        });
        if (!self.keydown || !self.multiple) {
            const selected = graph.findAllByState('node', 'selected');
            Util.each(selected, node => {
                if (node !== item) {
                    graph.setItemState(node, 'selected', false);
                }
            });
        }
        if (item.hasState('selected')) {
            if (self.shouldUpdate.call(self, e)) {
                graph.setItemState(item, 'selected', false);
            }
          
            eventBus.$emit('nodeselectchange', { target: item, select: false });
        } else {
            if (self.shouldUpdate.call(self, e)) {
                graph.setItemState(item, 'selected', true);
            }
            eventBus.$emit('nodeselectchange', { target: item, select: true });
        }
        graph.setAutoPaint(autoPaint);



    },

};
