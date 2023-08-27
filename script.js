const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  // validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create List item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  // Add Li to DOOM
  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

const removeItems = (e) => {
  const target = e.target;
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are You Sure')) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
};

const clearItems = () => {
  // itemList.innerHTML = '';
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
};

// Filter List
const filterItems = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// Event Listerner
// Add Items in List
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItems);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
