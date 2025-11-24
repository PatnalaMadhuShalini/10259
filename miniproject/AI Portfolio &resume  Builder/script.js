// AI Portfolio Builder Script

// Global variables
let currentTemplate = 'minimalist';
let portfolioData = {
    personalInfo: {},
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certifications: []
};

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const aiSuggestBtn = document.getElementById('aiSuggest');
const templateBtns = document.querySelectorAll('.template-btn');
const portfolioForm = document.getElementById('portfolioForm');
const portfolioPreview = document.getElementById('portfolioPreview');
const exportHTMLBtn = document.getElementById('exportHTML');
const exportPDFBtn = document.getElementById('exportPDF');
const exportResumeHTMLBtn = document.getElementById('exportResumeHTML');
const exportResumePDFBtn = document.getElementById('exportResumePDF');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    setupEventListeners();
    updatePreview();
});

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // AI suggest template
    aiSuggestBtn.addEventListener('click', aiSuggestTemplate);

    // Template selection
    templateBtns.forEach(btn => {
        btn.addEventListener('click', () => selectTemplate(btn.dataset.template));
    });

    // Form inputs
    portfolioForm.addEventListener('input', handleFormInput);

    // Add buttons
    document.getElementById('addProject').addEventListener('click', () => addItem('projects'));
    document.getElementById('addExperience').addEventListener('click', () => addItem('experience'));
    document.getElementById('addEducation').addEventListener('click', () => addItem('education'));
    document.getElementById('addCertification').addEventListener('click', () => addItem('certifications'));

    // Generate bio
    document.getElementById('generateBio').addEventListener('click', generateBio);

    // Export buttons
    exportHTMLBtn.addEventListener('click', () => exportPortfolio('html'));
    exportPDFBtn.addEventListener('click', () => exportPortfolio('pdf'));
    exportResumeHTMLBtn.addEventListener('click', () => exportResume('html'));
    exportResumePDFBtn.addEventListener('click', () => exportResume('pdf'));
}

// Toggle dark/light mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
    updatePreview();
}

// AI suggest template
function aiSuggestTemplate() {
    const templates = ['minimalist', 'modern', 'creative', 'corporate'];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    selectTemplate(randomTemplate);
    alert(`AI suggests the ${randomTemplate} template!`);
}

// Select template
function selectTemplate(template) {
    currentTemplate = template;
    templateBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.template === template);
    });
    document.body.className = document.body.className.replace(/template-\w+/g, '') + ` template-${template}`;
    localStorage.setItem('currentTemplate', template);
    updatePreview();
}

// Handle form input
function handleFormInput() {
    collectFormData();
    saveToLocalStorage();
    updatePreview();
}

// Collect form data
function collectFormData() {
    portfolioData.personalInfo = {
        fullName: document.getElementById('fullName').value,
        professionalTitle: document.getElementById('professionalTitle').value,
        bio: document.getElementById('bio').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        github: document.getElementById('github').value,
        linkedin: document.getElementById('linkedin').value,
        twitter: document.getElementById('twitter').value
    };

    portfolioData.skills = document.getElementById('skills').value.split(',').map(skill => skill.trim()).filter(skill => skill);

    // Collect dynamic items
    portfolioData.projects = collectItems('projects');
    portfolioData.experience = collectItems('experience');
    portfolioData.education = collectItems('education');
    portfolioData.certifications = collectItems('certifications');
}

// Collect items from containers
function collectItems(type) {
    const container = document.getElementById(`${type}Container`);
    const items = [];
    container.querySelectorAll('.item-card').forEach(card => {
        const inputs = card.querySelectorAll('input, textarea');
        const item = {};
        inputs.forEach(input => {
            item[input.name] = input.value;
        });
        if (Object.values(item).some(value => value.trim())) {
            items.push(item);
        }
    });
    return items;
}

// Add item
function addItem(type) {
    const container = document.getElementById(`${type}Container`);
    const itemCard = document.createElement('div');
    itemCard.className = 'card mb-3 item-card';
    itemCard.innerHTML = getItemTemplate(type);
    container.appendChild(itemCard);

    // Add remove button functionality
    itemCard.querySelector('.remove-item').addEventListener('click', () => {
        itemCard.remove();
        handleFormInput();
    });

    // Add input listeners
    itemCard.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', handleFormInput);
    });
}

// Get item template
function getItemTemplate(type) {
    const templates = {
        projects: `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Project Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Project Link</label>
                        <input type="url" class="form-control" name="link">
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Project Description</label>
                    <textarea class="form-control" name="description" rows="2"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Technologies Used</label>
                    <input type="text" class="form-control" name="technologies" placeholder="e.g., React, Node.js">
                </div>
                <button type="button" class="btn btn-danger btn-sm remove-item"><i class="fas fa-trash"></i> Remove</button>
            </div>
        `,
        experience: `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-control" name="company" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Role</label>
                        <input type="text" class="form-control" name="role" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Duration</label>
                        <input type="text" class="form-control" name="duration" placeholder="e.g., Jan 2020 - Dec 2022">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-control" name="location">
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" name="description" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-danger btn-sm remove-item"><i class="fas fa-trash"></i> Remove</button>
            </div>
        `,
        education: `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Institution</label>
                        <input type="text" class="form-control" name="institution" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Degree</label>
                        <input type="text" class="form-control" name="degree" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Field of Study</label>
                        <input type="text" class="form-control" name="field">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Graduation Year</label>
                        <input type="text" class="form-control" name="year">
                    </div>
                </div>
                <button type="button" class="btn btn-danger btn-sm remove-item"><i class="fas fa-trash"></i> Remove</button>
            </div>
        `,
        certifications: `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Certification Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Issuing Organization</label>
                        <input type="text" class="form-control" name="issuer">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Issue Date</label>
                        <input type="text" class="form-control" name="date" placeholder="e.g., Jan 2023">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Credential ID</label>
                        <input type="text" class="form-control" name="credentialId">
                    </div>
                </div>
                <button type="button" class="btn btn-danger btn-sm remove-item"><i class="fas fa-trash"></i> Remove</button>
            </div>
        `
    };
    return templates[type];
}

// Generate AI bio
function generateBio() {
    const name = document.getElementById('fullName').value;
    const title = document.getElementById('professionalTitle').value;
    const skills = document.getElementById('skills').value;

    if (!name || !title) {
        alert('Please fill in your name and professional title first.');
        return;
    }

    // Simple AI-like bio generation
    const bios = [
        `Hi, I'm ${name}, a passionate ${title} with expertise in ${skills || 'various technologies'}. I love creating innovative solutions and bringing ideas to life through code.`,
        `As a dedicated ${title}, ${name} specializes in ${skills || 'cutting-edge technologies'}. With a keen eye for detail and a drive for excellence, I deliver high-quality results.`,
        `${name} is a skilled ${title} who thrives on solving complex problems. My background in ${skills || 'software development'} allows me to create efficient and user-friendly applications.`,
        `Driven by innovation, ${name} works as a ${title} with proficiency in ${skills || 'modern development tools'}. I enjoy collaborating on challenging projects and continuous learning.`
    ];

    const randomBio = bios[Math.floor(Math.random() * bios.length)];
    document.getElementById('bio').value = randomBio;
    handleFormInput();
}

// Update preview
function updatePreview() {
    const portfolioHTML = generatePortfolioHTML();
    const blob = new Blob([portfolioHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    portfolioPreview.src = url;
}

// Generate portfolio HTML
function generatePortfolioHTML() {
    const { personalInfo, skills, projects, experience, education, certifications } = portfolioData;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.fullName || 'Portfolio'} - ${personalInfo.professionalTitle || 'Professional'}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; }
        .section { padding: 60px 0; }
        .skill-badge { display: inline-block; background: #007bff; color: white; padding: 5px 10px; margin: 2px; border-radius: 20px; font-size: 0.9em; }
        .project-card { transition: transform 0.3s; }
        .project-card:hover { transform: translateY(-5px); }
    </style>
</head>
<body class="template-${currentTemplate}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">${personalInfo.fullName || 'Portfolio'}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#skills">Skills</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="#experience">Experience</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section class="hero text-center">
        <div class="container">
            <h1 class="display-4">${personalInfo.fullName || 'Your Name'}</h1>
            <p class="lead">${personalInfo.professionalTitle || 'Your Professional Title'}</p>
            <p>${personalInfo.bio || 'Your bio goes here...'}</p>
        </div>
    </section>

    <section id="about" class="section">
        <div class="container">
            <h2 class="text-center mb-5">About Me</h2>
            <div class="row">
                <div class="col-md-8 mx-auto">
                    <p class="lead">${personalInfo.bio || 'Tell visitors about yourself here.'}</p>
                </div>
            </div>
        </div>
    </section>

    <section id="skills" class="section bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Skills</h2>
            <div class="text-center">
                ${skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>
        </div>
    </section>

    <section id="projects" class="section">
        <div class="container">
            <h2 class="text-center mb-5">Projects</h2>
            <div class="row">
                ${projects.map(project => `
                    <div class="col-md-4 mb-4">
                        <div class="card project-card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${project.name || 'Project Name'}</h5>
                                <p class="card-text">${project.description || 'Project description...'}</p>
                                <p class="text-muted">Technologies: ${project.technologies || 'N/A'}</p>
                                ${project.link ? `<a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section id="experience" class="section bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Experience</h2>
            <div class="row">
                <div class="col-md-8 mx-auto">
                    ${experience.map(exp => `
                        <div class="mb-4">
                            <h4>${exp.role || 'Role'} at ${exp.company || 'Company'}</h4>
                            <p class="text-muted">${exp.duration || 'Duration'} ${exp.location ? `• ${exp.location}` : ''}</p>
                            <p>${exp.description || 'Job description...'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <section id="education" class="section">
        <div class="container">
            <h2 class="text-center mb-5">Education</h2>
            <div class="row">
                <div class="col-md-8 mx-auto">
                    ${education.map(edu => `
                        <div class="mb-4">
                            <h4>${edu.degree || 'Degree'} in ${edu.field || 'Field of Study'}</h4>
                            <p class="text-muted">${edu.institution || 'Institution'} • ${edu.year || 'Year'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <section id="certifications" class="section bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Certifications</h2>
            <div class="row">
                <div class="col-md-8 mx-auto">
                    ${certifications.map(cert => `
                        <div class="mb-4">
                            <h4>${cert.name || 'Certification Name'}</h4>
                            <p class="text-muted">${cert.issuer || 'Issuing Organization'} • ${cert.date || 'Issue Date'}</p>
                            ${cert.credentialId ? `<p>Credential ID: ${cert.credentialId}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="section">
        <div class="container">
            <h2 class="text-center mb-5">Contact</h2>
            <div class="row text-center">
                ${personalInfo.email ? `<div class="col-md-3"><i class="fas fa-envelope fa-2x mb-2"></i><p>${personalInfo.email}</p></div>` : ''}
                ${personalInfo.phone ? `<div class="col-md-3"><i class="fas fa-phone fa-2x mb-2"></i><p>${personalInfo.phone}</p></div>` : ''}
                ${personalInfo.website ? `<div class="col-md-3"><i class="fas fa-globe fa-2x mb-2"></i><p><a href="${personalInfo.website}" target="_blank">Website</a></p></div>` : ''}
                ${personalInfo.github ? `<div class="col-md-3"><i class="fab fa-github fa-2x mb-2"></i><p><a href="${personalInfo.github}" target="_blank">GitHub</a></p></div>` : ''}
            </div>
            <div class="row text-center mt-3">
                ${personalInfo.linkedin ? `<div class="col-md-3"><i class="fab fa-linkedin fa-2x mb-2"></i><p><a href="${personalInfo.linkedin}" target="_blank">LinkedIn</a></p></div>` : ''}
                ${personalInfo.twitter ? `<div class="col-md-3"><i class="fab fa-twitter fa-2x mb-2"></i><p><a href="${personalInfo.twitter}" target="_blank">Twitter</a></p></div>` : ''}
            </div>
        </div>
    </section>

    <footer class="bg-dark text-white text-center py-3">
        <div class="container">
            <p>&copy; 2023 ${personalInfo.fullName || 'Your Name'}. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

// Generate resume HTML
function generateResumeHTML() {
    const { personalInfo, skills, projects, experience, education, certifications } = portfolioData;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${personalInfo.fullName || 'Your Name'}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12px; line-height: 1.4; }
        .resume-header { background: #f8f9fa; padding: 20px; margin-bottom: 20px; }
        .section-title { font-weight: bold; font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px; }
        .job-title { font-weight: bold; }
        .company { font-style: italic; }
        .date { float: right; }
        .skill-item { display: inline-block; margin-right: 10px; margin-bottom: 5px; }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="resume-header text-center">
            <h1>${personalInfo.fullName || 'Your Name'}</h1>
            <p class="lead">${personalInfo.professionalTitle || 'Your Professional Title'}</p>
            <div class="row">
                <div class="col-6 text-start">
                    ${personalInfo.email ? `<p><i class="fas fa-envelope"></i> ${personalInfo.email}</p>` : ''}
                    ${personalInfo.phone ? `<p><i class="fas fa-phone"></i> ${personalInfo.phone}</p>` : ''}
                </div>
                <div class="col-6 text-end">
                    ${personalInfo.website ? `<p><i class="fas fa-globe"></i> <a href="${personalInfo.website}">${personalInfo.website}</a></p>` : ''}
                    ${personalInfo.linkedin ? `<p><i class="fab fa-linkedin"></i> <a href="${personalInfo.linkedin}">LinkedIn</a></p>` : ''}
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                ${personalInfo.bio ? `
                <div class="mb-4">
                    <div class="section-title">Professional Summary</div>
                    <p>${personalInfo.bio}</p>
                </div>
                ` : ''}

                ${skills.length > 0 ? `
                <div class="mb-4">
                    <div class="section-title">Skills</div>
                    <div>
                        ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}

                ${experience.length > 0 ? `
                <div class="mb-4">
                    <div class="section-title">Professional Experience</div>
                    ${experience.map(exp => `
                        <div class="mb-3">
                            <div class="job-title">${exp.role || 'Role'}</div>
                            <div class="company">${exp.company || 'Company'}</div>
                            <div class="date">${exp.duration || 'Duration'}</div>
                            <div style="clear: both;"></div>
                            <p>${exp.description || 'Job description...'}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${projects.length > 0 ? `
                <div class="mb-4">
                    <div class="section-title">Projects</div>
                    ${projects.map(project => `
                        <div class="mb-3">
                            <div class="job-title">${project.name || 'Project Name'}</div>
                            <p>${project.description || 'Project description...'}</p>
                            <p><em>Technologies: ${project.technologies || 'N/A'}</em></p>
                            ${project.link ? `<p>Link: <a href="${project.link}">${project.link}</a></p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${education.length > 0 ? `
                <div class="mb-4">
                    <div class="section-title">Education</div>
                    ${education.map(edu => `
                        <div class="mb-3">
                            <div class="job-title">${edu.degree || 'Degree'} in ${edu.field || 'Field of Study'}</div>
                            <div class="company">${edu.institution || 'Institution'}</div>
                            <div class="date">${edu.year || 'Year'}</div>
                            <div style="clear: both;"></div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${certifications.length > 0 ? `
                <div class="mb-4">
                    <div class="section-title">Certifications</div>
                    ${certifications.map(cert => `
                        <div class="mb-3">
                            <div class="job-title">${cert.name || 'Certification Name'}</div>
                            <div class="company">${cert.issuer || 'Issuing Organization'}</div>
                            <div class="date">${cert.date || 'Issue Date'}</div>
                            <div style="clear: both;"></div>
                            ${cert.credentialId ? `<p>Credential ID: ${cert.credentialId}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        </div>
    </div>
</body>
</html>
    `;
}

// Export portfolio
function exportPortfolio(format) {
    if (format === 'html') {
        const portfolioHTML = generatePortfolioHTML();
        downloadFile(portfolioHTML, 'portfolio.html', 'text/html');
    } else if (format === 'pdf') {
        exportToPDF(generatePortfolioHTML(), 'portfolio.pdf');
    }
}

// Export resume
function exportResume(format) {
    if (format === 'html') {
        const resumeHTML = generateResumeHTML();
        downloadFile(resumeHTML, 'resume.html', 'text/html');
    } else if (format === 'pdf') {
        exportToPDF(generateResumeHTML(), 'resume.pdf');
    }
}

// Download file
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Export to PDF
function exportToPDF(htmlContent, filename) {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);

    html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(filename);
        document.body.removeChild(element);
    });
}

// Save to local storage
function saveToLocalStorage() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    localStorage.setItem('currentTemplate', currentTemplate);
}

// Load from local storage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
        populateForm();
    }

    const savedTemplate = localStorage.getItem('currentTemplate');
    if (savedTemplate) {
        currentTemplate = savedTemplate;
        selectTemplate(savedTemplate);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Populate form with saved data
function populateForm() {
    const { personalInfo, skills, projects, experience, education, certifications } = portfolioData;

    document.getElementById('fullName').value = personalInfo.fullName || '';
    document.getElementById('professionalTitle').value = personalInfo.professionalTitle || '';
    document.getElementById('bio').value = personalInfo.bio || '';
    document.getElementById('email').value = personalInfo.email || '';
    document.getElementById('phone').value = personalInfo.phone || '';
    document.getElementById('website').value = personalInfo.website || '';
    document.getElementById('github').value = personalInfo.github || '';
    document.getElementById('linkedin').value = personalInfo.linkedin || '';
    document.getElementById('twitter').value = personalInfo.twitter || '';

    document.getElementById('skills').value = skills.join(', ');

    populateItems('projects', projects);
    populateItems('experience', experience);
    populateItems('education', education);
    populateItems('certifications', certifications);
}

// Populate items
function populateItems(type, items) {
    const container = document.getElementById(`${type}Container`);
    container.innerHTML = '';
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'card mb-3 item-card';
        itemCard.innerHTML = getItemTemplate(type);
        container.appendChild(itemCard);

        // Populate inputs
        const inputs = itemCard.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (item[input.name]) {
                input.value = item[input.name];
            }
        });

        // Add remove button functionality
        itemCard.querySelector('.remove-item').addEventListener('click', () => {
            itemCard.remove();
            handleFormInput();
        });

        // Add input listeners
        inputs.forEach(input => {
            input.addEventListener('input', handleFormInput);
        });
    });
}
