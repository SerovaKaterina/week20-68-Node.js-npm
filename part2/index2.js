
  const selectElement = document.getElementById("select");
  const numberInput = document.getElementById("number");
  const btn = document.getElementById("btn");
  const infoResult = document.querySelector(".info_result");
  const errorResult = document.querySelector(".error_result");
  const loaderWrapper = document.querySelector(".loader_wrapper");

  btn.addEventListener("click", fetchData);

  function fetchData() {
    const categoryType = selectElement.value;
    const categoryId = numberInput.value;

    if (!categoryType || !categoryId) {
      errorResult.innerHTML = "Выберите категорию и введите идентификатор.";
      infoResult.innerHTML = "";
      return;
    }

    loaderWrapper.innerHTML = '<div class="loader"></div>'; // Добавляем загрузку внутрь loader_wrapper

    fetch(`https://swapi.nomoreparties.co/${categoryType}/${categoryId}`)
      .then(handleResponse)
      .then((data) => {
        loaderWrapper.innerHTML = ""; // Убираем загрузку после получения данных
        errorResult.innerHTML = "";

        // Выбираем нужную информацию в зависимости от категории
        let result;
        if (categoryType === 'people') {
          result = data.name;
        } else if (categoryType === 'planets') {
          result = data.name;
        } else if (categoryType === 'films') {
          result = data.title;
        }

        infoResult.innerHTML = result;
      })
      .catch((error) => {
        loaderWrapper.innerHTML = ""; // Убираем лоадер в случае ошибки
        infoResult.innerHTML = "";
        errorResult.innerHTML = "Сервер не доступен. Пожалуйста, повторите попытку позже.";
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          errorResult.innerHTML = "";
          infoResult.innerHTML = "";
        }, 5000);
      });
  }

  function handleResponse(response) {
    if (!response.ok) {
      throw new Error(`Ошибка запроса к API: ${response.status}`);
    }
    return response.json();
  }
