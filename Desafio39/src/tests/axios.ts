const axios = require('axios');

const ListarProds = async () => {
    try{
        const prods = await axios.get('http://localhost:8080/api/productos/');
        console.log(prods.data);
    }
    catch (err: any){
        console.log(err);
    }
}

const AddProds = async () => {
    try{
        const newProd = {
            "nombre":"Cereza3",
            "descripcion":"Cerezas3",
            "codigo":"c-1013",
            "foto":"https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cerejas-128.png",
            "precio":"220",
            "stock": "400"
        };
        const prods = await axios.post('http://localhost:8080/api/productos/', newProd);
        console.log(prods.data);
    }
    catch (err: any){
        console.log(err);
    }
}

const UpdateProds = async () => {
    try{
        const updateProd = {
            "nombre":"Cereza 3",
            "descripcion":"Cerezas 333",
            "codigo":"c-1013",
            "foto":"https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cerejas-128.png",
            "precio":"300",
            "stock": "400"
        };
        const prods = await axios.patch('http://localhost:8080/api/productos/actualizar/60ca8d85de633e3fdcab91cc', updateProd);
        console.log(prods.data);
    }
    catch (err: any){
        console.log(err);
    }
}

const DeleteProds = async () => {
    try{
        const prods = await axios.delete('http://localhost:8080/api/productos/borrar/60ca8dee7497b2511cef8121');
        console.log(prods.data);
    }
    catch (err: any){
        console.log(err);
    }
}

ListarProds();
//AddProds();
//UpdateProds();
//DeleteProds();
