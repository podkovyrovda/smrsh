let filter = {
  data: [
    {
      type: 'text',
      title: 'Text field',
      operations: [
        'Containing',
        'Exectly matching',
        'Begins with',
        'Ends with'
      ],
      default: true
    },
    {
      type: 'number',
      title: 'Number field',
      operations: [
        'Equal',
        'Greater than',
        'Less than'
      ],
      default: false
    }
  ],
  buttons: [
    {
      type: 'add',
      class: 'filter__button--add',
      textOnButton: 'Add condition',
    },
    {
      type: 'apply',
      class: 'filter__button--apply',
      textOnButton: 'Apply',
    },
    {
      type: 'clear',
      class: 'filter__button--clear',
      textOnButton: 'Clear filter',
    },
    {
      type: 'delete',
      class: 'filter__button--delete'
    },
  ],
  limit: 10,

  //найдем элемент для вставки
  mainDiv: document.getElementById('filter'),

  //счетчик для посдчета созданных строк, использую для уникальных name у radio кнопок
  counter: 0,

  createForm: function () {
    //разметка для формы
    this.form = this.createEl('form', 'filter');

    this.row = this.createRow();
    
    this.controlButtons = this.createEl('div', 'filter__control-buttons');

    //кнопки управления формой
    this.addButton = this.createButton('add', this.addRow.bind(this));
    this.applyButton = this.createButton('apply', this.getOutput.bind(this));
    this.clearButton = this.createButton('clear', this.clearFilter.bind(this));

    //собираем
    this.form.appendChild(this.row);
    this.form.appendChild(this.addButton);
    this.controlButtons.appendChild(this.applyButton);
    this.controlButtons.appendChild(this.clearButton);
    this.form.appendChild(this.controlButtons);

    this.mainDiv.appendChild(this.form);
  },

  createRow: function () {
    //получаем данные для создания селектов
    const dataType = this.getDataType(this.data);
    const defaultType = this.getDefaultType(this.data);
    const dataOperations = this.getDataOperations(this.data, defaultType.type);

    //создаем строку
    const row = this.createEl('div', 'filter__line');
    
    //создаем стандартный селект для типов для отображения на мобильных
    const selectForType = this.createSelect('type', dataType, this.changeOperations.bind(this));
    
    //создаем стандартный селект для операций для отображения на мобильных
    const selectForOperations = this.createSelect('operations', dataOperations);

    //собираем
    row.appendChild(selectForType);
    row.appendChild(selectForOperations);

    //создаем инпут
    const input = this.createEl('input', 'filter__input');
    input.setAttribute('name', 'value')
    input.addEventListener('keypress', this.checkInput.bind(this))
    const wrapperForInput = this.createEl('div', 'filter__col');
    wrapperForInput.appendChild(input);

    //создаем кнопку удаления строки
    const deleteButton = this.createButton('delete', this.deleteRow.bind(this));
    // const wrapperForDeleteButton = this.createEl('div', 'filter__col');
    // wrapperForDeleteButton.appendChild(deleteButton);

    row.appendChild(wrapperForInput);
    row.appendChild(deleteButton);

    this.counter++

    return row;
  },

  showDropdown: function (e) {
    const fieldsets = document.querySelectorAll('fieldset');

    const array = Array.from(fieldsets);

    const shownFieldset = array.find((el) => {
      return el.classList.contains('show')
    })

    if (shownFieldset) {
      shownFieldset.classList.toggle('show');
      shownFieldset.previousSibling.classList.toggle('custom-select--disabled')
    } else {
    const input = e.target;
    const fieldset = e.target.nextSibling;

    input.classList.toggle('custom-select--disabled');
    fieldset.classList.toggle('show');

    const listener = (event) => {
      if (!event.target.classList.contains('custom-select-box__item') && !event.target.classList.contains('custom-select')) {
        fieldset.classList.remove('show');
        input.classList.remove('custom-select--disabled');
      }
    }
  
    document.addEventListener('click', listener);
  }
  },

  hideDropdown: function (e) {
    e.target.parentNode.parentNode.classList.toggle('show');
    e.target.parentNode.parentNode.previousSibling.classList.toggle('custom-select--disabled');
  },

  addRow: function (e) {
    e.preventDefault();
    //получаем все созданные строки
    const rows = this.mainDiv.querySelectorAll('.filter__line');
    //если создана только одна, находим в ней кнопку 'delete', и присваиваем класс show
    //по умолчанию кнопка у первой строки скрыта
    if (rows.length === 1) {
      const firstChild = rows[0];
      const deleteButton = firstChild.querySelector('button[name="delete"]');
      deleteButton.classList.add('show');
    }
    //проверяем на ограничение по количеству созданных
    if (rows.length < this.limit) {
      //находим индекс последней строки
      const i = rows.length - 1;

      //создаем новую строку
      const row = this.createRow();
      
      //добавляем новую строку после последней
      rows[i].insertAdjacentElement('afterend', row);
    }
  },

  deleteRow: function (e) {
    e.preventDefault();
    //получаем все созданные строки
    const rows = this.mainDiv.querySelectorAll('.filter__line');
    //если строки 2, то находим в первой строке кнопку 'delete',
    //и удаляем класс 'hide'
    if (rows.length === 2) {
      const firstChild = rows[0];
      const deleteButton = firstChild.querySelector('button[name="delete"]');
      deleteButton.classList.remove('show');
    }
    e.currentTarget.parentNode.remove();

    const deleteButtons = document.querySelectorAll('button[name="delete"]');
    if (deleteButtons.length > 1) {
      deleteButtons[0].classList.add('show');
    }
  },

  checkInput: function (e) {
    //сбросим стандартное действие с энтера, чтобы не удалять строку по нажатию
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    // получаем инпут, в котором произошло событие
    const input = e.target;
    //получаем строку
    const row = input.parentNode.parentNode;
    //находим в строке велью селекта с типами
    const title = row.querySelector('select[name="type"]').value;
    //получаем тип по тайтлу
    const type = this.getType(title);
    //
    if (type === 'number') {
      e.target.setAttribute('type', 'number')
    }
    },

  clearFilter: function (e) {
    e.preventDefault();
    this.form.remove();
    this.createForm();
  },

  changeOperations: function (e) {
    let parent;
    let operations;
        //получаем родителя блока, в котором происходит изменение, и блок, который надо заменить
    if (e.currentTarget.classList.contains('custom-select')) {
      //если событие в кастомном селекте
      parent = e.currentTarget.parentNode.parentNode;
      operations = e.currentTarget.parentNode.nextSibling;
    } else
    //если событие обычном селекте
    if (e.currentTarget.classList.contains('filter__select')) {
      parent = e.currentTarget.parentNode.parentNode;
      operations = e.currentTarget.parentNode.nextSibling;
    } else {
    //если событие в блоке с радиокнопками
    parent = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
    operations = e.currentTarget.parentNode.parentNode.parentNode.nextSibling;
    }
    //находим инпут
    const input = parent.querySelector('[name="value"]');
    //сбрасываем значения инпута
    input.value = '';

    //получаем новое значение, которое выбрали в селекте выбора типов
    const newTitle = e.currentTarget.value

    //находим нужный тип
    let newType = '';
    this.data.forEach((el) => {
      if(el.title === newTitle) {
        newType = el.type;
      }
    })
    
    //получаем данные операций найденного типа
    const data = this.getDataOperations(this.data, newType);

    //создаем блок с новыми данными
    const newOperations = this.createSelect('operations', data);

    //заменяем
    parent.replaceChild(newOperations, operations);

  },

  createEl: function (tag, className) {
    const el = document.createElement(tag);
    el.classList.add(className);

    return el;
  },

  createButton: function (type, methodOnclick) {
    //содаем кнопку
    const button = this.createEl('button', 'filter__button');

    //находим её стили и текст на кнопке из базы
    let classOfButton = '';
    let textOnButton = '';
    let name = '';
    this.buttons.forEach(function(button){
      if(button.type === type){
        name = button.type;  
        classOfButton = button.class;
        textOnButton = button.textOnButton;
      }
    })

    //добавляем событие на click
    button.addEventListener('click', methodOnclick);

    //собираем
    button.setAttribute('name', name);
    button.classList.add(classOfButton);
    button.textContent = textOnButton;

    return button;
  },

  createSelect: function (name, data, methodOnChange) {
    //стандартный селект
    const select = this.createEl('select', 'filter__select');
    select.setAttribute('name', name);

    //добавляем опции
    data.forEach(element => {
      const option = document.createElement('option');
      const text = document.createTextNode(element);
  
      option.setAttribute('value', element);
      option.appendChild(text);

      select.appendChild(option);
    })


    //нестандартный селект
    const input = this.createEl('input', 'custom-select');
    input.setAttribute('type', 'button');
    input.setAttribute('name', 'title');
    input.setAttribute('value', data[0]); 

    const fieldset = this.createEl('fieldset', 'custom-select-box');
    fieldset.setAttribute('name', name);

    data.forEach(element => {
      const label = this.createEl('label', 'custom-select-box__label');
      const radio = this.createEl('input', 'custom-select-box__item');
      const div = document.createElement('div');
      const text = document.createTextNode(element);

      radio.setAttribute('type', 'radio');
      radio.setAttribute('name', name + '-' + this.counter);
      radio.setAttribute('value', element);

      const i = data.indexOf(element);
      radio.addEventListener('change', function (e) {
        select.selectedIndex = i;
        input.value = select.value;

        if (methodOnChange) {
          methodOnChange(e);
        }
      });
      
      radio.addEventListener('keydown', (e) => {
        const keyName = event.key
        if (keyName === "Enter") {
          input.focus();
        }
        if (keyName === "Escape" || keyName === 'Tab') {
          e.preventDefault();
          this.hideDropdown(e);
          input.focus();
        }
      });

      let index = data.indexOf(element);
      if (index === 0) {
        radio.setAttribute('checked', 'checked');
      }
      
      label.appendChild(radio);
      div.appendChild(text);
      label.appendChild(div);

      fieldset.appendChild(label);
    });

    const div = this.createEl('div', 'filter__col');
    div.appendChild(select);
    div.appendChild(input);
    div.appendChild(fieldset);

    input.addEventListener('click', (e) => {
      this.showDropdown(e);
      const checkedRadio = this.findCheckedRadio(fieldset, select);
      checkedRadio.focus();
    });

    const arr = Array.from(fieldset.childNodes);

    input.addEventListener('keyup', (e) => {
      const keyName = event.key
      if (keyName === "ArrowUp" || keyName === 'ArrowLeft') {
        if (select.selectedIndex !== 0) {
          let i = select.selectedIndex - 1;
          select.value = data[i];
          input.value = select.value;

          if (methodOnChange) {
            methodOnChange(e);
          }
          arr.forEach(el => {
            const radio = el.firstChild;
            radio.removeAttribute('checked');
            radio.checked=false;
              if (radio.value === select.value) {
                radio.checked=true;
                radio.setAttribute('checked', 'checked')
              }
          });
        }
      }
      if (keyName === "ArrowDown" || keyName === 'ArrowRight') {
        if (select.selectedIndex !== arr.length - 1) {
          let i = select.selectedIndex + 1;
          select.value = data[i];
          input.value = select.value;

          if (methodOnChange) {
            methodOnChange(e);
          }

          arr.forEach(el => {
            const radio = el.firstChild;
            radio.removeAttribute('checked');
            radio.checked=false;
              if (radio.value === select.value) {
                radio.checked=true;
                radio.setAttribute('checked', 'checked')
              }
          });
        }
      }
    });

    if (methodOnChange) {
      input.addEventListener('keydown', (e) => {
        const keyName = event.key
        if (keyName === "ArrowDown" || keyName === 'ArrowRight' || keyName === 'ArrowDown' || keyName === 'ArrowLeft') {
          methodOnChange(e);
        }
      })
    }

    select.addEventListener('change', function () {
        input.value = select.value;
        arr.forEach(el => {
          const radio = el.firstChild;
          radio.removeAttribute('checked');
          radio.checked=false;
            if (radio.value === select.value) {
              radio.checked=true;
              radio.setAttribute('checked', 'checked')
            }
        });
      })
    
    //если получили метод, вешаем вызов метода на изменение
    if (methodOnChange) {
      select.addEventListener('change', methodOnChange);
    }

    return div;
  },

  findCheckedRadio: function (fieldset, select) {
    const arr = Array.from(fieldset.childNodes);

    const checkedLabel = arr.find((el) => {
      return el.firstChild.value === select.value
    });

    const checkedRadio = checkedLabel.firstChild;
    return checkedRadio;
  },

  getOutput: function (e) {
    e.preventDefault();
    
    let output = {}
    filter.data.forEach(function(el){
        output[el.type] = []
    })

    //получаем коллекцию строк фильтра
    const collection = this.mainDiv.querySelectorAll('.filter__line');

    [].forEach.call(collection, function(el) {
      //находим селект с типами
      const selectType = el.querySelector('select[name="type"]');

      //!!!!!!!!
      const type = filter.getType(selectType.value);

      //находим селект с операциями
      const operation = el.querySelector('select[name="operations"]');
      //получаем велью и переводим в нижний регистр в соответствии с ТЗ
      const operationValue = operation.value.toLowerCase();

      //находим инпут
      const input = el.querySelector('input[name="value"]');
      //получаем велью и переводим в нижний регистр в соответствии с ТЗ
      const inputValue = input.value.toLowerCase();
      
      output[type].push({operation: operationValue, value: inputValue})
    })

    alert(JSON.stringify(output, null, 4));
  },

  getType: function (title) {
    let type = '';
    this.data.forEach((el) => {
      if(el.title === title) {
        type = el.type;
      }
    });
    return type;
  },

  getDataType: function (data) {
    //получаем данные из даты
    let dataType = data.map((el) => {
      return el.title;
    });

    //получаем дефолтный тип
    const defaultType = this.getDefaultType();

    //перемещаем дефолтный тип на 0 индекс
    dataType.splice(defaultType.index, 1);
    dataType.splice(0, 0, defaultType.title);

    return dataType;
  },

  getDefaultType: function () {
    let title = '';
    let type = '';
    let index = '';
    this.data.forEach((el) => {
      if(el.default) {
        title = el.title;
        type = el.type;
        index = this.data.indexOf(el)
      }
    })
    return { title, type, index };
  },

  getDataOperations: function (data, type) {
    let operations = [];
    data.forEach((el) => {
      if(el.type === type) {
        operations = el.operations;
      }
    })
    return operations;
  },

}