import { productos } from "./productos";

export const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(productos);
    }, 3000);

});

/*
export const fetchApi = (url) => {

    return fetch(url).then(respon => response.json()).catch(err => console.error(err));
}
    */