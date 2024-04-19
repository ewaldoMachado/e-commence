// ---------- Capturar Elementos ----------
const nomeInput = document.getElementById('nome-input')
const valorInput = document.getElementById('valor-input')
const descricaoInput = document.getElementById('descricao-input')
const btnEnviar = document.getElementById('enviar')
const helperTextPost = document.getElementById('helper-text-post')
const postContainer = document.getElementById('post-container')

// ---------- Funções ----------
function gerarCadastro(evento) {
    evento.preventDefault()

    const jsonBody = JSON.stringify({
        produto: nomeInput.value,
        valor: valorInput.value,
        descricao: descricaoInput.value
    })

// ---------- Enviar informações para o Back End usando a Fetch API ----------
    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: jsonBody
    })
    .then((res) => res.json())
    .then((data) => {
        if(data && data.jsonBody){
           console.log(data)
           const post = document.createElement('div')
           post.classList.add('postagem')
           post.innerHTML = `
           <h2>Produtos Cadastrados</h2>
           <span>${data.produto}</span>
           <span>${data.valor}</span>
           <p>${data.descricao}</p>
           `
           postContainer.appendChild(post);
        } else {
            return error
        }

// ---------- Limpar os inputs caso a requisição seja tratada com sucesso ----------
        nomeInput.value = ''
        valorInput.value = ''
        descricaoInput.value = '' 

    })
    .catch((error) => {
        console.log(error);
        helperTextPost.innerText = 'As propriedades não foram definidas nos dados retornados.';
    })

}

// ---------- Evento ----------
btnEnviar.addEventListener('click', (evento) => gerarCadastro(evento))