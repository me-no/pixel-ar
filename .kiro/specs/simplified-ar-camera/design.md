# Design Document

## Overview

The simplified AR camera application is a single-marker AR web experience built with A-Frame and AR.js. The design focuses on creating a minimal, maintainable implementation that demonstrates core AR functionality with one marker-content pair. The application will be housed in a new directory (`simple-ar/`) within the existing repository structure, allowing it to coexist with the multi-marker implementation while sharing common assets.

The application follows a declarative HTML-based approach using A-Frame's entity-component system, with minimal JavaScript for UI timing logic. The design prioritizes simplicity and reusability of existing code patterns.

## Architecture

### Technology Stack

- **A-Frame 1.0.4**: WebVR/WebXR framework providing the entity-component architecture
- **AR.js**: Marker-based AR tracking library for A-Frame
- **aframe-gif-shader**: Custom shader for rendering animated GIF textures
- **jQuery 2.1.1**: DOM manipulation for UI timing effects
- **Gesture handlers**: Touch interaction support for AR content

### Directory Structure

```
pixel-ar/
├── simple-ar/              # New directory for simplified AR app
│   └── index.html          # Main application file
├── assets/                 # Shared assets directory
│   ├── *.patt             # Pattern files
│   ├── *.gif              # Animated content
│   └── ar-frame-ex.png    # Guide frame image
└── dist/                   # Compiled dependencies
    └── aframe-gif-shader.min.js
```

### Component Architecture

The application consists of three main layers:

1. **AR Scene Layer**: A-Frame scene with camera and marker detection
2. **Content Layer**: 3D entities (planes with GIF materials) attached to markers
3. **UI Overlay Layer**: HTML elements for user guidance (msg-wrapper, marker-frame)

## Components and Interfaces

### 1. HTML Document Structure

**Purpose**: Main entry point and container for all application components

**Structure**:
```html
<!doctype html>
<html>
  <head>
    <!-- Meta tags and script dependencies -->
  </head>
  <body>
    <a-scene>
      <!-- AR marker and content -->
    </a-scene>
    <!-- UI overlays -->
  </body>
  <!-- Scripts and styles -->
</html>
```

**Key Attributes**:
- Viewport meta tag for mobile optimization
- Body styling: `margin: 0; overflow: hidden;` for fullscreen camera view

### 2. A-Scene Component

**Purpose**: Root container for the AR experience

**Configuration**:
```html
<a-scene
  vr-mode-ui="enabled: false;"
  loading-screen="enabled: false;"
  arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
  id="scene"
  embedded
  gesture-detector
>
```

**Properties**:
- `vr-mode-ui`: Disabled to prevent VR mode button
- `loading-screen`: Disabled for immediate camera access
- `arjs`: Configured for webcam source with best tracking method
- `embedded`: Allows scene to fit within page layout
- `gesture-detector`: Enables touch gesture handling

### 3. A-Marker Component

**Purpose**: Defines the pattern recognition target and AR content anchor

**Configuration**:
```html
<a-marker
  type="pattern"
  preset="custom"
  url="assets/[pattern-file].patt"
  patternRatio="0.75"
  raycaster="objects: .clickable"
  emitevents="true"
  cursor="fuse: false; rayOrigin: mouse;"
>
  <!-- Child a-entity elements -->
</a-marker>
```

**Key Properties**:
- `type="pattern"`: Uses custom pattern matching (not preset markers)
- `patternRatio="0.75"`: Pattern occupies 75% of marker area (25% border)
- `url`: Path to .patt file (relative to HTML file location)
- `raycaster` & `cursor`: Enable interaction capabilities
- `emitevents`: Allows marker detection events to be captured

**Pattern Ratio Explanation**:
The patternRatio of 0.75 means the actual pattern image occupies 75% of the marker's area, with a 12.5% border on each side. This is optimal for markers with distinct borders and helps improve detection reliability.

### 4. A-Entity Component (AR Content)

**Purpose**: Renders the visual AR content (animated GIF on a plane)

**Configuration**:
```html
<a-entity 
  geometry="primitive:plane;"
  rotation="-90 0 0"
  material="shader:gif;src:url(assets/[gif-file].gif);opacity:1"
></a-entity>
```

**Properties**:
- `geometry`: Plane primitive (flat 2D surface)
- `rotation="-90 0 0"`: Rotates plane to lie flat (horizontal) relative to marker
- `material`: Uses custom GIF shader with source URL and opacity
- Default scale: 1x1 unit (matches marker size)
- Default position: 0,0,0 (centered on marker)

**Coordinate System**:
- X-axis: Left (-) to Right (+)
- Y-axis: Down (-) to Up (+) 
- Z-axis: Into screen (-) to Out of screen (+)
- Rotation of -90° on X-axis makes the plane face upward

### 5. Camera Entity

**Purpose**: Represents the user's viewpoint (device camera)

**Configuration**:
```html
<a-entity camera></a-entity>
```

Simple declaration with default properties. AR.js automatically handles camera positioning and orientation based on device sensors.

### 6. Msg-Wrapper Component

**Purpose**: Displays instructional text overlay

**HTML Structure**:
```html
<div class="msg-wrapper">
  <p>マーカーを　カメラで　見てみよう</p>
</div>
```

**Styling**:
- Position: Absolute, top 3% of viewport
- Width: 90% of viewport
- Padding: 32px vertical, 16px horizontal
- Text: White with black text-shadow for contrast
- Display: Flexbox with centered content

### 7. Marker-Frame-Wrapper Component

**Purpose**: Provides visual guidance for marker positioning

**HTML Structure**:
```html
<div class="marker-frame-wrapper" id="marker_frame_wrapper">
  <img src="./assets/ar-frame-ex.png" />
</div>
```

**Styling**:
- Position: Absolute, centered horizontally and vertically
- Initial opacity: 0.5 (semi-transparent)
- Portrait mode: 80vw width, top 25%
- Landscape mode: 80vh height, top 15%
- Auto-hides after 5 seconds with fade-out animation

**Behavior**:
Controlled by jQuery script that triggers fadeOut after 5000ms delay.

## Data Models

### Pattern File (.patt)

**Format**: Text file containing encoded marker pattern data

**Structure**:
- 16x16 grid of color values for each of 3 color channels (RGB)
- Generated by AR.js marker training tools
- File size: ~5-10KB typically

**Usage**: Referenced by a-marker's `url` attribute

**Selection Criteria for This Implementation**:
Choose one existing pattern file from the assets directory. Recommended options:
- `pattern-ar-cat.patt` (pairs with `ar-cat.gif`)
- `pattern-m08.patt` (pairs with `m08-outline.gif`)
- `pattern-h29-recorder.patt` (pairs with `h29-recorder.gif`)

### GIF Asset

**Format**: Animated GIF image file

**Requirements**:
- Transparent background recommended for better AR integration
- Optimal size: 512x512 or 1024x1024 pixels
- File size: Keep under 2MB for fast loading

**Usage**: Referenced in a-entity's material shader src parameter

## Error Handling

### Camera Access Failure

**Scenario**: User denies camera permission or device has no camera

**Handling**:
- AR.js will display a default error message
- No custom error handling implemented in this simplified version
- Browser's native permission prompt handles user interaction

**Future Enhancement**: Could add custom error messaging in msg-wrapper

### Marker Detection Failure

**Scenario**: Marker not detected or poorly lit environment

**Handling**:
- AR content simply doesn't appear (graceful degradation)
- Msg-wrapper provides persistent instruction
- Marker-frame guide helps with initial positioning

**No explicit error state needed** - absence of AR content is self-explanatory

### Asset Loading Failure

**Scenario**: Pattern file or GIF fails to load

**Handling**:
- A-Frame's loading system will log errors to console
- Application continues to run but marker won't trigger content
- No user-facing error message in this simplified version

**Prevention**:
- Use relative paths from HTML file location
- Verify asset files exist before deployment
- Test with browser developer tools network tab

### Script Loading Failure

**Scenario**: CDN-hosted libraries fail to load

**Handling**:
- Application will not initialize properly
- Browser console will show script errors
- No fallback mechanism in this simplified version

**Mitigation**:
- Use reliable CDNs (aframe.io, githack.com)
- Consider hosting critical scripts locally for production

## Testing Strategy

### Manual Testing Checklist

**Device Testing**:
1. Test on mobile devices (iOS Safari, Android Chrome)
2. Test on desktop browsers with webcam (Chrome, Firefox, Edge)
3. Verify camera permission prompts appear correctly
4. Test in various lighting conditions

**Marker Detection Testing**:
1. Print marker pattern at various sizes (5cm, 10cm, 15cm)
2. Test detection distance (10cm to 100cm from camera)
3. Test detection angles (0° to 45° tilt)
4. Verify AR content appears and tracks smoothly
5. Test marker loss and re-detection

**UI Testing**:
1. Verify msg-wrapper appears on load
2. Verify marker-frame appears and fades after 5 seconds
3. Test responsive layout in portrait and landscape
4. Verify text readability on various backgrounds

**Cross-Browser Testing**:
1. iOS Safari (primary mobile target)
2. Android Chrome (primary mobile target)
3. Desktop Chrome (development/testing)
4. Desktop Firefox (compatibility check)

### Automated Testing

**Not implemented in this simplified version**

Rationale: The application is primarily visual and interaction-based, making automated testing complex. Manual testing is more practical for this scope.

**Future Consideration**: Could add:
- Unit tests for jQuery timing logic
- Integration tests for A-Frame scene initialization
- Visual regression tests for UI components

### Performance Testing

**Metrics to Monitor**:
1. Frame rate (target: 30+ FPS on mobile)
2. Initial load time (target: under 3 seconds on 4G)
3. Camera initialization time (target: under 2 seconds)
4. Marker detection latency (target: under 500ms)

**Tools**:
- Browser DevTools Performance tab
- AR.js debug mode (enable `debugUIEnabled: true` temporarily)
- Mobile device remote debugging

### Validation Testing

**HTML Validation**:
- Run through W3C HTML validator
- Verify no syntax errors

**Asset Validation**:
- Verify pattern file format is correct
- Verify GIF file plays correctly
- Verify all asset paths resolve correctly

**Accessibility Testing**:
- Verify text contrast ratios meet WCAG standards
- Test with screen readers (limited AR support expected)
- Verify touch targets are adequately sized

## Implementation Notes

### Asset Selection

For the initial implementation, recommend using:
- **Pattern**: `pattern-m08.patt` (simple, high-contrast design)
- **GIF**: `m08-outline.gif` (clean animation, good visibility)

These assets are proven to work well in the existing implementation and have good detection characteristics.

### Directory Naming

The new directory will be named `simple-ar/` to clearly distinguish it from the main multi-marker implementation while maintaining consistency with the repository naming convention.

### Code Reuse Strategy

The design maximizes code reuse by:
1. Copying the complete `<style>` block from index.html
2. Copying the jQuery script block verbatim
3. Using identical script dependency loading
4. Referencing shared assets via relative paths (`../assets/`)

### PatternRatio Configuration

The patternRatio of 0.75 is specifically chosen because:
1. It matches common marker generation tools' default output
2. It provides good balance between pattern detail and border space
3. It improves detection reliability in varied lighting
4. It's consistent with AR.js best practices

### Responsive Design

The application adapts to device orientation through CSS media queries:
- Portrait: Optimizes for vertical phone holding
- Landscape: Adjusts frame size and position for horizontal viewing

This ensures good UX regardless of how the user holds their device.
