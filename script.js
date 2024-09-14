const { select, input, checkbox } = require('@inquirer/prompts');
const { stringify } = require('querystring');
const { isNull } = require('util');
const fs = require("fs").promises

let metas = []
let mensagem = "Seja Bem Vindo";

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {fs.writeFile ("metas.json", JSON.stringify(metas, null, 2))}  

const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})

    if( meta.length == 0){
        mensagem = 'A meta não pode ser vazia'
        return
    }
    
    metas.push(
        {value: meta, checked: false})
    
    mensagem = 'Meta cadastrada com sucesso'
}   

const listarMeta = async () => {


    const respostas = await checkbox ({
        message: "Use as setas para mudar entre as metas, espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0){
         mensagem = 'Nenhuma meta foi selecionada'
         return
    }

    respostas.forEach ((resposta) => {
        const meta = metas.find((m) =>{
                return m.value == resposta
        })

        meta.checked = true
        })

        mensagem = 'Meta(s) marcada(s) como concluida(s)'
}

const metasRealizadas = async () => {
    const realizadas = metas.filter ((meta) =>{
        return meta.checked
    })

    if (realizadas.length == 0){
        console.log ("Você não possui nenhuma meta realizada")
        return
    }

    await select({
        message: "Metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })

}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0){
        mensagem = 'Nenhuma meta está em aberto'
        return
    }
    await select({
        message: "Metas Abertas:" + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) =>{
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione os itens para deletar",
        choices: [...metasDesmarcadas ],
        instructions: false
    })

    if (metasDesmarcadas.length == 0){
        mensagem = 'Nehum item selecionado para deletar'
        return
    }
    itensADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        }) 
    })
    mensagem = 'Meta(s) deletada(s) com sucesso!'   
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != " "){
        console.log(mensagem)
        console.log(" ")
        mensagem = " "
    }
}

const start = async() => { 
    await carregarMetas()

    while (true){
        mostrarMensagem()
        await salvarMetas()
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