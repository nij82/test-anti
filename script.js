document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    let isGenerating = false;

    generateBtn.addEventListener('click', () => {
        if (isGenerating) return;
        generateLottoNumbers();
    });

    function generateLottoNumbers() {
        isGenerating = true;
        generateBtn.disabled = true;
        generateBtn.style.opacity = '0.7';
        
        // Clear previous results
        resultContainer.innerHTML = '';

        // Generate 6 unique numbers
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        // Convert to array and sort ascending
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        // Display balls with delay
        sortedNumbers.forEach((num, index) => {
            setTimeout(() => {
                createBall(num);
                // Re-enable button after last ball
                if (index === sortedNumbers.length - 1) {
                    isGenerating = false;
                    generateBtn.disabled = false;
                    generateBtn.style.opacity = '1';
                }
            }, index * 300); // 300ms delay between each ball
        });
    }

    function createBall(number) {
        const ball = document.createElement('div');
        ball.classList.add('lotto-ball');
        ball.classList.add(getBallColorClass(number));
        ball.textContent = number;
        resultContainer.appendChild(ball);
    }

    function getBallColorClass(number) {
        if (number <= 10) return 'ball-y'; // Yellow
        if (number <= 20) return 'ball-b'; // Blue
        if (number <= 30) return 'ball-r'; // Red
        if (number <= 40) return 'ball-g'; // Gray (Galaxy)
        return 'ball-gr';                  // Green
    }
});
