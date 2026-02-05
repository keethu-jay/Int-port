# Spline Integration Guide

This project supports **Spline 3D scenes** for professional interactive backgrounds. Each Hero prototype can use either a Spline scene or the built-in Three.js fallback.

## Quick Start

### 1. Export Your Spline Scene

1. Open your scene in the [Spline Editor](https://app.spline.design/)
2. Click **Export** → **Code** → **React**
3. Copy the generated URL (e.g., `https://prod.spline.design/.../scene.splinecode`)

### 2. Add Your Scene URL

Edit `src/config/splineScenes.ts` and paste your URL:

```typescript
export const SPLINE_SCENES = {
  pond: 'https://prod.spline.design/YOUR-POND-SCENE/scene.splinecode',
  fig: 'https://prod.spline.design/YOUR-FIG-SCENE/scene.splinecode',
  meadow: 'https://prod.spline.design/YOUR-MEADOW-SCENE/scene.splinecode',
  gold: 'https://prod.spline.design/YOUR-GOLD-SCENE/scene.splinecode',
  reference: 'https://prod.spline.design/8cf76a7f-428e-4bf7-af91-720754f07596/scene.splinecode',
}
```

### 3. How It Works

- **If a Spline URL is provided**: The Hero component automatically uses the Spline scene
- **If empty**: Falls back to the custom Three.js implementation

## Reference Template

The reference template is already configured:
- **URL**: `https://prod.spline.design/8cf76a7f-428e-4bf7-af91-720754f07596/scene.splinecode`
- **Type**: Parallax Interactive Website - Classic

You can:
- Use it as-is for one of your prototypes
- Study it in Spline to understand the structure
- Use it as a base to create custom scenes matching your color palettes

## Tips for Each Prototype

### Option A: The Lotus Pond
- Create a water surface with ripple effects
- Use colors: Midnight Green (`#105666`), Moss Green (`#839958`), Rosy Brown (`#D3968C`)
- Add interactive elements that respond to mouse movement

### Option B: The Fig & Clay
- Create abstract yarn/string physics simulation
- Use colors: Dried Edamame (`#AEA181`), Wilted Brown (`#A84F3D`), Purple Basil (`#5A4651`)
- Make elements follow the cursor

### Option C: The Wildflower Meadow
- Create a grassy field with procedural elements
- Use colors: Deep Olive, Periwinkle, Chartreuse
- Add particle effects that emit from cursor position

### Option D: The Golden Hour
- Create glowing ember particles
- Use colors: Chestnut (`#480903`), Desert Tan (`#E5D1A4`), Copper (`#B64B12`)
- Make particles swirl around the cursor

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. In Spline, download the `.splinecode` file instead of using the URL
2. Place it in `public/splines/`
3. Update the config to use: `/splines/your-scene.splinecode`

### Scene Not Loading (blank or gray)
- **Community scenes**: Open the scene in Spline (e.g. from the community link), then **Export → Code → React** from your account to get a URL that loads in your app. Using the prod.spline.design URL from the community page sometimes only works after you’ve opened/duplicated the scene.
- Check that the URL is correct and the scene is published/exported in Spline.
- Check the browser console (F12) and Network tab for failed requests or CORS errors.
- If the scene still doesn’t load, **download the .splinecode** from Spline and put it in `public/splines/`, then set the config to `/splines/your-scene.splinecode`.

### Performance
- Spline scenes can be large. Consider optimizing your Spline scenes
- Use the built-in Three.js fallbacks for lighter alternatives
