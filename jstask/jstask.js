// Background color changer
document.getElementById('colorButton').addEventListener('click', function() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});

// Counter increment/decrement
let counter = 0;
const counterValue = document.getElementById('counterValue');
document.getElementById('incrementBtn').addEventListener('click', () => {
    counter++;
    counterValue.textContent = counter;
});
document.getElementById('decrementBtn').addEventListener('click', () => {
    counter--;
    counterValue.textContent = counter;
});

// Show/hide paragraph
const toggleParagraphBtn = document.getElementById('toggleParagraphBtn');
const toggleParagraph = document.getElementById('toggleParagraph');
toggleParagraphBtn.addEventListener('click', () => {
    if (toggleParagraph.style.display === 'none') {
        toggleParagraph.style.display = 'block';
    } else {
        toggleParagraph.style.display = 'none';
    }
});

// Alert with button text
const alertButtons = document.querySelectorAll('.alertBtn');
alertButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert(`Button text: ${button.textContent}`);
    });
});

// To-do list add item
const addTodoBtn = document.getElementById('addTodoBtn');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
addTodoBtn.addEventListener('click', () => {
    const itemText = todoInput.value.trim();
    if (itemText) {
        const li = document.createElement('li');
        li.textContent = itemText;
        todoList.appendChild(li);
        todoInput.value = '';
    }
});

// Change image source
const changeImageBtn = document.getElementById('changeImageBtn');
const imageToChange = document.getElementById('imageToChange');
const imageSources = [
    'https://via.placeholder.com/150/FF5733',
    'https://via.placeholder.com/150/33FF57',
    'https://via.placeholder.com/150/3357FF'
];
let currentImageIndex = 0;
changeImageBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    imageToChange.src = imageSources[currentImageIndex];
});

// Like button toggle
const likeBtn = document.getElementById('likeBtn');
likeBtn.addEventListener('click', () => {
    if (likeBtn.textContent === 'Like') {
        likeBtn.textContent = 'Unlike';
    } else {
        likeBtn.textContent = 'Like';
    }
});

// Button click counter
let clickCount = 0;
const clickCountBtn = document.getElementById('clickCountBtn');
const clickCountDisplay = document.getElementById('clickCount');
clickCountBtn.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
});

// Form submit show details
const sampleForm = document.getElementById('sampleForm');
const formOutput = document.getElementById('formOutput');
sampleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    formOutput.textContent = `Name: ${name}, Email: ${email}`;
});

// Font size changer
const increaseFontBtn = document.getElementById('increaseFontBtn');
const decreaseFontBtn = document.getElementById('decreaseFontBtn');
const fontText = document.getElementById('fontText');
let fontSize = 16; // initial font size in px
fontText.style.fontSize = fontSize + 'px';

increaseFontBtn.addEventListener('click', () => {
    fontSize += 2;
    fontText.style.fontSize = fontSize + 'px';
});

decreaseFontBtn.addEventListener('click', () => {
    fontSize = Math.max(8, fontSize - 2);
    fontText.style.fontSize = fontSize + 'px';
});
