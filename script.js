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

    recuperarRegistros() {
        let id = localStorage.getItem('id');
        let registros = [];

        for(let cont = 1; cont <= id; cont++) {
            
            let registro = JSON.parse(localStorage.getItem(cont));
            
            if(registro !== null) {
                registros.push(registro);
            }
        }

        return registros;
    }
}

let bd = new BD();

function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

    if(despesa.validarDados()) {
        bd.gravar(despesa);
        document.getElementById('modalTitulo').innerHTML = 'Sucesso na Gravação';
        document.getElementById('modalTitulo').className = 'modal-title text-success';
        document.getElementById('modalTexto').innerHTML = 'A despesa foi cadastrada com sucesso!';
        document.getElementById('botaoVoltar').className = 'btn btn-success';
        //Diálogo de sucesso
        $('#modalRegistro').modal('show');

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } else {
        document.getElementById('modalTitulo').innerHTML = 'Erro na Gravação';
        document.getElementById('modalTitulo').className = 'modal-title text-danger';
        document.getElementById('modalTexto').innerHTML = 'Existem campos obrigatórios que não foram preenchidos!';
        document.getElementById('botaoVoltar').className = 'btn btn-danger';
        //Diálogo de erro
        $('#modalRegistro').modal('show');
    }
}

function carregarLista() {
    let registros = [];

    registros =  bd.recuperarRegistros();

    let listaTabela = document.getElementById('listaDespesas');
    
    registros.forEach(function(cont){
        
        //criando a linha
        let lin = listaTabela.insertRow();

        //criando a coluna
        lin.insertCell(0).innerHTML =  `${cont.dia}/${cont.mes}/${cont.ano}`;

        switch(cont.tipo) {
            case '1': cont.tipo = 'Alimentação';
                break;
            case '2': cont.tipo = 'Lazer';
                break;
            case '3': cont.tipo = 'Educação';
                break;
            case '4': cont.tipo = 'Saúde';
                break;
            case '5': cont.tipo = 'Transporte';
                break;
            case '6': cont.tipo = 'Outros';
                break;
        }

        lin.insertCell(1).innerHTML = cont.tipo;
        lin.insertCell(2).innerHTML = cont.descricao;
        lin.insertCell(3).innerHTML = cont.valor;
    })
}

   