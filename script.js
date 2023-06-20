const chk = document.getElementById('chk');
const input_form = document.getElementById('input_submit_form');

var clientes = [];
var pessoas = document.getElementById("listaPessoas");
const compoFiltro = document.getElementById("campoFiltro");

// início dark theme
window.onload = function() {
    var saudacao = document.getElementById('saudacao');
    var hora = new Date().getHours();

    if(hora < 6) {
        saudacao.innerHTML = "Goodnight!";
        darkMode();
    } else if(hora < 13) {
        saudacao.innerHTML = "Good Morning!";
    } else if(hora < 18) {
        saudacao.innerHTML = "Good Afternoon!";
    } else {
        saudacao.innerHTML = "Goodnight!";
        darkMode();
    }
    
}
chk.addEventListener('change', function() {
    darkMode();
});
function darkMode() {
    const conteiner = document.getElementById('conteiner');
    const label = document.getElementById('label_theme');
    const ball = document.getElementById('ball_theme');
    const moon = document.getElementById('moon');
    const conteiner_filter = document.getElementById('conteiner_filter');
    const conteiner_form = document.getElementById('conteiner_form');


    conteiner.classList.toggle('dark');
    label.classList.toggle('dark');
    ball.classList.toggle('dark');
    moon.classList.toggle('dark');
    conteiner_filter.classList.toggle('dark');
    conteiner_form.classList.toggle('dark');
};
// final dark theme


// inicio form
function validar() {
    let nome = document.getElementById("nome");
    let cpf = document.getElementById("cpf");
    let icon_nome = document.getElementById("icon_nome");
    let icon_cpf = document.getElementById("icon_cpf");
    
    if(checkInput(nome) == false) {
        inputBackground();
        icon_nome.style.color = "red";
        alert("Nome preenchido incorretamente");
        nome.focus();
        return false;
    } else if(checkCPF(cpf.value) == false) {
        inputBackground();
        icon_cpf.style.color = "red";
        alert("CPF preenchido incorretamente");
        cpf.focus();
        return false;
    } else {
        clientes.push({nome: nome.value, cpf: cpf.value});
        inputBackground();
        filtrar();
        document.getElementById('pessoas_form').reset();
        alert("Quantidade de Pessaoas no Vetor: "+clientes.length);
        return true;
    }
}
function inputBackground() {
    icon_nome.style.color = "var(--dark-100)";
    icon_cpf.style.color = "var(--dark-100)";
}
function checkInput(input) {
    if(input.value.length < 3)
        return false;
    if(input.value.match(/[^a-z ]+/gi))
        return false;
    return true;
}
function checkCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;

    strCPF = strCPF.replace(/[^\d]/g, "");

    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
}
function mascaraNome(obj) {
    let cpf_formatado = obj.value;
    cpf_formatado = cpf_formatado.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]/g, "");
    obj.value = cpf_formatado;

    console.log(obj.value);
}
function mascaraCPF(obj) {
    let cpf_formatado = obj.value;
    cpf_formatado = cpf_formatado.replace(/[^\d]/g, "");
    cpf_formatado = cpf_formatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    obj.value = cpf_formatado;

    console.log(obj.value);
}
// final form


// inico filter
function carregaLista(dados){
    pessoas.innerHTML = "";
    dados.forEach(elemento => {
        pessoas.innerHTML += "<li>" 
        + elemento.nome + ", "
        + elemento.cpf + "</li>";
    });
}
function filtrar(){
   let filtrado = clientes.filter( cliente => {
        return (
            cliente.nome.toLowerCase().includes(campoFiltro.value.toLowerCase())
            || cliente.cpf.includes(campoFiltro.value)
        );

   });
    carregaLista(filtrado);
}
// final filter