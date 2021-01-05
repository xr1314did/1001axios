const express = require('express')
const cors = require('cors')

const app = express()

// 使用cors, 允许跨域
app.use(cors())
// 能解析urlencode格式的post请求体参数
app.use(express.urlencoded())
// 能解析json格式的请求体参数
// app.use(express.json())

const posts = [
  {
    "title": "json-server",
    "author": "typicode",
    "id": 1
  },
  {
    "title": "json-server3",
    "author": "typicode3",
    "id": 3
  }
]
// 此时就是非restAPI

app.get('/getPosts', (req, res) => {
  // const id = req.params.id

  res.send({status: 0, data: posts})
})

app.post('/addPost', (req, res) => {
  const {title, author} = req.body
  const id = Date.now()
  const post = {title, author, id}
  posts.push(post)
  setTimeout(() => {
    res.send({status: 0, data: post})
  }, 1000);
})



app.post('/updatePost', (req, res) => {
  const {title, author, id} = req.body
  const post = posts.find(post => post.id==id)
  post.title = title
  post.author = author
  setTimeout(() => {
    res.send({status: 0})
  }, 1000);
})

app.post('/deletePost', (req, res) => {
  const {id} = req.body
  const index = posts.findIndex(post => post.id==id)
  const postArr = posts.splice(index, 1)
  res.send({status: 0, data: postArr})
})

/*
  restAPI 路径相同, 就是请求方式不同-+
   
 */

// app.get('/post', (req, res) => {
//   // const id = req.params.id

//   res.send({status: 0, data: posts})
// })

// app.post('/post', (req, res) => {
//   const {title, author} = req.body
//   const id = Date.now()
//   const post = {title, author, id}
//   posts.push(post)
//   setTimeout(() => {
//     res.send({status: 0, data: post})
//   }, 1000);
// })

// app.put('/post', (req, res) => {
//   const {title, author, id} = req.body
//   const post = posts.find(post => post.id==id)
//   post.title = title
//   post.author = author
//   setTimeout(() => {
//     res.send({status: 0})
//   }, 1000);
// })

// app.delete('/post', (req, res) => {
//   const {id} = req.query
//   const index = posts.findIndex(post => post.id==id)
//   const postArr = posts.splice(index, 1)
//   res.send({status: 0, data: postArr})
// })


app.get('/getProducts1', (req, res) => {
  
  setTimeout(() => {
    res.send([
      {id: 1, name: 'product1.1'},
      {id: 2, name: 'product1.2'},
      {id: 3, name: 'product1.3'}
    ])
  }, 1000 + Math.random()*2000);
  
})

app.get('/getProducts2', (req, res) => {

  setTimeout(() => {
    res.send([{
        id: 1,
        name: 'product2.1'
      },
      {
        id: 2,
        name: 'product2.2'
      },
      {
        id: 3,
        name: 'product2.3'
      }
    ])
  }, 1000 + Math.random() * 2000);

})

app.listen(4000, () => {
  console.log('server app start on port 4000')
})

/* 
serve.js运行:右击->Run Code 
或者在终端中输入: node server.js
*/