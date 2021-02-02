import fs from 'fs';
import path from 'path'; 

const leerDB = async (fileName: string) =>{
    try {  
      const data = await fs.promises.readFile(path.resolve(__dirname, fileName), { encoding: 'utf8' })
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  export default leerDB;