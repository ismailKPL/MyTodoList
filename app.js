const form = document.querySelector('form');
const input = document.querySelector('#taskInput');
const ul = document.querySelector('.taskList');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Fonction pour ajouter une tâche à la liste
function addTask(taskText) {
  const li = document.createElement('li');
  const btnSupp = document.createElement('button');
  btnSupp.classList.add("btnSupp")
  btnSupp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.7574 7.7574 12 12.0001m0 0 4.2426 4.2426M12 12.0001l4.2426-4.2427M12 12.0001l-4.2426 4.2426" stroke="currentColor" stroke-width="1.5"/></svg>';


  const btnCheck = document.createElement('button');
  btnCheck.classList.add("btnCheck");
  btnCheck.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 12L10.5 15.75L17.25 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  btnCheck.addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks();
  });

  btnSupp.addEventListener('click', function() {
    li.remove();
    tasks.splice(tasks.indexOf(taskText), 1);
    saveTasks();
  });

  li.appendChild(document.createTextNode(taskText));
  li.appendChild(btnSupp);
  ul.appendChild(li);

  li.appendChild(btnCheck);
}

// Fonction pour enregistrer les tâches dans le stockage local
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Ajouter les tâches enregistrées dans le stockage local
for (let i = 0; i < tasks.length; i++) {
  addTask(tasks[i]);
}

// Ajouter une tâche à la liste
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskText = input.value;
  if (taskText !== '') {
    addTask(taskText);
    tasks.push(taskText);
    saveTasks();
    input.value = '';
  }
});

// Supprimer une tâche de la liste
ul.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList === 'btnSupp') {
    const li = target.parentNode;
    const taskText = li.textContent;
    tasks.splice(tasks.indexOf(taskText), 1);
    li.remove();
    saveTasks();
  }
});

// Marquer une tâche comme terminée
ul.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList === 'btnCheck') {
    const li = target.parentNode;
    li.classList.toggle('completed');
    saveTasks();
  }
});
