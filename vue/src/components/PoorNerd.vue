<template>
  <div>
    <h1>Poor Nerd</h1>
    <n-space vertical>
      <p>默认key由opensea提供，如果有可以换成自己的</p>
    <n-input v-model:value="this.apiKey" type="text" placeholder="opensea api key" />
    <button @click="initClient(this.apiKey)">初始化</button>
    <p>这里填nft项目名，要从项目os页面网址获取，例如：https://opensea.io/collection/azuki 则填写斜杠后面的azuki</p>
    <n-input v-model:value="this.slug" type="text" placeholder="slug" />
    <button @click="subscribe(this.slug)">开启</button>
    <button @click="unsubscribe">停止</button>
    </n-space>
    <div class="row">
      <div class="column">
        <n-card
          v-for="list in lists.slice().reverse()"
          :key="list.id"
          :title="list.name"
          size="small"
        >
          <!-- <img :src="list.image"> -->
          <template #header-extra> {{ toEther(list.price) }}ETH </template>
          List #{{ list.id }}
        </n-card>
      </div>
      <div class="column">
        <n-card
          v-for="sale in sales.slice().reverse()"
          :key="sale.id"
          :title="sale.name"
          size="small"
        >
          <template #header-extra>
            {{ toEther(sale.price) }}
          </template>
          Trade #{{ sale.id }}ETH
        </n-card>
      </div>
    </div>
  </div>
</template>
<script>
import { OpenSeaStreamClient, EventType } from "@opensea/stream-js";
import { ethers } from "ethers";
import { NButton, NCard, NInput } from "naive-ui";
const slug = "cloudyme";



export default {
  data() {
    return {
      sales: [],
      lists: [],
      slug: "",
      apiKey: "2f6f419a083c46de9d83ce3dbe7db601",
      unsubscribe: null,
      client: null,
    };
  },
  components: {
    NButton,
    NCard,
    NInput,
  },
  computed: {
    reverseSales() {
      return this.sales.slice().reverse();
    },
    reverseLists() {
      return this.lists.slice().reverse();
    },
  },
  methods: {
    toEther(wei) {
      return ethers.utils.formatEther(wei);
    },
    initClient(token) {
      this.client = new OpenSeaStreamClient({
        token,
      });
      console.log(token);
    },
    subscribe(slug) {
      this.unsubscribe = this.client.onEvents(
        slug,
        [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
        (event) => {
          // handle event
          if (event.event_type === "item_listed") {
            this.handleList(event);
          } else if (event.event_type === "item_sold") {
            this.handleSold(event);
          }
        }
      );
    },

    handleList(event) {
      this.lists.push({
        name: event.payload.item.metadata.name,
        image: event.payload.item.metadata.image_url,
        price: event.payload.base_price,
        id: this.lists.length,
      });
      // console.log(
      //   "\x1b[36m%s\x1b[0m",
      //   `List: ${event.payload.item.metadata.name}  ${ethers.utils.formatEther(
      //     event.payload.base_price
      //   )}ETH`
      // );
    },

    handleSold(event) {
      this.sales.push({
        name: event.payload.item.metadata.name,
        price: event.payload.sale_price,
        id: this.sales.length,
      });
      // console.log(event.payload);
      // console.log(
      //   "\x1b[33m%s\x1b[0m",
      //   `Sell: ${event.payload.item.metadata.name}  ${ethers.utils.formatEther(
      //     event.payload.sale_price
      //   )}ETH`
      // );
    },
    scrollData() {
      this.$nextTick(() => {
        this.$el.querySelectorAll(".column").forEach((el) => {
          el.scrollTop = el.scrollHeight;
        });
      });
    },
  },
  mounted() {},
  // updated() {
  //   this.scrollData();
  // }
};
</script>
<style scoped>
img {
  width: 64px;
  height: auto;
}
.row {
  display: flex;
}

.column {
  flex: 50%;
  overflow: auto;
  height: 70vh;
}
</style>
