# PoorNerd
>Powered by MintLab

由于nftnerd太贵我买不起，正好opensea新增了websocket api可以推送实时交易数据，故简单封装了api加了显示，做个穷人版nftnerd
## 安装
```
git clone https://github.com/AeroXi/PoorNerd.git
cd PoorNerd
npm install
```

## 配置
需要opensea api key，填写在index.js第一行的openseaKey 引号内

没有key的可以去[官网申请](https://docs.opensea.io/reference/request-an-api-key) 

## 运行
`node index.js 项目名`

项目名一定要从opensea对应nft系列的网址里找

例如https://opensea.io/collection/azuki 对应为azuki

## FAQ
出现`[ERROR]: [object Object]`怎么办？

我自己电脑上运行也有这个问题，在国外服务器上运行可以解决

## MintLab
欢迎NFT玩家加入 [Discord](https://discord.gg/UksW2qNG)