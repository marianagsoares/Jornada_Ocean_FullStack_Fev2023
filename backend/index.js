require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

//const baseUrl = "mongodb://127.0.0.1:27017"; 
const baseUrl = process.env.key; // o banco roda nessa porta
const bdName = "ocean_db_09_02";

async function main() {
  const client = await MongoClient.connect(baseUrl);
  const db = client.db(bdName);
  const collection = db.collection("itens");

  const app = express();
  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Olá, mundo!");
  });

  app.get("/oi", function (req, res) {
    res.send("Hello, world!");
  });

  app.get("/item", async function (req, res) {
    const documentos = await collection.find().toArray();
    //collection MongoDB = tabela MySQL
    res.send(documentos);
    //documentos = array itens
  });

  app.get("/item/:id", async function (req, res) {
    const itemId = req.params.id;

    if (itemId) {
      const item = await collection.findOne({ _id: new ObjectId(itemId) });
      res.send(item);
    } else {
      res.status(404).json({ error: "id não encontrado" });
    }
  });

  app.post("/item", async function (req, res) {
    const item = req.body;
    await collection.insertOne(item);
    res.send(item);
  });

  app.put("/item/:id", async function (req, res) {
    const itemId = req.params.id;
    const body = req.body;

    if (itemId) {
      await collection.updateOne({ _id: new ObjectId(itemId) }, { $set: body });
      res.send(body);
    } else {
      res.status(404).json({ error: "não foi possível editar" });
    }
  });

  app.delete("/item/:id", async function (req, res) {
    const itemId = req.params.id;

    if (itemId) {
      const item = await collection.deleteOne({ _id: new ObjectId(itemId) });
      res.send(item);
    } else {
      res.status(404).json({ error: "não foi possível excluir" });
    }
  });

  app.listen(3000); //a API roda nessa porta
}
//OobjectId é uma promisse, então para trazer o resultado daqueles métodos que fazem busca por id, preciso esperar  o retorno da API, para isso eu uso o await como froma de dizer ao código que espere a busca da API finalizar para executar a função.

main();