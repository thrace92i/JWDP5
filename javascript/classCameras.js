fetch(urlApi)
    .then(response => response.json())
    .then(dataCameras => {
        console.log(dataCameras);
        for (let cameras of dataCameras){
        }
    
    });

let cameras = class Cameras {
    constructor(cameras){
        this.description = cameras.description;
        this.imageUrl = cameras.imageUrl;
        this.lenses = cameras.lenses;
        this.name = cameras.name;
        this.price = cameras.price;
        this._id = cameras._id;
    }
}

console.log(cameras);