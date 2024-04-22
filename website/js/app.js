const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

const unit = 'imperial';

const urlServer = 'http://127.0.0.1:3000';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '62ea6668877a171b176395476ad8a1ad';
generate.addEventListener('click', function() {
  handleTemperature(`${weatherURL}?zip=${zipCode.value}&appid=${apiKey}&units=${unit}`);
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

//After clicking Generate btn, should save data from OpenWeatherData
const handleTemperature = async (url = '') => {
  return await fetch(url, {
    method: 'GET',
  })
  .then((res) => res.json())
  .then(data => {
    const date = new Date(new Date(data.dt * 1000).getTime() + (data.timezone * 1000) + data.timezone);

    const temperature = {
      'date': date.toLocaleDateString('en-US'),
      'temperature': Math.round(data.main.temp),
      'feelings': feelings.value,
    };
    postData(`${urlServer}/add`, temperature);
    changeContent(`${urlServer}/all`);

  });
}
/*
 * After clicking Generate, should change dynamic content
 * Data get from api /all
 */
const changeContent = async (url = '') => {
  return await fetch(url, {
    method: 'GET'
  })
  .then(res => res.json())
  .then(data => {
    const lastIndex = Object.keys(data).length  - 1;
    const temp = data[lastIndex];

    document.getElementById('date-value').innerHTML = temp.date;
    document.getElementById('temp-value').innerHTML = temp.temperature + ' degrees';
    document.getElementById('feeling-value').innerHTML = temp.feelings;
  })
}

//Clear data when clicking input, text-area
function clearDynamicContent() {
  document.getElementById('date-value').innerHTML= '';
  document.getElementById('temp-value').innerHTML = '';
  document.getElementById('feeling-value').innerHTML = '';
}

zipCode.addEventListener('click', clearDynamicContent);
feelings.addEventListener('click', clearDynamicContent);