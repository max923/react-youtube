const express  = require('express')
const path = require('path')
// 1 匯入 express(libery)
const app = express()
// 2 執行 express
const port = process.env.PORT || 8888
// 3 route setting
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.listen(port, () => {
  console.log(`Listening ${port} port`)
})
// 4 啟動 server 並監聽 port


