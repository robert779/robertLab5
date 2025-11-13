// 1. Поміняти місцями контент блоків 3 (top) та 6 (bottom) 
window.addEventListener('DOMContentLoaded', () => {
  const block3 = document.querySelector('.top');
  const block6 = document.querySelector('.bottom');

  if (block3 && block6) {
    const temp = block3.innerHTML;
    block3.innerHTML = block6.innerHTML;
    block6.innerHTML = temp;
  }

  // 2. Обчислення площі паралелограма
  const base = 10;
  const height = 5; 
  const area = base * height;

  const block5 = document.querySelector('.content');
  if (block5) {
    const areaInfo = document.createElement('p');
    areaInfo.textContent = `Площа паралелограма з основою ${base} і висотою ${height} дорівнює ${area}`;
    block5.appendChild(areaInfo);
  }

  // 3. Знаходження максимальної цифри у числі з формою 
  const cookieName = 'maxDigit';
  const cookieValue = getCookie(cookieName);

  if (cookieValue) {
    if (confirm(`Раніше ви знаходили максимальну цифру: ${cookieValue}. Після натискання OK дані буде видалено.`)) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      alert('Cookies видалено. Сторінку буде перезавантажено.');
      location.reload();
    }
  } else {
    const form = document.createElement('form');
    form.innerHTML = `
      <h3>Знайти максимальну цифру</h3>
      <input type="number" id="numInput" placeholder="Введіть число">
      <button type="submit">Знайти</button>
    `;
    block5.appendChild(form);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const num = document.getElementById('numInput').value;
      if (!num) return alert('Введіть число!');
      const maxDigit = Math.max(...num.toString().split('').map(Number));
      alert(`Максимальна цифра: ${maxDigit}`);
      document.cookie = `${cookieName}=${maxDigit}; path=/;`;
    });
  }

  // 4. Вирівнювання по правому краю 
  const alignBlocks = ['.top', '.right', '.content']; // 3, 4, 5
  const leftBlock = document.querySelector('.left');
  if (leftBlock) {
    const form = document.createElement('form');
    form.innerHTML = `
      <p><strong>Вирівнювання при mouseout:</strong></p>
      <label><input type="radio" name="align" value="on"> Увімкнути</label><br>
      <label><input type="radio" name="align" value="off"> Вимкнути</label>
    `;
    leftBlock.appendChild(form);

    const saved = localStorage.getItem('alignRight');
    if (saved === 'true') alignBlocks.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.textAlign = 'right';
    });

    form.addEventListener('mouseout', () => {
      const val = form.querySelector('input[name="align"]:checked')?.value;
      if (val === 'on') {
        alignBlocks.forEach(sel => {
          const el = document.querySelector(sel);
          if (el) el.style.textAlign = 'right';
        });
        localStorage.setItem('alignRight', 'true');
      } else {
        alignBlocks.forEach(sel => {
          const el = document.querySelector(sel);
          if (el) el.style.textAlign = 'center';
        });
        localStorage.setItem('alignRight', 'false');
      }
    });
  }

  // 5. Створення нумерованого списку
  const allBlocks = document.querySelectorAll('.top, .right, .left, .bottom, .content, header, footer');
  allBlocks.forEach((block, index) => {
    block.addEventListener('selectstart', () => { 
      const input = document.createElement('input');
      input.placeholder = 'Введіть пункт списку';
      const addBtn = document.createElement('button');
      addBtn.textContent = 'Додати';
      block.appendChild(document.createElement('br'));
      block.appendChild(input);
      block.appendChild(addBtn);

      addBtn.onclick = () => {
        const value = input.value.trim();
        if (!value) return;
        let ol = block.querySelector('ol');
        if (!ol) {
          ol = document.createElement('ol');
          block.appendChild(ol);
        }
        const li = document.createElement('li');
        li.textContent = value;
        ol.appendChild(li);
        saveListToLocalStorage(index, ol.innerHTML);
        input.value = '';
      };
    });
  });

  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('lists');
  });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function saveListToLocalStorage(blockIndex, html) {
  let lists = JSON.parse(localStorage.getItem('lists') || '{}');
  lists[blockIndex] = html;
  localStorage.setItem('lists', JSON.stringify(lists));
}
