import { Tarefa } from "./modelo.js";


async function adicionarTarefa(nome) {
    if (!nome) {
        console.log("Nome da tarefa não pode ser vazio.");
        return;
    }
    
    const tarefa = new Tarefa(nome); 
    try {
        
        await tarefa.inserir();
        console.log(`Tarefa '${nome}' adicionada com sucesso! ID: ${tarefa.id}`);
    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error.message);
    }
}


async function buscarTarefa(nome) {
    if (!nome) return null;
    
    const tarefa = new Tarefa(nome); 
    try {
       
        const resultado = await tarefa.buscar(); 
        if (resultado) {
            console.log(`Tarefa encontrada: Nome: ${tarefa.nome}, Concluída: ${tarefa.concluida}, ID: ${tarefa.id}`);
        } else {
            console.log(`Tarefa com nome '${nome}' não encontrada.`);
        }
        return resultado;
    } catch (error) {
        console.error("Erro ao buscar tarefa:", error.message);
        return null;
    }
}


async function atualizarTarefa(nome, concluida) {
    if (!nome) return;

    
    const tarefa = new Tarefa(nome);

    try {
        
        const tarefaEncontrada = await tarefa.buscar();

        if (tarefaEncontrada) {
            
            tarefa.concluida = concluida !== undefined ? (concluida.toLowerCase() === 'true' || concluida === true) : tarefa.concluida;
            
            
            await tarefa.alterar();
            console.log(`Tarefa '${nome}' atualizada para concluída: ${tarefa.concluida}`);
        } else {
            console.log(`Não é possível atualizar. Tarefa com nome '${nome}' não encontrada.`);
        }
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error.message);
    }
}


async function removerTarefa(nome) {
    if (!nome) return;

   
    const tarefa = new Tarefa(nome);

    try {
        
        const tarefaEncontrada = await tarefa.buscar();

        if (tarefaEncontrada) {
            
            await tarefa.deletar();
            console.log(`Tarefa '${nome}' removida com sucesso.`);
        } else {
            console.log(`Não é possível remover. Tarefa com nome '${nome}' não encontrada.`);
        }
    } catch (error) {
        console.error("Erro ao remover tarefa:", error.message);
    }
}

export {
    adicionarTarefa,
    buscarTarefa,
    atualizarTarefa,
    removerTarefa
};