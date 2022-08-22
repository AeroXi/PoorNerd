const openseaKey = "8947f22fb3db4b2793724862332e3a2e"

const {OpenSeaStreamClient, EventType} = require('@opensea/stream-js');
const {WebSocket} = require('ws')
const web3 = require('web3')
const fetch = require('node-fetch');



const client = new OpenSeaStreamClient({
  token: openseaKey,
  connectOptions: {
    transport: WebSocket,
},
});

const getSudoPrice = async () => {
  let price;
  await fetch("https://sudoapi.xyz/v1/collections?sort=volume_all_time&desc=true", {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://sudoswap.xyz/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
})
.then(response => response.json())
.then(data => {
  // console.log(data) ;
  let collection = data["collections"].find(element => element.address === "0x543D43F390b7d681513045e8a85707438c463d80");
  price = collection.sell_quote;
})
.catch(error => console.error(error));
return price

}

getSudoPrice().then(price => {
  console.log(price)
}).catch(error => {
  console.log(error);
})

client.onItemListed("webaverse-genesis-pass", async(event) => {
  let osPriceWei = event.payload.base_price
  let sudoPriceWei = await getSudoPrice()
  let profit = web3.utils.fromWei(sudoPriceWei - osPriceWei) 
  console.log('\x1b[36m%s\x1b[0m',`Profit: ${event.payload.item.metadata.name}  ${profit}ETH`)
  fetch(`https://api.day.app/Fic3yGcs8JY6n9cAYjywFg/套利机会${profit}`)
});

