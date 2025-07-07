# Content Production Agency Website

A modern, responsive website for a professional content production agency specializing in video production, influencer collaborations, and creative services across the Middle East.

![Content Production Agency](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)

## 🚀 Features

- **Modern React Architecture** - Built with React 18, Vite, and TypeScript
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - GSAP and Framer Motion for engaging user experience
- **Multi-language Support** - Ready for internationalization
- **Influencer Network** - Showcase and manage influencer profiles
- **Service Portfolio** - Comprehensive service offerings display
- **Studio Showcase** - Equipment and facility highlights
- **Package Management** - Flexible pricing and service packages

## 📋 Services Offered

- **Video Production** - Cinematic videos and commercial content
- **Influencer Collaborations** - Strategic partnerships with authentic voices
- **Creative Strategy** - Data-driven creative solutions
- **Social Media Management** - Full account management and optimization
- **Photography Sessions** - Professional photography for various industries
- **Event Coverage** - High-end event and wedding coverage
- **Podcast Production** - End-to-end podcast creation and distribution
- **TV/Digital Ads** - Commercial production across platforms

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 5.4.2** - Fast build tool and development server
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router DOM 6.26.0** - Client-side routing

### Animation & UX

- **GSAP 3.12.5** - Professional-grade animations
- **Framer Motion 10.16.16** - React animation library
- **Lenis 1.0.42** - Smooth scrolling library
- **Swiper 11.2.10** - Touch slider component

### Development Tools

- **ESLint 9.9.1** - Code linting and formatting
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/content-production-agency.git
   cd content-production-agency
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   └── Footer.jsx      # Footer component
├── contexts/           # React contexts
│   ├── AnimationContext.jsx
│   ├── LanguageContext.jsx
│   └── LenisContext.jsx
├── data/              # Static data and content
│   ├── content.js     # Multi-language content
│   └── influencers.js # Influencer data
├── pages/             # Page components
│   ├── Home.jsx       # Landing page
│   ├── Projects.jsx   # Portfolio showcase
│   ├── Influencers.jsx # Influencer network
│   ├── Services.jsx   # Service offerings
│   ├── Packages.jsx   # Pricing packages
│   └── Studio.jsx     # Studio showcase
├── assets/            # Static assets
│   └── images/        # Image files
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design with smooth animations
- **Responsive Layout** - Optimized for all device sizes
- **Custom Typography** - Professional font choices and hierarchy
- **Color Scheme** - Consistent brand colors and visual identity
- **Interactive Elements** - Engaging hover effects and transitions

## 📱 Pages Overview

### Home

- Hero section with compelling value proposition
- Service highlights and statistics
- Studio showcase preview
- Call-to-action sections

### Projects

- Portfolio gallery with filtering
- Project case studies
- Before/after comparisons
- Client testimonials

### Influencers

- Network of partnered influencers
- Search and filter functionality
- Individual influencer profiles
- Collaboration opportunities

### Services

- Comprehensive service offerings
- Detailed service descriptions
- Process explanations
- Contact forms

### Packages

- Flexible pricing plans
- Feature comparisons
- Custom package options
- Booking integration

### Studio

- Equipment showcase
- Facility highlights
- Technical specifications
- Booking information

## 🌐 Internationalization

The application is built with internationalization in mind, supporting:

- Multiple language support (English/Arabic ready)
- RTL layout support
- Localized content management
- Cultural adaptation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here
```

### Tailwind Configuration

Custom Tailwind configuration in `tailwind.config.js` includes:

- Custom color palette
- Typography settings
- Animation configurations
- Responsive breakpoints

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License

## 📞 Contact

- **Website**: yanas1.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS team for the utility-first CSS framework
- All contributors and team members

---

**Built with ❤️ for the creative industry**
