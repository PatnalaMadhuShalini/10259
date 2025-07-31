var todoNumber = 1;
var allTodos = [];

//  initial todos
allTodos = [
    {
        id: todoNumber++,
        title: "Vocal Warm-Up Exercises",
        description: "Practice Sarali Varisai (ascending & descending) in 3 speeds for voice control.",
        targetDate: "20-07-2025 07:15",
        status: "Pending"
    },
    {
        id: todoNumber++,
        title: "Learn New Geetham – \"Lambodara\"",
        description: "Start learning Geetham in Raga Malahari with proper swara alignment.",
        targetDate: "20-08-2025 07:45",
        status: "Pending"
    },
    {
        id: todoNumber++,
        title: "Practice Alankaras",
        description: "Practice 4 Alankaras in Adi Talam using multiple ragas (Mayamalavagowla, Shankarabharanam).",
        targetDate: "20-08-2025 16:00",
        status: "Pending"
    },
    {
        id: todoNumber++,
        title: "Record and Review Practice",
        description: "Record today's music practice and review it to correct sruthi and tala alignment.",
        targetDate: "21-08-2025 18:00",
        status: "Pending"
    }
];

//1.function to make new id numbers 
function generateId() {
    var newId = todoNumber;
    todoNumber = todoNumber + 1;
    return newId;
}

//2.function to add new todo
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

// 3.Function to show todos in table
function showAllTodos() {
    var tableBody = document.getElementById('todoTableBody');
    tableBody.innerHTML = '';

    if (allTodos.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No todos yet! Add your first task above. </td></tr>';
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
        newRow += '<td>';
        if (todo.status !== 'Completed') {
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'In Progress\')">In Progress</button> ';
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'Completed\')">Complete</button>';
        }
        newRow += '</td>';
        newRow += '</tr>';

        tableBody.innerHTML += newRow;
    }
}

// function to handle the status change 
function changeStatus(id, newStatus) {
    for (var i = 0; i < allTodos.length; i++) {
        if (allTodos[i].id === id) {
            allTodos[i].status = newStatus;
            break;
        }
    }
    showAllTodos();
}

// Function to clear the form 
function clearForm() {
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoDesc').value = '';
    document.getElementById('targetDate').value = '';
    document.getElementById('status').value = 'Pending';
}

// when form is submitted 
document.getElementById('todoForm').onsubmit = function(e) {
    e.preventDefault();

    var title = document.getElementById('todoTitle').value;
    var description = document.getElementById('todoDesc').value;
    var targetDate = document.getElementById('targetDate').value;
    var status = document.getElementById('status').value;


    addTodo(title, description, targetDate, status);
};






