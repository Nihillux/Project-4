function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8080/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
            feeling: document.getElementById('name').value,
        }),
    })
    .then(response => response.json())
    .then(response => {
        document.getElementById('agreement').innerHTML = response.agreement;
        document.getElementById('subjectivity').innerHTML = response.subjectivity;
        document.getElementById('confidence').innerHTML = response.confidence;
    })
    .catch(error =>{
        document.getElementById('error').innerHTML = 'Something went wrong!';
    })
}

export { handleSubmit }