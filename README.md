# A/B Testing Simulator for E-commerce

A clean, dependency-free web app for planning and reviewing A/B tests for an e-commerce business.

## What this project does

This simulator helps a user:
- choose an e-commerce metric such as conversion rate, add-to-cart rate, checkout completion rate, revenue per visitor, average order value, or repeat purchase rate
- review recommended guardrail metrics
- estimate required sample size and test duration
- check observed results using a significance-style calculation

## Files in this project

- `index.html` — page structure
- `styles.css` — UI styling
- `script.js` — experiment logic and interactivity
- `.gitignore` — ignores common system files
- `README.md` — setup, GitHub, and Vercel instructions

## Run locally

Because this is a static project, you can simply open `index.html` in your browser.

For a cleaner local workflow, you can also use VS Code with the Live Server extension.

## How to upload this project to GitHub

### Option 1 — easiest way using GitHub website

1. Download this project folder.
2. Unzip it on your laptop.
3. Go to GitHub and sign in.
4. Click **New repository**.
5. Enter a repository name such as `ab-testing-simulator`.
6. Keep it **Public** if you want an easy shareable demo link, or **Private** if you want to restrict access.
7. Click **Create repository**.
8. Open the new repository.
9. Click **uploading an existing file**.
10. Drag all project files into the upload area.
11. Scroll down and click **Commit changes**.

### Option 2 — using Git on your laptop

Run these commands from inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit for A/B testing simulator"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ab-testing-simulator.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## How to deploy on Vercel using GitHub

1. Sign in to Vercel.
2. Click **Add New** and then **Project**.
3. Choose **Continue with GitHub** if your GitHub is not already connected.
4. Import the repository you just created.
5. Vercel will detect that this is a static front-end project.
6. Because this project is plain HTML, CSS, and JavaScript, you do not need to set a build command.
7. Click **Deploy**.
8. Wait for deployment to finish.
9. Vercel will generate a live URL.

## How to share the link

After deployment:

1. Open the project inside Vercel.
2. Copy the production domain shown on the dashboard.
3. Share that URL directly.

If you make updates later:

1. Push changes to GitHub.
2. Vercel will automatically create a new deployment.
3. Your production URL can stay the same, while Vercel also creates preview deployment URLs for changes.

## Good next upgrades

You can extend this version with:
- charts for traffic and power curves
- save and export scenarios
- one-sided vs two-sided test selection
- multiple-treatment support
- experiment notes and stakeholder summary export
