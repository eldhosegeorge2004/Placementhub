const fs = require('fs');

const languages = ['JavaScript', 'Python', 'Java', 'C++', 'C', 'SQL', 'C#', 'Go', 'Ruby', 'Swift'];

const diffs = [
    { type: 'Easy', count: 3 },
    { type: 'Medium', count: 3 },
    { type: 'Hard', count: 4 }
];

let idCounter = 1;
const problems = [];

languages.forEach(lang => {
    diffs.forEach(diff => {
        for(let i=0; i<diff.count; i++) {
            problems.push({
                id: 'p' + idCounter++,
                language: lang,
                title: `${lang} ${diff.type} Problem ${i+1}`,
                desc: `Most commonly asked ${lang} interview question (${diff.type}). Solve the problem efficiently.`,
                badge: diff.type,
                startCode: `// ${lang} Starter Code\n// Write your solution here\n`,
                solutionCode: `// ${lang} Solution Code\n// Efficient solution implementation\n`,
                completed: false
            });
        }
    });
});

const problemsJson = JSON.stringify(problems, null, 4);

let clubJs = fs.readFileSync('src/modules/club/club.js', 'utf8');

const newProblemsStr = `problems: ${problemsJson},`;
clubJs = clubJs.replace(/problems:\s*\[[\s\S]*?\],\s*render:/, newProblemsStr + '\n\n    render:');

if(!clubJs.includes('selectedLanguage:')) {
    clubJs = clubJs.replace(/export const ClubModule = \{/, "export const ClubModule = {\n    selectedLanguage: 'JavaScript',");
}

const newGetTimelineHTML = `getTimelineHTML: () => {
        const langs = [...new Set(ClubModule.problems.map(p => p.language))];
        let tabsHtml = '<div class="language-tabs" style="display:flex; gap:10px; overflow-x:auto; padding-bottom:10px; margin-bottom:20px;">';
        langs.forEach(lang => {
            tabsHtml += '<button class="btn-sm ' + (ClubModule.selectedLanguage === lang ? 'btn-primary' : 'btn-glass') + '" onclick="window.ClubModule.setLanguage(\\'' + lang + '\\')">' + lang + '</button>';
        });
        tabsHtml += '</div>';

        const filtered = ClubModule.problems.filter(p => p.language === ClubModule.selectedLanguage);
        
        let html = '<div class="timeline">';
        filtered.forEach(problem => {
            html += \`
                <div class="timeline-item">
                    <div class="timeline-card \${problem.completed ? 'completed-card' : ''}" style="transition: 0.3s; border: 1px solid \${problem.completed ? 'var(--primary)' : 'transparent'};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span class="time-badge">\${problem.badge}</span>
                            
                            <label class="completion-toggle" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                <input type="checkbox" \${problem.completed ? 'checked' : ''} 
                                    onchange="ClubModule.toggleCompletion('\${problem.id}', this)"
                                    style="width: 18px; height: 18px; accent-color: var(--primary);">
                                <span style="font-size: 0.85rem; color: var(--text-muted);">Mark Done</span>
                            </label>
                        </div>
                        
                        <h3 style="font-size: 1.5rem; color: #fff; margin: 0.5rem 0;">
                            \${problem.title}
                        </h3>
                        <p style="color: #94a3b8; margin-bottom: 1rem;">\${problem.desc}</p>
                        
                        <div style="display: flex; gap: 1rem;">
                            <button class="btn-primary practice-btn" data-id="\${problem.id}">
                                \${problem.completed ? 'Review Solution ↺' : 'Practice Now ⚡'}
                            </button>
                        </div>
                    </div>
                </div>
            \`;
        });
        html += '</div>';

        return tabsHtml + html;
    },`;

clubJs = clubJs.replace(/getTimelineHTML:\s*\(\)\s*=>\s*\`[\s\S]*?\`,/, newGetTimelineHTML);

if (!clubJs.includes('setLanguage:')) {
    clubJs = clubJs.replace(/attachEventListeners:/, `setLanguage: (lang) => {
        ClubModule.selectedLanguage = lang;
        document.getElementById('club-view-content').innerHTML = ClubModule.getTimelineHTML();
        ClubModule.attachEventListeners();
    },

    attachEventListeners:`);
}

fs.writeFileSync('src/modules/club/club.js', clubJs);
console.log('club.js updated!');
