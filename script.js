const app = Vue.createApp({
  data() {
    return {
      selectedDate: '',
      apiUrl: '',
      spaceImageUrl: '',
      spaceImageTitle: '',
      apiResponse: '',
      isLoading: false
    };
  },
  methods: {
    getSpaceImage() {
      const currentDate = new Date().toISOString().split('T')[0];
      if (this.selectedDate > currentDate) {
        alert('Выбранная дата не может быть больше текущей даты');
        return;
      }

      const minDate = '1995-06-16';
      if (this.selectedDate < minDate) {
        alert('Выбранная дата должна быть позже Jun 16, 1995');
        return;
      }

      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${this.selectedDate}`;
      this.apiUrl = apiUrl;
      this.isLoading = true;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка получения космического изображения');
          }
          return response.json();
        })
        .then(data => {
          this.spaceImageUrl = data.url;
          this.spaceImageTitle = data.title;

          // Сохраняем URL изображения и выбранную дату в LocalStorage
          localStorage.setItem('spaceImageURL', data.url);
          localStorage.setItem('selectedDate', this.selectedDate);

          this.isLoading = false;
          // Очищаем контейнер с JSON-ответом
          this.apiResponse = '';
        })
        .catch(error => {
          console.error('Ошибка:', error);
          this.isLoading = false;
        });
    },
    showJsonResponse() {
      const savedSpaceImageURL = localStorage.getItem('spaceImageURL');
      const savedDate = localStorage.getItem('selectedDate');
      if (savedSpaceImageURL && savedDate) {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${savedDate}`;
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Ошибка получения космического изображения');
            }
            return response.json();
          })
          .then(data => {
            this.apiResponse = JSON.stringify(data, null, 2);
          })
          .catch(error => {
            console.error('Ошибка:', error);
          });
      } else {
        alert('Нет сохраненных данных');
      }
    }
  },
  mounted() {
    const savedSpaceImageURL = localStorage.getItem('spaceImageURL');
    const savedDate = localStorage.getItem('selectedDate');
    if (savedSpaceImageURL && savedDate) {
      this.spaceImageUrl = savedSpaceImageURL;
      this.selectedDate = savedDate;
    }
  }
});

app.mount('#app');
