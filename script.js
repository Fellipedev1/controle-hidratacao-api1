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

    fetch('http://192.168.0.101:3000/registros', {
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
    // Exibe apenas o nome do usuário e a quantidade de água no alerta para o usuário
    alert(`Registro adicionado:\nUsuário: ${registro.usuario}\nQuantidade de água: ${registro.quantidade_agua_ml} ml`);
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

    // Função para gerar uma cor hexadecimal aleatória
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Atualiza a cor do elemento a cada 10 segundos
    const colorChangingInterval = setInterval(() => {
        resultadoElement.style.color = getRandomColor();
    }, 10000); // 10000 milissegundos = 10 segundos

    // Faz a requisição para a API
    fetch(`http://192.168.0.101:3000/registros?usuario=${usuario}`)
        .then(response => response.json())
        .then(data => {
            clearInterval(colorChangingInterval); // Para a animação de mudança de cor
            const totalHidratacao = data.reduce((total, registro) => total + parseInt(registro.quantidade_agua_ml), 0);
            resultadoElement.style.color = "#000000"; // Restaura a cor original
            resultadoElement.innerText = `Total de água consumida por ${usuario}: ${totalHidratacao} ml`;

            // Verifica se a pessoa cumpriu a meta diária de 3 litros (3000 ml)
            if (totalHidratacao < 3000) {
                resultadoElement.innerText += "\nVocê ainda não cumpriu sua meta diária.";
            } else {
                resultadoElement.innerText += "\nParabéns! Você atingiu sua meta diária!";
            }
        })
        .catch(error => {
            console.error('Erro ao pesquisar hidratação:', error);
        });
}

