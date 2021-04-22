import * as faker from 'faker';
//faker.locale = "es";

export const getProds = () => ({
    nombre: faker.commerce.productName,
    precio: faker.commerce.price,
    foto: faker.image.food
})