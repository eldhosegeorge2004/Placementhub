export const AptitudeModule = {
    // A robust static bank of aptitude questions covering Quant, Logic, and Verbal
    questionBank: [
        // Quantitative Aptitude
        {
            category: "Quantitative Aptitude",
            question: "Find 20% of 450.",
            options: ["70", "80", "90", "100"],
            correctIndex: 2,
            explanation: "20% means 20/100 or 1/5. 1/5 of 450 is 450 ÷ 5 = 90."
        },
        {
            category: "Quantitative Aptitude",
            question: "A shopkeeper sells an item for ₹500 at a loss of 20%. What was the cost price?",
            options: ["₹600", "₹625", "₹520", "₹700"],
            correctIndex: 1,
            explanation: "Selling Price = 80% of Cost Price. So, 0.8 * CP = 500. CP = 500 / 0.8 = 625."
        },
        {
            category: "Quantitative Aptitude",
            question: "Divide ₹1200 in the ratio 2:3. What is the larger share?",
            options: ["₹480", "₹600", "₹720", "₹800"],
            correctIndex: 2,
            explanation: "Total parts = 2 + 3 = 5. One part = 1200 / 5 = 240. Larger share = 3 * 240 = ₹720."
        },
        {
            category: "Quantitative Aptitude",
            question: "The average of 5 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?",
            options: ["28", "25", "22", "30"],
            correctIndex: 0,
            explanation: "Sum of 5 numbers = 5 * 20 = 100. Sum of 4 numbers = 4 * 18 = 72. Excluded number = 100 - 72 = 28."
        },
        {
            category: "Quantitative Aptitude",
            question: "A can finish a work in 10 days and B in 15 days. How long will they take if they work together?",
            options: ["5 days", "6 days", "8 days", "12 days"],
            correctIndex: 1,
            explanation: "A's 1 day work = 1/10. B's 1 day work = 1/15. Together = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So they take 6 days."
        },
        {
            category: "Quantitative Aptitude",
            question: "A train 100m long is running at 36 km/hr. How long will it take to cross a pole?",
            options: ["8 seconds", "10 seconds", "12 seconds", "15 seconds"],
            correctIndex: 1,
            explanation: "Speed in m/s = 36 * (5/18) = 10 m/s. Time = Distance / Speed = 100 / 10 = 10 seconds."
        },
        {
            category: "Quantitative Aptitude",
            question: "What is the unit digit of 2^5?",
            options: ["2", "4", "8", "6"],
            correctIndex: 0,
            explanation: "2^1=2, 2^2=4, 2^3=8, 2^4=16 (ends in 6), 2^5=32 (ends in 2). The pattern repeats every 4 powers."
        },
        {
            category: "Quantitative Aptitude",
            question: "In how many ways can the letters of the word 'APPLE' be arranged?",
            options: ["120", "60", "24", "72"],
            correctIndex: 1,
            explanation: "Total letters = 5. P appears 2 times. Total ways = 5! / 2! = (5*4*3*2*1) / 2 = 120 / 2 = 60."
        },
        
        // Logical Reasoning
        {
            category: "Logical Reasoning",
            question: "Complete the series: 2, 4, 8, 16, ?",
            options: ["24", "30", "32", "64"],
            correctIndex: 2,
            explanation: "Each number is multiplied by 2 to get the next number. 16 * 2 = 32."
        },
        {
            category: "Logical Reasoning",
            question: "Dog is to Puppy as Cat is to...?",
            options: ["Cub", "Kitten", "Calf", "Fawn"],
            correctIndex: 1,
            explanation: "A baby dog is a puppy, a baby cat is a kitten."
        },
        {
            category: "Logical Reasoning",
            question: "If CAT is coded as DBU, how is DOG coded?",
            options: ["EPH", "FPI", "EQH", "EPJ"],
            correctIndex: 0,
            explanation: "Each letter is shifted forward by 1 in the alphabet. D->E, O->P, G->H. So DOG -> EPH."
        },
        {
            category: "Logical Reasoning",
            question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
            options: ["His own", "His son's", "His father's", "His nephew's"],
            correctIndex: 1,
            explanation: "'My father's son' is the man himself (since he has no siblings). So, 'that man's father is ME'. Thus, the photograph is of his son."
        },
        {
            category: "Logical Reasoning",
            question: "A man walks 5 km South, turns right and walks 3 km, turns right again and walks 5 km. Which direction is he facing now?",
            options: ["North", "South", "East", "West"],
            correctIndex: 0,
            explanation: "Facing South -> turns right (faces West) -> turns right (faces North). He is facing North."
        },
        {
            category: "Logical Reasoning",
            question: "In a row of 40 students, Rahul is 15th from the left. What is his position from the right?",
            options: ["24th", "25th", "26th", "27th"],
            correctIndex: 2,
            explanation: "Position from right = (Total students - Position from left) + 1 = (40 - 15) + 1 = 25 + 1 = 26th."
        },

        // Verbal Ability
        {
            category: "Verbal Ability",
            question: "What is the synonym of 'Diligent'?",
            options: ["Lazy", "Hardworking", "Careless", "Slow"],
            correctIndex: 1,
            explanation: "Diligent means showing care and conscientiousness in one's work or duties, which means Hardworking."
        },
        {
            category: "Verbal Ability",
            question: "What is the antonym of 'Expand'?",
            options: ["Enlarge", "Grow", "Shrink", "Inflate"],
            correctIndex: 2,
            explanation: "Expand means to become or make larger. Shrink means to become or make smaller."
        },
        {
            category: "Verbal Ability",
            question: "Choose the correct sentence:",
            options: ["He go to school daily.", "He goes to school daily.", "He going to school daily.", "He gone to school daily."],
            correctIndex: 1,
            explanation: "For singular third-person pronoun 'He', the simple present tense verb must end in 's' or 'es' ('goes')."
        },
        {
            category: "Verbal Ability",
            question: "Fill in the blank: She is _____ honest girl.",
            options: ["a", "an", "the", "no article"],
            correctIndex: 1,
            explanation: "'Honest' starts with a vowel sound (silent 'H', sounds like 'onest'), so we use 'an'."
        },
        {
            category: "Verbal Ability",
            question: "What is the meaning of the idiom 'Once in a blue moon'?",
            options: ["Very often", "Never", "Very rarely", "Always"],
            correctIndex: 2,
            explanation: "The phrase is used to describe an event that happens extremely rarely."
        },
        {
            category: "Verbal Ability",
            question: "One word substitution: 'A person who knows many languages'",
            options: ["Linguist", "Polyglot", "Translator", "Bilingual"],
            correctIndex: 1,
            explanation: "A polyglot is a person who knows and is able to use several languages."
        }
    ],

    questions: [],
    currentQuestionIndex: 0,
    score: 0,

    render: (container) => {
        container.innerHTML = `
            <div class="aptitude-container fade-in" style="max-width: 800px; margin: 0 auto;">
                <header class="section-header" style="text-align: center; margin-bottom: 3rem;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Aptitude Training</h2>
                    <p style="color: var(--text-muted);">Master the most commonly asked placement questions.</p>
                </header>

                <div id="aptitude-setup" class="card" style="text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;"><i class="fas fa-brain"></i></div>
                    <h3 style="margin-bottom: 1.5rem;">Start Practice Session</h3>
                    <p style="color: var(--text-dim); margin-bottom: 2rem;">
                        Test your skills with a random set of 5 multiple-choice questions covering Quantitative Aptitude, Logical Reasoning, and Verbal Ability based on top IT company patterns.
                    </p>
                    
                    <button class="btn-primary" id="btn-generate-aptitude" style="font-size: 1.1rem; padding: 1rem 3rem;">
                        <i class="fas fa-play"></i> Start Session
                    </button>
                </div>

                <div id="aptitude-test" style="display: none;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-dim);">
                        <span id="aptitude-progress">Question 1 of 5</span>
                        <span id="aptitude-score">Score: 0</span>
                    </div>
                    
                    <div class="card" style="padding: 2.5rem; position: relative;">
                        <div id="aptitude-category" style="position: absolute; top: 1rem; right: 1rem; font-size: 0.75rem; background: rgba(255,255,255,0.1); padding: 0.25rem 0.75rem; border-radius: 12px; color: var(--text-dim);"></div>
                        
                        <h3 id="aptitude-question-text" style="font-size: 1.3rem; line-height: 1.6; margin-bottom: 2rem; margin-top: 1rem; color: #fff;"></h3>
                        <div id="aptitude-options" style="display: flex; flex-direction: column; gap: 1rem;">
                            <!-- Options injected here -->
                        </div>

                        <div id="aptitude-explanation-box" style="display: none; margin-top: 2rem; padding: 1.5rem; background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; border-radius: 8px;">
                            <h4 style="color: #ef4444; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-exclamation-circle"></i> Incorrect. Here's the simplest explanation:
                            </h4>
                            <p id="aptitude-explanation-text" style="color: var(--text-dim); line-height: 1.6;"></p>
                        </div>

                        <div style="margin-top: 2rem; text-align: right;">
                            <button id="btn-next-aptitude" class="btn-primary" style="display: none;">
                                Next Question <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="aptitude-results" style="display: none; text-align: center;" class="card">
                    <div style="font-size: 4rem; margin-bottom: 1rem;"><i class="fas fa-trophy" style="color: var(--primary);"></i></div>
                    <h3 style="margin-bottom: 1rem; font-size: 2rem;">Session Complete!</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">You scored <span id="final-score" style="color: #fff; font-weight: bold;"></span> out of <span id="total-qs"></span>.</p>
                    <button class="btn-primary" onclick="window.AptitudeModule.resetSession()">Try Another Session</button>
                </div>
            </div>
        `;

        AptitudeModule.attachEvents();
    },

    attachEvents: () => {
        const btnGen = document.getElementById('btn-generate-aptitude');
        if (btnGen) {
            btnGen.addEventListener('click', AptitudeModule.startSession);
        }

        const btnNext = document.getElementById('btn-next-aptitude');
        if (btnNext) {
            btnNext.addEventListener('click', AptitudeModule.nextQuestion);
        }
    },

    startSession: () => {
        document.getElementById('aptitude-setup').style.display = 'none';
        
        // Shuffle and pick 5 random questions
        const shuffled = [...AptitudeModule.questionBank].sort(() => 0.5 - Math.random());
        AptitudeModule.questions = shuffled.slice(0, 5);
        
        AptitudeModule.currentQuestionIndex = 0;
        AptitudeModule.score = 0;

        document.getElementById('aptitude-test').style.display = 'block';
        AptitudeModule.renderCurrentQuestion();
    },

    renderCurrentQuestion: () => {
        const q = AptitudeModule.questions[AptitudeModule.currentQuestionIndex];
        
        document.getElementById('aptitude-progress').innerText = `Question ${AptitudeModule.currentQuestionIndex + 1} of ${AptitudeModule.questions.length}`;
        document.getElementById('aptitude-score').innerText = `Score: ${AptitudeModule.score}`;
        document.getElementById('aptitude-category').innerText = q.category;
        
        document.getElementById('aptitude-question-text').innerText = q.question;
        
        const optionsContainer = document.getElementById('aptitude-options');
        optionsContainer.innerHTML = '';
        
        document.getElementById('aptitude-explanation-box').style.display = 'none';
        document.getElementById('btn-next-aptitude').style.display = 'none';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn-glass';
            btn.style.textAlign = 'left';
            btn.style.padding = '1rem 1.5rem';
            btn.style.fontSize = '1rem';
            btn.innerText = opt;
            btn.onclick = () => AptitudeModule.handleAnswer(idx, btn);
            optionsContainer.appendChild(btn);
        });
    },

    handleAnswer: (selectedIndex, btnElement) => {
        const q = AptitudeModule.questions[AptitudeModule.currentQuestionIndex];
        const optionsContainer = document.getElementById('aptitude-options');
        const buttons = optionsContainer.querySelectorAll('button');
        
        // Disable all buttons
        buttons.forEach(b => {
            b.disabled = true;
            b.style.opacity = '0.7';
            b.style.cursor = 'default';
        });

        if (selectedIndex === q.correctIndex) {
            // Correct
            btnElement.style.background = 'rgba(74, 222, 128, 0.2)';
            btnElement.style.borderColor = '#4ade80';
            btnElement.style.color = '#4ade80';
            btnElement.style.opacity = '1';
            AptitudeModule.score++;
            document.getElementById('aptitude-score').innerText = `Score: ${AptitudeModule.score}`;
        } else {
            // Incorrect
            btnElement.style.background = 'rgba(239, 68, 68, 0.2)';
            btnElement.style.borderColor = '#ef4444';
            btnElement.style.color = '#ef4444';
            btnElement.style.opacity = '1';
            
            // Highlight correct one
            buttons[q.correctIndex].style.background = 'rgba(74, 222, 128, 0.2)';
            buttons[q.correctIndex].style.borderColor = '#4ade80';
            buttons[q.correctIndex].style.color = '#4ade80';
            buttons[q.correctIndex].style.opacity = '1';

            // Show explanation for wrong answer
            const explanationBox = document.getElementById('aptitude-explanation-box');
            const explanationText = document.getElementById('aptitude-explanation-text');
            explanationText.innerText = q.explanation;
            explanationBox.style.display = 'block';
            
            // Scroll to explanation
            setTimeout(() => explanationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }

        document.getElementById('btn-next-aptitude').style.display = 'inline-block';
    },

    nextQuestion: () => {
        AptitudeModule.currentQuestionIndex++;
        
        if (AptitudeModule.currentQuestionIndex < AptitudeModule.questions.length) {
            AptitudeModule.renderCurrentQuestion();
        } else {
            // Finish session
            document.getElementById('aptitude-test').style.display = 'none';
            const results = document.getElementById('aptitude-results');
            results.style.display = 'block';
            
            document.getElementById('final-score').innerText = AptitudeModule.score;
            document.getElementById('total-qs').innerText = AptitudeModule.questions.length;
        }
    },

    resetSession: () => {
        document.getElementById('aptitude-results').style.display = 'none';
        document.getElementById('aptitude-setup').style.display = 'block';
        AptitudeModule.questions = [];
        AptitudeModule.currentQuestionIndex = 0;
        AptitudeModule.score = 0;
    }
};

window.AptitudeModule = AptitudeModule;
