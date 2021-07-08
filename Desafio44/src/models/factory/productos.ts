import persistenciaMemory from './productosMemory'
import persistenciaFileSystem from './productosFileSystem'
import persistenciaMongo from './productosMongoDB'

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryProductoModel {
    static set(opcion: any) {

        switch(opcion) {
            case 'Mem': return new persistenciaMemory()
            case 'File': return new persistenciaFileSystem()
            case 'Mongo': return new persistenciaMongo()
        }
    }
}

export default FactoryProductoModel