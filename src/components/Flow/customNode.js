import G6 from "@antv/g6/build/g6";
import { uniqueId } from '@/utils'
import Shape from '@antv/g/src/shapes'
const customNode = {
  init() {
    G6.registerNode("customNode", {
      draw(cfg, group) {
        let size = cfg.size;
        if(!size){
          size=[170,34]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = cfg.width;
        const height = cfg.height;
        const color = cfg.color;
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'rect' + uniqueId()
        const shape = group.addShape("rect", {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: color,
            fill: '#fff',//此处必须有fill 不然不能触发事件
            radius: 4,
            lineWidth:0

          }
        });
/*         group.addShape("rect", {
          attrs: {
            x: offsetX,
            y: offsetY,
            width: 4,
            height: height,
            fill: color,
            parent: mainId,
            radius: [4, 0, 0, 4]
          }
        }); */
        
        group.addShape("image", {
          attrs: {
            x: offsetX + 8 ,
            y: offsetY,
            width: 30,
            height: 30,
            img: cfg.image,
            parent: mainId
          }
        });
/*         group.addShape("image", {
          attrs: {
            x: offsetX + width - 32,
            y: offsetY + 8,
            width: 16,
            height: 16,
            parent: mainId,
            img: cfg.stateImage
          }
        }); */
        if(cfg.backImage){
          const clip = new Shape.Rect({
            attrs: {
              x: offsetX,
              y: offsetY,
              width: width,
              height: height,
              fill:'#fff',
              radius: 4
            }
          });
          let img = cfg.backImage;
          if (window.location.href.indexOf('topology/page/view')>-1) {
            if (cfg.node_type == 'componany'&&cfg.node_id <10 || cfg.node_type == 'router'&&cfg.node_id <5) {
              img = cfg.warn;
            } else if (cfg.node_type == 'datacenter'&&cfg.node_id <6) {
              img = cfg.alert;
            } else if (cfg.node_type == 'switch1'&&cfg.node_id <5) {
              img = cfg.alert;
            }
          }
          group.addShape("image", {
            attrs: {
              x: offsetX,
              y: offsetY,
              width: width,
              height: height,
              img: img,
              clip: clip
            }
          });
        }
        if (cfg.label) {
           group.addShape("text", {
            attrs: {
              id: 'label' + uniqueId(),
              x: offsetX + width / 2,
              y: offsetY + height + 16,
              textAlign: "center",
              textBaseline: "bottom",
              text: cfg.label,
              parent: mainId,
              fill: "#565758"
            }
          });
        }
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.inPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            x = width * cfg.inPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: "#1890ff",
                opacity: 0
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: "#fff",
                stroke: "#1890ff",
                opacity: 0
              }
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.outPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            x = width * cfg.outPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: "#1890ff",
                opacity: 0//默認0 需要時改成0.3
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: "#fff",
                stroke: "#1890ff",
                opacity: 0
              }
            });
          }
        }
        //group.sort()
        // 添加文本、更多图形
        return shape;
      },
      afterDraw: function afterDraw(cfg, group) {
        cfg.color = '#6cbcf6';
        if (window.location.href.indexOf('topology/page/view')>-1) {
          if (cfg.node_type == 'componany'&&cfg.node_id <10 || cfg.node_type == 'router'&&cfg.node_id <5) {
            cfg.color = '#AA8333';
            draw();
          } else if (cfg.node_type == 'datacenter'&&cfg.node_id <6 ||cfg.node_type == 'switch1'&&cfg.node_id <5) {
            cfg.color = '#f80811';
            draw()
          }
          function draw() {
            var r = 10 / 2;
            const width = cfg.width;
            const height = cfg.height;
            var back1 = group.addShape('circle', {
              zIndex: 1,
              attrs: {
                x: 0,
                y:  -height/2,
                r: r,
                fill: cfg.color,
                opacity: 0.6
              }
            });
            var back2 = group.addShape('circle', {
              zIndex: 2,
              attrs: {
                x: 0,
                y:  -height/2,
                r: r,
                fill: cfg.color, // 为了显示清晰，随意设置了颜色
                opacity: 0.6
              }
            });
      
            var back3 = group.addShape('circle', {
              zIndex: 3,
              attrs: {
                x: 0,
                y:  -height/2,
                r: r,
                fill: cfg.color,
                opacity: 0.6
              }
            });
            group.sort(); // 排序，根据zIndex 排序
            back1.animate({ // 逐渐放大，并消失
              r: r + 10,
              opacity: 0.1,
              repeat: true // 循环
            }, 3000, 'easeCubic', null, 0); // 无延迟
      
            back2.animate({ // 逐渐放大，并消失
              r: r + 10,
              opacity: 0.1,
              repeat: true // 循环
            }, 3000, 'easeCubic', null, 1000); // 1 秒延迟
      
            back3.animate({ // 逐渐放大，并消失
              r: r + 10,
              opacity: 0.1,
              repeat: true // 循环
            }, 3000, 'easeCubic', null, 2000); // 2 秒延迟
          } 

        }
      },
      //设置状态
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0]; // 顺序根据 draw 时确定

        const children = group.findAll(g => {
          return g._attrs.parent === shape._attrs.id
        });
        const circles = group.findAll(circle => {
          return circle._attrs.isInPoint || circle._attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr("fill", "#f3f9ff");
          shape.attr("stroke", "#6ab7ff");
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
          shape.attr("fill", "#fff");
          shape.attr("stroke", "#ced4d9");
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
        };
        switch (name) {
          case "selected":
          case "hover":
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
        }
      },
      
    });
  }
}

export default customNode
