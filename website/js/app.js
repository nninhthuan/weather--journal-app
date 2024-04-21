const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

const unit = 'imperial';

const urlServer = 'http://127.0.0.1:3000';
const zipCodeURL = 'http://api.openweathermap.org/geo/1.0/direct?q';
const weatherURL = 'https://api.openweathermap.org/data/3.0/onecall/timemachine';
const apiKey = '62ea6668877a171b176395476ad8a1ad';
generate.addEventListener('click', function() {
  zipCodeToCoordinates(`${zipCodeURL}=${zipCode.value}&limit=1&appid=${apiKey}`);

  const data = {
    'zipCode': zipCode.value,
    'feeling': feelings.value,
  };
  changeContent(`${urlServer}/all`); //get method from local server
  postData(`${urlServer}/add`, data);
});

//Save data type from input UI
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  try {
    const projectData = await response.json();
    return projectData;
  } catch(error) {
    console.error(error);
  }
}


//After clicking Generate btn, should change dynamic content
const changeContent = async (url = '') => {
  return await fetch(url, {
    method: 'GET',
  })
  .then((res) => res.json())
  .then(data => {
    document.getElementById('temp-value').innerHTML = 'Math.round(allData.temp)+';
    document.getElementById('feeling-value').innerHTML = feelings.value;
    document.getElementById('date-value').innerHTML = 'allData.date';
  });
}

//Get coordinates as an input in open weather data
const zipCodeToCoordinates = async (url) => {
  const response = await fetch(url, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then(coordinate => {
    const lat = coordinate[0]?.lat;
    const lon = coordinate[0]?.lon;

    console.log(lat, lon)

    // fetch(`${weatherURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`)
    // .then((res) => res.json())
    // .then(data => {
    //   console.log(data)
    // });

  })
}