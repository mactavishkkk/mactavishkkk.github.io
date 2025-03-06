const express = require('express');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Configuração do Firebase
const serviceAccount = require('./promotize-e5453-firebase-adminsdk-fbsvc-74593bfcaf.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/promotize/firestore/databases/-default-/data/'
});

const db = admin.firestore();
app.use(express.json());

// Cadastro de Usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).send('Todos os campos são obrigatórios!');
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuarioId = uuidv4();

    await db.collection('usuarios').doc(usuarioId).set({
      id: usuarioId,
      nome,
      email,
      senha: senhaHash,
      tipo,
      criado_em: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar o usuário: ' + error.message);
  }
});

// Buscar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuariosSnapshot = await db.collection('usuarios').get();
    const usuarios = usuariosSnapshot.docs.map(doc => doc.data());
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários: ' + error.message);
  }
});

// Buscar usuário por ID
app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioDoc = await db.collection('usuarios').doc(id).get();
    if (!usuarioDoc.exists) {
      return res.status(404).send('Usuário não encontrado!');
    }
    res.status(200).json(usuarioDoc.data());
  } catch (error) {
    res.status(500).send('Erro ao buscar usuário: ' + error.message);
  }
});

// Atualização de Usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    const usuarioId = req.params.id;

    if (!nome && !email && !senha && !tipo) {
      return res.status(400).send('Pelo menos um campo deve ser fornecido para atualização!');
    }

    const updates = {};
    if (nome) updates.nome = nome;
    if (email) updates.email = email;
    if (senha) updates.senha = await bcrypt.hash(senha, 10);  // Atualiza a senha de forma segura
    if (tipo) updates.tipo = tipo;

    updates.atualizado_em = admin.firestore.FieldValue.serverTimestamp();

    await db.collection('usuarios').doc(usuarioId).update(updates);

    res.status(200).send('Usuário atualizado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao atualizar o usuário: ' + error.message);
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarioId = req.params.id;

    const usuarioRef = db.collection('usuarios').doc(usuarioId);
    const doc = await usuarioRef.get();

    if (!doc.exists) {
      return res.status(404).send('Usuário não encontrado!');
    }

    await usuarioRef.delete();
    res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar o usuário: ' + error.message);
  }
});

// Cadastro de Empreendedor
app.post('/empreendedores', async (req, res) => {
  try {
    const { usuario_id, nome_empresa, descricao } = req.body;
    if (!usuario_id || !nome_empresa || !descricao) {
      return res.status(400).send('Todos os campos são obrigatórios!');
    }
    const empreendedorId = uuidv4();

    await db.collection('empreendedores').doc(empreendedorId).set({
      id: empreendedorId,
      usuario_id,
      nome_empresa,
      descricao,
      criado_em: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).send('Empreendedor cadastrado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar o empreendedor: ' + error.message);
  }
});

// Buscar todos os empreendedores
app.get('/empreendedores', async (req, res) => {
  try {
    const empreendedoresSnapshot = await db.collection('empreendedores').get();
    const empreendedores = empreendedoresSnapshot.docs.map(doc => doc.data());
    res.status(200).json(empreendedores);
  } catch (error) {
    res.status(500).send('Erro ao buscar empreendedores: ' + error.message);
  }
});

// Buscar empreendedor por ID
app.get('/empreendedores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const empreendedorDoc = await db.collection('empreendedores').doc(id).get();
    if (!empreendedorDoc.exists) {
      return res.status(404).send('Empreendedor não encontrado!');
    }
    res.status(200).json(empreendedorDoc.data());
  } catch (error) {
    res.status(500).send('Erro ao buscar empreendedor: ' + error.message);
  }
});

// Atualização de Empreendedor
app.put('/empreendedores/:id', async (req, res) => {
  try {
    const { usuario_id, nome_empresa, descricao } = req.body;
    const empreendedorId = req.params.id;

    if (!nome_empresa && !descricao && !usuario_id) {
      return res.status(400).send('Pelo menos um campo deve ser fornecido para atualização!');
    }

    const updates = {};
    if (nome_empresa) updates.nome_empresa = nome_empresa;
    if (descricao) updates.descricao = descricao;
    if (usuario_id) updates.usuario_id = usuario_id;

    updates.atualizado_em = admin.firestore.FieldValue.serverTimestamp();

    await db.collection('empreendedores').doc(empreendedorId).update(updates);

    res.status(200).send('Empreendedor atualizado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao atualizar o empreendedor: ' + error.message);
  }
});

app.delete('/empreendedores/:id', async (req, res) => {
  try {
    const empreendedorId = req.params.id;

    const empreendedorRef = db.collection('empreendedores').doc(empreendedorId);
    const doc = await empreendedorRef.get();

    if (!doc.exists) {
      return res.status(404).send('Empreendedor não encontrado!');
    }

    await empreendedorRef.delete();
    res.status(200).send('Empreendedor deletado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar o empreendedor: ' + error.message);
  }
});

// Cadastro de Postagem
app.post('/postagens', async (req, res) => {
  try {
    const { empreendedor_id, titulo, descricao, preco, ativo, categorias } = req.body;
    if (!empreendedor_id || !titulo || !descricao || preco === undefined || ativo === undefined || !categorias) {
      return res.status(400).send('Todos os campos são obrigatórios!');
    }
    const postagemId = uuidv4();

    await db.collection('postagens').doc(postagemId).set({
      id: postagemId,
      empreendedor_id,
      titulo,
      descricao,
      preco,
      ativo,
      criado_em: admin.firestore.FieldValue.serverTimestamp(),
      atualizado_em: admin.firestore.FieldValue.serverTimestamp(),
    });

    for (const categoriaId of categorias) {
      await db.collection('postagem_categorias').add({
        postagem_id: postagemId,
        categoria_id: categoriaId,
      });
    }

    res.status(201).send('Postagem cadastrada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar a postagem: ' + error.message);
  }
});

// Buscar todas as postagens
app.get('/postagens', async (req, res) => {
  try {
    const postagensSnapshot = await db.collection('postagens').get();
    const postagens = postagensSnapshot.docs.map(doc => doc.data());
    res.status(200).json(postagens);
  } catch (error) {
    res.status(500).send('Erro ao buscar postagens: ' + error.message);
  }
});

// Buscar postagem por ID
app.get('/postagens/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postagemDoc = await db.collection('postagens').doc(id).get();
    if (!postagemDoc.exists) {
      return res.status(404).send('Postagem não encontrada!');
    }
    res.status(200).json(postagemDoc.data());
  } catch (error) {
    res.status(500).send('Erro ao buscar postagem: ' + error.message);
  }
});

// Atualização de Postagem
app.put('/postagens/:id', async (req, res) => {
  try {
    const { empreendedor_id, titulo, descricao, preco, ativo, categorias } = req.body;
    const postagemId = req.params.id;

    if (!titulo && !descricao && preco === undefined && ativo === undefined && !categorias) {
      return res.status(400).send('Pelo menos um campo deve ser fornecido para atualização!');
    }

    const updates = {};
    if (titulo) updates.titulo = titulo;
    if (descricao) updates.descricao = descricao;
    if (preco !== undefined) updates.preco = preco;
    if (ativo !== undefined) updates.ativo = ativo;
    if (categorias !== undefined) updates.categorias = categorias;

    updates.atualizado_em = admin.firestore.FieldValue.serverTimestamp();

    await db.collection('postagens').doc(postagemId).update(updates);

    // Atualizando a tabela de categorias associadas
    if (categorias) {
      await db.collection('postagem_categorias').where('postagem_id', '==', postagemId).get()
        .then(snapshot => {
          snapshot.forEach(doc => doc.ref.delete()); // Deletando categorias antigas
        });
      
      // Adicionando novas categorias
      for (const categoriaId of categorias) {
        await db.collection('postagem_categorias').add({
          postagem_id: postagemId,
          categoria_id: categoriaId,
        });
      }
    }

    res.status(200).send('Postagem atualizada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao atualizar a postagem: ' + error.message);
  }
});

app.delete('/postagens/:id', async (req, res) => {
  try {
    const postagemId = req.params.id;

    const postagemRef = db.collection('postagens').doc(postagemId);
    const doc = await postagemRef.get();

    if (!doc.exists) {
      return res.status(404).send('Postagem não encontrada!');
    }

    await postagemRef.delete();

    // Deletar também as categorias associadas à postagem
    const categoriasRef = db.collection('postagem_categorias')
      .where('postagem_id', '==', postagemId);
    
    const categoriasSnapshot = await categoriasRef.get();
    categoriasSnapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });

    res.status(200).send('Postagem deletada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar a postagem: ' + error.message);
  }
});

// Buscar postagens de um empreendedor
app.get('/postagens/empreendedor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postagensSnapshot = await db.collection('postagens').where('empreendedor_id', '==', id).get();
    if (postagensSnapshot.empty) {
      return res.status(404).send('Nenhuma postagem encontrada para este empreendedor!');
    }
    const postagens = postagensSnapshot.docs.map(doc => doc.data());
    res.status(200).json(postagens);
  } catch (error) {
    res.status(500).send('Erro ao buscar postagens: ' + error.message);
  }
});

// Iniciando o Servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
