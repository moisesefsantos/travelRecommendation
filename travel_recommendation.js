document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.querySelector('.search-btn');
  const clearBtn = document.querySelector('.clear-btn');
  const searchInput = document.querySelector('.search-box input');
  const resultsContainer = document.getElementById('results-container');

  const displayResults = (data, keyword) => {
    resultsContainer.innerHTML = '';

    const containsKeyword = (name, description) => {
      return name.toLowerCase().includes(keyword) || description.toLowerCase().includes(keyword);
    };

    if (keyword === 'beach') {
      data.beaches.forEach(beach => {
        const beachDiv = document.createElement('div');
        beachDiv.classList.add('result');
        
        const beachItem = document.createElement('div');
        beachItem.classList.add('result-item');
        beachItem.innerHTML = `
          <h4>${beach.name}</h4>
          <img src="${beach.imageUrl}" alt="${beach.name}" />
          <p>${beach.description}</p>
        `;

        beachDiv.appendChild(beachItem);
        resultsContainer.appendChild(beachDiv);
      });
      return;
    }

    if (keyword === 'temple') {
      data.temples.forEach(temple => {
        const templeDiv = document.createElement('div');
        templeDiv.classList.add('result');
        templeDiv.innerHTML = `
          <h4>${temple.name}</h4>
          <img src="${temple.imageUrl}" alt="${temple.name}" />
          <p>${temple.description}</p>
        `;
        resultsContainer.appendChild(templeDiv);
      });
      return; // Evitar que os outros resultados sejam exibidos
    }

    if (keyword === 'country') {
      data.countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('result');
        countryDiv.innerHTML = `<h3>${country.name}</h3>`;

        country.cities.forEach(city => {
          const cityDiv = document.createElement('div');
          cityDiv.classList.add('result-item');
          cityDiv.innerHTML = `
            <h4>${city.name}</h4>
            <img src="${city.imageUrl}" alt="${city.name}" />
            <p>${city.description}</p>
          `;
          countryDiv.appendChild(cityDiv);
        });

        resultsContainer.appendChild(countryDiv);
      });
      return;
    }

    data.countries.forEach(country => {
      const filteredCities = country.cities.filter(city => 
        containsKeyword(city.name, city.description)
      );

      if (filteredCities.length > 0) {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('result');
        countryDiv.innerHTML = `<h3>${country.name}</h3>`;
        
        filteredCities.forEach(city => {
          const cityDiv = document.createElement('div');
          cityDiv.classList.add('result-item');
          cityDiv.innerHTML = `
            <h4>${city.name}</h4>
            <img src="${city.imageUrl}" alt="${city.name}" />
            <p>${city.description}</p>
          `;
          countryDiv.appendChild(cityDiv);
        });
        
        resultsContainer.appendChild(countryDiv);
      }
    });

    data.temples.forEach(temple => {
      if (containsKeyword(temple.name, temple.description)) {
        const templeDiv = document.createElement('div');
        templeDiv.classList.add('result');
        templeDiv.innerHTML = `
          <h4>${temple.name}</h4>
          <img src="${temple.imageUrl}" alt="${temple.name}" />
          <p>${temple.description}</p>
        `;
        resultsContainer.appendChild(templeDiv);
      }
    });

    data.beaches.forEach(beach => {
      if (containsKeyword(beach.name, beach.description)) {
        const beachDiv = document.createElement('div');
        beachDiv.classList.add('result');

        const beachItem = document.createElement('div');
        beachItem.classList.add('result-item');
        beachItem.innerHTML = `
          <h4>${beach.name}</h4>
          <img src="${beach.imageUrl}" alt="${beach.name}" />
          <p>${beach.description}</p>
        `;

        beachDiv.appendChild(beachItem);
        resultsContainer.appendChild(beachDiv);
      }
    });
  };

  const fetchData = async () => {
    const keyword = searchInput.value.toLowerCase();  // Obter o valor da pesquisa e converter para minúsculas

    try {
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
      displayResults(data, keyword);  // Passando o filtro de palavra-chave para displayResults
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  searchBtn.addEventListener('click', () => {
    fetchData();
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  });

  clearBtn.addEventListener('click', () => {
    console.log('Clear button clicked'); // Para depuração
    searchInput.value = '';  // Limpar o campo de pesquisa
    resultsContainer.innerHTML = '';  // Limpar os resultados exibidos
  });
});