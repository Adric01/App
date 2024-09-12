const { select, input } = require('@inquirer/prompts')

const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})

    if( meta.length == 0){
        console.log('A meta não pode ser vazia')
        return
    }
}   
const start = async() => {

    while (true){

      const opcao = await select({
         message: "Menu >",
         choices: [{
            name: "Cadastrar meta",
            value: "Cadastrar"
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
            await cadastrarMeta ()
                break
            case "listar":

                break
            case "sair":

                return
        }

    }
}