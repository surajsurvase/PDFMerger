const express = require('express')
const path = require('path')
const app = express()
const {mergepdfs}  = require('./merge')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use('/static', express.static('public'))


const port = process.env.port || process.env.PORT || 3002

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})

   app.post('/merge', upload.array('pdfs', 2), async (req, res, next) =>{
   
  console.log(req.files)

  let d =  await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
          
          //res.redirect( `http://192.168.0.2:3002/static/${d}.pdf`)

    


res.send(`
<script>
  window.open('http://192.168.0.2:3002/static/${d}.pdf');
</script>
`);



res.destroyed()



    // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

  })

  

 
app.listen(port, () => {
  console.log(`Example app listening on port http://192.168.0.2:${port}`)

 
})


