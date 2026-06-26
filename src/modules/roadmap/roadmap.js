import { GoogleGenerativeAI } from "@google/generative-ai";

export const RoadmapModule = {
    get apiKey() { return localStorage.getItem('gemini_api_key'); }, set apiKey(val) {},
    phases: [], // Populated by AI

    render: (container) => {
        container.innerHTML = `
            <div class="roadmap-container fade-in">
                <header class="section-header" style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 3rem; margin-bottom: 1rem; color: #fff;">AI Career Architect</h2>
                    <p style="color: var(--text-muted);">Generate a personalized learning path for your dream role.</p>
                </header>

                <div id="roadmap-setup" class="roadmap-setup scale-in">
                    <div style="font-size: 4rem; margin-bottom: 1rem;"><i class="fas fa-map-marked-alt"></i></div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #fff;">Design Your Path</h3>
                    
                    <input type="text" id="target-role" class="setup-input" placeholder="Enter Target Role (e.g. Chaos Engineer, AI Ethicist)...">
                    <input type="text" id="time-frame" class="setup-input" placeholder="Availability (e.g. 3 Months, 2 Hours/Day)...">
                    
                    <button class="btn-generate" id="generate-roadmap-btn">
                        <i class="fas fa-magic"></i> Generate Roadmap
                    </button>
                    
                    <p id="roadmap-error" style="color: #ef4444; margin-top: 1rem; display: none;"></p>
                </div>

                <div id="roadmap-loading" style="display: none; text-align: center; padding: 4rem;">
                    <div class="loading-pulse" style="font-size: 3rem; margin-bottom: 1rem;"><i class="fas fa-brain"></i></div>
                    <h3 style="color: var(--primary);">Consulting the Architect...</h3>
                    <p style="color: var(--text-muted);">Crafting a bespoke curriculum for you.</p>
                </div>

                <div id="roadmap-content" style="display: none;">
                    <!-- Stats Area -->
                    <div class="roadmap-stats card" style="display: flex; gap: 3rem; justify-content: center; margin-bottom: 4rem; padding: 2rem;">
                        <div class="stat-item">
                            <span style="font-size: 2rem; display: block; font-weight: 800; color: var(--primary);" id="total-tasks-done">0/0</span>
                            <span style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Tasks Completed</span>
                        </div>
                        <div class="stat-divider" style="width: 1px; background: var(--border-glass);"></div>
                        <div class="stat-item">
                            <span style="font-size: 2rem; display: block; font-weight: 800; color: var(--secondary);" id="overall-percentage">0%</span>
                            <span style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Progress</span>
                        </div>
                    </div>

                    <!-- Timeline Flow -->
                    <div id="roadmap-phases" class="roadmap-flow"></div>
                    
                    <div style="text-align: center; margin-top: 3rem; display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn-glass" style="color: #ef4444; border-color: rgba(239,68,68,0.3);" onclick="RoadmapModule.resetRoadmap()">
                            <i class="fas fa-trash-alt"></i> Discard & Create New
                        </button>
                    </div>
                </div>
            </div>
        `;

        RoadmapModule.attachEventListeners();

        // Load saved if exists
        const saved = localStorage.getItem('ai_roadmap_data');
        if (saved) {
            RoadmapModule.phases = JSON.parse(saved);
            if (RoadmapModule.phases.length > 0) {
                RoadmapModule.loadProgress();
                RoadmapModule.showRoadmap();
            }
        }
    },

    attachEventListeners: () => {
        const genBtn = document.getElementById('generate-roadmap-btn');
        if (genBtn) {
            genBtn.addEventListener('click', RoadmapModule.generateRoadmap);
        }
    },

    generateRoadmap: async () => {
        const role = document.getElementById('target-role').value;
        const time = document.getElementById('time-frame').value;
        const errorMsg = document.getElementById('roadmap-error');

        if (!RoadmapModule.apiKey) {
            errorMsg.innerText = "API Key missing. Please set it in the Quiz module.";
            errorMsg.style.display = 'block';
            return;
        }

        if (!role) {
            errorMsg.innerText = "Please enter a target role.";
            errorMsg.style.display = 'block';
            return;
        }

        document.getElementById('roadmap-setup').style.display = 'none';
        document.getElementById('roadmap-loading').style.display = 'block';
        errorMsg.style.display = 'none';

        try {
            const genAI = new GoogleGenerativeAI(RoadmapModule.apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: { responseMimeType: "application/json" }
            });

            const prompt = `Create a detailed 4-phase learning roadmap for a "${role}" role, considering I have "${time}".
            You MUST return a valid JSON ARRAY. Do not include markdown formatting like \`\`\`json.
            Each object in the array represents a phase and must follow this structure:
            [
                {
                    "id": "p1", "title": "Phase Name", "desc": "Short description", "icon": "Emoji",
                    "tasks": [
                        { "id": "t1", "title": "Task Name", "completed": false }
                    ]
                }
            ]
            Ensure the content is high-quality, practical, and specific to the requested role.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            console.log("Raw specific roadmap JSON:", text); // Debug

            // Robust cleaning: remove markdown blocks if present
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            // Try to find the array if there's extra text
            const jsonMatch = text.match(/\[.*\]/s);
            if (jsonMatch) {
                text = jsonMatch[0];
            }

            RoadmapModule.phases = JSON.parse(text);
            localStorage.setItem('ai_roadmap_data', JSON.stringify(RoadmapModule.phases));

            RoadmapModule.showRoadmap();

        } catch (err) {
            console.error("Roadmap Generation Error:", err);
            document.getElementById('roadmap-loading').style.display = 'none';
            document.getElementById('roadmap-setup').style.display = 'block';

            if (err.message && err.message.includes("503")) {
                errorMsg.innerText = "Google AI Services are currently experiencing high demand (503). Please try again in a few minutes.";
            } else {
                errorMsg.innerText = `Generation failed: ${err.message || "Please check your API key and try again."}`;
            }
            errorMsg.style.display = 'block';
        }
    },

    showRoadmap: () => {
        document.getElementById('roadmap-setup').style.display = 'none';
        document.getElementById('roadmap-loading').style.display = 'none';
        document.getElementById('roadmap-content').style.display = 'block';

        const container = document.getElementById('roadmap-phases');
        container.innerHTML = RoadmapModule.phases.map((phase, idx) => `
            <div class="phase-card card" style="position: relative; margin-bottom: 3rem; border-left: 4px solid ${idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}">
                <div class="phase-card-content">
                    <div class="phase-icon">
                        ${phase.icon}
                    </div>
                    <div style="flex-grow: 1;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${phase.title}</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">${phase.desc}</p>
                        
                        <div class="task-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                            ${phase.tasks.map(task => `
                                <div class="task-item ${task.completed ? 'done' : ''}" 
                                        style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; cursor: pointer; border: 1px solid transparent; transition: 0.3s;"
                                        onclick="RoadmapModule.toggleTask('${phase.id}', '${task.id}', this)">
                                    <div class="task-checkbox" style="width: 20px; height: 20px; border: 2px solid ${task.completed ? 'var(--primary)' : 'var(--text-dim)'}; border-radius: 5px; background: ${task.completed ? 'var(--primary)' : 'transparent'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">
                                        ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                                    </div>
                                    <span style="font-size: 0.95rem; ${task.completed ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${task.title}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        RoadmapModule.updateStats();
    },

    toggleTask: (phaseId, taskId, element) => {
        const phase = RoadmapModule.phases.find(p => p.id === phaseId);
        const task = phase.tasks.find(t => t.id === taskId);
        task.completed = !task.completed;

        // Visual update (instant)
        const checkbox = element.querySelector('.task-checkbox');
        const text = element.querySelector('span');

        if (task.completed) {
            checkbox.style.background = 'var(--primary)';
            checkbox.style.borderColor = 'var(--primary)';
            text.style.textDecoration = 'line-through';
            text.style.opacity = '0.5';
            checkbox.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            checkbox.style.background = 'transparent';
            checkbox.style.borderColor = 'var(--text-dim)';
            text.style.textDecoration = 'none';
            text.style.opacity = '1';
            checkbox.innerHTML = '';
        }

        RoadmapModule.saveProgress();
        RoadmapModule.updateStats();
    },

    updateStats: () => {
        let total = 0;
        let done = 0;
        RoadmapModule.phases.forEach(p => {
            total += p.tasks.length;
            done += p.tasks.filter(t => t.completed).length;
        });

        const percent = total === 0 ? 0 : Math.round((done / total) * 100);
        document.getElementById('total-tasks-done').innerText = `${done}/${total}`;
        document.getElementById('overall-percentage').innerText = `${percent}%`;

        // Update visual progress bar (using CSS variable)
        document.querySelector('.roadmap-stats').style.setProperty('--progress', `${percent}%`);
    },

    saveProgress: () => {
        // Save structure AND state
        localStorage.setItem('ai_roadmap_data', JSON.stringify(RoadmapModule.phases));
    },

    loadProgress: () => {
        // handled in render init
    },

    resetRoadmap: () => {
        if (confirm("Are you sure you want to discard your current roadmap?")) {
            localStorage.removeItem('ai_roadmap_data');
            RoadmapModule.phases = [];
            RoadmapModule.render(document.querySelector('#module-container'));
        }
    }
};

window.RoadmapModule = RoadmapModule;
