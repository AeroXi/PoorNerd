<template>
  <Scatter 
  :chartData="chartData"
  :chartOptions="chartOptions"
  :chartId="chartId"
  :width="width"
  :height="height"
  :cssClasses="cssClasses"
  :styles="styles"
  :plugins="plugins"
  ref="sale"
  />
</template>
<script>
import {Scatter} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Plugin
} from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)
export default {
  name: 'SaleChart',
  components: { Scatter },
  props: {
    chartId: {
      type: String,
      default: 'scatter-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    saleData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    saleData(newDatasets) {
      this.chartData.datasets[0].data = newDatasets
      this.$refs.sale.updateChart()
    }
  },
    data() {
    return {
      chartData: {
        datasets: [
        {
          label: 'Sales Data (ETH)',
          fill: false,
          borderColor: '#f87979',
          backgroundColor: '#f87979',
          data: [],
        },
        
      ]
    },
      chartOptions: {
        responsive: true,
      maintainAspectRatio: false
      }
    }
  }
}
</script>