const fs = require('fs')
const path = require('path')

class ChatMsg {
  constructor(nombreArchivo){
      this.ChatMessages = []
      this.FileName = nombreArchivo;
  }

  //getMessages = async function() {
  getMessages = async () => {
    try {  
      const data = await fs.promises.readFile(path.resolve(__dirname, this.FileName), { encoding: 'utf8' })
      let arrayMsj = JSON.parse(data);
      let ChatMsg = arrayMsj.map((val) => {
        val.mail,
        val.time,
        val.message
      });
      return ChatMsg;
      
    } catch (error) {
      console.log('Error Obteniendo datos de .txt')
      return [];
    }
  }
  
  addMessage = async (nuevoMsg) => {
      try {         

        this.ChatMessages.push(nuevoMsg);
        
        const data = await fs.promises.writeFile(path.resolve(__dirname, this.FileName), JSON.stringify(this.ChatMessages))
        console.log("Archivo Guardado")
      } catch (error) {
        console.error("No se pudo Guardar el archivo")
        console.log(error)
      }
    }
  
}

module.exports = ChatMsg