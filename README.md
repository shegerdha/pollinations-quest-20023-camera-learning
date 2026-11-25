# Fieldnote

A camera-first field guide for Pollinations quest #20023:
https://github.com/pollinations/pollinations/issues/20023

Fieldnote helps people learn about plants, buildings, everyday objects, and visual details. It runs as a static web app with no build step or server-side key. Users connect their own Pollinations balance with the official polli-connect widget. The widget is limited to openai/gpt-5.4-nano, a $0.05 budget, and a one-day expiry.

## Run locally

Serve this directory over localhost so browser camera access is available:

    python -m http.server 8080

Then open http://localhost:8080.

## Privacy and cost

- The camera opens only after the user presses Open camera.
- A photo stays in browser memory until the user presses Explain this photo.
- The image is resized to a maximum 1280-pixel edge in the browser before it is sent to Pollinations.
- The API key is provided by the official widget and is not written to app storage or logs.
- No API request happens without both a photo and a connected Pollinations key.
- The user can disconnect from the widget at any time.

## Files

- index.html — accessible, bilingual page structure
- styles.css — responsive design and RTL rules
- app.js — camera, image handling, BYOP call, and language toggle
