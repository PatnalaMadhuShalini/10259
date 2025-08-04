var todoNumber = 1;
var allTodos = [];

//  initial todos
allTodos = [
    {
        id: todoNumber++,
        title: "Vocal Warm-Up Exercises",
        description: "Practice Sarali Varisai (ascending & descending) in 3 speeds for voice control.",
        targetDate: "20-07-2025 07:15",
        duedate: "20-07-2025",
        priority: "High",
        status: "Completed",
        tags: ["vocal", "exercise"]
    },
    {
        id: todoNumber++,
        title: "Learn New Geetham – \"Lambodara\"",
        description: "Start learning Geetham in Raga Malahari with proper swara alignment.",
        targetDate: "20-08-2025 07:45",
        duedate: "20-08-2025",
        priority: "High",
        status: "Completed",
        tags: ["geetham", "raga", "learning"]
    },
    {
        id: todoNumber++,
        title: "Practice Alankaras",
        description: "Practice 4 Alankaras in Adi Talam using multiple ragas (Mayamalavagowla, Shankarabharanam).",
        targetDate: "20-08-2025 16:00",
        duedate: "20-08-2025",
        priority: "High",
        status: "Completed",
        tags: ["alankara", "practice"]
    },
    {
        id: todoNumber++,
        title: "Record and Review Practice",
        description: "Record today's music practice and review it to correct sruthi and tala alignment.",
        targetDate: "21-08-2025 18:00",
        duedate: "21-08-2025",
        priority: "Medium",
        status: "Completed",
        tags: ["recording", "review"]
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
        duedate: new Date(targetDate).toLocaleDateString(), // Format the date
        priority: document.getElementById('priority').value, // Get the priority from the form
        status: status,
        tags: document.getElementById('tags').value.split(','), // comma separated
        recurring: document.getElementById('recurring').value // Get the recurring value from the form
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
        tableBody.innerHTML = '<tr><td colspan="8" class="empty-state">No todos yet! Add your first task above. </td></tr>';
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

        // Check if overdue
        var isOverdue = false;
        if (todo.status !== 'Completed') {
            var dueDateObj = new Date(todo.duedate);
            var today = new Date();
            // Compare only date part
            if (dueDateObj.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                isOverdue = true;
            }
        }

        var newRow = '<tr' + (isOverdue ? ' style="background-color:#ffe6e6;"' : '') + '>';
        newRow += '<td>' + todo.id + '</td>';
        newRow += '<td><strong>' + todo.title + '</strong></td>';
        newRow += '<td>' + todo.description + '</td>';
        newRow += '<td>' + todo.targetDate + '</td>';
        newRow += '<td>' + todo.duedate + (isOverdue ? ' <span style="color:red;font-weight:bold;">(Overdue!)</span>' : '') + '</td>';
        newRow += '<td>' + todo.priority + '</td>';
        newRow += '<td><span class="' + statusColor + '">' + todo.status + '</span></td>';
        newRow += '<td>' + todo.tags.join(', ') + '</td>';
        newRow += '<td>' + (todo.recurring || '') + '</td>'; // Add recurring value
        newRow += '<td>'; // Start actions cell
        if (todo.status === 'Pending') {
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'In Progress\')">In Progress</button> ';
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'Completed\')">Complete</button>';
        } else if (todo.status === 'In Progress') {
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'Completed\')">Complete</button>';
        }
        // If status is 'Completed', no buttons are added
        newRow += '</td>'; // End actions cell
        newRow += '</tr>';

        tableBody.innerHTML += newRow;

        if (isOverdue) {
            showNotification('Task "' + todo.title + '" is overdue! Please complete it.');
        }
    }
    updateProgressBar();
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
    document.getElementById('tags').value = ''; // clear tags
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

// Filter function
function filterTodos() {
    var keyword = document.getElementById('searchInput').value.toLowerCase();
    var status = document.getElementById('filterStatus').value;
    var priority = document.getElementById('filterPriority').value;
    var filtered = allTodos.filter(todo =>
        (todo.title.toLowerCase().includes(keyword) || todo.description.toLowerCase().includes(keyword) || (todo.recurring && todo.recurring.toLowerCase().includes(keyword))) &&
        (status === '' || todo.status === status) &&
        (priority === '' || todo.priority === priority)
    );
    showFilteredTodos(filtered);
}

function showFilteredTodos(todos) {
    var tableBody = document.getElementById('todoTableBody');
    tableBody.innerHTML = '';

    if (todos.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="empty-state">No todos match your search criteria. </td></tr>';
        return;
    }

    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        var statusColor = '';

        if (todo.status === 'Pending') {
            statusColor = 'status-pending';
        } else if (todo.status === 'In Progress') {
            statusColor = 'status-in-progress';
        } else if (todo.status === 'Completed') {
            statusColor = 'status-completed';
        }

        // Check if overdue
        var isOverdue = false;
        if (todo.status !== 'Completed') {
            var dueDateObj = new Date(todo.duedate);
            var today = new Date();
            // Compare only date part
            if (dueDateObj.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                isOverdue = true;
            }
        }

        var newRow = '<tr' + (isOverdue ? ' style="background-color:#ffe6e6;"' : '') + '>';
        newRow += '<td>' + todo.id + '</td>';
        newRow += '<td><strong>' + todo.title + '</strong></td>';
        newRow += '<td>' + todo.description + '</td>';
        newRow += '<td>' + todo.targetDate + '</td>';
        newRow += '<td>' + todo.duedate + (isOverdue ? ' <span style="color:red;font-weight:bold;">(Overdue!)</span>' : '') + '</td>';
        newRow += '<td>' + todo.priority + '</td>';
        newRow += '<td><span class="' + statusColor + '">' + todo.status + '</span></td>';
        newRow += '<td>' + todo.tags.join(', ') + '</td>';
        newRow += '<td>' + (todo.recurring || '') + '</td>'; // Add recurring value
        newRow += '<td>'; // Start actions cell
        if (todo.status === 'Pending') {
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'In Progress\')">In Progress</button> ';
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'Completed\')">Complete</button>';
        } else if (todo.status === 'In Progress') {
            newRow += '<button onclick="changeStatus(' + todo.id + ', \'Completed\')">Complete</button>';
        }
        // If status is 'Completed', no buttons are added
        newRow += '</td>'; // End actions cell
        newRow += '</tr>';

        tableBody.innerHTML += newRow;
    }
}

// Sort function
function sortTodos(by) {
    if (by === 'duedate') {
        allTodos.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
    } else if (by === 'priority') {
        const order = { High: 1, Medium: 2, Low: 3 };
        allTodos.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (by === 'status') {
        allTodos.sort((a, b) => a.status.localeCompare(b.status));
    }
    showAllTodos();
}

// Show existing todos on page load
showAllTodos();

function showNotification(msg) {
    var notif = document.getElementById('notification');
    notif.innerText = msg;
    notif.style.display = 'block';
    setTimeout(() => notif.style.display = 'none', 3000);
}

function updateProgressBar() {
    var completed = allTodos.filter(t => t.status === 'Completed').length;
    var percent = allTodos.length ? (completed / allTodos.length) * 100 : 0;
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('progressText').innerText = Math.round(percent) + '% Completed';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}














