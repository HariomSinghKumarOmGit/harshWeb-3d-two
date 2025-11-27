# 🎮 Interactive 3D MVP Launcher/Game Hybrid Web App

A stunning interactive web application combining a layered UI with an immersive 3D Minecraft-inspired world featuring animated characters, environmental interactions, and dynamic day/night cycles.

![Project Banner](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 UI Layer (Layer 1)
- **3-Column Grid Layout**: Responsive 1/5 - 3/5 - 1/5 split
- **Left Navigation**: Home, Version, Server, Explore, News, Store
- **Right Panel**: Login/Profile system and Friend list with online/offline status
- **Settings Panel**: Profile name, volume control, theme toggle (dark/light)
- **Footer Network Bar**: Real-time server status, ping display, network info
- **Glassmorphism Design**: Modern frosted glass effects with backdrop blur

### 🌍 3D World Layer (Layer 2)
- **Minecraft-Style Steve Character**:
  - Low-poly cube-based procedural model
  - Scroll-triggered animations (arm raise, scale up)
  - Idle breathing and arm sway animations
  
- **Interactive Wolf Character**:
  - Cursor-following head rotation with smooth interpolation
  - Idle tail wag animation
  - Bone feeding interaction (hearts + username display)
  
- **Interactive Objects**:
  - 🍎 **Apples**: Click for "+1 💎" floating feedback
  - 🐝 **Bees**: Click to trigger buzz feedback (expandable to mini UI cards)
  - 🦴 **Bones**: Draggable for wolf interaction
  
- **Environment**:
  - Low-poly mountains in background
  - Animated drifting clouds
  - Scattered colorful flowers
  - Textured ground plane
  
- **Day/Night Cycle**:
  - Animated directional sun moving in arc across sky
  - Dynamic sky color transitions (blue → dark)
  - Adjusting ambient and directional lighting
  - 60-second auto-loop cycle

### 🎯 Interactions
- **Scroll**: Triggers Steve's arm raise and scale animations
- **Cursor Movement**: Wolf's head tracks cursor position
- **Click Events**: Interactive objects provide visual feedback
- **Camera**: Parallax effect with limited orbital controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to project directory**:
   ```bash
   cd /Users/hariomsingh/Desktop/harshMineFront/3d-launcher-app
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173`

## 🎮 How to Use

### Testing Interactions

1. **Scroll Animation**:
   - Use your mouse wheel to scroll up/down
   - Watch Steve raise his arms and scale up
   - Stop scrolling to see idle breathing animation resume

2. **Cursor Tracking**:
   - Move your mouse cursor around the screen
   - Observe the wolf's head smoothly following your cursor
   - Notice the smooth interpolation (lerp) effect

3. **Object Interactions**:
   - Click on red apples to see "+1 💎" floating text
   - Click on bees to trigger buzz feedback
   - Click on bones for wolf interaction feedback

4. **Day/Night Cycle**:
   - Wait and observe the sun moving across the sky
   - Watch the sky color transition from day (blue) to night (dark)
   - Notice lighting intensity changes
   - Full cycle completes in 60 seconds

5. **UI Features**:
   - Navigate using left sidebar buttons
   - Adjust volume in settings panel
   - Toggle theme (dark/light)
   - Login with any username
   - View friend list with status indicators

## 📁 Project Structure

```
3d-launcher-app/
├── src/
│   ├── components/
│   │   ├── layout/          # UI Layer components
│   │   │   ├── Layout.tsx   # Main 3-column grid
│   │   │   ├── LeftNav.tsx  # Navigation sidebar
│   │   │   ├── RightPanel.tsx # Profile & friends
│   │   │   └── FooterBar.tsx  # Network status bar
│   │   ├── ui/              # UI elements
│   │   │   ├── Settings.tsx
│   │   │   ├── FriendList.tsx
│   │   │   ├── LoginProfile.tsx
│   │   │   └── FloatingFeedback.tsx
│   │   └── world/           # 3D World components
│   │       ├── World.tsx    # Main Canvas container
│   │       ├── Steve.tsx    # Steve character
│   │       ├── Wolf.tsx     # Wolf character
│   │       ├── InteractiveObjects.tsx
│   │       ├── Environment.tsx
│   │       └── DayNightCycle.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollAnimation.ts
│   │   ├── useCursorTracking.ts
│   │   └── useDayNight.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── tailwind.config.js       # TailwindCSS config
├── postcss.config.js        # PostCSS config
└── package.json             # Dependencies
```

## 🛠️ Technologies Used

- **React 18+**: UI framework with functional components and hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **React-Three-Fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for R3F
- **Three.js**: 3D graphics library
- **Framer Motion**: Animation library
- **TailwindCSS**: Utility-first CSS framework

## 🎨 Customization

### Replacing 3D Models

The current implementation uses procedurally generated low-poly models. To replace with custom GLTF/GLB models:

1. Place your `.glb` or `.gltf` files in `public/models/`
2. Use `@react-three/drei`'s `useGLTF` hook:
   ```tsx
   import { useGLTF } from '@react-three/drei';
   
   const { scene } = useGLTF('/models/steve.glb');
   return <primitive object={scene} />;
   ```

### Adjusting Day/Night Cycle Speed

Edit `src/hooks/useDayNight.ts`:
```typescript
// Change cycle duration (in milliseconds)
export const useDayNight = (cycleDuration: number = 60000) => {
  // 60000 = 60 seconds
  // 120000 = 2 minutes
  // etc.
```

### Customizing Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  minecraft: {
    grass: '#7CBD3A',    // Change these values
    dirt: '#8B6F47',
    stone: '#7F7F7F',
    sky: '#87CEEB',
    night: '#0A1628',
  },
}
```

## 🔧 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📝 Future Enhancements

- [ ] Implement bone drag-and-throw physics for wolf
- [ ] Add mini UI card system for bee clicks
- [ ] Integrate actual HDRI environment maps
- [ ] Add sound effects and background music
- [ ] Implement multiplayer features
- [ ] Add more interactive objects and characters
- [ ] Create game mechanics (inventory, crafting, etc.)
- [ ] Add particle systems for enhanced visual effects
- [ ] Implement post-processing effects (bloom, SSAO)

## 🐛 Known Issues

- `handleFeed` function in Wolf component is prepared but not yet connected to bone interaction
- Text rendering for username display uses placeholder sphere (needs @react-three/drei Text component)
- Day/night HDRI environment uses fog/background color instead of actual HDRI textures

## 📄 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ using React, Three.js, and TailwindCSS**
