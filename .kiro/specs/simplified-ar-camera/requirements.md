# Requirements Document

## Introduction

This document specifies the requirements for a simplified AR camera application. The application will be a streamlined version of the existing AR camera app, featuring a single marker-based AR experience with pattern recognition. The system will display animated GIF content when a specific marker pattern is detected by the device camera, along with on-screen guidance for users.

## Glossary

- **AR Camera App**: The augmented reality web application that uses A-Frame and AR.js libraries
- **Marker**: A visual pattern (image) that the camera recognizes to trigger AR content
- **Pattern File**: A .patt file containing the encoded marker pattern data for recognition
- **A-Marker**: An A-Frame HTML element that defines marker detection behavior
- **A-Entity**: An A-Frame HTML element that represents 3D objects or content in the AR scene
- **Msg-Wrapper**: An HTML div element that displays instructional text overlay on the camera view
- **PatternRatio**: A numerical property (0.0-1.0) that defines the ratio of the pattern area within the marker border

## Requirements

### Requirement 1

**User Story:** As a user, I want to view AR content when I point my camera at a marker, so that I can experience augmented reality on my device

#### Acceptance Criteria

1. WHEN THE User opens THE AR Camera App, THE AR Camera App SHALL activate the device camera and display the live camera feed
2. WHEN THE User points the camera at the designated marker, THE AR Camera App SHALL detect the marker pattern and display the associated AR content
3. THE AR Camera App SHALL render AR content as a plane geometry with animated GIF material
4. WHEN the marker is no longer visible to the camera, THE AR Camera App SHALL hide the AR content
5. THE AR Camera App SHALL maintain AR content tracking while the marker remains visible

### Requirement 2

**User Story:** As a developer, I want to configure a single marker with specific pattern recognition settings, so that the AR experience is optimized for the target marker design

#### Acceptance Criteria

1. THE AR Camera App SHALL include exactly one a-marker element in the scene
2. THE AR Camera App SHALL configure the a-marker with type "pattern" and preset "custom"
3. THE AR Camera App SHALL set the patternRatio property to 0.75 for the marker
4. THE AR Camera App SHALL reference a single pattern file (.patt) for marker recognition
5. THE AR Camera App SHALL enable raycaster and event emission for the marker

### Requirement 3

**User Story:** As a user, I want to see on-screen instructions when I open the app, so that I know how to use the AR camera

#### Acceptance Criteria

1. THE AR Camera App SHALL display a msg-wrapper element containing instructional text
2. THE AR Camera App SHALL position the msg-wrapper at the top of the screen
3. THE AR Camera App SHALL style the msg-wrapper with white text and black text shadow for readability
4. THE AR Camera App SHALL maintain the msg-wrapper visibility throughout the AR session
5. THE AR Camera App SHALL display the text "マーカーを　カメラで　見てみよう" in the msg-wrapper

### Requirement 4

**User Story:** As a user, I want to see a visual guide frame when I first open the app, so that I understand where to position the marker

#### Acceptance Criteria

1. WHEN THE User opens THE AR Camera App, THE AR Camera App SHALL display a semi-transparent marker frame overlay
2. THE AR Camera App SHALL center the marker frame overlay on the screen
3. THE AR Camera App SHALL automatically hide the marker frame overlay after 5 seconds
4. THE AR Camera App SHALL use a fade-out animation when hiding the marker frame
5. THE AR Camera App SHALL adapt the marker frame size based on device orientation (portrait or landscape)

### Requirement 5

**User Story:** As a developer, I want to organize the new AR camera app in a separate directory, so that it is isolated from the existing implementation

#### Acceptance Criteria

1. THE AR Camera App SHALL be created in a new subdirectory within the repository
2. THE AR Camera App SHALL include an HTML file as the main entry point
3. THE AR Camera App SHALL reference the existing assets directory for pattern files and GIF content
4. THE AR Camera App SHALL include all necessary script dependencies (A-Frame, AR.js, gesture handlers, GIF shader, jQuery)
5. THE AR Camera App SHALL maintain the same script loading order as the original implementation

### Requirement 6

**User Story:** As a developer, I want to reuse the existing styling and script functionality, so that the new app maintains consistent behavior and appearance

#### Acceptance Criteria

1. THE AR Camera App SHALL include the complete style section from the original implementation
2. THE AR Camera App SHALL include the jQuery script for marker frame fade-out timing
3. THE AR Camera App SHALL configure the a-scene with the same properties (vr-mode-ui, loading-screen, arjs settings)
4. THE AR Camera App SHALL include gesture-detector functionality on the scene
5. THE AR Camera App SHALL set body styling to margin 0 and overflow hidden
