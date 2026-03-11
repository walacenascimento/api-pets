import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto'

import { pets } from './pets.js'
import { validaCamposMidlleware } from './midlleware.js'


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Aqui será definido as rotas
// ROTA PADRÃO / lista todos os dados da API
// /
app.get("/", (req, res) => {
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

// ROTA GET/ID - Lista o pets pelo id
// /get/:id
app.get("/pets/:id", (req, res) =>{
    try {
        // entrada
        const { id } = req.params

        // processamento
        const pet = pets.find(item => item.id === id);
        if(!pet) {
            res.status(404).send({
                Ok: false,
                Mensagem: "Pet não foi encontrado"
            });
        }

        // saída
        res.status(200).send({
            Ok: true,
            Mensagem: "Pet obtido com sucesso!",
            Dados: pet
        });

        
    } catch (error) {
        res.status(500).send({
            Ok: false,
            Mensagem: "Algo deu errado no servidor!"
        });
    }

});

// ROTA POST - Criar um novo pet
// /pets
app.post("/pets", [validaCamposMidlleware], (req, res) => {
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
            Dados: novoPet
        });

    } catch (error) {
        res.status(500).send({
            Ok: false,
            Mensagem: error.toString()
        });
    }
});

// ROTA PUT - Atualiza um pet
// /pets/:id
app.put("/pets/:id", [validaCamposMidlleware], (req, res) => {
    try {
        // entrada
        const { id } = req.params;
        const { nome, raca, idade, nomeTutor } = req.body

        // Processamento
        const petAtualizado = pets.find(item => item.id === id); // buscando um pet pelo id
        if(!petAtualizado){
            res.status(400).send({
                Ok: false,
                Mensagem: "Pet não encontrado!"
            });
        }

        petAtualizado.nome = nome,
        petAtualizado.raca = raca,
        petAtualizado.idade = idade,
        petAtualizado.nomeTutor = nomeTutor

        //saida
        res.status(201).send({
            Ok: true,
            Mensagem: "Pet atualizado com sucesso!",
            Dados: petAtualizado
        });

        res.status(201).send({
            Ok: true,
            Mensagem: "Pet atualizado com sucesso!",
            Dados: petatualizado
        });

        
    } catch (error) {
        res.status(400).send({
            Ok: false,
            Mensagem: error.toString()
        });
    }
});

// ROTA DELETE - Exclui um pet 
// /pets/:id
app.delete("/pets/:id", (req, res) => {
    try {
        // entrada
        const { id } = req.params;

        //Processamento
        const petIndex = pets.findIndex(item => item.id === id);
        if(petIndex < 0){
            res.status(404).send({
                Ok: false,
                Mensagem: "Pet informado não existe ou não foi encontrado!"
            });
        }

        pets.splice(petIndex, 1);

        // Saída
        res.status(200).send({
            Ok: true,
            Mensagem: "Pet excluído com sucesso!",
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