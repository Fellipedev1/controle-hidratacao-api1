function adicionarRegistro() {
    const usuario = document.getElementById("usuario").value;
    const quantidadeAgua = document.getElementById("quantidadeAgua").value;
    const data = document.getElementById("data").value;

    const novoRegistro = {
        usuario: usuario,
        quantidade_agua_ml: quantidadeAgua,
        data: data
    };

    fetch('http://172.16.31.43:3000/registros', {
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
    // Exibe os detalhes do registro em um alerta
    alert(`Registro adicionado:\nUsuário: ${registro.usuario}\nQuantidade de água: ${registro.quantidade_agua_ml} ml\nData: ${registro.data}`);
}

function limparCamposDeEntrada() {
    // Limpa os valores dos campos de entrada
    document.getElementById("usuario").value = '';
    document.getElementById("quantidadeAgua").value = '';
    document.getElementById("data").value = '';
}


function pesquisarHidratacao() {
    const usuario = document.getElementById("usuario").value;
    
    // Verifica se o campo de usuário está vazio
    if (!usuario) {
        alert("Por favor, insira um nome de usuário antes de pesquisar.");
        return;
    }

    fetch(`http://172.16.31.43:3000/registros?usuario=${usuario}`)
        .then(response => response.json())
        .then(data => {
            const totalHidratacao = data.reduce((total, registro) => total + parseInt(registro.quantidade_agua_ml), 0);
            document.getElementById("resultado").innerText = `Total de água consumida por ${usuario}: ${totalHidratacao} ml`;
        })
        .catch(error => {
            console.error('Erro ao pesquisar hidratação:', error);
        });
}
