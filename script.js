document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const generateFiveBtn = document.getElementById('generate-five-btn');
    const resultContainer = document.getElementById('result-container');
    let isGenerating = false;

    // Generate 1 Set
    generateBtn.addEventListener('click', () => {
        if (isGenerating) return;
        handleGeneration(1);
    });

    // Generate 5 Sets
    generateFiveBtn.addEventListener('click', () => {
        if (isGenerating) return;
        handleGeneration(5);
    });

    async function handleGeneration(count) {
        isGenerating = true;
        setButtonsState(true);

        // Clear previous results
        resultContainer.innerHTML = '';
        const isSingle = count === 1;

        if (isSingle) {
            // Original styling for single row (no background container)
            await createAndAnimateRow(0, false);
        } else {
            // Generate multiple rows
            for (let i = 0; i < count; i++) {
                await createAndAnimateRow(i * 100, true);
            }
        }

        isGenerating = false;
        setButtonsState(false);
    }

    function setButtonsState(disabled) {
        generateBtn.disabled = disabled;
        generateFiveBtn.disabled = disabled;
        const opacity = disabled ? '0.7' : '1';
        generateBtn.style.opacity = opacity;
        generateFiveBtn.style.opacity = opacity;
    }

    function createAndAnimateRow(delay, isRowStyled) {
        return new Promise(resolve => {
            setTimeout(() => {
                const numbers = getUniqueNumbers();
                const row = document.createElement('div');

                if (isRowStyled) {
                    row.classList.add('lotto-row');
                } else {
                    // Start with flex and gap for single row too
                    row.style.display = 'flex';
                    row.style.gap = '12px';
                    row.style.justifyContent = 'center';
                }

                resultContainer.appendChild(row);

                // Animate balls one by one
                numbers.forEach((num, index) => {
                    setTimeout(() => {
                        const ball = createBall(num);
                        row.appendChild(ball);
                    }, index * 50); // Faster animation for bulk
                });

                // Resolve after this row is done (approximate to keep flow)
                resolve();
            }, delay);
        });
    }

    function getUniqueNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function createBall(number) {
        const ball = document.createElement('div');
        ball.classList.add('lotto-ball');
        ball.classList.add(getBallColorClass(number));
        ball.textContent = number;
        return ball;
    }

    function getBallColorClass(number) {
        if (number <= 10) return 'ball-y'; // Yellow
        if (number <= 20) return 'ball-b'; // Blue
        if (number <= 30) return 'ball-r'; // Red
        if (number <= 40) return 'ball-g'; // Gray (Galaxy)
        return 'ball-gr';                  // Green
    }
});
