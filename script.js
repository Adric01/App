const { select, input, checkbox } = require('@inquirer/prompts')

let metas = []




const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})

    if( meta.length == 0){
        console.log('A meta não pode ser vazia')
        return
    }
    
    metas.push(
        {value: meta, checked: false})
}   

const listarMeta = async () => {


    const respostas = await checkbox ({
        message: "Use as setas para mudar entre as metas, espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas]
    });

    if (respostas.length == 0){
         console.log("Nenhuma meta foi selecionada")
         return
    }

    metas.forEach((m) => {
        m.checked = false
    })
    
    respostas.forEach ((resposta) => {
        const meta = metas.find((m) =>{
                return m.value == resposta
        })

        meta.checked = true
        });

        console.log("Meta(s) marcada(s) como concluida(s)");
};

const start = async() => {

    while (true){

      const opcao = await select({
         message: "Menu >",
         choices: [{
            name: "Cadastrar meta",
            value: "cadastrar"
         },
         {
            name: "Listar metas",
            value: "listar"
         },
         {
            name: "Sair",
            value: "sair"
         }]
       })

        switch (opcao) {
            case "cadastrar":
             await cadastrarMeta()
             console.log(metas)
                break
            case "listar":
             await listarMeta()

                break
            case "sair":

                return
        }

    }
}
start()