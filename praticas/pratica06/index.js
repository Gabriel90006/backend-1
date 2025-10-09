import * as readline from 'readline-sync';


import * as controlador from "./controlador.js";


function menu() {
    console.log("\n--- Gerenciador de Tarefas (CRUD) ---");
    console.log("1. Adicionar tarefa");
    console.log("2. Buscar tarefa");
    console.log("3. Atualizar tarefa");
    console.log("4. Remover tarefa");
    console.log("5. Sair");
    console.log("-------------------------------------");
}


async function escolherOpcao(opcao) {
    let nome, concluida;

    switch (opcao.trim()) {
        case '1':
            
            nome = readline.question("Digite o nome da tarefa a adicionar: ");
            await controlador.adicionarTarefa(nome);
            break;
        case '2':
            
            nome = readline.question("Digite o nome da tarefa a buscar: ");
            await controlador.buscarTarefa(nome);
            break;
        case '3':
            
            nome = readline.question("Digite o nome da tarefa a atualizar: ");
            concluida = readline.question("A tarefa está concluída? (true/false): ");
            await controlador.atualizarTarefa(nome, concluida);
            break;
        case '4':
           
            nome = readline.question("Digite o nome da tarefa a remover: ");
            await controlador.removerTarefa(nome);
            break;
        case '5':
            
            console.log("Encerrando a aplicação...");
            
            process.exit(0); 
            break;
        default:
            console.log("Opção inválida. Tente novamente.");
    }
}


async function main() {
    
    while (true) { 
        menu();
        
        const opcao = readline.question("Escolha uma opção: "); 
        
        await escolherOpcao(opcao); 
    }
}


main();

