import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { validateLogin } from "./autentication.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLas1vJi4T4z8YsDt33ZUwaw1yh8hUo_4",
  authDomain: "dadosperfumes.firebaseapp.com",
  databaseURL: "https://dadosperfumes-default-rtdb.firebaseio.com",
  projectId: "dadosperfumes",
  storageBucket: "dadosperfumes.firebasestorage.app",
  messagingSenderId: "387371464319",
  appId: "1:387371464319:web:198e570bed6703b651b14a"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.onload = function() {
  if (validateLogin == false) {
    window.location.href = './index.html';
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
const imgFoto = './imgs/perfumefoto.png'


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
  if (sNome.value == '' || sGenero.value == '' || sTipo.value == '' || sOcasiao.value == '' || sDescricao.value == '' || sValor.value == '') {
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

  setItensBD(); // Salva os dados no banco

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

// Carregar itens do banco
async function loadItens() {
  itens = await getItensBD(); // Aguarda dados do Firebase
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

// Buscar itens no banco
const getItensBD = async () => {
  const referencia = ref(db, "Perfumes/");
  try {
    const snapshot = await get(referencia); // Busca dados do banco
    if (snapshot.exists()) {
      showSuccessModal();
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    showFaletModal();
    return [];
  }
};

// Salvar itens no banco
const setItensBD = () => {
  const referencia = ref(db, "Perfumes/");
  set(referencia, itens) // Salva o array de itens no Firebase
    .then(() => {
      SucessoSalvarModal();
    })
    .catch((error) => {
      FaletSalvarModal();
    });
};

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


