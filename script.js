function checkNews() {
    const text = document.getElementById('newsText').value.trim();
    const resultDiv = document.getElementById('result');

    if (!text) {
        resultDiv.innerText = 'Please enter some text.';
        resultDiv.className = '';
        return;
    }

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultDiv.innerText = data.error;
            resultDiv.className = '';
        } else {
            resultDiv.innerText = `Prediction: ${data.prediction}`;
            resultDiv.className = data.prediction.toLowerCase(); // "real" or "fake"
        }
    })
    .catch(err => {
        resultDiv.innerText = 'Something went wrong. Please try again.';
        resultDiv.className = '';
        console.error(err);
    });
}
