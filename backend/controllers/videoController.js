const User = require("../models/userModel");
const Video = require("../models/videoModel");
const multer  = require('multer')
const path= require("path")
const fs = require('fs');

const uploadVideo= async (req,res)=>{
    
  const {username}=req.params;

  //console.log("username: ",username)

  const userToModify= await User.findOne({username});  

    if (!userToModify) {
        return res.status(400).json({message: "User not found"})
    }

    const fileVideo = new Video();
    const dir = './upload/'+userToModify.username;
    fileVideo.direction=dir;
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      // Crear carpeta si no existe
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      fileVideo.direction=fileVideo.direction+"/"+uniqueSuffix + path.extname(file.originalname)
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  // 2. Inicializar multer con el storage configurado
  const upload = multer({ storage: storage }).single('file');


  //console.log("direction: "+fileVideo.direction)

  // 3. Ejecutar multer
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    //console.log("file: ",req.file)

    fileVideo.name=req.file.originalname
    fileVideo.type=req.file.mimetype

    await User.findByIdAndUpdate(
      userToModify._id,
      { $push: { videos: fileVideo._id } }, // 🔥 Aquí agregamos el ID al array
      { new: true } // Para que devuelva el documento actualizado
    );

    //console.log("file: ",req.file); // Aquí tienes tu archivo guardado
    await fileVideo.save()

    res.send({
      message: 'Archivo recibido',
      file: req.file,
    });
  });
    
}

const filterVideos= async (req,res)=>{
  const {name}=req.body

  if(!name && name!==''){
    return res.status(400).json({message: "name of Video not found"})
  }

  const videos=await Video.find({name: { $regex: name, $options: 'i' } })

  if(!videos){
    return res.status(402).json({message: "no conscience"})
  }

  return res.status(200).json({message: "videos sucefull",videos})

}


const findVideo= async (req,res)=>{
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID de video no proporcionado" });
  }

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video no encontrado" });
    }
    
    //console.log("direction: ",video)
    const videoPath = video.direction;
    //console.log(videoPath)
    //const videoPath = "./upload/user1/1746117263771-986817071.mp4";

    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Video no encontrado');
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // Configurar headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length,Content-Range');

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': video.type || 'video/mp4'
      });

      const fileStream = fs.createReadStream(videoPath, { start, end });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': video.type || 'video/mp4'
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.error('Error en findVideo:', error);
    res.status(500).json({ message: "Error al procesar el video" });
  }

}

const findVideos=async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)
      .populate('videos'); // 🔥 Esto trae los objetos completos

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
  
}

module.exports={uploadVideo,filterVideos,findVideo,findVideos}