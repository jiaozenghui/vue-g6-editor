<template>
  <div>

    <G6Chart mode="edit">
    </G6Chart>
  </div>
</template>

<script>
import G6Chart from '@/components/G6Chart'
export default {
  name: 'TView',
  components:{G6Chart},
  data() {
    return {
      tpages: [{
        value: '选项1',
        label: 'tp1'
      },{
        value: '拓扑2',
        label: 'tp2'
      }],
      tPageId: 'tp1'
    }
  }
}
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
