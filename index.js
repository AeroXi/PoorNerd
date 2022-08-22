const openseaKey = "8947f22fb3db4b2793724862332e3a2e"

const {OpenSeaStreamClient, EventType} = require('@opensea/stream-js');
const {WebSocket} = require('ws')
const web3 = require('web3')


const client = new OpenSeaStreamClient({
  token: openseaKey,
  connectOptions: {
    transport: WebSocket,
},
});
const args = process.argv.slice(2);
const slug = args[0];


function handleList(event) {

console.log('\x1b[36m%s\x1b[0m',`List: ${event.payload.item.metadata.name}  ${web3.utils.fromWei(event.payload.base_price)}ETH`)
}

function handleSold(event) {
  console.log('\x1b[33m%s\x1b[0m', `Sell: ${event.payload.item.metadata.name}  ${web3.utils.fromWei(event.payload.sale_price)}ETH`)
}

client.onEvents(
    slug,
    [EventType.ITEM_LISTED, EventType.ITEM_SOLD],
    (event) => {
      // handle event
      if (event.event_type === 'item_listed') {
        handleList(event);
      }
      else if (event.event_type === 'item_sold') {
        handleSold(event);
      }
    }
  );