import './resume.css';

export const ResumeModule = {
    data: {
        currentTemplate: 'classic-clear',
        photo: "",
        name: "Emily Carter",
        role: "Project Manager",
        contact: {
            email: "emily.carter@email.com",
            phone: "+1 416 555 2847",
            linkedin: "linkedin.com/in/emily-carter",
            location: "Toronto, Canada"
        },
        headings: {
            summary: "Summary",
            experience: "Professional Experience",
            education: "Education",
            skills: "Skills",
            certificates: "Certificates",
            languages: "Languages"
        },
        summary: "Project Manager with six years of experience coordinating cross-functional initiatives in technology and business operations. Skilled in stakeholder communication, project planning, risk tracking, and delivery governance across complex environments. Known for building practical workflows, improving team alignment, and keeping priorities moving under tight deadlines.",
        experience: [
            {
                role: "Project Manager", company: "Northbridge Digital", date: "2022/03 -- Present", location: "Toronto, Canada", points: [
                    "Managed release plans across product, engineering, and operations teams.",
                    "Coordinated stakeholder updates, risk reviews, and milestone reporting.",
                    "Improved delivery tracking, reducing gaps across concurrent workstreams."
                ]
            },
            {
                role: "Project Coordinator", company: "MapleWorks Solutions", date: "2019/07 -- 2022/02", location: "Toronto, Canada", points: [
                    "Supported schedules, budgets, and documentation for transformation initiatives.",
                    "Facilitated team meetings and maintained cross-department action logs.",
                    "Escalated risks before blockers affected delivery timelines."
                ]
            },
            {
                role: "Operations Analyst", company: "BrightPath Services", date: "2017/09 -- 2019/06", location: "Ottawa, Canada", points: [
                    "Analyzed workflow data to identify service delivery delays.",
                    "Prepared reports supporting resource planning and prioritization.",
                    "Documented process improvements for managers and project teams."
                ]
            }
        ],
        education: [
            { degree: "Bachelor of Commerce in Management", school: "Toronto Metropolitan University", year: "2013 -- 2017", location: "Toronto, Canada" },
            { degree: "Diploma in Business Administration", school: "Algonquin College", year: "2011 -- 2013", location: "Ottawa, Canada" }
        ],
        skills: "Project Planning, Risk Management, Budget Tracking, Jira, Stakeholder Management, Agile Delivery, Process Improvement, Microsoft Project",
        certificates: "Project Management Professional (PMP)\nGoogle Project Management Certificate\nCertified ScrumMaster (CSM)",
        languages: "English\nFrench"
    },

    render: function(container) {
        container.innerHTML = `
            <div class="resume-builder-container" style="display: flex; gap: 20px; height: calc(100vh - 120px);">
                <!-- Editor Sidebar -->
                <div class="resume-editor" style="width: 350px; background: #1e293b; padding: 20px; border-radius: 12px; overflow-y: auto; color: white;">
                    <h2 style="margin-bottom: 20px; color: white;">Edit Content</h2>
                    
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Template</label>
                        <select id="res-template" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                            <option value="classic-clear" ${this.data.currentTemplate === 'classic-clear' ? 'selected' : ''}>Classic Clear</option>
                            <option value="steady-form" ${this.data.currentTemplate === 'steady-form' ? 'selected' : ''}>Steady Form</option>
                            <option value="mercury-flow" ${this.data.currentTemplate === 'mercury-flow' ? 'selected' : ''}>Mercury Flow</option>
                            <option value="azure-line" ${this.data.currentTemplate === 'azure-line' ? 'selected' : ''}>Azure Line</option>
                            <option value="pure-baseline" ${this.data.currentTemplate === 'pure-baseline' ? 'selected' : ''}>Pure Baseline</option>
                            <option value="happy" ${this.data.currentTemplate === 'happy' ? 'selected' : ''}>Happy</option>
                        </select>
                    </div>

                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Profile Photo (Steady Form)</label>
                        <input type="file" id="res-photo" accept="image/*" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Name</label>
                        <input type="text" id="res-name" value="${this.data.name}" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Role</label>
                        <input type="text" id="res-role" value="${this.data.role}" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Location</label>
                        <input type="text" id="res-location" value="${this.data.contact.location}" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Email</label>
                        <input type="email" id="res-email" value="${this.data.contact.email}" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                    </div>

                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Phone</label>
                        <input type="text" id="res-phone" value="${this.data.contact.phone}" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                    </div>

                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">LinkedIn</label>
                        <input type="text" id="res-linkedin" value="${this.data.contact.linkedin}" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">
                    </div>

                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom: 5px; color: #cbd5e1;">Summary</label>
                        <textarea id="res-summary" rows="4" style="width: 100%; padding: 8px; border-radius: 4px; background: #334155; border: 1px solid #475569; color: white; box-sizing: border-box;">${this.data.summary}</textarea>
                    </div>

                    <button class="btn-primary" onclick="window.print()" style="width: 100%; margin-top: 20px; padding: 10px; background: #3b82f6; border: none; border-radius: 6px; color: white; cursor: pointer; font-weight: bold;">Download PDF</button>
                    
                    <p style="margin-top: 15px; font-size: 0.85em; color: #94a3b8; text-align: center;">
                        * Note: You can also edit the text directly on the preview to the right!
                    </p>
                </div>
                
                <!-- Preview Area -->
                <div class="resume-preview-area" style="flex: 1; background: #cbd5e1; border-radius: 12px; overflow-y: auto; padding: 20px; display: flex; justify-content: center; position: relative;">
                    <div id="resume-paper" class="resume-paper ${this.data.currentTemplate}">
                        <!-- Content injected here -->
                    </div>
                </div>
            </div>
        `;

        this.renderPaper();
        this.setupListeners();
    },

    renderPaper: function() {
        const paper = document.getElementById('resume-paper');
        if (!paper) return;

        const d = this.data;

        paper.className = `resume-paper ${d.currentTemplate}`;

        if (d.currentTemplate === 'classic-clear') {
            paper.innerHTML = `
                <header>
                <h1 contenteditable="true" data-field="name">${d.name}</h1>
                <div class="role-title" contenteditable="true" data-field="role">${d.role}</div>
                <div class="contact-info">
                    <span contenteditable="true" data-field="contact.location">${d.contact.location}</span> &nbsp;|&nbsp; 
                    <span contenteditable="true" data-field="contact.email">${d.contact.email}</span> &nbsp;|&nbsp; 
                    <span contenteditable="true" data-field="contact.phone">${d.contact.phone}</span> &nbsp;|&nbsp; 
                    <span contenteditable="true" data-field="contact.linkedin">${d.contact.linkedin}</span>
                </div>
            </header>

            <section>
                <h3 contenteditable="true" data-field="headings.summary">${d.headings.summary}</h3>
                <p contenteditable="true" data-field="summary">${d.summary}</p>
            </section>

            <section>
                <h3 contenteditable="true" data-field="headings.experience">${d.headings.experience}</h3>
                ${d.experience.map((exp, i) => `
                    <div class="exp-item">
                        <div class="item-header">
                            <span class="item-title" contenteditable="true" data-field="experience.${i}.role">${exp.role}</span>
                            <span class="item-date" contenteditable="true" data-field="experience.${i}.date">${exp.date}</span>
                        </div>
                        <div class="item-subtitle">
                            <span contenteditable="true" data-field="experience.${i}.company">${exp.company}</span>
                            <span style="float: right;" contenteditable="true" data-field="experience.${i}.location">${exp.location}</span>
                        </div>
                        <ul contenteditable="true" data-array="experience.${i}.points">
                            ${exp.points.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </section>

            <section>
                <h3 contenteditable="true" data-field="headings.education">${d.headings.education}</h3>
                ${d.education.map((ed, i) => `
                    <div class="exp-item">
                        <div class="item-header">
                            <span class="item-title" contenteditable="true" data-field="education.${i}.degree">${ed.degree}</span>
                            <span class="item-date" contenteditable="true" data-field="education.${i}.year">${ed.year}</span>
                        </div>
                        <div class="item-subtitle">
                            <span contenteditable="true" data-field="education.${i}.school">${ed.school}</span>
                            <span style="float: right;" contenteditable="true" data-field="education.${i}.location">${ed.location}</span>
                        </div>
                    </div>
                `).join('')}
            </section>

            <section>
                <h3 contenteditable="true" data-field="headings.skills">${d.headings.skills}</h3>
                <div class="multicol">
                    <ul contenteditable="true" data-list="skills">
                        ${d.skills.split(',').map(s => `<li>${s.trim()}</li>`).join('')}
                    </ul>
                </div>
            </section>

            <section>
                <h3 contenteditable="true" data-field="headings.certificates">${d.headings.certificates}</h3>
                <div class="multicol">
                    <ul contenteditable="true" data-list="certificates">
                        ${d.certificates.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                    </ul>
                </div>
            </section>

            <section>
                <h3 contenteditable="true" data-field="headings.languages">${d.headings.languages}</h3>
                <div class="multicol">
                    <ul contenteditable="true" data-list="languages">
                        ${d.languages.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `;
        } else if (d.currentTemplate === 'steady-form') {
            paper.innerHTML = `
                <div class="steady-form-wrapper">
                    <header class="sf-header">
                        <div class="sf-header-left">
                            <h1 contenteditable="true" data-field="name">${d.name}</h1>
                            <div class="sf-role" contenteditable="true" data-field="role">${d.role}</div>
                            <div class="sf-contact-grid">
                                <div><span class="sf-icon"><i class="fas fa-envelope"></i></span> <span contenteditable="true" data-field="contact.email">${d.contact.email}</span></div>
                                <div><span class="sf-icon"><i class="fas fa-phone"></i></span> <span contenteditable="true" data-field="contact.phone">${d.contact.phone}</span></div>
                                <div><span class="sf-icon"><i class="fab fa-linkedin"></i></span> <span contenteditable="true" data-field="contact.linkedin">${d.contact.linkedin}</span></div>
                                <div><span class="sf-icon"><i class="fas fa-map-marker-alt"></i></span> <span contenteditable="true" data-field="contact.location">${d.contact.location}</span></div>
                            </div>
                        </div>
                        <div class="sf-header-right">
                            ${d.photo ? `<img src="${d.photo}" class="sf-profile-pic" style="object-fit: cover;">` : `<div class="sf-profile-pic">PHOTO</div>`}
                        </div>
                    </header>

                    <section>
                        <div class="sf-section-title" contenteditable="true" data-field="headings.summary">${d.headings.summary}</div>
                        <p contenteditable="true" data-field="summary">${d.summary}</p>
                    </section>

                    <section>
                        <div class="sf-section-title" contenteditable="true" data-field="headings.experience">${d.headings.experience}</div>
                        ${d.experience.map((exp, i) => `
                            <div class="sf-tabularx">
                                <div class="sf-left-col">
                                    <div class="sf-date" contenteditable="true" data-field="experience.${i}.date">${exp.date}</div>
                                    <div class="sf-loc" contenteditable="true" data-field="experience.${i}.location">${exp.location}</div>
                                </div>
                                <div class="sf-right-col">
                                    <div class="sf-company-role">
                                        <span class="sf-company" contenteditable="true" data-field="experience.${i}.company">${exp.company}</span>, 
                                        <span class="sf-role-title" contenteditable="true" data-field="experience.${i}.role">${exp.role}</span>
                                    </div>
                                    <ul contenteditable="true" data-array="experience.${i}.points">
                                        ${exp.points.map(p => `<li>${p}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="sf-section-title" contenteditable="true" data-field="headings.education">${d.headings.education}</div>
                        ${d.education.map((ed, i) => `
                            <div class="sf-tabularx">
                                <div class="sf-left-col">
                                    <div class="sf-date" contenteditable="true" data-field="education.${i}.year">${ed.year}</div>
                                    <div class="sf-loc" contenteditable="true" data-field="education.${i}.location">${ed.location}</div>
                                </div>
                                <div class="sf-right-col">
                                    <div class="sf-company-role">
                                        <span class="sf-company" contenteditable="true" data-field="education.${i}.degree">${ed.degree}</span>, 
                                        <span class="sf-role-title" contenteditable="true" data-field="education.${i}.school">${ed.school}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="sf-section-title" contenteditable="true" data-field="headings.skills">${d.headings.skills}</div>
                        <div class="multicol">
                            <ul contenteditable="true" data-list="skills">
                                ${d.skills.split(',').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div class="sf-section-title" contenteditable="true" data-field="headings.certificates">${d.headings.certificates}</div>
                        <div class="multicol">
                            <ul contenteditable="true" data-list="certificates">
                                ${d.certificates.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div class="sf-section-title" contenteditable="true" data-field="headings.languages">${d.headings.languages}</div>
                        <div class="multicol">
                            <ul contenteditable="true" data-list="languages">
                                ${d.languages.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                </div>
            `;
        } else if (d.currentTemplate === 'mercury-flow') {
            paper.innerHTML = `
                <div class="mercury-flow-wrapper">
                    <header class="mf-header">
                        <div class="mf-header-left">
                            ${d.photo ? `<img src="${d.photo}" class="mf-profile-pic" style="object-fit: cover;">` : `<div class="mf-profile-pic">PHOTO</div>`}
                        </div>
                        <div class="mf-header-right">
                            <h1 contenteditable="true" data-field="name">${d.name}</h1>
                            <div class="mf-role" contenteditable="true" data-field="role">${d.role}</div>
                            <div class="mf-contact-grid">
                                <div><span class="mf-icon"><i class="fas fa-envelope"></i></span> <span contenteditable="true" data-field="contact.email">${d.contact.email}</span></div>
                                <div><span class="mf-icon"><i class="fas fa-phone"></i></span> <span contenteditable="true" data-field="contact.phone">${d.contact.phone}</span></div>
                                <div><span class="mf-icon"><i class="fab fa-linkedin"></i></span> <span contenteditable="true" data-field="contact.linkedin">${d.contact.linkedin}</span></div>
                                <div><span class="mf-icon"><i class="fas fa-map-marker-alt"></i></span> <span contenteditable="true" data-field="contact.location">${d.contact.location}</span></div>
                            </div>
                        </div>
                    </header>
                    <hr class="mf-divider">

                    <section>
                        <div class="mf-section-title" contenteditable="true" data-field="headings.summary">${d.headings.summary}</div>
                        <p contenteditable="true" data-field="summary">${d.summary}</p>
                    </section>

                    <section>
                        <div class="mf-section-title" contenteditable="true" data-field="headings.experience">${d.headings.experience}</div>
                        ${d.experience.map((exp, i) => `
                            <div class="mf-tabularx">
                                <div class="mf-left-col">
                                    <div class="mf-date" contenteditable="true" data-field="experience.${i}.date">${exp.date}</div>
                                    <div class="mf-loc" contenteditable="true" data-field="experience.${i}.location">${exp.location}</div>
                                </div>
                                <div class="mf-right-col">
                                    <div class="mf-company" contenteditable="true" data-field="experience.${i}.company">${exp.company}</div>
                                    <div class="mf-role-title" contenteditable="true" data-field="experience.${i}.role">${exp.role}</div>
                                    <ul contenteditable="true" data-array="experience.${i}.points">
                                        ${exp.points.map(p => `<li>${p}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="mf-section-title" contenteditable="true" data-field="headings.education">${d.headings.education}</div>
                        ${d.education.map((ed, i) => `
                            <div class="mf-tabularx">
                                <div class="mf-left-col">
                                    <div class="mf-date" contenteditable="true" data-field="education.${i}.year">${ed.year}</div>
                                    <div class="mf-loc" contenteditable="true" data-field="education.${i}.location">${ed.location}</div>
                                </div>
                                <div class="mf-right-col">
                                    <div class="mf-company" contenteditable="true" data-field="education.${i}.degree">${ed.degree}</div>
                                    <div class="mf-role-title" contenteditable="true" data-field="education.${i}.school">${ed.school}</div>
                                </div>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="mf-section-title" contenteditable="true" data-field="headings.skills">${d.headings.skills}</div>
                        <div class="multicol-3">
                            <ul contenteditable="true" data-list="skills">
                                ${d.skills.split(',').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div class="mf-section-title" contenteditable="true" data-field="headings.certificates">${d.headings.certificates}</div>
                        <div class="multicol-3">
                            <ul contenteditable="true" data-list="certificates">
                                ${d.certificates.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div class="mf-section-title" contenteditable="true" data-field="headings.languages">${d.headings.languages}</div>
                        <div class="multicol-2">
                            <ul contenteditable="true" data-list="languages">
                                ${d.languages.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                </div>
            `;

        } else if (d.currentTemplate === 'azure-line') {
            paper.innerHTML = `
                <div class="azure-line-wrapper">
                    <header class="al-header">
                        <div class="al-header-left">
                            ${d.photo ? `<img src="${d.photo}" class="al-profile-pic" style="object-fit: cover;">` : `<div class="al-profile-pic">PHOTO</div>`}
                        </div>
                        <div class="al-header-right">
                            <h1 contenteditable="true" data-field="name">${d.name}</h1>
                            <div class="al-role" contenteditable="true" data-field="role">${d.role}</div>
                            <div class="al-contact-line">
                                <span contenteditable="true" data-field="contact.email">${d.contact.email}</span> &bull; 
                                <span contenteditable="true" data-field="contact.phone">${d.contact.phone}</span> &bull; 
                                <span contenteditable="true" data-field="contact.location">${d.contact.location}</span> &bull; 
                                <span contenteditable="true" data-field="contact.linkedin">${d.contact.linkedin}</span>
                            </div>
                        </div>
                    </header>

                    <section>
                        <div class="al-section-title">
                            <span contenteditable="true" data-field="headings.summary">${d.headings.summary}</span>
                            <div class="al-section-rule"></div>
                        </div>
                        <p contenteditable="true" data-field="summary">${d.summary}</p>
                    </section>

                    <section>
                        <div class="al-section-title">
                            <span contenteditable="true" data-field="headings.experience">${d.headings.experience}</span>
                            <div class="al-section-rule"></div>
                        </div>
                        ${d.experience.map((exp, i) => `
                            <div class="al-item">
                                <div class="al-item-date" contenteditable="true" data-field="experience.${i}.date">${exp.date}</div>
                                <div class="al-item-main">
                                    <div class="al-role-company">
                                        <strong contenteditable="true" data-field="experience.${i}.role">${exp.role}</strong>, 
                                        <i contenteditable="true" data-field="experience.${i}.company">${exp.company}</i>
                                    </div>
                                    <ul contenteditable="true" data-array="experience.${i}.points">
                                        ${exp.points.map(p => `<li>${p}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="al-item-loc" contenteditable="true" data-field="experience.${i}.location">${exp.location}</div>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="al-section-title">
                            <span contenteditable="true" data-field="headings.education">${d.headings.education}</span>
                            <div class="al-section-rule"></div>
                        </div>
                        ${d.education.map((ed, i) => `
                            <div class="al-item">
                                <div class="al-item-date" contenteditable="true" data-field="education.${i}.year">${ed.year}</div>
                                <div class="al-item-main">
                                    <div class="al-role-company">
                                        <strong contenteditable="true" data-field="education.${i}.degree">${ed.degree}</strong>, 
                                        <i contenteditable="true" data-field="education.${i}.school">${ed.school}</i>
                                    </div>
                                </div>
                                <div class="al-item-loc" contenteditable="true" data-field="education.${i}.location">${ed.location}</div>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="al-section-title">
                            <span contenteditable="true" data-field="headings.skills">${d.headings.skills}</span>
                            <div class="al-section-rule"></div>
                        </div>
                        <div class="multicol-2">
                            <ul contenteditable="true" data-list="skills">
                                ${d.skills.split(',').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div class="al-section-title">
                            <span contenteditable="true" data-field="headings.certificates">${d.headings.certificates}</span>
                            <div class="al-section-rule"></div>
                        </div>
                        <div class="multicol-2">
                            <ul contenteditable="true" data-list="certificates">
                                ${d.certificates.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                    
                    <section>
                        <div class="al-section-title">
                            <span contenteditable="true" data-field="headings.languages">${d.headings.languages}</span>
                            <div class="al-section-rule"></div>
                        </div>
                        <div class="multicol-2">
                            <ul contenteditable="true" data-list="languages">
                                ${d.languages.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                </div>
            `;
        } else if (d.currentTemplate === 'pure-baseline') {
            paper.innerHTML = `
                <div class="pure-baseline-wrapper">
                    <header class="pb-header">
                        <div class="pb-header-left">
                            ${d.photo ? `<img src="${d.photo}" class="pb-profile-pic" style="object-fit: cover;">` : `<div class="pb-profile-pic">PHOTO</div>`}
                        </div>
                        <div class="pb-header-right">
                            <h1 contenteditable="true" data-field="name">${d.name}</h1>
                            <div class="pb-role" contenteditable="true" data-field="role">${d.role}</div>
                            <div class="pb-contact-grid">
                                <div class="pb-contact-item">
                                    <div class="pb-icon"><i class="fas fa-envelope"></i></div>
                                    <div class="pb-text" contenteditable="true" data-field="contact.email">${d.contact.email}</div>
                                </div>
                                <div class="pb-contact-item">
                                    <div class="pb-icon"><i class="fas fa-phone"></i></div>
                                    <div class="pb-text" contenteditable="true" data-field="contact.phone">${d.contact.phone}</div>
                                </div>
                                <div class="pb-contact-item">
                                    <div class="pb-icon"><i class="fas fa-map-marker-alt"></i></div>
                                    <div class="pb-text" contenteditable="true" data-field="contact.location">${d.contact.location}</div>
                                </div>
                                <div class="pb-contact-item">
                                    <div class="pb-icon"><i class="fab fa-linkedin"></i></div>
                                    <div class="pb-text" contenteditable="true" data-field="contact.linkedin">${d.contact.linkedin}</div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <section>
                        <div class="pb-section-title">
                            <span contenteditable="true" data-field="headings.summary">${d.headings.summary}</span>
                            <div class="pb-section-rule"></div>
                        </div>
                        <p contenteditable="true" data-field="summary">${d.summary}</p>
                    </section>

                    <section>
                        <div class="pb-section-title">
                            <span contenteditable="true" data-field="headings.experience">${d.headings.experience}</span>
                            <div class="pb-section-rule"></div>
                        </div>
                        ${d.experience.map((exp, i) => `
                            <div class="pb-item">
                                <div class="pb-item-header">
                                    <div class="pb-item-title">
                                        <strong contenteditable="true" data-field="experience.${i}.company">${exp.company}</strong>, 
                                        <i contenteditable="true" data-field="experience.${i}.role">${exp.role}</i>
                                    </div>
                                    <div class="pb-item-date">
                                        <div contenteditable="true" data-field="experience.${i}.date">${exp.date}</div>
                                        <div contenteditable="true" data-field="experience.${i}.location">${exp.location}</div>
                                    </div>
                                </div>
                                <ul contenteditable="true" data-array="experience.${i}.points">
                                    ${exp.points.map(p => `<li>${p}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="pb-section-title">
                            <span contenteditable="true" data-field="headings.education">${d.headings.education}</span>
                            <div class="pb-section-rule"></div>
                        </div>
                        ${d.education.map((ed, i) => `
                            <div class="pb-item">
                                <div class="pb-item-header">
                                    <div class="pb-item-title">
                                        <strong contenteditable="true" data-field="education.${i}.school">${ed.school}</strong>, 
                                        <i contenteditable="true" data-field="education.${i}.degree">${ed.degree}</i>
                                    </div>
                                    <div class="pb-item-date">
                                        <div contenteditable="true" data-field="education.${i}.year">${ed.year}</div>
                                        <div contenteditable="true" data-field="education.${i}.location">${ed.location}</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </section>

                    <section>
                        <div class="pb-section-title">
                            <span contenteditable="true" data-field="headings.skills">${d.headings.skills}</span>
                            <div class="pb-section-rule"></div>
                        </div>
                        <div class="multicol-2">
                            <ul contenteditable="true" data-list="skills">
                                ${d.skills.split(',').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div class="pb-section-title">
                            <span contenteditable="true" data-field="headings.languages">${d.headings.languages}</span>
                            <div class="pb-section-rule"></div>
                        </div>
                        <div class="multicol-2">
                            <ul contenteditable="true" data-list="languages">
                                ${d.languages.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                    
                    <section>
                        <div class="pb-section-title">
                            <span contenteditable="true" data-field="headings.certificates">${d.headings.certificates}</span>
                            <div class="pb-section-rule"></div>
                        </div>
                        <div class="multicol-2">
                            <ul contenteditable="true" data-list="certificates">
                                ${d.certificates.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                </div>
            `;
        } else if (d.currentTemplate === 'happy') {
            paper.innerHTML = `
                <div class="happy-wrapper">
                    <div class="hp-bg-tl"></div>
                    <div class="hp-bg-br"></div>
                    <div class="hp-bg-bl"></div>
                    
                    <div class="hp-content-box">
                        <header class="hp-header">
                            <div class="hp-header-left">
                                <h1 contenteditable="true" data-field="name">${d.name}</h1>
                                <div class="hp-role" contenteditable="true" data-field="role">${d.role}</div>
                                
                                <div class="hp-contact-list">
                                    <div class="hp-contact-item">
                                        <i class="fas fa-map-marker-alt hp-icon"></i>
                                        <span contenteditable="true" data-field="contact.location">${d.contact.location}</span>
                                    </div>
                                    <div class="hp-contact-item">
                                        <i class="fas fa-phone hp-icon"></i>
                                        <span contenteditable="true" data-field="contact.phone">${d.contact.phone}</span>
                                    </div>
                                    <div class="hp-contact-item">
                                        <i class="fas fa-envelope hp-icon"></i>
                                        <span contenteditable="true" data-field="contact.email">${d.contact.email}</span>
                                    </div>
                                    <div class="hp-contact-item">
                                        <i class="fab fa-linkedin hp-icon"></i>
                                        <span contenteditable="true" data-field="contact.linkedin">${d.contact.linkedin}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hp-header-right">
                                ${d.photo ? `<img src="${d.photo}" class="hp-profile-pic" style="object-fit: cover;">` : `<div class="hp-profile-pic">PHOTO</div>`}
                            </div>
                        </header>

                        <div class="hp-summary" contenteditable="true" data-field="summary">
                            ${d.summary}
                        </div>

                        <section>
                            <div class="hp-section-title">
                                <i class="fas fa-briefcase hp-icon"></i> <span contenteditable="true" data-field="headings.experience">${d.headings.experience}</span>
                            </div>
                            ${d.experience.map((exp, i) => `
                                <div class="hp-item">
                                    <div class="hp-item-left">
                                        <strong contenteditable="true" data-field="experience.${i}.date">${exp.date}</strong>
                                        <div contenteditable="true" data-field="experience.${i}.location">${exp.location}</div>
                                    </div>
                                    <div class="hp-item-right">
                                        <div class="hp-item-title">
                                            <strong contenteditable="true" data-field="experience.${i}.company">${exp.company}</strong>, 
                                            <span contenteditable="true" data-field="experience.${i}.role">${exp.role}</span>
                                        </div>
                                        <ul contenteditable="true" data-array="experience.${i}.points">
                                            ${exp.points.map(p => `<li>${p}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            `).join('')}
                        </section>

                        <section>
                            <div class="hp-section-title">
                                <i class="fas fa-graduation-cap hp-icon"></i> <span contenteditable="true" data-field="headings.education">${d.headings.education}</span>
                            </div>
                            ${d.education.map((ed, i) => `
                                <div class="hp-item">
                                    <div class="hp-item-left">
                                        <strong contenteditable="true" data-field="education.${i}.year">${ed.year}</strong>
                                    </div>
                                    <div class="hp-item-right">
                                        <div class="hp-item-title">
                                            <strong contenteditable="true" data-field="education.${i}.degree">${ed.degree}</strong>
                                        </div>
                                        <div contenteditable="true" data-field="education.${i}.school">${ed.school}</div>
                                        <div contenteditable="true" data-field="education.${i}.location">${ed.location}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </section>

                        <section>
                            <div class="hp-section-title">
                                <i class="fas fa-globe hp-icon"></i> <span contenteditable="true" data-field="headings.languages">${d.headings.languages}</span>
                            </div>
                            <div class="multicol-2">
                                <ul contenteditable="true" data-list="languages">
                                    ${d.languages.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                                </ul>
                            </div>
                        </section>

                        <section>
                            <div class="hp-section-title">
                                <i class="fas fa-lightbulb hp-icon"></i> <span contenteditable="true" data-field="headings.skills">${d.headings.skills}</span>
                            </div>
                            <ul class="hp-inline-list" contenteditable="true" data-list="skills">
                                ${d.skills.split(',').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </section>

                        <section>
                            <div class="hp-section-title">
                                <i class="fas fa-certificate hp-icon"></i> <span contenteditable="true" data-field="headings.certificates">${d.headings.certificates}</span>
                            </div>
                            <ul class="hp-inline-list" contenteditable="true" data-list="certificates">
                                ${d.certificates.split('\n').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </section>
                    </div>
                </div>
            `;
        }

        this.setupContentEditableListeners();
    },

    setupListeners: function() {
        document.getElementById('res-photo')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.data.photo = event.target.result;
                    this.renderPaper();
                };
                reader.readAsDataURL(file);
            }
        });
        document.getElementById('res-template')?.addEventListener('change', (e) => {
            this.data.currentTemplate = e.target.value;
            this.renderPaper();
        });
        document.getElementById('res-name')?.addEventListener('input', (e) => {
            this.data.name = e.target.value;
            this.renderPaper();
        });
        document.getElementById('res-role')?.addEventListener('input', (e) => {
            this.data.role = e.target.value;
            this.renderPaper();
        });
        document.getElementById('res-location')?.addEventListener('input', (e) => {
            this.data.contact.location = e.target.value;
            this.renderPaper();
        });
        document.getElementById('res-email')?.addEventListener('input', (e) => {
            this.data.contact.email = e.target.value;
            this.renderPaper();
        });
        document.getElementById('res-phone')?.addEventListener('input', (e) => {
            this.data.contact.phone = e.target.value;
            this.renderPaper();
        });
        document.getElementById('res-linkedin')?.addEventListener('input', (e) => {
            this.data.contact.linkedin = e.target.value;
            this.renderPaper();
        });
        document.getElementById('res-summary')?.addEventListener('input', (e) => {
            this.data.summary = e.target.value;
            this.renderPaper();
        });
    },

    setupContentEditableListeners: function() {
        const editables = document.querySelectorAll('#resume-paper [contenteditable="true"]');
        editables.forEach(el => {
            el.addEventListener('blur', (e) => {
                const field = el.getAttribute('data-field');
                const arrayField = el.getAttribute('data-array');
                const listField = el.getAttribute('data-list');
                
                if (field) {
                    const val = el.innerText;
                    const parts = field.split('.');
                    let obj = this.data;
                    for (let i = 0; i < parts.length - 1; i++) {
                        obj = obj[parts[i]];
                    }
                    obj[parts[parts.length - 1]] = val;
                    
                    if(field === 'name') document.getElementById('res-name').value = val;
                    if(field === 'role') document.getElementById('res-role').value = val;
                    if(field === 'contact.location') document.getElementById('res-location').value = val;
                    if(field === 'contact.email') document.getElementById('res-email').value = val;
                    if(field === 'contact.phone') document.getElementById('res-phone').value = val;
                    if(field === 'contact.linkedin') document.getElementById('res-linkedin').value = val;
                    if(field === 'summary') document.getElementById('res-summary').value = val;
                } 
                else if (arrayField) {
                    const items = Array.from(el.querySelectorAll('li')).map(li => li.innerText.trim()).filter(t => t);
                    const parts = arrayField.split('.');
                    let obj = this.data;
                    for (let i = 0; i < parts.length - 1; i++) {
                        obj = obj[parts[i]];
                    }
                    obj[parts[parts.length - 1]] = items;
                }
                else if (listField) {
                    const items = Array.from(el.querySelectorAll('li')).map(li => li.innerText.trim()).filter(t => t);
                    if (listField === 'skills') {
                        this.data[listField] = items.join(', ');
                    } else {
                        this.data[listField] = items.join('\n');
                    }
                }
            });
        });
    }
};
