/* ============================================
   Projects JavaScript - Dynamic Loading
   ============================================ */

// Sample projects data (in a real app, this would come from an API or JSON file)
const projectsData = [
    {
        id: 1,
        title: 'Scalable Three-Tier Web Architecture',
        description: 'Architected and deployed a highly available three-tier application on AWS with Nginx, Node.js, and MySQL. Achieved 99.9% uptime with containerized services.',
        image: '⚙️',
        category: 'fullstack',
        technologies: ['AWS', 'Docker', 'Nginx', 'Node.js', 'MySQL'],
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true
    },
    {
        id: 2,
        title: 'Containerized Flask Microservice',
        description: 'Designed and containerized a RESTful Flask microservice. Reduced setup time from 30 minutes to under 5 minutes with Docker containerization.',
        image: '🐳',
        category: 'fullstack',
        technologies: ['Python', 'Flask', 'Docker', 'REST API'],
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true
    },
    {
        id: 3,
        title: 'Cloud-Based Object Storage Solution',
        description: 'Built a secure, scalable object storage solution using AWS S3 with IAM role-based access control. Integrated Boto3 for automated operations.',
        image: '☁️',
        category: 'fullstack',
        technologies: ['AWS S3', 'IAM', 'Boto3', 'Python'],
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true
    },
    {
        id: 4,
        title: 'Automated System Monitoring & Logging',
        description: 'Developed automated Bash scripts for system health monitoring, log rotation, and performance collection. Reduced incident detection time by 35%.',
        image: '📊',
        category: 'fullstack',
        technologies: ['Linux', 'Bash', 'Cron', 'Monitoring', 'Logging'],
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true
    },
    {
        id: 5,
        title: 'CI/CD Pipeline with Automated Deployment',
        description: 'Designed Jenkins-based CI/CD pipeline for Node.js applications. Reduced deployment time from 15 minutes to under 2 minutes.',
        image: '🚀',
        category: 'fullstack',
        technologies: ['Jenkins', 'AWS EC2', 'Node.js', 'Git'],
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true
    }
];

// ============================================
// Render Projects
// ============================================

function renderProjects(projects = projectsData) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<div class="loading-placeholder"><p>No projects found</p></div>';
        return;
    }
    
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
    
    // Re-initialize animations for new projects
    initAOS();
}

// ============================================
// Create Project Card Element
// ============================================

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    const techTags = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    card.innerHTML = `
        <div class="project-image">${project.image}</div>
        <div class="project-content">
            <div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${techTags}</div>
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>
                <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// Load Projects from JSON (Optional)
// ============================================

async function loadProjectsFromJSON() {
    try {
        const response = await fetch('data/projects.json');
        if (response.ok) {
            const data = await response.json();
            renderProjects(data.projects || projectsData);
        } else {
            console.log('Using default projects data');
            renderProjects();
        }
    } catch (error) {
        console.log('Could not load projects from JSON, using default data:', error);
        renderProjects();
    }
}

// ============================================
// Auto-Discover Projects from Workspace
// ============================================

async function autoDiscoverProjects() {
    try {
        const response = await fetch('data/discovered-projects.json');
        if (response.ok) {
            const data = await response.json();
            if (data.projects && data.projects.length > 0) {
                // Merge discovered projects with sample projects
                const allProjects = [...data.projects, ...projectsData];
                renderProjects(allProjects);
                return;
            }
        }
    } catch (error) {
        console.log('No auto-discovered projects found');
    }
    
    // Fallback to default projects
    renderProjects();
}

// ============================================
// Initialize Projects on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Try to load from discovered projects, then fallback to defaults
    autoDiscoverProjects();
});

// ============================================
// Filter Handler (integrated with main.js)
// ============================================

function filterAndRenderProjects(category) {
    const filtered = category === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === category);
    
    // Add fade out animation
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.style.opacity = '0';
        projectsGrid.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            renderProjects(filtered);
            projectsGrid.style.opacity = '1';
            projectsGrid.style.transform = 'translateY(0)';
        }, 200);
    }
}

// ============================================
// Parallax Scroll Effect
// ============================================

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            const speed = element.dataset.parallax || 0.5;
            
            element.style.transform = `translateY(${distance * speed}px)`;
        });
    });
}

// ============================================
// Mouse Follow Effect for Cards
// ============================================

function initMouseFollowEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Subtle 3D tilt effect
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });
}

// ============================================
// Ripple Click Effect
// ============================================

function initRippleEffect() {
    const buttons = document.querySelectorAll('.filter-btn, .project-link, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Export for use in other scripts
window.projectsModule = {
    renderProjects,
    filterAndRenderProjects,
    loadProjectsFromJSON,
    autoDiscoverProjects,
    projectsData,
    initParallaxEffect,
    initMouseFollowEffect,
    initRippleEffect
};
