document.addEventListener('DOMContentLoaded', () => {
    const memoryBoard = document.getElementById('memoryBoard');
    const attemptsCounter = document.getElementById('attemptsCounter');
    const gridSize = 6;
    const totalPairs = (gridSize * gridSize) / 2;
    let attempts = 0; 

    const emojis = ['🐱', '🐶', '🐻', '🐼', '🦊', '🐰', '🦄', '🐍', '🐢', '🐠', '🐙', '🦑'];

    let cards = generateCardArray(totalPairs * 2, emojis);
    cards = shuffleArray(cards);

    // Create the HTML structure for the cards
    for (let i = 0; i < cards.length; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card', 'memory-card-hidden');
        cardElement.dataset.cardValue = cards[i];
        cardElement.innerHTML = `<p>${cards[i]}</p>`;
        cardElement.addEventListener('click', flipCard);
        memoryBoard.appendChild(cardElement);
    }

    let flippedCards = [];
    let matchedPairs = 0;

    function flipCard() {
        if (flippedCards.length < 2) {
            const cardElement = this;
            cardElement.classList.remove('memory-card-hidden');
            cardElement.classList.add('flipped');
            flippedCards.push(cardElement);

            if (flippedCards.length === 2) {
                attempts++;
                updateAttemptsCounter();
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const value1 = card1.dataset.cardValue;
        const value2 = card2.dataset.cardValue;

        if (value1 === value2) {
            // Match found
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            matchedPairs++;
            alert('Congratulations! You won the in ${attempts} attempts!');


            if (matchedPairs === totalPairs) {
                alert('Congratulations! You won the in ${attempts} attempts!');
            }

        } else {
            // No match, flip the cards back
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.classList.add('memory-card-hidden');
            card2.classList.add('memory-card-hidden');
        }

        flippedCards = [];
        updateAttemptsCounter();

    }

    function generateCardArray(totalCards, emojis) {
        const emojiSubset = emojis.slice(0, totalCards / 2);
        const cardValues = [...emojiSubset, ...emojiSubset];
        return shuffleArray(cardValues);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    //Function to update the number of attempts
    function updateAttemptsCounter() {
        attemptsCounter.textContent = `Attempts: ${attempts}`;
    }

    // Function to toggle dark mode
    function toggleDarkMode() {
        const darkModeButton = document.getElementById('darkModeButton');
        document.body.classList.toggle('dark-mode');
        memoryBoard.classList.toggle('dark-mode');
        darkModeButton.innerHTML = document.body.classList.contains('dark-mode') ? '🌙' : '&#128161;'; // Moon and light bulb Unicode characters
    }

    // Event listener for dark mode button
    const darkModeButton = document.getElementById('darkModeButton');
    darkModeButton.addEventListener('click', toggleDarkMode);
});
