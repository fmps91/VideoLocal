const server=require("./index")
const db=require("./db/conexion")

async function messages(){
    
    try{
    await db.connect("mongodb://127.0.0.1:27017/video")
    
    server.messageServer()
    } catch (error) {
        console.log("Error en la conexion db o el servidor")
        process.exit(1);
    }
}

server.app.listen(server.port,messages);
