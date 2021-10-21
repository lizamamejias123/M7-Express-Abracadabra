const express = require('express')
const app = express()
const fs = require('fs')

// 1. 
app.listen(3000, () => {
    console.log('Puerto 3000')
})
// 2. 
app.use(express.static("assets"));


app.use("/abracadabra/juego/:nombre", (req, res, next) => {
    const {
        usuarios
    } = JSON.parse(fs.readFileSync("usuarios.json"))
    const nombre = req.params.nombre
    if (usuarios.some(u => u == nombre)) {
        console.log(`${nombre} pertenece a los usuarios`)
        next()
    } else {
        res.sendFile(__dirname + "/assets/who.jpeg")
        console.log(`Recuerda que tu nombre debe estar registrado y la primera letra es con mayuscula, porque ${nombre} no esta dentro de nuestros registros`)

    }
})


app.get("/abracadabra/juego/:nombre", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/usuarios", (req, res) => {
    res.sendFile(__dirname + "/usuarios.json")
})

// 4.
app.get("/abracadabra/conejo/:numero", (req, res) => {
    const n = Math.floor(Math.random() * (5 - 1) + 1);
    const numero = req.params.numero;
    console.log(`${n} es el numero y ${numero} es el parametro seleccionado del usuario`)
    if (numero == n) {
        res.send('<img src="/conejito.jpg"/>');
        console.log("Adivinaste, sacaste el conejito")
    } else {
        res.send('<img src="/voldemort.jpg"/>');
        console.log("EL poder de Voldemort cayo sobre ti ");
    }

})

// 6. 
app.get("*", (req, res) => {
    res.send("<center><h1>Error 404</h1> </center>");
    console.log("Aca no hay magia")
});