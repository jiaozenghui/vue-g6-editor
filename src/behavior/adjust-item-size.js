import eventBus from "@/utils/eventBus";
const p ={x:0, y:0};
export default {
    dragging: {
        type: Boolean,
        default: false
    },
    getEvents() {
        return {
            "node:mousedown": "onMousedown",
            "node:mousemove": "onMousemove",
            "node:mouseup": "onMouseup",
            'node:mouseleave': 'onMouseleave',
        };
    },
    onMouseleave(e) {
        this.dragging = false;
        p.x= 0;
        p.y=0;
        //this.graph.setMode('default')
    },
    onMouseup(e) {
        this.dragging = false;
        p.x= 0;
        p.y=0;
        this.graph.setMode('default')
    },
    onMousedown(e) {
        p.x = e.x;
        p.y = e.y;
        this.dragging = true;
    },
    onMousemove(e) {
        if (e.target._attrs.dragPoints) {
            let dx=0,dy=0;
            if (e.target._attrs.dragType == 'lt') {
                dx = p.x - e.x;
                dy = p.y-e.y;
            } else if (e.target._attrs.dragType == 'rt') {
                dx = e.x-p.x;
                dy = p.y-e.y;
            } else if (e.target._attrs.dragType == 'lb') {
                dx = p.x-e.x;
                dy = e.y-p.y;
            } else if (e.target._attrs.dragType == 'rb') {
                dx = e.x-p.x;
                dy = e.y-p.y;
            }

            const origin = e.item;
            if (this.dragging==true) {
                this.updateModelSize(
                    e.item,
                    dx,
                    dy,
                    e.x-p.x,
                    e.y-p.y
                );
                const x = origin.x +(e.x-p.x);
                const y = origin.y + (e.y-p.y);
                const pos = { x, y };
                //e.item.updatePosition(pos);
                
            }


            p.x= e.x;
            p.y=e.y;
        }
    },
    updateModelSize(item, dx,dy, px, py) {
        const model = item.getModel();
/*         model.width += dx*2;
        model.height += dy*2; */
        const data = {}
        data.item = item;
        data.oldModel = {width: model.width, height:model.height,x:model.x,y:model.y};
        data.newModel = { width: model.width+dx*2, height: model.height+1, x:model.x+dx*2,y:model.y+1 }
        eventBus.$emit('updateItem', data)

    }

};
