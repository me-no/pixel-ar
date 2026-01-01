# Implementation Plan

- [x] 1. Create simplified AR application structure
  - [x] 1.1 Create `simple-ar/` directory in repository root
    - _Requirements: 5.1_
  
  - [x] 1.2 Create `simple-ar/index.html` with complete HTML structure
    - Add DOCTYPE declaration and html/head/body tags
    - Add viewport meta tag: `<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">`
    - Add body inline style: `style="margin: 0; overflow: hidden;"`
    - _Requirements: 5.2, 5.5, 6.5_

- [x] 2. Add script dependencies to head section
  - Include A-Frame 1.0.4: `https://aframe.io/releases/1.0.4/aframe.min.js`
  - Include AR.js: `https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js`
  - Include gesture-detector: `https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-detector.js`
  - Include gesture-handler: `https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-handler.js`
  - Include aframe-gif-shader: `../dist/aframe-gif-shader.min.js` (relative path)
  - Include jQuery 2.1.1: `https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js`
  - _Requirements: 5.4, 5.5, 6.2_

- [x] 3. Implement AR scene with camera
  - [x] 3.1 Create a-scene element with configuration attributes
    - Set `vr-mode-ui="enabled: false;"`
    - Set `loading-screen="enabled: false;"`
    - Set `arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"`
    - Set `id="scene"`
    - Set `embedded` attribute
    - Set `gesture-detector` attribute
    - _Requirements: 1.1, 6.3, 6.4_
  
  - [x] 3.2 Add camera entity inside a-scene
    - Create `<a-entity camera></a-entity>`
    - _Requirements: 1.1_

- [x] 4. Implement single marker with AR content
  - [x] 4.1 Create a-marker element for pattern-m08
    - Set `type="pattern"`
    - Set `preset="custom"`
    - Set `url="../assets/pattern-m08.patt"` (relative path from simple-ar/)
    - Set `raycaster="objects: .clickable"`
    - Set `emitevents="true"`
    - Set `cursor="fuse: false; rayOrigin: mouse;"`
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 5.3_
  
  - [x] 4.2 Add a-entity with GIF content inside marker
    - Set `geometry="primitive:plane;"`
    - Set `rotation="-90 0 0"`
    - Set `material="shader:gif;src:url(../assets/m08-outline.gif);opacity:1"` (relative path)
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 5.3_

- [x] 5. Add UI overlay elements
  - [x] 5.1 Create msg-wrapper div after a-scene
    - Set `class="msg-wrapper"`
    - Add paragraph with text: "マーカーを　カメラで　見てみよう"
    - _Requirements: 3.1, 3.2, 3.3, 3.5_
  
  - [x] 5.2 Create marker-frame-wrapper div after msg-wrapper
    - Set `class="marker-frame-wrapper"`
    - Set `id="marker_frame_wrapper"`
    - Add img element with `src="../assets/ar-frame-ex.png"` (relative path)
    - _Requirements: 4.1, 4.2, 5.3_

- [x] 6. Add jQuery fade-out script
  - Create script block after body content
  - Implement `$(document).ready()` with `setTimeout()` at 5000ms
  - Call `$('#marker_frame_wrapper').fadeOut('fast')`
  - _Requirements: 4.3, 4.4, 6.2_

- [x] 7. Add CSS styling
  - [x] 7.1 Create style block with msg-wrapper styles
    - Position absolute, top 3%, left 0, width 90%
    - Display flex with flex-direction column
    - Padding 32px 16px
    - Color white (#fff) with text-shadow 1px 1px 2px black
    - Paragraph margin auto for centering
    - _Requirements: 3.2, 3.3, 3.4, 6.1_
  
  - [x] 7.2 Add marker-frame-wrapper styles
    - Position absolute, top 25%, left/right 0, margin auto
    - Text-align center
    - Image width 80vw, opacity 0.5
    - _Requirements: 4.2, 4.5_
  
  - [x] 7.3 Add landscape media query
    - `@media all and (orientation:landscape)`
    - Marker-frame-wrapper top 15%
    - Image width auto, height 80vh
    - _Requirements: 4.5_

- [ ]* 8. Verify implementation
  - [ ]* 8.1 Test HTML structure and syntax
    - Validate proper nesting of all elements
    - Verify all required attributes are present
    - _Requirements: All_
  
  - [ ]* 8.2 Test asset path resolution
    - Verify pattern file loads from `../assets/pattern-m08.patt`
    - Verify GIF loads from `../assets/m08-outline.gif`
    - Verify frame image loads from `../assets/ar-frame-ex.png`
    - Verify gif-shader loads from `../dist/aframe-gif-shader.min.js`
    - _Requirements: 2.4, 5.3_
