const generate = document.getElementById('generate');
const urlServer = 'http//:127.0.0.1:3000';

generate.addEventListener('click', function() {
  postData('/add', { answer:42 });
});


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
    console.log(projectData);
    return projectData;
  } catch(error) {
    console.error(error);
  }
}