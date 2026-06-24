export const DSAModule = {
    // Defines the DSA Roadmap structure
    topics: [
        {
            id: 'arrays',
            title: 'Arrays & Hashing',
            icon: '📦',
            problems: [
                { id: 'p1', title: 'Two Sum', difficulty: 'Easy', completed: false },
                { id: 'p2', title: 'Valid Anagram', difficulty: 'Easy', completed: false },
                { id: 'p3', title: 'Group Anagrams', difficulty: 'Medium', completed: false },
                { id: 'p4', title: 'Top K Frequent Elements', difficulty: 'Medium', completed: false }
            ]
        },
        {
            id: 'pointers',
            title: 'Two Pointers',
            icon: '👉',
            problems: [
                { id: 'p5', title: 'Valid Palindrome', difficulty: 'Easy', completed: false },
                { id: 'p6', title: '3Sum', difficulty: 'Medium', completed: false },
                { id: 'p7', title: 'Container With Most Water', difficulty: 'Medium', completed: false }
            ]
        },
        {
            id: 'stack',
            title: 'Stack',
            icon: '📚',
            problems: [
                { id: 'p8', title: 'Valid Parentheses', difficulty: 'Easy', completed: false },
                { id: 'p9', title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', completed: false },
                { id: 'p10', title: 'Generate Parentheses', difficulty: 'Medium', completed: false }
            ]
        },
        {
            id: 'trees',
            title: 'Trees',
            icon: '🌳',
            problems: [
                { id: 'p11', title: 'Invert Binary Tree', difficulty: 'Easy', completed: false },
                { id: 'p12', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', completed: false },
                { id: 'p13', title: 'Lowest Common Ancestor', difficulty: 'Medium', completed: false }
            ]
        }
    ],

    render: (container) => {
        // Load progress from local storage
        DSAModule.loadProgress();

        container.innerHTML = `
            <div class="dsa-container">
                <div class="dsa-header">
                    <h2>DATA STRUCTURES & ALGORITHMS MAP</h2>
                    <div class="progress-bar-container">
                        <div class="progress-fill" id="total-progress" style="width: 0%"></div>
                    </div>
                    <p style="text-align: right; font-size: 0.8rem; color: var(--text-muted); margin-top: 5px;">
                        <span id="progress-text">0%</span> Complete
                    </p>
                </div>

                <div class="topic-grid">
                    ${DSAModule.topics.map(topic => DSAModule.renderTopicCard(topic)).join('')}
                </div>
            </div>
        `;

        DSAModule.attachEventListeners();
        DSAModule.updateTotalProgress();
    },

    renderTopicCard: (topic) => {
        const completedCount = topic.problems.filter(p => p.completed).length;
        const totalCount = topic.problems.length;
        const percent = Math.round((completedCount / totalCount) * 100);

        return `
            <div class="topic-card">
                <div class="topic-header">
                    <div class="topic-icon">${topic.icon}</div>
                    <div class="topic-info">
                        <h3>${topic.title}</h3>
                        <div class="topic-progress">
                            <div class="mini-progress-bar">
                                <div class="mini-fill" style="width: ${percent}%"></div>
                            </div>
                            <span>${completedCount}/${totalCount}</span>
                        </div>
                    </div>
                </div>
                
                <div class="problem-list">
                    ${topic.problems.map(problem => `
                        <div class="problem-item ${problem.completed ? 'done' : ''}" 
                             onclick="DSAModule.toggleProblem('${topic.id}', '${problem.id}', this)">
                            <div class="checkbox"></div>
                            <span class="problem-title">${problem.title}</span>
                            <span class="badge ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    toggleProblem: (topicId, problemId, element) => {
        const topic = DSAModule.topics.find(t => t.id === topicId);
        const problem = topic.problems.find(p => p.id === problemId);
        
        problem.completed = !problem.completed;
        
        // Update UI immediately for responsiveness
        element.classList.toggle('done');
        
        // Save and update progress bars
        DSAModule.saveProgress();
        DSAModule.updateTotalProgress();
        
        // Re-render only progress (optimization could happen here, but re-render is safer for now)
        // For smoother UX, we can just update the specific text/bar
        const completedCount = topic.problems.filter(p => p.completed).length;
        const totalCount = topic.problems.length;
        const percent = Math.round((completedCount / totalCount) * 100);
        
        // Find the progress bar within this specific card (traversing up to topic-card)
        const card = element.closest('.topic-card');
        card.querySelector('.mini-fill').style.width = `${percent}%`;
        card.querySelector('.topic-progress span').innerText = `${completedCount}/${totalCount}`;
    },

    updateTotalProgress: () => {
        let totalProblems = 0;
        let completedProblems = 0;

        DSAModule.topics.forEach(topic => {
            totalProblems += topic.problems.length;
            completedProblems += topic.problems.filter(p => p.completed).length;
        });

        const percent = Math.round((completedProblems / totalProblems) * 100);
        document.getElementById('total-progress').style.width = `${percent}%`;
        document.getElementById('progress-text').innerText = `${percent}%`;
    },

    saveProgress: () => {
        const progress = {};
        DSAModule.topics.forEach(topic => {
            topic.problems.forEach(problem => {
                if (problem.completed) {
                    progress[problem.id] = true;
                }
            });
        });
        localStorage.setItem('dsa_progress', JSON.stringify(progress));
    },

    loadProgress: () => {
        const stored = localStorage.getItem('dsa_progress');
        if (stored) {
            const progress = JSON.parse(stored);
            DSAModule.topics.forEach(topic => {
                topic.problems.forEach(problem => {
                    if (progress[problem.id]) {
                        problem.completed = true;
                    }
                });
            });
        }
    },

    attachEventListeners: () => {
        // Any global event listeners if needed
    }
};
