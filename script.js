class Despesa {
        
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for(let x in this) {
            if(this[x] === undefined || this[x] === null || this[x] === '') {
                return false;
            }
        }
        return true;
    }
}

class BD {

    constructor() {
        let id = localStorage.getItem('id');

        if(id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(desp) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(desp));
        localStorage.setItem('id', id);
    }
}

function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
    let bd = new BD();

    if(despesa.validarDados()) {
        //bd.gravar(despesa);
        document.getElementById('modalTitulo').innerHTML = 'Sucesso na Gravação';
        document.getElementById('modalTitulo').className = 'modal-title text-success';
        document.getElementById('modalTexto').innerHTML = 'A despesa foi cadastrada com sucesso!';
        document.getElementById('botaoVoltar').className = 'btn btn-success';
        //Diálogo de sucesso
        $('#modalRegistro').modal('show');
    } else {
        document.getElementById('modalTitulo').innerHTML = 'Erro na Gravação';
        document.getElementById('modalTitulo').className = 'modal-title text-danger';
        document.getElementById('modalTexto').innerHTML = 'Existem campos obrigatórios que não foram preenchidos!';
        document.getElementById('modalBotao').className = 'btn btn-danger';
        //Diálogo de erro
        $('#modalRegistro').modal('show');
    }
}