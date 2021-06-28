import persistenciaMemory from './productosMemory'
//import persistenciaFileSystem from './productosFileSystem'
//import persistenciaMongo from './productosMongoDB'

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryProductoModel {
    static set(opcion: any) {
        console.log('**** PERSISTENCIA SELECCIONADA **** [' + opcion + ']')
        switch(opcion) {
            case 'Mem': return new persistenciaMemory()
            //case 'File': return new persistenciaFileSystem()
            //case 'Mongo': return new persistenciaMongo()
        }
    }
}

const opcion = process.argv[2] || 'Mem'
export default FactoryProductoModel.set(opcion)