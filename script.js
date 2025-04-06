let motoristas = JSON.parse(localStorage.getItem('motoristas')) || [];
let editando = false;
let motoristaId = null;

const form = document.getElementById('motoristaForm');
const tabelaMotoristas = document.getElementById('listaMotoristas');
const salvarBtn = document.getElementById('salvarBtn');
const cancelarBtn = document.getElementById('cancelarBtn');

// Salvar motorista (Create/Update)
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const rota = document.getElementById('rota').value;
    const celular = document.getElementById('celular').value;

    if (editando) {
        // Atualizar motorista existente
        motoristas[motoristaId] = { nome, rota, celular };
        editando = false;
        motoristaId = null;
        salvarBtn.textContent = 'Salvar';
    } else {
        // Adicionar novo motorista
        motoristas.push({ nome, rota, celular });
    }

    localStorage.setItem('motoristas', JSON.stringify(motoristas));
    form.reset();
    listarMotoristas();
});

// Cancelar edição
cancelarBtn.addEventListener('click', () => {
    form.reset();
    editando = false;
    motoristaId = null;
    salvarBtn.textContent = 'Salvar';
});

// Listar motoristas (Read)
function listarMotoristas() {
    tabelaMotoristas.innerHTML = '';
    motoristas.forEach((motorista, index) => {
        tabelaMotoristas.innerHTML += `
            <tr>
                <td>${motorista.nome}</td>
                <td>${motorista.rota}</td>
                <td>${motorista.celular}</td>
                <td>
                    <button class="editar" onclick="editarMotorista(${index})">Editar</button>
                    <button class="excluir" onclick="excluirMotorista(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

// Editar motorista (Update)
function editarMotorista(index) {
    const motorista = motoristas[index];
    document.getElementById('nome').value = motorista.nome;
    document.getElementById('rota').value = motorista.rota;
    document.getElementById('celular').value = motorista.celular;
    editando = true;
    motoristaId = index;
    salvarBtn.textContent = 'Atualizar';
}

// Excluir motorista (Delete)
function excluirMotorista(index) {
    if (confirm('Tem certeza que deseja excluir este motorista?')) {
        motoristas.splice(index, 1);
        localStorage.setItem('motoristas', JSON.stringify(motoristas));
        listarMotoristas();
    }
}

// Inicializar lista
listarMotoristas();