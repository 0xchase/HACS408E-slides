import { defineSlidevConfig } from '@slidev/cli'

export default defineSlidevConfig({
  // Cursor/VSCode Dark Theme
  theme: 'default',
  background: '#1e1e1e',
  
  // Drawing configuration
  drawings: {
    persist: false
  },
  
  // Slide transitions
  transition: 'slide-left',
  
  // Enable MDC Syntax
  mdc: true,
  
  // Configure syntax highlighting theme to match Cursor
  highlighter: 'shiki',
  shikiTheme: {
    dark: 'github-dark',
    light: 'github-light'
  },
  
  // Color scheme configuration
  colorSchema: 'dark',
  
  // UnoCSS theme configuration for Cursor/VSCode dark theme
  themeConfig: {
    primary: '#007acc',
    dark: '#1e1e1e'
  },
  
  // Global CSS file for logo and styling
  css: './style.css'
})
