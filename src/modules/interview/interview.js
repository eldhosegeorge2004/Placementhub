import { GoogleGenerativeAI } from "@google/generative-ai";
import * as THREE from 'three';

export const InterviewModule = {
    get apiKey() { return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key'); }, set apiKey(val) {},
    sessionActive: false,
    history: [],
    currentQuestion: "",

    // Avatar State
    scene: null,
    camera: null,
    renderer: null,
    headMesh: null,
    animationId: null,
    isSpeaking: false,

    // Voice State
    synth: window.speechSynthesis,
    recognition: null,
    config: {
        targetRole: "Software Engineer",
        company: "Tech Corp"
    },

    render: (container) => {
        container.innerHTML = `
            <div class="interview-container fade-in">
                <header class="section-header" style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">AI Interview Simulator</h2>
                    <p style="color: var(--text-muted);">Immersive technical & behavioral practice.</p>
                </header>

                <div id="interview-setup" class="card" style="max-width: 600px; margin: 0 auto; padding: 3rem; text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;"><i class="fas fa-microphone-alt"></i></div>
                    <h3 style="margin-bottom: 2rem;">Setup Your Session</h3>
                    
                    <div style="display: grid; gap: 1.5rem; text-align: left;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dim);">Target Role</label>
                            <input type="text" id="target-role" placeholder="e.g. Frontend Developer" class="setup-input" style="width: 100%; padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); color: white;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dim);">Company</label>
                            <input type="text" id="target-company" placeholder="e.g. Google" class="setup-input" style="width: 100%; padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); color: white;">
                        </div>
                        <button class="btn-primary" id="start-interview-btn" style="margin-top: 1rem; width: 100%; justify-content: center;">
                            Start Interivew
                        </button>
                    </div>
                </div>

                <div id="interview-active" style="display: none;" class="interview-workspace">
                    <!-- Left: Avatar -->
                    <div class="interview-avatar-area">
                        <div id="avatar-canvas-container"></div>
                        <div class="avatar-status" id="avatar-status-text">AI LISTENING</div>
                    </div>

                    <!-- Right: Chat & Input -->
                    <div class="interview-chat-area">
                        <div class="interview-chat card">
                            <div class="ai-msg" style="text-align: center; color: var(--text-muted);">
                                <em>Initializing holographic interface...</em>
                            </div>
                        </div>

                        <div class="input-controls">
                            <textarea id="user-response" placeholder="Type or speak your answer..."></textarea>
                            
                            <button class="mic-btn" id="mic-btn" title="Toggle Microphone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </button>
                            
                            <button class="btn-primary" id="send-response-btn" style="height: 60px; border-radius: 20px;">
                                SEND
                            </button>
                        </div>

                        <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                            <div class="audio-viz" id="audio-viz" style="opacity: 0;">
                                <div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div>
                            </div>
                            <button class="btn-glass" id="end-interview-btn" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.3);">
                                End Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        InterviewModule.attachEventListeners();
    },

    attachEventListeners: () => {
        const startBtn = document.getElementById('start-interview-btn');
        if (startBtn) startBtn.addEventListener('click', InterviewModule.startSession);

        const sendBtn = document.getElementById('send-response-btn');
        if (sendBtn) sendBtn.addEventListener('click', InterviewModule.handleSend);

        const micBtn = document.getElementById('mic-btn');
        if (micBtn) micBtn.addEventListener('click', InterviewModule.toggleRecording);

        const endBtn = document.getElementById('end-interview-btn');
        if (endBtn) endBtn.addEventListener('click', InterviewModule.endSession);

        // Enter key support
        const textarea = document.getElementById('user-response');
        if (textarea) {
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    InterviewModule.handleSend();
                }
            });
        }
    },

    initAvatar: () => {
        const container = document.getElementById('avatar-canvas-container');
        if (!container) return;

        // Scene Setup
        const scene = new THREE.Scene();
        // Transparent background

        const width = container.clientWidth;
        const height = container.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2.5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // Holographic Head (Sphere with Wireframe)
        const geometry = new THREE.IcosahedronGeometry(1.2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const head = new THREE.Mesh(geometry, material);
        scene.add(head);

        // Inner Glow
        const glowGeo = new THREE.IcosahedronGeometry(1.1, 2);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.1
        });
        const glowPoints = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glowPoints);

        // Store refs
        InterviewModule.scene = scene;
        InterviewModule.camera = camera;
        InterviewModule.renderer = renderer;
        InterviewModule.headMesh = head;

        // Animation Loop
        const animate = () => {
            InterviewModule.animationId = requestAnimationFrame(animate);

            // Idle rotation
            head.rotation.y += 0.005;
            glowPoints.rotation.y -= 0.002;

            // Speaking Animation (Pulse)
            if (InterviewModule.isSpeaking) {
                const scale = 1 + Math.sin(Date.now() * 0.02) * 0.1;
                head.scale.set(scale, scale, scale);
                head.rotation.x = Math.sin(Date.now() * 0.01) * 0.2;
            } else {
                head.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, 0, 0.1);
            }

            renderer.render(scene, camera);
        };
        animate();

        // Handle Resize
        const resizeObserver = new ResizeObserver(() => {
            if (container && renderer && camera) {
                const w = container.clientWidth;
                const h = container.clientHeight;
                renderer.setSize(w, h);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            }
        });
        resizeObserver.observe(container);
    },

    speak: (text) => {
        if (!InterviewModule.synth) return;

        // Cancel previous speech
        InterviewModule.synth.cancel();

        // Sanitize text for speech (remove asterisks, hashes, etc caused by markdown)
        const cleanText = text.replace(/[*#_]/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Try to find a good voice
        const voices = InterviewModule.synth.getVoices();
        // Prefer "Google US English" or similar standard voices
        const preferredVoice = voices.find(v => v.name.includes("Google US English")) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => {
            InterviewModule.isSpeaking = true;
            const status = document.getElementById('avatar-status-text');
            if (status) {
                status.innerText = "AI SPEAKING";
                status.style.color = "#3b82f6";
                status.style.borderColor = "#3b82f6";
            }
        };

        utterance.onend = () => {
            InterviewModule.isSpeaking = false;
            const status = document.getElementById('avatar-status-text');
            if (status) {
                status.innerText = "AI LISTENING";
                status.style.color = "var(--secondary)";
                status.style.borderColor = "var(--secondary)";
            }
        };

        InterviewModule.synth.speak(utterance);
    },

    toggleRecording: () => {
        const btn = document.getElementById('mic-btn');
        const viz = document.getElementById('audio-viz');

        if (!InterviewModule.recognition) {
            // Initialize Speech Recognition
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = true;

                recognition.onstart = () => {
                    btn.classList.add('listening');
                    viz.style.opacity = '1';
                };

                recognition.onresult = (event) => {
                    let finalTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        }
                    }
                    if (finalTranscript) {
                        const input = document.getElementById('user-response');
                        input.value = finalTranscript;
                    }
                };

                recognition.onend = () => {
                    btn.classList.remove('listening');
                    viz.style.opacity = '0';
                };

                recognition.onerror = (e) => {
                    console.error("Speech error", e);
                    btn.classList.remove('listening');
                };

                InterviewModule.recognition = recognition;
            } else {
                alert("Speech recognition not supported in this browser.");
                return;
            }
        }

        if (btn.classList.contains('listening')) {
            InterviewModule.recognition.stop();
        } else {
            InterviewModule.recognition.start();
        }
    },

    startSession: async () => {
        const role = document.getElementById('target-role').value || "Engineer";
        const company = document.getElementById('target-company').value || "Tech Company";
        InterviewModule.config = { role, company };

        // UI Transition
        document.getElementById('interview-setup').style.display = 'none';

        const activeArea = document.getElementById('interview-active');
        activeArea.style.display = 'grid'; // Grid layout

        // Init Avatar
        setTimeout(() => InterviewModule.initAvatar(), 100);

        // Pre-fill chat
        const chat = document.querySelector('.interview-chat');
        chat.innerHTML = ''; // clear previous

        try {
            const genAI = new GoogleGenerativeAI(InterviewModule.apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `Act as a senior friendly recruiter at ${company}. 
            You are interviewing me for a ${role} position. 
            Start by welcoming me and asking the first question.
            Keep it concise (under 2 sentences).`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            InterviewModule.addMessage(text, 'ai');
            InterviewModule.currentQuestion = text;

            // Speak init
            InterviewModule.speak(text);

            InterviewModule.history.push({ role: 'model', parts: [{ text }] });
            InterviewModule.sessionActive = true;

        } catch (error) {
            console.error(error);
            chat.innerHTML = `<p style="color: red">Error connecting to AI.</p>`;
        }
    },

    handleSend: async () => {
        const input = document.getElementById('user-response');
        const text = input.value.trim();
        if (!text) return;

        // Stop recording if active
        if (InterviewModule.recognition && document.getElementById('mic-btn').classList.contains('listening')) {
            InterviewModule.recognition.stop();
        }

        // Stop speaking if active
        InterviewModule.synth.cancel();

        InterviewModule.addMessage(text, 'user');
        input.value = "";

        // Add loading bubble
        const chat = document.querySelector('.interview-chat');
        const loadingId = 'loading-' + Date.now();
        const loadingHtml = \`
            <div id="\${loadingId}" class="msg-card ai" style="
                background: rgba(59, 130, 246, 0.15);
                border: 1px solid rgba(59, 130, 246, 0.3);
                padding: 1rem 1.5rem;
                border-radius: 16px;
                max-width: 85%;
                align-self: flex-start;
                border-bottom-left-radius: 2px;
                animation: fadeIn 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 1rem;
            ">
                <style>
                    @keyframes typingDot {
                        0%, 100% { transform: translateY(0); opacity: 0.5; }
                        50% { transform: translateY(-4px); opacity: 1; }
                    }
                </style>
                <span style="display: block; width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: typingDot 1.4s infinite ease-in-out both;"></span>
                <span style="display: block; width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: typingDot 1.4s infinite ease-in-out both 0.2s;"></span>
                <span style="display: block; width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: typingDot 1.4s infinite ease-in-out both 0.4s;"></span>
                <span style="color: #60a5fa; font-size: 0.9rem; margin-left: 8px; font-weight: 500;">AI is analyzing...</span>
            </div>
        \`;
        chat.insertAdjacentHTML('beforeend', loadingHtml);
        setTimeout(() => {
            chat.scrollTop = chat.scrollHeight + 100; // Over-scroll to guarantee visibility
            const bubble = document.getElementById(loadingId);
            if (bubble) bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);

        try {
            const genAI = new GoogleGenerativeAI(InterviewModule.apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const history = InterviewModule.history.map(x => x);
            history.push({ role: 'user', parts: [{ text }] });

            const result = await model.generateContent({
                contents: history
            });

            const response = await result.response;
            const aiText = response.text();

            document.getElementById(loadingId).remove();
            InterviewModule.addMessage(aiText, 'ai');

            InterviewModule.speak(aiText);

            InterviewModule.history.push({ role: 'user', parts: [{ text }] });
            InterviewModule.history.push({ role: 'model', parts: [{ text: aiText }] });

        } catch (error) {
            document.getElementById(loadingId).innerText = "Error...";
        }
    },

    addMessage: (text, sender) => {
        const chat = document.querySelector('.interview-chat');
        const isAI = sender === 'ai';

        const html = `
            <div class="msg-card ${sender}" style="
                background: ${isAI ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
                border: 1px solid ${isAI ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
                padding: 1rem;
                border-radius: 16px;
                max-width: 85%;
                align-self: ${isAI ? 'flex-start' : 'flex-end'};
                border-${isAI ? 'bottom-left' : 'bottom-right'}-radius: 2px;
                animation: fadeIn 0.3s ease;
            ">
                <strong style="display: block; font-size: 0.8rem; margin-bottom: 0.3rem; color: ${isAI ? 'var(--primary)' : 'var(--text-dim)'};">
                    ${isAI ? 'Recruiter' : 'You'}
                </strong>
                ${text}
            </div>
        `;

        chat.insertAdjacentHTML('beforeend', html);
        setTimeout(() => {
            chat.scrollTop = chat.scrollHeight + 100;
        }, 150);
    },

    endSession: () => {
        if (InterviewModule.synth) InterviewModule.synth.cancel();
        if (InterviewModule.animationId) cancelAnimationFrame(InterviewModule.animationId);
        InterviewModule.sessionActive = false;
        InterviewModule.render(document.querySelector('#module-container'));

        // Dispose
        if (InterviewModule.renderer) {
            InterviewModule.renderer.dispose();
            InterviewModule.renderer = null;
        }
    }
};
