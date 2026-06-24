import { HomeModule } from './modules/home/home.js';
import { QuizModule } from './modules/quiz/quiz.js';
import { ResumeModule } from './modules/resume/resume.js';
import { InterviewModule } from './modules/interview/interview.js';
import { RoadmapModule } from './modules/roadmap/roadmap.js';
import { TypingModule } from './modules/typing/typing.js';
import { ClubModule } from './modules/club/club.js';
import { AptitudeModule } from './modules/aptitude/aptitude.js';
import { initBackground } from './background.js';
import './style.css';
import './intro.css'; // Import Intro Styles

const app = {
    // Modules Configuration
    modules: {
        dashboard: {
            title: "Home",
            render: (container) => HomeModule.render(container)
        },
        roadmap: {
            title: "Success Roadmap",
            render: (container) => RoadmapModule.render(container)
        },
        resume: {
            title: "Classic Resume Builder",
            render: (container) => ResumeModule.render(container)
        },
        interview: {
            title: "Mock Interview AI",
            render: (container) => InterviewModule.render(container)
        },
        quiz: {
            title: "AI Knowledge Check",
            render: (container) => QuizModule.render(container)
        },
        typing: {
            title: "Typing Mastery",
            render: (container) => TypingModule.render(container)
        },
        club: {
            title: "Coding Club",
            render: (container) => ClubModule.render(container)
        },
        aptitude: {
            title: "Aptitude Training",
            render: (container) => AptitudeModule.render(container)
        }
    },

    // Initialization
    init() {
        this.container = document.getElementById('module-container');
        this.titleElement = document.getElementById('module-title');
        this.navItems = document.querySelectorAll('.nav-item');

        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('mobile-overlay');
        const menuBtn = document.getElementById('mobile-menu-btn');

        const toggleSidebar = () => {
            if(sidebar) sidebar.classList.toggle('sidebar-open');
            if(overlay) overlay.classList.toggle('active');
        };

        const closeSidebar = () => {
            if(sidebar) sidebar.classList.remove('sidebar-open');
            if(overlay) overlay.classList.remove('active');
        };

        if(menuBtn) menuBtn.addEventListener('click', toggleSidebar);
        if(overlay) overlay.addEventListener('click', closeSidebar);

        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const moduleId = item.getAttribute('data-module');
                this.loadModule(moduleId);

                // Update active state
                this.navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Close sidebar on mobile
                if (window.innerWidth <= 900) {
                    closeSidebar();
                }
            });
        });

        // Load default module
        this.loadModule('dashboard');
    },

    loadModule(moduleId) {
        const module = this.modules[moduleId];

        if (module) {
            if (this.titleElement) this.titleElement.innerText = module.title;

            // Clear container and render new content
            this.container.innerHTML = '';
            module.render(this.container);
        }
    }
};

const Auth = {
    isSignup: false,
    users: JSON.parse(localStorage.getItem('placementhub_users')) || {},
    currentUser: null,

    init() {
        this.currentUser = localStorage.getItem('placementhub_current_user');
        
        // Element refs
        this.authOverlay = document.getElementById('auth-overlay');
        this.apikeyOverlay = document.getElementById('apikey-overlay');
        this.authForm = document.getElementById('auth-form');
        this.authTitle = document.getElementById('auth-title');
        this.authSubtitle = document.getElementById('auth-subtitle');
        this.authSubmitBtn = document.getElementById('auth-submit-btn');
        this.authSwitchBtn = document.getElementById('auth-switch-btn');
        this.authSwitchText = document.getElementById('auth-switch-text');
        this.apikeyForm = document.getElementById('apikey-form');
        this.skipApikeyBtn = document.getElementById('skip-apikey-btn');
        this.logoutBtn = document.getElementById('logout-btn');

        // Bind events
        this.authSwitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.isSignup = !this.isSignup;
            this.updateAuthUI();
        });

        this.authForm.addEventListener('submit', (e) => this.handleAuth(e));
        this.apikeyForm.addEventListener('submit', (e) => this.handleApiKey(e));
        this.skipApikeyBtn.addEventListener('click', () => this.enterApp());
        
        if(this.logoutBtn) {
            this.logoutBtn.addEventListener('click', () => this.logout());
        }
    },

    updateAuthUI() {
        if (this.isSignup) {
            this.authTitle.innerText = "Create Account";
            this.authSubtitle.innerText = "Join PlacementHub today";
            this.authSubmitBtn.innerText = "Sign Up";
            this.authSwitchText.innerText = "Already have an account?";
            this.authSwitchBtn.innerText = "Login";
        } else {
            this.authTitle.innerText = "Welcome Back";
            this.authSubtitle.innerText = "Sign in to continue";
            this.authSubmitBtn.innerText = "Login";
            this.authSwitchText.innerText = "Don't have an account?";
            this.authSwitchBtn.innerText = "Sign Up";
        }
    },

    handleAuth(e) {
        e.preventDefault();
        const userInp = document.getElementById('auth-username').value.trim();
        const passInp = document.getElementById('auth-password').value.trim();

        if (this.isSignup) {
            if (this.users[userInp]) {
                alert("Username already exists!");
                return;
            }
            this.users[userInp] = { password: passInp, apikey: null };
            localStorage.setItem('placementhub_users', JSON.stringify(this.users));
            this.loginSuccess(userInp);
        } else {
            if (this.users[userInp] && this.users[userInp].password === passInp) {
                this.loginSuccess(userInp);
            } else {
                alert("Invalid credentials!");
            }
        }
    },

    loginSuccess(username) {
        this.currentUser = username;
        localStorage.setItem('placementhub_current_user', username);
        this.authOverlay.style.display = 'none';
        this.checkApiKey();
    },

    checkApiKey() {
        const userData = this.users[this.currentUser];
        // If no API key saved for this user
        if (!userData.apikey && !localStorage.getItem('gemini_api_key')) {
            this.apikeyOverlay.style.display = 'flex';
        } else {
            // Restore legacy global storage so other modules just work seamlessly
            if (userData.apikey) localStorage.setItem('gemini_api_key', userData.apikey);
            this.enterApp();
        }
    },

    handleApiKey(e) {
        e.preventDefault();
        const key = document.getElementById('apikey-input').value.trim();
        if (key) {
            this.users[this.currentUser].apikey = key;
            localStorage.setItem('placementhub_users', JSON.stringify(this.users));
            localStorage.setItem('gemini_api_key', key);
            this.apikeyOverlay.style.display = 'none';
            this.enterApp();
        }
    },

    enterApp() {
        this.apikeyOverlay.style.display = 'none';
        this.authOverlay.style.display = 'none';
        
        // Update sidebar
        const sidebarName = document.getElementById('sidebar-username');
        const sidebarAvatar = document.getElementById('sidebar-avatar');
        if(sidebarName) sidebarName.innerText = this.currentUser;
        if(sidebarAvatar) sidebarAvatar.innerText = this.currentUser.substring(0, 2).toUpperCase();
        
        // Initialize app content if not already done
        if(!window.appInitialized) {
            app.init();
            window.appInitialized = true;
        }
    },

    logout() {
        localStorage.removeItem('placementhub_current_user');
        localStorage.removeItem('gemini_api_key'); // clear global so next user uses their own
        this.currentUser = null;
        
        // Perform a hard reload to securely reset all SPA states and return to the intro screen
        window.location.reload();
    },

    checkSession() {
        if (this.currentUser) {
            this.checkApiKey();
        } else {
            this.authOverlay.style.display = 'flex';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Always init background immediately for intro visual
    initBackground();
    
    window.app = app; // Expose for global actions
    Auth.init();

    // Intro Overlay Logic
    const enterBtn = document.getElementById('enter-btn');
    const overlay = document.getElementById('intro-overlay');

    if (enterBtn && overlay) {
        enterBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
            setTimeout(() => {
                overlay.style.display = 'none';
                Auth.checkSession();
            }, 800); // Match CSS transition duration
        });
    }
});
