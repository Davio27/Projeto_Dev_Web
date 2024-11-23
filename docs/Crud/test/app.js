import { getItensBD } from '../bancoperf.js';

// Função para exibir os itens na tabela
async function loadItems() {
  const items = await getItensBD(); // Busca os dados do Firebase
  const tableBody = document.querySelector('#itensTabela tbody'); // Seleciona o corpo da tabela

  // Limpa o conteúdo atual da tabela
  tableBody.innerHTML = '';

  // Verifica se existem itens
  if (items && items.length > 0) {
    items.forEach(item => {
      const row = document.createElement('tr'); // Cria uma nova linha para cada item

      // Cria células para cada coluna
      row.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.genero}</td>
        <td>${item.tipo}</td>
        <td>${item.ocasiao}</td>
        <td>${item.descricao}</td>
        <td>R$ ${item.valor}</td>
      `;
      
      tableBody.appendChild(row); // Adiciona a linha à tabela
    });
  } else {
    // Caso não tenha itens no banco de dados, mostra uma mensagem
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6">Nenhum perfume encontrado.</td>`;
    tableBody.appendChild(row);
  }
}

// Chama a função para carregar os itens ao carregar a página
window.onload = loadItems;
