# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
这是一个图片压缩工具网站，采用纯前端实现，支持PNG和JPG格式的图片压缩。项目具有苹果风格的UI设计，响应式布局，所有处理在浏览器本地完成。

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Flexbox + Grid for responsive layout
- **Image Processing**: HTML5 Canvas API for image compression
- **File Handling**: FileReader API + Blob API

## File Structure
- `index.html` - Main HTML structure with semantic sections
- `style.css` - Apple-style CSS with responsive design
- `script.js` - Image compression logic and UI interactions
- `README.md` - Chinese documentation with project details

## Key Features
1. Image upload (PNG/JPG only)
2. Real-time compression ratio adjustment (10%-100%)
3. Side-by-side before/after preview
4. File size comparison display
5. Download compressed image
6. Local processing (no server upload)

## Development Commands
No build process required - this is a static site. To run:
- Open `index.html` in browser
- Or serve via HTTP server (recommended for proper file handling)

## Architecture Notes
- **Image Processing Flow**: File upload → FileReader → Image → Canvas → toBlob() → Download
- **Compression Logic**: PNG files are converted to JPEG for compression, quality controlled by range slider
- **State Management**: Module-level variables track originalFile and compressedBlob
- **Event Handling**: Change listeners for file upload and quality slider

## Browser Compatibility
- Modern browsers with Canvas API support
- FileReader API required
- ES6+ features used (const/let, arrow functions, template literals)

## UI Design System
- **Colors**: Apple blue (#007aff), white backgrounds, light gray (#f7f8fa)
- **Spacing**: 8px/16px/24px/32px increments
- **Border Radius**: 8px-18px for rounded corners
- **Shadows**: Subtle shadows (0 2px 8px rgba(0,0,0,0.04-0.08))
- **Typography**: System fonts with -apple-system fallback