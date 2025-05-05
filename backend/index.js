const express=require("express");
const path= require("path")
const authRoutes=require("./routes/authRoutes.js")
const videoRoutes=require("./routes/videoRoutes")
const usersRoutes=require("./routes/userRoutes")
const dotenv =require("dotenv");
const cookieParser = require('cookie-parser')
const multer = require('multer');
const cors = require('cors')
const fs = require('fs')

dotenv.config();

const app=express();



//app.use(cors());
app.use(cors({ origin: 'http://localhost:3006', credentials: true }));


/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Range');
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
  next();
}); */

app.use(express.json({limit:"9000mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//console.log("dirname: ",__dirname)

//app.use('/static', express.static(path.join(__dirname, '../upload')));

app.get('/api/videos', (req, res) => {
  const videos = [
    {
      id: 1,
      title: 'Video Ejemplo 1',
      url: './upload/videos/1.mp4'
    },
    {
      id: 2,
      title: 'Video Ejemplo 2',
      url: './upload/videos/2.mp4'
    },
    {
      id: 2,
      title: 'Video Ejemplo 2',
      url: './upload/user1/1746071041073-52457457.mp4'
    },
    
  ];
  res.json(videos);
});


const videoFileMap={
  '1':'./upload/videos/1.mp4',
  '2':'./upload/videos/2.mp4',
  '3':'./upload/user1/1746071041073-52457457.mp4',
}


app.get('/videos/:filename', (req, res)=>{
  const fileName = req.params.filename;
  const filePath = videoFileMap[fileName]
  if(!filePath){
      return res.status(404).send('File not found')
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if(range){
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, {start, end});
      const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4'
      };
      res.writeHead(206, head);
      file.pipe(res);
  }
  else{
      const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4'
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res)
  }
})

app.use("/api/auth",authRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/user",usersRoutes)

const port = process.env.PORT;

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirname,"frontend","dist","index.html"));
    })
}


app.get('/', async function (req, res) {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send(`ok`);


});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './upload/'); // aquí defines el destino
    },
    filename: (req, file, cb) => {
      // para que no haya nombres repetidos
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Ruta para subir archivo
  app.post('/upload', upload.single('file'), (req, res) => {
     // req.file ahora contiene path, filename, etc.
    console.log(req.body.nspeakers);
    res.send({
      message: 'Archivo recibido',
      file: req.file,
    });
  });


function messageServer() {

console.log(`Server is running at http://localhost:${port}`);

}


module.exports = { app, port, messageServer };
