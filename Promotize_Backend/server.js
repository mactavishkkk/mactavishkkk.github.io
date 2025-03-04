const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// Configuração do Firebase
const serviceAccount = require('./promotize-e5453-firebase-adminsdk-fbsvc-74593bfcaf.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/promotize/firestore/databases/-default-/data/'
});

const db = admin.firestore();

// Middleware de Análise do JSON
app.use(express.json());

// Cadastro de uma nova Oferta
app.post('/businesses', async (req, res) => {
  try {
    const { imagem, descricao, categoria, dataTermino } = req.body;

    // Verificar se todos os campos foram preenchidos
    if (!imagem || !descricao || !categoria || !dataTermino) {
      return res.status(400).send('Todos os campos são obrigatórios!');
    }

    // Adicionar a nova oferta ao Firestore
    const newOfferRef = db.collection('businesses').doc();
    await newOfferRef.set({
      imagem,
      descricao,
      categoria,
      dataTermino,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).send('Oferta postada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar a oferta: ' + error.message);
  }
});

// Visualização das Ofertas Cadastradas
app.get('/businesses', async (req, res) => {
  try {
    // Obter todas as ofertas do Firestore
    const offersSnapshot = await db.collection('businesses').get();
    const offers = offersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).send('Erro ao obter as ofertas: ' + error.message);
  }
});

// Edição de uma Oferta
app.put('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { imagem, descricao, categoria, dataTermino } = req.body;

    // Verificar se todos os campos foram preenchidos
    if (!imagem || !descricao || !categoria || !dataTermino) {
      return res.status(400).send('Todos os campos são obrigatórios!');
    }

    // Atualizar a oferta no Firestore
    await db.collection('businesses').doc(id).update({
      imagem,
      descricao,
      categoria,
      dataTermino,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send('Oferta atualizada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao atualizar a oferta: ' + error.message);
  }
});

// Exclusão de uma Oferta
app.delete('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deletar a oferta do Firestore
    await db.collection('offers').doc(id).delete();

    res.status(200).send('Oferta deletada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar a oferta: ' + error.message);
  }
});

// Iniciando o Servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});