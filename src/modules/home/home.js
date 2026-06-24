import './home.css';

export const HomeModule = {
    render: (container) => {
        container.innerHTML = `
            <div class="home-layout">
                <div class="home-intro">
                    <h1 class="main-title">PLACEMENT<br>HUB</h1>
                    <h2 class="sub-title">ENGINEERING YOUR FUTURE</h2>
                    <p class="intro-desc">
                        Education is often restricted by outdated methods. 
                        PlacementHub aims to change this by creating a personalized, 
                        AI-driven career infrastructure.
                    </p>
                    
                    <div class="readiness-mini">
                        <div class="readiness-label">Platform Readiness</div>
                        <div class="readiness-value">
                            <span class="dot"></span>
                            <span>System Online</span>
                        </div>
                    </div>
                </div>

                <div class="features-grid">
                    
                    <div class="feature-item" onclick="document.querySelector('.nav-item[data-module=\\'roadmap\\']').click()">
                        <div class="feature-icon-circle">
                            <span class="icon" style="font-size: 1.5rem;"><i class="fas fa-map-marked-alt"></i></span>
                            <div class="orbit-dot"></div>
                        </div>
                        <h3 class="feature-title">AI Roadmap<br>Generator</h3>
                        <p class="feature-text">
                            Say goodbye to generic advice. Generate a personalized 
                            learning path tailored to your specific career goals.
                        </p>
                    </div>

                    <div class="feature-item" onclick="document.querySelector('.nav-item[data-module=\\'resume\\']').click()">
                        <div class="feature-icon-circle">
                            <span class="icon" style="font-size: 1.5rem;"><i class="fas fa-file-alt"></i></span>
                            <div class="orbit-dot"></div>
                        </div>
                        <h3 class="feature-title">Smart Resume<br>Builder</h3>
                        <p class="feature-text">
                            With AI analysis, crafting a resume is rewarding. 
                            Get real-time feedback and ATS-friendly formats.
                        </p>
                    </div>

                    <div class="feature-item" onclick="document.querySelector('.nav-item[data-module=\\'interview\\']').click()">
                        <div class="feature-icon-circle">
                            <span class="icon" style="font-size: 1.5rem;"><i class="fas fa-robot"></i></span>
                            <div class="orbit-dot"></div>
                        </div>
                        <h3 class="feature-title">Mock Interview<br>Simulation</h3>
                        <p class="feature-text">
                            Experience real-time interview scenarios. 
                            Practice with AI to build confidence and refine your answers.
                        </p>
                    </div>

                    <div class="feature-item" onclick="document.querySelector('.nav-item[data-module=\\'club\\']').click()">
                        <div class="feature-icon-circle">
                            <span class="icon" style="font-size: 1.5rem;"><i class="fas fa-fire"></i></span>
                            <div class="orbit-dot"></div>
                        </div>
                        <h3 class="feature-title">Coding Club<br>& Challenges</h3>
                        <p class="feature-text">
                            Connect with peers and solve daily algorithmic challenges 
                            to sharpen your problem-solving skills.
                        </p>
                    </div>

                </div>
            </div>
        `;
    }
};

