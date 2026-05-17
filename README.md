# Robichip Official Website

This repository contains the source code for the Robichip official website.  The entire site is contained in the file `index.html`, which includes all of the markup and styling.  The site is written in HTML with inline CSS.

## Contents

- **index.html** – the single‑page website for Robichip.  It contains the full layout, styles, and content.
- **README.md** – this file with instructions.

## Usage

To publish this website via GitHub Pages:

1. Create a new repository on GitHub (e.g. `robichip.github.io`).
2. Copy the contents of this directory into your new repository.  Ensure that `index.html` is at the root of the repository.
3. Commit and push the files to GitHub.
4. Enable **GitHub Pages** in the repository settings, choosing the branch (e.g. `main`) and the `/ (root)` folder.
5. After a few minutes, your site should be available at `https://<username>.github.io/`.

### Image Assets

The `index.html` references several images hosted on Google Drive.  For long‑term reliability, consider downloading those images, storing them in an `assets/` folder, and updating the `src` attributes in the HTML accordingly.

## Notes

- This repository intentionally keeps the structure simple; no additional build tools or dependencies are required.
- Feel free to edit the HTML content to reflect updates, translations, or new product information.
