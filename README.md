# Rohit Shrivastava - Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and vanilla JavaScript. Features dark mode toggle, smooth animations, and dynamic project loading.

## Features

✨ **Modern Design**
- Minimalist, clean layout following 2025 web design trends
- Glassmorphism effects with soft shadows
- Responsive design for mobile, tablet, and desktop
- Professional typography (Inter & Poppins fonts)

🌙 **Dark Mode**
- Automatic dark mode toggle
- Persistent theme preference (localStorage)
- System preference detection
- Smooth transitions between themes

🎨 **Animations & Interactions**
- Smooth scroll animations with Intersection Observer
- Micro-interactions on hover
- Floating card effects
- Page transition animations
- Entrance animations for elements

🚀 **Dynamic Projects**
- Auto-discovery of projects from workspace
- Filterable project cards (All, Frontend, Full Stack, UI/UX)
- Project card hover effects with elevation
- Technology tags for each project

📱 **Responsive & Accessible**
- Mobile-first responsive design
- Semantic HTML5 structure
- ARIA labels for accessibility
- Keyboard navigation support
- Focus-visible styling for better UX

🔧 **Technical Features**
- No external UI frameworks (pure CSS)
- Modular, well-commented code
- Optimized performance
- SEO-friendly structure
- Print-friendly styles

## Project Structure

```
portfolio/
├── index.html                 # Main HTML file
├── css/
│   ├── reset.css             # CSS reset and base styles
│   ├── variables.css         # CSS variables and theming
│   └── styles.css            # Main stylesheet
├── js/
│   ├── main.js               # Core functionality (dark mode, nav, scroll)
│   └── projects.js           # Dynamic project loading
├── data/
│   ├── projects.json         # Sample projects data
│   └── discovered-projects.json  # Auto-discovered projects
├── assets/
│   ├── images/               # Image folder
│   └── fonts/                # Custom fonts folder
└── README.md                 # This file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server (optional, for best experience)

### Running Locally

#### Method 1: Direct File Access
Simply open `index.html` in your browser:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

#### Method 2: Using a Local Server (Recommended)

**Python 3:**
```bash
cd portfolio
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Node.js (using http-server):**
```bash
npm install -g http-server
cd portfolio
http-server
```

**VS Code Live Server:**
Install the Live Server extension and click "Go Live" on the index.html file.

## Customization

### Update Personal Information

Edit `index.html`:
- Replace "Rohit Shrivastava" with your name
- Update the tagline and description in the hero section
- Modify contact information and email
- Update social media links
- Adjust timeline entries in the Experience section

### Add Your Projects

Edit `data/projects.json`:
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Your Project Name",
      "description": "Project description",
      "image": "🚀",
      "category": "frontend|fullstack|ui",
      "technologies": ["Tech1", "Tech2"],
      "github": "https://github.com/your-repo",
      "live": "https://your-project.com",
      "featured": true
    }
  ]
}
```

### Customize Colors

Edit `css/variables.css` to change the color scheme:
```css
:root {
  --accent-color: #6366f1;      /* Primary accent color */
  --bg-primary: #ffffff;         /* Main background */
  --text-primary: #1a1a1a;       /* Main text color */
  /* ... more variables ... */
}
```

### Add Custom Fonts

1. Place font files in `assets/fonts/`
2. Update the font imports in `index.html` or `css/styles.css`

## Dark Mode

The portfolio automatically detects system preference (`prefers-color-scheme`) and provides a toggle button. 

- Theme preference is saved to localStorage
- Smooth transitions between light and dark mode
- All colors optimized for readability in both modes

## Project Auto-Discovery

A Python script can be used to automatically discover and scan projects in your workspace:

```bash
python discover-projects.py
```

This will:
1. Scan subdirectories for README.md files
2. Extract project information
3. Detect tech stack from file types
4. Generate `discovered-projects.json`

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ❌ Not supported

## Performance Optimization

- CSS Grid & Flexbox for responsive layouts
- Intersection Observer for lazy animations
- Minimal JavaScript footprint
- Optimized transitions with CSS transforms
- System fonts fallback chain

## Accessibility Features

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus-visible indicators
- Color contrast compliance
- Screen reader friendly

## SEO Optimization

- Semantic HTML with proper heading hierarchy
- Meta tags for description and keywords
- Open Graph tags (can be added)
- Structured data ready
- Clean URL structure
- Mobile-friendly responsive design

## Deployment

### GitHub Pages
1. Push your portfolio to a GitHub repository
2. Go to Settings → Pages
3. Set source to `main` branch
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Set build command: (leave empty)
3. Set publish directory: `.`
4. Deploy!

### Vercel
1. Import your GitHub repository
2. Click Deploy
3. Your site will be live instantly

## File Size & Performance

- HTML: ~15KB
- CSS: ~35KB (all-in-one file)
- JavaScript: ~12KB
- Total: ~62KB (before gzip)
- Gzipped: ~18KB

## License

This portfolio template is free to use and customize for personal projects.

## Contact

For questions or suggestions about this template, feel free to reach out!

## Changelog

### v1.0.0 (Initial Release)
- Complete portfolio website with modern design
- Dark mode toggle functionality
- Responsive mobile design
- Dynamic project loading
- Smooth animations and transitions
- Contact form with validation
- Timeline for experience section

## Tips for Success

1. **Update Content Regularly**: Keep your projects and experience section up-to-date
2. **Add Real Projects**: Replace sample projects with your actual work
3. **Optimize Images**: Use compression tools to reduce image sizes
4. **Mobile Testing**: Test thoroughly on actual mobile devices
5. **Performance**: Monitor Core Web Vitals using Lighthouse
6. **SEO**: Add canonical URLs and Open Graph tags
7. **Analytics**: Consider adding Google Analytics or similar

## Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [Web.dev](https://web.dev)
- [A11y Project](https://www.a11yproject.com)
