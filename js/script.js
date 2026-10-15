// ===== Formulário de Contato =====

const btn = document.querySelector(".contact-form .btn.btn--primary");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const telefone = document.querySelector("#telefone");
const mensagem = document.querySelector("#mensagem");
const form = document.querySelector(".contact-form");

if (btn) {

    btn.addEventListener("click", function (event) {
        event.preventDefault();

        if (
            nome.value.trim() === "" ||
            email.value.trim() === "" ||
            telefone.value.trim() === "" ||
            mensagem.value.trim() === ""
        ) {
            mensagem.classList.add("erro");
            mensagem.placeholder = "Preencha todos os campos!";
            return;
        }

        mensagem.classList.remove("erro");

        const aviso = document.createElement("p");
        aviso.textContent = "Mensagem enviada com sucesso!";
        aviso.classList.add("sucesso");

        form.appendChild(aviso);
    });

}

// ===== Formulário de Matrícula =====

let formulario = document.querySelector("#formAluno");

if (formulario) {

    let campoNomeAluno = document.querySelector("#nomeAluno");
    let campoIdade = document.querySelector("#idade");
    let campoPeso = document.querySelector("#peso");
    let campoData = document.querySelector("#data");
    let campoObjetivo = document.querySelector("#objetivo");
    let campoDieta = document.querySelector("#dieta");

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        // Remove mensagens e marcações de erro de tentativas anteriores
        [campoNomeAluno, campoIdade, campoPeso, campoData, campoObjetivo].forEach(function(campo) {
            campo.classList.remove("erro");
        });

        let mensagemAntiga = formulario.querySelector(".sucesso");
        if (mensagemAntiga) {
            mensagemAntiga.remove();
        }

        // Validação básica: nenhum campo obrigatório pode estar vazio
        let algumCampoInvalido = false;

        [campoNomeAluno, campoIdade, campoPeso, campoData, campoObjetivo].forEach(function(campo) {
            if (campo.value.trim() === "") {
                campo.classList.add("erro");
                algumCampoInvalido = true;
            }
        });

        if (algumCampoInvalido) {
            return;
        }

        let nomeAluno = campoNomeAluno.value;
        let idade = campoIdade.value;
        let peso = campoPeso.value;
        let data_matricula = campoData.value;
        let objetivo = campoObjetivo.value;

        let dieta = campoDieta.checked ? "Sim" : "Não";

        let corpo = "nome=" + encodeURIComponent(nomeAluno) +
            "&idade=" + encodeURIComponent(idade) +
            "&peso=" + encodeURIComponent(peso) +
            "&data_matricula=" + encodeURIComponent(data_matricula) +
            "&objetivo=" + encodeURIComponent(objetivo) +
            "&dieta=" + encodeURIComponent(dieta);

        fetch("../php/salvar.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: corpo
        })
        .then(function(resposta) {
            return resposta.text();
        })
        .then(function(texto) {

            if (texto.trim() === "ok") {

                const aviso = document.createElement("p");
                aviso.textContent = "Aluno matriculado com sucesso!";
                aviso.classList.add("sucesso");
                formulario.appendChild(aviso);

                formulario.reset();
                carregarAlunos();

            } else {
                console.log("Erro retornado pelo servidor: ", texto);
                campoNomeAluno.classList.add("erro");
            }

        })
        .catch(function(erro) {
            console.log("Erro ao cadastrar: ", erro);
        });

    });

}

function carregarAlunos() {

    let tabela = document.querySelector("#tabelaAlunos");
    if (!tabela) return;

    fetch("../php/listar.php")
        .then(function(resposta) {
            return resposta.text();
        })
        .then(function(html) {
            tabela.innerHTML = html;
        })
        .catch(function(erro) {
            console.log("Erro ao carregar alunos: ", erro);
        });

}

document.addEventListener("DOMContentLoaded", function() {
    carregarAlunos();
});
