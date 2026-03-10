import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
// import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Aqui será definido as rotas
app.get("/", (req, res) => {
    res.status(200).json({
        Ok: true,
        Mensagem: "Rota GET/ primeira rota da API-PETS"
    })
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});