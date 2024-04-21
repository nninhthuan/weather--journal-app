const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

const unit = 'imperial';

const urlServer = 'http://127.0.0.1:3000';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '62ea6668877a171b176395476ad8a1ad';
generate.addEventListener('click', function() {
  const data = {
    'zipCode': zipCode.value,
    'feeling': feelings.value,
  };
  postData(`${urlServer}/add`, data);

  changeContent(`${weatherURL}?zip=${zipCode.value}&appid=${apiKey}&units=${unit}`);
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
    const date = new Date(new Date(data.dt * 1000).getTime() + (data.timezone * 1000) + data.timezone);

    document.getElementById('date-value').innerHTML = date.toLocaleDateString('en-US');
    document.getElementById('temp-value').innerHTML = Math.round(data.main.temp)+ ' degrees';
    document.getElementById('feeling-value').innerHTML = feelings.value;
  });
}