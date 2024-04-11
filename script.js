// Функция получения космического изображения для определенной даты
function getSpaceImageForSelectedDate() {
  const dateInput = document.getElementById('dateInput');
  const selectedDate = dateInput.value;
  const currentDate = new Date().toISOString().split('T')[0];
  if (selectedDate > currentDate) {
    alert('Выбранная дата не может быть больше текущей даты');
    return;
  }

  const minDate = '1995-06-16';
  if (selectedDate < minDate) {
    alert('Выбранная дата должна быть позже Jun 16, 1995');
    return;
  }

  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${selectedDate}`;
  const loader = document.getElementById('loader');
  const spaceImageContainer = document.getElementById('spaceImageContainer');
  const apiUrlDiv = document.getElementById('apiUrl');
  const apiResponseContainer = document.getElementById('apiResponseContainer');
  loader.style.display = 'block';
  apiUrlDiv.textContent = apiUrl;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка получения космического изображения');
      }
      return response.json();
    })
    .then(data => {
      const image = document.createElement('img');
      image.src = data.url;
      image.alt = data.title;
      const description = document.createElement('p');
      description.textContent = data.title;
      spaceImageContainer.innerHTML = '';
      spaceImageContainer.appendChild(image);
      spaceImageContainer.appendChild(description);

      // Вывод ответа от API в формате JSON через alert
      const formattedJson = JSON.stringify(data, null, 2);
      alert(formattedJson);

      // Сохраняем URL изображения и выбранную дату в LocalStorage
      localStorage.setItem('spaceImageURL', data.url);
      localStorage.setItem('selectedDate', selectedDate);

      loader.style.display = 'none';
    })
    .catch(error => {
      console.error('Ошибка:', error);
      loader.style.display = 'none';
    });
}
