#!/usr/bin/env python3
"""
Portfolio Project Auto-Discovery Script

This script automatically scans the portfolio workspace for project directories,
extracts metadata from README files, infers technology stacks, and generates
a JSON file with discovered projects.

Usage:
    python discover-projects.py
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Optional

# Technology keywords to match in files
TECH_KEYWORDS = {
    'frontend': [
        'react', 'vue', 'angular', 'svelte', 'html', 'css', 'javascript',
        'typescript', 'nextjs', 'nuxt', 'gatsby', 'gridsome', 'tailwind',
        'bootstrap', 'sass', 'less', 'webpack', 'vite', 'parcel'
    ],
    'backend': [
        'nodejs', 'node.js', 'express', 'fastapi', 'flask', 'django',
        'python', 'java', 'golang', 'rust', 'dotnet', 'csharp',
        'php', 'laravel', 'rails', 'sinatra', 'spring'
    ],
    'database': [
        'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis',
        'firebase', 'supabase', 'dynamodb', 'cassandra'
    ],
    'tools': [
        'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'heroku',
        'git', 'github', 'gitlab', 'jenkins', 'circleci', 'travis'
    ]
}

CATEGORY_KEYWORDS = {
    'frontend': ['react', 'vue', 'angular', 'html', 'css', 'ui', 'design'],
    'fullstack': ['nodejs', 'express', 'api', 'backend', 'database', 'full'],
    'ui': ['design', 'figma', 'ui', 'component', 'storybook']
}

class ProjectDiscovery:
    def __init__(self, workspace_path: str = '.'):
        self.workspace_path = Path(workspace_path)
        self.projects = []
        
    def discover_projects(self) -> List[Dict]:
        """Scan workspace for project directories"""
        print(f"Scanning workspace: {self.workspace_path}")
        
        for item in self.workspace_path.iterdir():
            if item.is_dir() and not item.name.startswith('.'):
                project = self._analyze_project(item)
                if project:
                    self.projects.append(project)
        
        return self.projects
    
    def _analyze_project(self, project_path: Path) -> Optional[Dict]:
        """Analyze a single project directory"""
        readme_path = project_path / 'README.md'
        
        if not readme_path.exists():
            return None
        
        try:
            readme_content = readme_path.read_text(encoding='utf-8', errors='ignore')
        except Exception as e:
            print(f"Error reading {readme_path}: {e}")
            return None
        
        # Extract project info
        project_info = {
            'id': len(self.projects) + 1,
            'title': self._extract_title(project_path.name, readme_content),
            'description': self._extract_description(readme_content),
            'image': self._select_emoji(project_path.name),
            'category': self._infer_category(project_path),
            'technologies': self._detect_technologies(project_path),
            'github': self._extract_github_url(readme_content),
            'live': self._extract_live_url(readme_content),
            'featured': False
        }
        
        return project_info
    
    @staticmethod
    def _extract_title(dir_name: str, readme_content: str) -> str:
        """Extract project title from README or directory name"""
        # Try to find h1 title in README
        h1_match = re.search(r'^#\s+(.+)$', readme_content, re.MULTILINE)
        if h1_match:
            return h1_match.group(1).strip()
        
        # Fallback to directory name, formatted nicely
        return ' '.join(word.capitalize() for word in dir_name.replace('-', ' ').split())
    
    @staticmethod
    def _extract_description(readme_content: str) -> str:
        """Extract project description from README"""
        # Get content between title and next heading
        lines = readme_content.split('\n')
        description_lines = []
        found_title = False
        
        for line in lines:
            if line.startswith('#'):
                if found_title:
                    break
                found_title = True
                continue
            
            if found_title and line.strip() and not line.startswith('#'):
                description_lines.append(line.strip())
            
            if found_title and len(description_lines) >= 2:
                break
        
        description = ' '.join(description_lines).strip()
        return description[:200] if description else 'A great project'
    
    @staticmethod
    def _detect_technologies(project_path: Path) -> List[str]:
        """Detect technologies used in project"""
        techs = set()
        
        # Check for common files
        tech_files = {
            'package.json': ['JavaScript', 'Node.js'],
            'requirements.txt': ['Python'],
            'Gemfile': ['Ruby'],
            'go.mod': ['Go'],
            'Cargo.toml': ['Rust'],
            'pom.xml': ['Java', 'Maven'],
            'build.gradle': ['Java', 'Gradle'],
            'Dockerfile': ['Docker'],
            '.env': ['Environment'],
        }
        
        for filename, technologies in tech_files.items():
            if (project_path / filename).exists():
                techs.update(technologies)
        
        # Check for package.json dependencies
        package_json = project_path / 'package.json'
        if package_json.exists():
            try:
                with open(package_json) as f:
                    pkg = json.load(f)
                    deps = {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}
                    
                    if 'react' in deps:
                        techs.add('React')
                    if 'vue' in deps:
                        techs.add('Vue.js')
                    if 'angular' in deps:
                        techs.add('Angular')
                    if 'express' in deps:
                        techs.add('Express')
                    if 'nextjs' in deps or 'next' in deps:
                        techs.add('Next.js')
                    if 'tailwindcss' in deps:
                        techs.add('Tailwind CSS')
                    if 'typescript' in deps:
                        techs.add('TypeScript')
            except:
                pass
        
        # Check README for mentioned technologies
        readme_path = project_path / 'README.md'
        if readme_path.exists():
            try:
                readme_content = readme_path.read_text().lower()
                for tech in ['React', 'Vue', 'Angular', 'Python', 'Node.js', 'TypeScript', 
                           'JavaScript', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS']:
                    if tech.lower() in readme_content:
                        techs.add(tech)
            except:
                pass
        
        return sorted(list(techs)) if techs else ['Web Project']
    
    @staticmethod
    def _extract_github_url(readme_content: str) -> str:
        """Extract GitHub repository URL from README"""
        github_match = re.search(r'https://github\.com/[\w-]+/[\w.-]+', readme_content)
        return github_match.group(0) if github_match else 'https://github.com'
    
    @staticmethod
    def _extract_live_url(readme_content: str) -> str:
        """Extract live demo URL from README"""
        # Look for common patterns
        url_match = re.search(r'(https?://(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+[^\s\)]*)', readme_content)
        if url_match:
            url = url_match.group(1)
            if 'github' not in url:
                return url
        return 'https://example.com'
    
    @staticmethod
    def _infer_category(project_path: Path) -> str:
        """Infer project category based on tech stack"""
        # Check for common patterns
        if (project_path / 'src').exists():
            return 'frontend'
        
        if any(f.name.startswith('server') or f.name.startswith('api') 
               for f in project_path.iterdir() if f.is_dir()):
            return 'fullstack'
        
        return 'frontend'
    
    @staticmethod
    def _select_emoji(project_name: str) -> str:
        """Select appropriate emoji based on project name"""
        emojis = {
            'ecommerce': '🛍️',
            'shop': '🛍️',
            'store': '🛍️',
            'blog': '📝',
            'task': '✓',
            'todo': '✓',
            'weather': '⛅',
            'fitness': '💪',
            'tracker': '📊',
            'dashboard': '📊',
            'chat': '💬',
            'portfolio': '🎨',
            'design': '🎨',
            'api': '⚙️',
            'tool': '🛠️',
        }
        
        project_name_lower = project_name.lower()
        for keyword, emoji in emojis.items():
            if keyword in project_name_lower:
                return emoji
        
        return '🚀'  # Default emoji
    
    def save_json(self, output_path: str = 'data/discovered-projects.json'):
        """Save discovered projects to JSON file"""
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        data = {'projects': self.projects}
        
        with open(output_file, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"✓ Saved {len(self.projects)} discovered projects to {output_path}")
    
    def print_summary(self):
        """Print discovery summary"""
        print(f"\n{'='*50}")
        print(f"Discovery Summary: Found {len(self.projects)} projects")
        print(f"{'='*50}\n")
        
        for project in self.projects:
            print(f"📦 {project['title']}")
            print(f"   Category: {project['category']}")
            print(f"   Tech: {', '.join(project['technologies'][:3])}")
            print(f"   Description: {project['description'][:60]}...")
            print()


def main():
    """Main entry point"""
    discovery = ProjectDiscovery()
    projects = discovery.discover_projects()
    
    if projects:
        discovery.print_summary()
        discovery.save_json()
    else:
        print("No projects found with README.md files")
        print("Make sure your project directories contain a README.md file")


if __name__ == '__main__':
    main()
