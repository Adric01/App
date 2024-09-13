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
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0){
         console.log("Nenhuma meta foi selecionada")
         return
    }

    respostas.forEach ((resposta) => {
        const meta = metas.find((m) =>{
                return m.value == resposta
        })

        meta.checked = true
        })

        console.log("Meta(s) marcada(s) como concluida(s)");
};

const metasRealizadas = async () => {
    const realizadas = metas.filter ((meta) =>{
        return meta.checked
    })

    if (realizadas.length == 0){
        console.log ("Você não possui nenhuma meta realizada")
        return
    }

    await select({
        message: "Metas realizadas" + realizadas.length,
        choices: [...realizadas]
    })

}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0){
        console.log("Nenhuma meta está em aberto")
        return
    }
    await select({
        message: "Metas Abertas" + abertas.length,
        choices: [...abertas]
    })
}



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
            name: "Metas Realizadas",
            value: "realizadas"
         },
         {
            name: "Metas Abertas",
            value: "abertas"
         },
         {
            name: "Deletar Metas",
            value: "deletar"
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
            case "realizadas":
             await metasRealizadas()
                break
            case "abertas":
             await metasAbertas()
                break
                case "deletar":
             await deletarMetas()
                break
            case "sair":
             console.log("até a próxima !")
                return
        }

    }
}
start()