const textArea = document.getElementById('body');
const sentimentResult = document.getElementById('sentimentResult');
    
textArea.addEventListener('input', async function() {
    try {
        const text = textArea.value;

        if (text.trim()) {
            const sentiment = await analyzeSentiment(text); 
            updateSentimentUI(sentiment); 
        } else {
            sentimentResult.innerHTML = '';
        }
    } catch (error) {
        console.error('Error inside input event listener:', error);
    }
});


async function analyzeSentiment(text) {
    try {
        const response = await fetch('/stories/analyze-sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        return data.genre;
    } catch (error) {
        console.error('Error during genre detection:', error);
        return 'Error analyzing genre';
    }
}

function updateSentimentUI(sentiment) {
    sentimentResult.innerHTML = `Genre: ${sentiment}`;
}
