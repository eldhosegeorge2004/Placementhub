export const TypingModule = {
    render: (container) => {
        container.innerHTML = `
            <div class="typing-container fade-in" style="max-width: 900px; margin: 0 auto;">
                <header class="section-header" style="margin-bottom: 3rem; text-align: center;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Typing Mastery</h2>
                    <p style="color: var(--text-muted);">Benchmark your documentation speed for technical roles.</p>
                </header>

                <div class="typing-stats" style="margin-bottom: 2rem;">
                    <div class="card" style="text-align: center; padding: 1.5rem;">
                        <span style="display: block; font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">WPM</span>
                        <div style="font-size: 2rem; font-weight: 800; color: var(--primary);" id="wpm">0</div>
                    </div>
                    <div class="card" style="text-align: center; padding: 1.5rem;">
                        <span style="display: block; font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Accuracy</span>
                        <div style="font-size: 2rem; font-weight: 800; color: var(--secondary);" id="accuracy">100%</div>
                    </div>
                    <div class="card" style="text-align: center; padding: 1.5rem;">
                        <span style="display: block; font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Time</span>
                        <div style="font-size: 2rem; font-weight: 800; color: #fff;" id="timer">60s</div>
                    </div>
                    <div class="card" style="text-align: center; padding: 1.5rem;">
                        <span style="display: block; font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Best</span>
                        <div style="font-size: 2rem; font-weight: 800; color: var(--accent);" id="top-score">-</div>
                    </div>
                </div>
                
                <div class="typing-area card" id="typing-area" style="padding: 3rem; position: relative; overflow: hidden; margin-bottom: 2rem;">
                    <div id="text-display" style="font-size: 1.5rem; line-height: 2; font-family: 'Fira Code', monospace; color: var(--text-dim);">
                        <!-- Content loaded via JS -->
                    </div>
                    <input type="text" id="typing-input" autocomplete="off" spellcheck="false" 
                        style="position: absolute; opacity: 0; pointer-events: none;">
                </div>
                
                <div class="typing-actions-wrapper" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <button class="btn-primary restart-btn" id="restart-btn">Try Again</button>
                    <p style="color: var(--text-dim); font-size: 0.9rem;">
                        <span style="color: var(--primary);">Tip:</span> Click the box and start typing. Press <kbd style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 6px;">TAB</kbd> to reset.
                    </p>
                </div>

                <div id="review-panel" style="display: none; margin-top: 2rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid var(--primary); animation: fadeIn 0.5s;">
                    <h3 style="color: var(--primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span><i class="fas fa-chart-pie"></i></span> Performance Review
                    </h3>
                    <div id="review-content" style="color: var(--text-dim); line-height: 1.6;">Analyzing performance...</div>
                </div>
            </div>
        `;

        TypingModule.init();
    },

    init: () => {
        const textDisplay = document.getElementById('text-display');
        const typingArea = document.getElementById('typing-area');
        const inputField = document.getElementById('typing-input');
        const wpmDisplay = document.getElementById('wpm');
        const accuracyDisplay = document.getElementById('accuracy');
        const timerDisplay = document.getElementById('timer');
        const restartBtn = document.getElementById('restart-btn');
        const topScoreDisplay = document.getElementById('top-score');

        // Load best score
        const savedScore = localStorage.getItem('typing_high_score') || 0;
        topScoreDisplay.innerText = savedScore;

        const snippets = [
            "Binary search is an O(log n) algorithm that finds a target in a sorted array by halving the search space each step.",
            "Asynchronous functions in JavaScript return a Promise and allow the use of await for cleaner non-blocking code.",
            "Normalizing a database helps reduce data redundancy and improves integrity by organizing data into related tables.",
            "The Virtual DOM in React allows for efficient updates by only re-rendering parts of the UI that have actually changed.",
            "Big O notation provides an upper bound on the time complexity, indicating the worst-case performance of an algorithm.",
            "Closures allow functions to retain access to variables from their outer scope even after the outer function has returned.",
            "Tailwind CSS is a utility-first CSS framework for rapidly building deep custom designs without leaving your HTML.",
            "Docker containers allow developers to package an application with all its dependencies and ship it as a single unit."
        ];

        let state = {
            timer: 60,
            interval: null,
            isStarted: false,
            charIndex: 0,
            mistakes: 0,
            correctChars: 0,
            currentQuote: ""
        };

        const loadQuote = () => {
            state.currentQuote = snippets[Math.floor(Math.random() * snippets.length)];
            textDisplay.innerHTML = state.currentQuote.split("").map(char => `<span class="char" style="position: relative;">${char}</span>`).join("");
            textDisplay.querySelector(".char").style.color = "var(--primary)";
            textDisplay.querySelector(".char").style.borderBottom = "2px solid var(--primary)";
            inputField.value = "";
            inputField.focus();
        };

        const startTimer = () => {
            if (state.timer > 0) {
                state.timer--;
                timerDisplay.innerText = `${state.timer}s`;
                const timePassed = 60 - state.timer;
                const wpm = Math.round(((state.correctChars / 5) / (timePassed / 60)));
                wpmDisplay.innerText = wpm > 0 ? wpm : 0;
            } else {
                finishSession();
            }
        };

        const finishSession = () => {
            clearInterval(state.interval);
            inputField.disabled = true;
            typingArea.style.opacity = "0.5";
            const wpm = parseInt(wpmDisplay.innerText);
            const accuracy = accuracyDisplay.innerText;

            if (state.charIndex === state.currentQuote.length) {
                const currentBest = parseInt(localStorage.getItem('typing_high_score') || 0);
                if (wpm > currentBest) {
                    localStorage.setItem('typing_high_score', wpm);
                    document.getElementById('top-score').innerText = wpm;
                }
            }

            // Display General Review
            const reviewPanel = document.getElementById('review-panel');
            const reviewContent = document.getElementById('review-content');
            
            reviewPanel.style.display = 'block';
            reviewContent.innerText = "Analyzing your typing metrics...";
            
            TypingModule.generateGeneralReview(wpm, accuracy, state.mistakes);
        };

        const handleTyping = () => {
            const characters = textDisplay.querySelectorAll(".char");
            const typedChar = inputField.value.split("")[state.charIndex];

            if (!state.isStarted) {
                state.interval = setInterval(startTimer, 1000);
                state.isStarted = true;
            }

            if (typedChar == null) {
                if (state.charIndex > 0) {
                    state.charIndex--;
                    characters[state.charIndex].style.color = "var(--text-dim)";
                    characters[state.charIndex].style.background = "none";
                }
            } else {
                if (characters[state.charIndex].innerText === typedChar) {
                    characters[state.charIndex].style.color = "#4ade80";
                    state.correctChars++;
                } else {
                    characters[state.charIndex].style.color = "#f87171";
                    characters[state.charIndex].style.background = "rgba(239, 68, 68, 0.1)";
                    state.mistakes++;
                }
                state.charIndex++;
            }

            characters.forEach(s => { s.style.borderBottom = "none"; });
            if (state.charIndex < characters.length) {
                characters[state.charIndex].style.borderBottom = "2px solid var(--primary)";
            } else {
                finishSession();
            }

            const acc = Math.round(((state.charIndex - state.mistakes) / state.charIndex) * 100);
            accuracyDisplay.innerText = `${isNaN(acc) ? 100 : acc}%`;
        };

        const reset = () => {
            clearInterval(state.interval);
            state = { timer: 60, interval: null, isStarted: false, charIndex: 0, mistakes: 0, correctChars: 0, currentQuote: "" };
            inputField.disabled = false;
            typingArea.style.opacity = "1";
            timerDisplay.innerText = "60s";
            wpmDisplay.innerText = "0";
            accuracyDisplay.innerText = "100%";
            document.getElementById('review-panel').style.display = 'none';
            loadQuote();
        };

        inputField.addEventListener("input", handleTyping);
        restartBtn.addEventListener("click", reset);
        typingArea.addEventListener("click", () => inputField.focus());
        window.addEventListener("keydown", (e) => { if (e.key === "Tab") { e.preventDefault(); reset(); } });

        loadQuote();
    },

    generateGeneralReview: (wpm, accuracy, mistakes) => {
        const reviewContent = document.getElementById('review-content');
        
        let speedFeedback = "";
        if (wpm >= 80) {
            speedFeedback = "Excellent speed! You are typing at the pace of a seasoned developer.";
        } else if (wpm >= 50) {
            speedFeedback = "Solid speed! You have a great foundation for writing and editing code efficiently.";
        } else {
            speedFeedback = "Good effort! Keep practicing regularly to build muscle memory and boost your WPM.";
        }

        let accValue = parseInt(accuracy);
        let accuracyFeedback = "";
        if (accValue >= 98) {
            accuracyFeedback = "Your accuracy is outstanding. Precision is crucial in programming!";
        } else if (accValue >= 90) {
            accuracyFeedback = `Your accuracy is good, but you made ${mistakes} mistakes. Try to slow down slightly to reduce backspacing.`;
        } else {
            accuracyFeedback = `You made ${mistakes} mistakes. Remember that in coding, accuracy is often more important than raw speed.`;
        }

        reviewContent.innerHTML = `<strong>Speed:</strong> ${speedFeedback}<br><br><strong>Accuracy:</strong> ${accuracyFeedback}`;
    }
};

