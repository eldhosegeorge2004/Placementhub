import { HomeModule } from './modules/home/home.js';
import { QuizModule } from './modules/quiz/quiz.js';
import { ResumeModule } from './modules/resume/resume.js';
import { InterviewModule } from './modules/interview/interview.js';
import { RoadmapModule } from './modules/roadmap/roadmap.js';
import { TypingModule } from './modules/typing/typing.js';
import { ClubModule } from './modules/club/club.js';
import { AptitudeModule } from './modules/aptitude/aptitude.js';
import { initBackground } from './background.js';
import { supabase } from './supabaseClient.js';
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
        const closeBtn = document.getElementById('mobile-close-btn');

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
        if(closeBtn) closeBtn.addEventListener('click', closeSidebar);

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
    currentUser: null,

    init() {
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
        this.logoutBtn = document.getElementById('logout-btn');

        // Bind events
        this.authSwitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.isSignup = !this.isSignup;
            document.getElementById('auth-username').value = '';
            document.getElementById('auth-password').value = '';
            this.updateAuthUI();
        });

        this.authForm.addEventListener('submit', (e) => this.handleAuth(e));
        this.apikeyForm.addEventListener('submit', (e) => this.handleApiKey(e));
        
        if(this.logoutBtn) {
            this.logoutBtn.addEventListener('click', () => this.logout());
        }
    },

    updateAuthUI() {
        const apikeyGroup = document.getElementById('auth-apikey-group');
        const apikeyInput = document.getElementById('auth-signup-apikey');

        if (this.isSignup) {
            this.authTitle.innerText = "Create Account";
            this.authSubtitle.innerText = "Join PlacementHub today";
            this.authSubmitBtn.innerText = "Sign Up";
            this.authSwitchText.innerText = "Already have an account?";
            this.authSwitchBtn.innerText = "Login";
            if(apikeyGroup) apikeyGroup.style.display = 'block';
            if(apikeyInput) apikeyInput.required = true;
        } else {
            this.authTitle.innerText = "Welcome Back";
            this.authSubtitle.innerText = "Sign in to continue";
            this.authSubmitBtn.innerText = "Login";
            this.authSwitchText.innerText = "Don't have an account?";
            this.authSwitchBtn.innerText = "Sign Up";
            if(apikeyGroup) apikeyGroup.style.display = 'none';
            if(apikeyInput) apikeyInput.required = false;
        }
    },

    async handleAuth(e) {
        e.preventDefault();
        const userInp = document.getElementById('auth-username').value.trim().toLowerCase();
        const passInp = document.getElementById('auth-password').value.trim();
        const apikeyInp = document.getElementById('auth-signup-apikey')?.value.trim();

        // Convert username to a dummy email for Supabase Auth if it's not already an email
        const safeUser = userInp.replace(/[^a-z0-9]/g, '');
        const email = userInp.includes('@') ? userInp : `${safeUser}@placementhub.com`;

        try {
            if (this.isSignup) {
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: passInp,
                });
                
                if (error) {
                    if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('already exists')) {
                        throw new Error("This Login ID already exists. Please switch to Login instead.");
                    }
                    throw error;
                }

                // Supabase anti-enumeration: returns empty identities if user already exists
                if (data?.user?.identities && data.user.identities.length === 0) {
                    throw new Error("This Login ID already exists. Please switch to Login instead.");
                }
                
                // If email confirmations are enabled in Supabase, session will be null
                if (!data.session) {
                    alert("Sign up successful! However, your session is null. You MUST disable 'Confirm email' in your Supabase Auth Settings to log in automatically.");
                    return;
                }
                
                if (apikeyInp) {
                    localStorage.setItem('gemini_api_key', apikeyInp);
                }
                
                this.loginSuccess(userInp);
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: passInp,
                });
                if (error) throw error;
                this.loginSuccess(userInp);
            }
        } catch (error) {
            alert(`Authentication Error: ${error.message}`);
        }
    },

    loginSuccess(username) {
        this.currentUser = username;
        this.authOverlay.style.display = 'none';
        this.checkApiKey();
    },

    checkApiKey() {
        // If no global Gemini API key is saved locally
        if (!localStorage.getItem('gemini_api_key')) {
            this.apikeyOverlay.style.display = 'flex';
        } else {
            this.enterApp();
        }
    },

    handleApiKey(e) {
        e.preventDefault();
        const key = document.getElementById('apikey-input').value.trim();
        if (key) {
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
        
        // Extract original username if it's our dummy email
        let displayUser = this.currentUser || 'Guest';
        if (displayUser.endsWith('@placementhub.local')) {
            displayUser = displayUser.split('@')[0];
        }

        if(sidebarName) sidebarName.innerText = displayUser;
        if(sidebarAvatar) sidebarAvatar.innerText = displayUser.substring(0, 2).toUpperCase();
        
        // Initialize app content if not already done
        if(!window.appInitialized) {
            app.init();
            window.appInitialized = true;
        }
    },

    async logout() {
        await supabase.auth.signOut();
        this.currentUser = null;
        
        // Perform a hard reload to securely reset all SPA states and return to the intro screen
        window.location.reload();
    },

    async checkSession() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user && !error) {
            this.currentUser = user.email;
            this.checkApiKey();
        } else {
            // Session is invalid or user was deleted from the database
            await supabase.auth.signOut();
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
