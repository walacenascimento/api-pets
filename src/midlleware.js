export const validaCamposMidlleware = (req, res, next) => {
    try {
        // Entrada
        const { nome, raca, idade, nomeTutor } = req.body;

        // processamento | validação
        if(!nome){
            res.status(404).send({
                Ok: false,
                Mensagem: `O campo nome não foi informado`
            });
        }

        if(!raca){
            res.status(404).send({
                Ok: false,
                Mensagem: `O campo raça não foi informado`
            });
        }

        if(!idade){
            res.status(404).send({
                Ok: false,
                Mensagem: `O campo idade não foi informado`
            });
        }
        if(!nomeTutor){
            res.status(404).send({
                Ok: false,
                Mensagem: `O campo nome do tutor não foi informado`
            });
        }
        
        next()

    } catch (error) {
        res.status(500).send({
            Ok: false,
            Mensagem: error.toString()
        });
    }

};