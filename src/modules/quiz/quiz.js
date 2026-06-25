import { GoogleGenerativeAI } from "@google/generative-ai";

export const QuizModule = {
    get apiKey() { return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key'); }, set apiKey(val) {},
    questions: [],
    currentQuestionIndex: 0,
    score: 0,

    render: (container) => {
        container.innerHTML = `
            <div class="quiz-container fade-in">
                <header class="quiz-header">
                    <h2>AI Knowledge Check</h2>
                    <p>Test your skills with dynamically generated questions powered by Gemini AI.</p>
                </header>
                
                ${!QuizModule.apiKey ? QuizModule.renderApiKeyInput() : QuizModule.renderSetup()}
            </div>
        `;

        QuizModule.attachEventListeners();
    },

    renderApiKeyInput: () => {
        return `
            <div class="api-card scale-in">
                <div class="api-icon"><i class="fas fa-key"></i></div>
                <h3>Unlock Pro Features</h3>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">
                    Enter your free Google Gemini API key to generate unlimited custom quizzes.
                </p>
                <input type="password" id="api-key-input" class="api-input" placeholder="Paste API Key here...">
                <button class="btn-primary" id="save-api-key" style="width: 100%; padding: 1rem;">Verify & Save Key</button>
                <p style="margin-top: 1.5rem; font-size: 0.85rem;">
                    <a href="https://makersuite.google.com/app/apikey" target="_blank" style="color: var(--accent); text-decoration: none; border-bottom: 1px dashed var(--accent);">Get a free key from Google AI Studio</a>
                </p>
            </div>
        `;
    },

    renderSetup: () => {
        return `
            <div class="quiz-setup scale-in">
                <div class="setup-grid">
                    <div>
                        <label class="form-label">Quiz Topic</label>
                        <input type="text" id="quiz-topic" class="topic-input" placeholder="e.g. React Hooks, System Design, Python async/await">
                    </div>
                    
                    <div>
                        <label class="form-label">Difficulty Level</label>
                        <div class="difficulty-grid">
                            <button class="diff-btn active" data-diff="Easy">Easy</button>
                            <button class="diff-btn" data-diff="Medium">Medium</button>
                            <button class="diff-btn" data-diff="Hard">Hard</button>
                        </div>
                    </div>

                    <button class="btn-generate" id="generate-btn">
                        <i class="fas fa-magic"></i> Generate AI Quiz
                    </button>
                    
                    <button id="change-key-btn" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; margin-top: 0.5rem;">
                        Update API Key
                    </button>
                </div>
            </div>

            <div id="quiz-loading" class="loading-container" style="display: none;">
                <div class="spinner-ring"></div>
                <h3 style="margin-bottom: 0.5rem; color: #fff;">Consulting Gemini AI</h3>
                <p style="color: var(--text-dim);">Crafting unique questions based on your topic...</p>
            </div>
            
            <div id="quiz-content" style="display: none;"></div>
        `;
    },

    attachEventListeners: () => {
        const keyBtn = document.getElementById('save-api-key');
        if (keyBtn) {
            keyBtn.addEventListener('click', () => {
                const input = document.getElementById('api-key-input');
                if (input.value) {
                    localStorage.setItem('gemini_api_key', input.value.trim());
                    QuizModule.apiKey = input.value.trim();
                    QuizModule.render(document.querySelector('#module-container'));
                }
            });
            return;
        }

        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', QuizModule.generateQuiz);
        }

        const diffBtns = document.querySelectorAll('.diff-btn');
        diffBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                diffBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        const changeKeyBtn = document.getElementById('change-key-btn');
        if (changeKeyBtn) {
            changeKeyBtn.addEventListener('click', () => {
                localStorage.removeItem('gemini_api_key');
                QuizModule.apiKey = '';
                QuizModule.render(document.querySelector('#module-container'));
            });
        }
    },

    generateQuiz: async () => {
        const topic = document.getElementById('quiz-topic').value;
        if (!topic) {
            alert("Please enter a topic to test!");
            return;
        }

        const difficulty = document.querySelector('.diff-btn.active').innerText;

        document.querySelector('.quiz-setup').style.display = 'none';
        document.getElementById('quiz-loading').style.display = 'block';

        try {
            const genAI = new GoogleGenerativeAI(QuizModule.apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: { responseMimeType: "application/json" }
            });

            const prompt = `Generate 10 multiple-choice technical interview questions about "${topic}" at ${difficulty} difficulty level. 
            The output MUST be a JSON array of objects with this schema:
            [
                {
                    "question": "string",
                    "options": ["string", "string", "string", "string"],
                    "correctIndex": number (0-3),
                    "explanation": "string"
                }
            ]`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            console.log("Gemini Raw Response:", text); // Debugging

            // Clean the response if it contains markdown code blocks
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                QuizModule.questions = JSON.parse(text);

                if (!Array.isArray(QuizModule.questions) || QuizModule.questions.length === 0) {
                    throw new Error("Invalid quiz format received");
                }

                QuizModule.currentQuestionIndex = 0;
                QuizModule.score = 0;

                document.getElementById('quiz-loading').style.display = 'none';
                document.getElementById('quiz-content').style.display = 'block';
                QuizModule.showQuestion();
            } catch (parseError) {
                console.error("Parse Error:", parseError);
                throw new Error("Failed to parse AI response. Try again.");
            }

        } catch (error) {
            console.error("Gen AI Error:", error);
            alert(`Quiz Generation Failed:\n${error.message}\n\nCheck console for details.`);
            document.querySelector('.quiz-setup').style.display = 'block';
            document.getElementById('quiz-loading').style.display = 'none';
        }
    },

    showQuestion: () => {
        const q = QuizModule.questions[QuizModule.currentQuestionIndex];
        const container = document.getElementById('quiz-content');

        container.innerHTML = `
            <div class="question-card fade-in">
                <div class="question-meta">
                    <span class="meta-badge">Question ${QuizModule.currentQuestionIndex + 1} of ${QuizModule.questions.length}</span>
                    <span class="meta-badge" style="color: var(--primary);">Score: ${QuizModule.score}</span>
                </div>
                
                <h3 class="question-text">${q.question}</h3>
                
                <div class="options-grid">
                    ${q.options.map((opt, idx) => `
                        <button class="option-btn" onclick="QuizModule.checkAnswer(${idx}, this)">
                            <span style="opacity: 0.5; margin-right: 10px;">${String.fromCharCode(65 + idx)}.</span> ${opt}
                        </button>
                    `).join('')}
                </div>

                <div id="explanation-box" class="explanation-box" style="display: none;">
                    <strong style="display: block; margin-bottom: 0.5rem; color: var(--primary); font-size: 0.9rem; text-transform: uppercase;">Insight</strong>
                    <p style="color: var(--text-muted); line-height: 1.6;">${q.explanation}</p>
                    <button class="btn-primary" onclick="QuizModule.nextQuestion()" style="margin-top: 1.5rem; width: auto; padding: 0.8rem 2rem;">
                        ${QuizModule.currentQuestionIndex === QuizModule.questions.length - 1 ? 'Finish Quiz' : 'Next Question <i class="fas fa-arrow-right"></i>'}
                    </button>
                </div>
            </div>
        `;

        window.QuizModule = QuizModule;
    },

    checkAnswer: (idx, btn) => {
        const q = QuizModule.questions[QuizModule.currentQuestionIndex];
        const buttons = document.querySelectorAll('.option-btn');

        buttons.forEach(b => {
            b.disabled = true;
            b.style.cursor = 'default';
        });

        if (idx === q.correctIndex) {
            btn.classList.add('correct');
            QuizModule.score++;
        } else {
            btn.classList.add('wrong');
            buttons[q.correctIndex].classList.add('correct');
        }

        document.getElementById('explanation-box').style.display = 'block';
    },

    nextQuestion: () => {
        QuizModule.currentQuestionIndex++;
        if (QuizModule.currentQuestionIndex < QuizModule.questions.length) {
            QuizModule.showQuestion();
        } else {
            QuizModule.showResults();
        }
    },

    showResults: () => {
        const percentage = Math.round((QuizModule.score / QuizModule.questions.length) * 100);
        const container = document.getElementById('quiz-content');

        container.innerHTML = `
            <div class="results-card scale-in">
                <span class="score-emoji" style="font-size: 3rem;">${percentage >= 80 ? '<i class="fas fa-trophy"></i>' : percentage >= 50 ? '<i class="fas fa-chart-line"></i>' : '<i class="fas fa-book"></i>'}</span>
                
                <div class="score-display">
                    <div class="circle-bg"></div>
                    <div class="circle-progress" style="transform: rotate(${45 + (percentage * 3.6)}deg)"></div>
                    <div class="score-number">${percentage}%</div>
                </div>

                <h2 style="margin-bottom: 0.5rem;">Assessment Complete</h2>
                <p style="color: var(--text-muted); margin-bottom: 2.5rem;">
                    You answered ${QuizModule.score} out of ${QuizModule.questions.length} questions correctly.
                </p>

                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn-primary" onclick="QuizModule.render(document.querySelector('#module-container'))">
                        Try Another Topic
                    </button>
                    <button class="btn-outline" onclick="document.querySelector('.nav-item[data-module=\\'dashboard\\']').click()">
                        Return Dashboard
                    </button>
                </div>
            </div>
        `;
    }
};
