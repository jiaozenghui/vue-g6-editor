
import Util from '@antv/g6/src/util'
import eventBus from "@/utils/eventBus";
let tooltipEl=null;
export default {
    getEvents() {
        return {
            'edge:mouseover': 'onMouseover',
            'edge:mouseleave': 'onMouseleave',
            "edge:click": "onClick",
        };
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
        <p>源设备：总部24F-机柜7-16U-15U-去西安的核心路由</p>
        <p>源端口：GigabitEthernet0/0</p>
        <p>目的设备：131网段虚拟设备</p>
        <p>目的端口：Vlan1</p>
        <p>入流量：0b</p>
        <p>出流量：0b</p>
        <p>广播包：0.00包/s</p>
        <p>丢包率：0.00%</p>
        <p>错包率：0.00%</p>
        <p>入宽带占用率：0.00%</p>
        <p>出宽带占用率：0.00%</p>
        <p>带宽：1000</p>
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

    onMouseover(e) {
        const self = this;
        const item = e.item;
        const graph = self.graph;
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
            if (!item.hasState('selected'))
                graph.setItemState(item, 'hover', false);
        }
        graph.paint();
        this.hideTooltip();
    },
    onClick(e) {
        const self = this;
        const item = e.item;
        const graph = self.graph;
        const autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        const selectedNodes = graph.findAllByState('node', 'selected');
        Util.each(selectedNodes, node => {
            graph.setItemState(node, 'selected', false);
        });
        if (!self.keydown || !self.multiple) {
            const selected = graph.findAllByState('edge', 'selected');
            Util.each(selected, edge => {
                if (edge !== item) {
                    graph.setItemState(edge, 'selected', false);
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
        graph.paint();
    },

};
