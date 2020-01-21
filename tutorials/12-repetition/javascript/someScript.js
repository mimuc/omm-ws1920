const textField = document.querySelector('input[type="text"]')

textField.addEventListener('input',e => {
    let newContent = e.target.value;

    fetch(`https://www.somesearchengine.de?query=${newContent}`)
        .then(responseJson => {
            responseJson.json()
                .then(responseData => {
                    responseData.searchResults.forEach(aResult => {
                        const newEl = document.createElement('li')
                        newEl.innerHTML = aResult
                        document.getElementById('resultsList').appendChild(newEl)
                    })
                })
                .catch(error => {
                    console.error('Request to server failed',error)
                })
        })
        .catch(error => {
            console.error('Parsing JSON failed',error)
        });
})

