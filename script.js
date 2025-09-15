const itemForm = document.getElementById('item-form');

const itemInput = document.getElementById('item-input');

const itemList = document.getElementById('item-list');

const itemFilter = document.getElementById('filter');

const clearBtn = document.getElementById('clear');



function addItem(evt) {
  evt.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if(newItem.value === '') {
    alert('Please Enter Item');
    return;
  }
  //Create list item 
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Add li to the DOM
  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';
}

  function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
  }

  function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
  }

  function removeItem(evt) {
    if(evt.target.parentNode.classList.contains('remove-item')) {
      if(confirm('Are you sure?')) {
      evt.target.parentNode.parentNode.remove();

      checkUI()
      }
      
    }
  }

  function clearItems() {
    while(itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    checkUI();
  }


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

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);


checkUI()







