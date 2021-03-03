const fs = require('fs')
const path = require('path')

class ChatMsg {
  constructor(nombreArchivo){
      this.ChatMessagess = []
      this.FileName = nombreArchivo;
  }

  //getMessages = async function() {
  getMessages = async () => {
    try {  
      const data = await fs.promises.readFile(path.resolve(__dirname, this.FileName), { encoding: 'utf8' })
      let arrayMsj = JSON.parse(data);

      var ChatMsg = arrayMsj.map((data)=>{ 
        return {
          mail:data.mail, 
          time:data.time,
          message: data.message
        }; 
      });
      
      return ChatMsg;
      
    } catch (error) {
      console.log(error);
      console.log('Error Obteniendo datos de .txt')
      return [];
    }
  }
  
  addMessage = async (nuevoMsg) => {
      try {         

        this.ChatMessagess.push(nuevoMsg);
        
        const data = await fs.promises.writeFile(path.resolve(__dirname, this.FileName), JSON.stringify(this.ChatMessagess))
        console.log("Archivo Guardado")
      } catch (error) {
        console.error("No se pudo Guardar el archivo")
        console.log(error)
      }
    }
  
}

module.exports = ChatMsg