document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const title = document.getElementById('title');
    const welcome = document.querySelector('.welcome');
    const content = document.querySelector('.content');
    const emptyMessage = document.querySelector('.welcome p');

    // Limite de caracteres para o input
    const maxLength = 20; // Define o limite de caracteres

    // Verifica e limita o número de caracteres no input
    taskInput.addEventListener('input', () => {
        if (taskInput.value.length > maxLength) {
            // Corta o texto excedente
            taskInput.value = taskInput.value.slice(0, maxLength);
            alert(`Limite de ${maxLength} caracteres atingido!`);
        }
    });

    // Carrega tarefas do localStorage
    loadTasks();

    // Adiciona uma nova tarefa
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
            saveTasks();
        }

        title.textContent = 'Sua lista de tarefas:';
        welcome.style.display = 'none'; // Oculta a mensagem de boas-vindas
        content.style.display = 'block'; // Mostra a div .content
    });

    // Função para adicionar uma tarefa
    function addTask(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.textContent = taskText; // Adiciona o texto da tarefa diretamente ao <li>
        if (isCompleted) {
            li.classList.add('completed');
        }
    
        li.classList.add('li');
    
        // Container para os botões
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
    
        // Botão de concluir
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Concluir';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
    
        // Botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
            checkEmptyList(); // Verifica se a lista está vazia após excluir uma tarefa
        });
    
        deleteButton.classList.add('clear');
    
        // Adiciona os botões ao container
        buttonsContainer.appendChild(completeButton);
        buttonsContainer.appendChild(deleteButton);
    
        // Adiciona o container dos botões ao <li>
        li.appendChild(buttonsContainer);
    
        // Adiciona a tarefa à lista
        taskList.appendChild(li);
    
        // Oculta a mensagem de lista vazia
        welcome.style.display = 'none';
    }
    
    // Salva as tarefas no localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('ConcluirExcluir', '').trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Carrega as tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (tasks.length > 0) {
            content.style.display = 'block'; // Mostra a div .content se houver tarefas
            welcome.style.display = 'none'; // Oculta a mensagem de boas-vindas
        } else {
            content.style.display = 'none'; // Oculta a div .content se não houver tarefas
            welcome.style.display = 'flex'; // Mostra a mensagem de boas-vindas
        }
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }

    // Verifica se a lista está vazia
    function checkEmptyList() {
        if (taskList.children.length === 0) {
            content.style.display = 'none'; // Oculta a div .content se a lista estiver vazia
            welcome.style.display = 'block'; // Mostra a mensagem de boas-vindas
        }
    }

    // Verifica se a lista está vazia ao carregar a página
    checkEmptyList();
});