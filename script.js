function adicionarRegistro() {
    const usuario = document.getElementById("usuario").value;
    const quantidadeAgua = document.getElementById("quantidadeAgua").value;

    // Cria um novo objeto de data no momento da chamada da função com o fuso horário do Brasil
    const dataAtual = new Date().toLocaleString("pt-BR");

    const novoRegistro = {
        usuario: usuario,
        quantidade_agua_ml: quantidadeAgua,
        data: dataAtual // Envia a data e a hora do sistema no fuso horário do Brasil para a API
    };

    fetch('https://server1-7xoj.onrender.com/registros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoRegistro)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registro adicionado:', data);
        exibirRegistroNaTela(data); // Chama a função para exibir o registro na tela
        limparCamposDeEntrada(); // Chama a função para limpar os campos de entrada
    })
    .catch(error => {
        console.error('Erro ao adicionar registro:', error);
    });
}

function exibirRegistroNaTela(registro) {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerText = `Registro adicionado:\nUsuário: ${registro.usuario}\nQuantidade de água: ${registro.quantidade_agua_ml} ml`;
}

function limparCamposDeEntrada() {
    // Limpa os valores dos campos de entrada
    document.getElementById("usuario").value = '';
    document.getElementById("quantidadeAgua").value = '';
}

function pesquisarHidratacao() {
    const usuario = document.getElementById("usuario").value;
    const resultadoElement = document.getElementById("resultado");

    // Verifica se o campo de usuário está vazio
    if (!usuario) {
        alert("Por favor, insira um nome de usuário antes de pesquisar.");
        return;
    }

    // Faz a requisição para a API passando o nome do usuário como parâmetro de consulta
    fetch(`https://server1-7xoj.onrender.com/registros?usuario=${usuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Filtra os registros apenas para o usuário específico
        const registrosDoUsuario = data.filter(registro => registro.usuario.toLowerCase() === usuario.toLowerCase());

        // Calcula o total de água consumida pelo usuário específico
        const totalHidratacao = registrosDoUsuario.reduce((total, registro) => total + parseInt(registro.quantidade_agua_ml), 0);
        
        // Exibe o resultado na tela
        resultadoElement.innerText = `Total de água consumida por ${usuario}: ${totalHidratacao} ml`;

        // Verifica se o usuário atingiu a meta diária de 3 litros (3000 ml)
        if (totalHidratacao >= 3000) {
            resultadoElement.innerText += "\nParabéns! Você atingiu sua meta diária!";
        } else {
            resultadoElement.innerText += "\nVocê ainda não atingiu sua meta diária.";
        }
    })
    .catch(error => {
        console.error('Erro ao pesquisar hidratação:', error);
    });
}

