// Simple variables for beginners
var todoNumber = 1;
var allTodos = [];

// 1. Function to make new ID numbers
function generateId() {
    var newId = todoNumber;
    todoNumber = todoNumber + 1;
    return newId;
}

// 2. Function to add new todo
function addTodo(title, description, targetDate, status) {
    var newId = generateId();

    var newTodo = {
        id: newId,
        title: title,
        description: description,
        targetDate: targetDate,
        status: status
    };

    allTodos.push(newTodo);
    showAllTodos();
    clearForm();
}

// Function to show todos in table
function showAllTodos() {
    var tableBody = document.getElementById('todoTableBody');
    tableBody.innerHTML = '';

    if (allTodos.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="empty-state">No todos yet! Add your first task above. </td></tr>';
        return;
    }

    for (var i = 0; i < allTodos.length; i++) {
        var todo = allTodos[i];
        var statusColor = '';

        if (todo.status === 'Pending') {
            statusColor = 'status-pending';
        } else if (todo.status === 'In Progress') {
            statusColor = 'status-in-progress';
        } else if (todo.status === 'Completed') {
            statusColor = 'status-completed';
        }

        var newRow = '<tr>';
        newRow += '<td>' + todo.id + '</td>';
        newRow += '<td><strong>' + todo.title + '</strong></td>';
        newRow += '<td>' + todo.description + '</td>';
        newRow += '<td>' + todo.targetDate + '</td>';
        newRow += '<td><span class="' + statusColor + '">' + todo.status + '</span></td>';
        newRow += '</tr>';

        tableBody.innerHTML += newRow;
    }
}

// Function to clear the form
function clearForm() {
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoDesc').value = '';
    document.getElementById('targetDate').value = '';
    document.getElementById('status').value = 'Pending';
}

// When form is submitted
document.getElementById('todoForm').onsubmit = function(e) {
    e.preventDefault();

    var title = document.getElementById('todoTitle').value;
    var description = document.getElementById('todoDesc').value;
    var targetDate = document.getElementById('targetDate').value;
    var status = document.getElementById('status').value;

    addTodo(title, description, targetDate, status);
};

