const itemForm = document.getElementById('item-form');

const itemInput = document.getElementById('item-input');

const itemList = document.getElementById('item-list');

const itemFilter = document.getElementById('filter');

const clearBtn = document.getElementById('clear');

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach(item => addItemToDOM(item));

  checkUI();
}


// ** Add Items and Submit Function**
function  onAddItemSubmit(evt) {
  evt.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if(newItem.value === '') {
    alert('Please Enter Item');
    return;
  }
  
  //Create item DOM element
  addItemToDOM(newItem);

  //Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';
}

// ** Add Item to DOM Function**
function addItemToDOM(item) {
  //Create list item 
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Add li to the DOM
  itemList.appendChild(li);

}


  //*Create Button Function**

  function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
  }

  // **Create Icon Function**

  function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
  }

  // **Add Item to Storage Function**

  function addItemToStorage(item) {
    //create variable
    const itemsFromStorage = getItemsFromStorage();

    

    //Add new item to array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to loacl storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  }

  function getItemsFromStorage() {
    let itemsFromStorage;

    //Checking for items in storage
    if(localStorage.getItem('items') === null) {
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage
  }


  // **Remove Item Function**

  function removeItem(evt) {
    if(evt.target.parentNode.classList.contains('remove-item')) {
      if(confirm('Are you sure?')) {
      evt.target.parentNode.parentNode.remove();

      checkUI()
      }
      
    }
  }

  // **Clear Item Function**

  function clearItems() {
    while(itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    checkUI();
  }

  // **Filter Items Function**

  function filterItems(evt) {
    const items = itemList.querySelectorAll('li');
    const text = evt.target.value.toLowerCase();

    items.forEach(item => {
      const itemName = item.firstChild.textContent.toLowerCase();

      if(itemName.indexOf(text) != -1) {
        item.style.display = 'flex';
      }else {
        item.style.display = 'none';
      }
    });
  }
  // **Check UI Function**

  function checkUI() {
    const items = itemList.querySelectorAll('li');
    if(items.length === 0) {
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
    }else {
      itemFilter.style.display = 'block';
      clearBtn.style.display = 'block';
    }
  }

  //**Initialize App**
  //Event Listeners
  function init() {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();

  }

  init()








