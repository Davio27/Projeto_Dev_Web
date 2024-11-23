import {getItensBD, setItensBD} from "./bancoperf.js";
import { validateLogin } from "./autentication.js";



window.onload = function() {
  if (validateLogin == false) {
    window.location.href = '../docs/index.html';
  }

};


// Seletores
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sGenero = document.querySelector('#m-genero');
const sTipo = document.querySelector('#m-tipo');
const sOcasiao = document.querySelector('#m-ocasiao');
const sValor = document.querySelector('#m-valor');
const sDescricao = document.querySelector('#m-descricao');
const btnSalvar = document.querySelector('#btnSalvar');
const searchInput = document.querySelector('#search');
const imgFoto = '/docs/imgs/perfumefoto.png'


let itens = [];
let id;

// Função para abrir o modal
function openModal(edit = false, index = 0) {
  modal.classList.add('active');
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sGenero.value = itens[index].genero;
    sTipo.value = itens[index].tipo;
    sOcasiao.value = itens[index].ocasiao;
    sDescricao.value = itens[index].descricao;
    sValor.value = itens[index].valor;
    id = index;
  } else {
    sNome.value = '';
    sGenero.value = '';
    sTipo.value = '';
    sOcasiao.value = '';
    sDescricao.value = '';
    sValor.value = '';
  }
}

// Editar item
function editItem(index) {
  openModal(true, index);
}

// Deletar item
function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD(); // Atualiza o banco após deletar
  loadItens();
}

// Inserir item na tabela
function insertItem(item, index) {
  let tr = document.createElement('tr');

  // Truncar a descrição se tiver mais de 9 caracteres
  const descricaolimitada = item.descricao.length > 9 
    ? item.descricao.slice(0, 9) + '...' 
    : item.descricao;

  tr.innerHTML = `
    <td><img src="${imgFoto}" alt="Foto do perfume" style="width: 50px; height: 50px; border-radius: 5px;" /></td>
    <td>${item.nome}</td>
    <td>${item.genero}</td>
    <td>${item.tipo}</td>
    <td>${item.ocasiao}</td>
    <td>${descricaolimitada}</td>
    <td>R$ ${item.valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})" style="color: red;"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

// Salvar item no modal
btnSalvar.onclick = e => {
  if (sNome.value == '' ||
     sGenero.value == '' ||
      sTipo.value == '' ||
       sOcasiao.value == '' ||
        sDescricao.value == '' ||
         sValor.value == '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].genero = sGenero.value;
    itens[id].tipo = sTipo.value;
    itens[id].ocasiao = sOcasiao.value;
    itens[id].descricao = sDescricao.value;
    itens[id].valor = sValor.value;
  } else {
    itens.push({
      'nome': sNome.value,
      'genero': sGenero.value,
      'tipo': sTipo.value,
      'ocasiao': sOcasiao.value,
      'descricao': sDescricao.value,
      'valor': sValor.value
    });
  }

  setItensBD(itens); // Salva os dados no banco

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

// Carregar itens do banco
async function loadItens() {
  try {
    // Obter itens do banco
    const rawData = await getItensBD(); 

    // Verificar se os dados são um objeto (transformar em array, se necessário)
    itens = rawData ? Object.values(rawData) : [];

    // Limpar e renderizar a tabela
    tbody.innerHTML = "";
    itens.forEach((item, index) => {
      insertItem(item, index);
    });

    // Exibir modal de sucesso
    showSuccessModal();
  } catch (error) {
    console.error("Erro ao carregar itens:", error);
    showFaletModal();
  }
}


// Filtro de pesquisa
searchInput.addEventListener('input', filterItems);

function filterItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = itens.filter(item => 
    item.nome.toLowerCase().includes(searchTerm) || 
    item.genero.toLowerCase().includes(searchTerm) ||
    item.tipo.toLowerCase().includes(searchTerm)
  );
  tbody.innerHTML = ''; // Limpa a tabela
  filteredItems.forEach((item, index) => {
    insertItem(item, index); // Insere os itens filtrados
  });
}

function showSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'flex'; // Exibe a modal
  setTimeout(() => {
    modal.style.display = 'none'; // Oculta a modal após 3 segundos
  }, 2000); // Tempo em milissegundos
}

function showFaletModal() {
  const modal = document.getElementById('faletModal');
  modal.style.display = 'flex'; // Exibe a modal
  setTimeout(() => {
    modal.style.display = 'none'; // Oculta a modal após 3 segundos
  }, 2000); // Tempo em milissegundos
}

function SucessoSalvarModal() {
  const modal = document.getElementById('sucessosalvarModal');
  modal.style.display = 'flex'; // Exibe a modal
  setTimeout(() => {
    modal.style.display = 'none'; // Oculta a modal após 3 segundos
  }, 2000); // Tempo em milissegundos
}

function FaletSalvarModal() {
  const modal = document.getElementById('faletsalvarModal');
  modal.style.display = 'flex'; // Exibe a modal
  setTimeout(() => {
    modal.style.display = 'none'; // Oculta a modal após 3 segundos
  }, 2000); // Tempo em milissegundos
}




// Carregamento inicial
loadItens();
window.openModal = openModal;
window.editItem = editItem;
window.deleteItem = deleteItem;


