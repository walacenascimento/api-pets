import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto'

import { pets } from './pets.js'


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Aqui será definido as rotas
// ROTA PADRÃO / lista todos os dados da API
app.get("/", (req, res) => {
    try {
        res.status(200).json({
        Ok: true,
        Mensagem: "Rota GET/ primeira rota da API-PETS"
    })
        
    } catch (error) {
        res.status(500).send({
            Ok: false,
            Mensage: error.toString()
        });
    }
});

// ROTA GET - Lista todos o pets
app.get("/pets", (req, res) =>{
    try {
        res.status(200).send({
            Ok: true,
            Mensagem: "Pets listados com sucesso!",
            Dados: pets
        });
        
    } catch (error) {
        res.status(500).send({
            Ok: false,
            Mensagem: error.toString()
        });
    };
});

// ROTA POST - Criar um novo pet
app.post("/pets", (req, res) => {
    try {
        // Entrada
        const { nome, raca, idade, nomeTutor } = req.body;

        // Processamento
        const novoPet = {
            id: randomUUID(),
            nome: nome,
            raca:raca,
            idade: idade,
            nomeTutor: nomeTutor
        }

        pets.push(novoPet);

        // Saída
        res.status(201).send({
            Ok: true,
            Mensagem: "Novo pet criado com sucesso!",
            Dados: pets
        });

    } catch (error) {
        res.status(500).send({
            Ok: false,
            Mensagem: error.toString()
        });
    }
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});