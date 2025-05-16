
# 🌐 Dynamic Web Application – WebTech Final Project

A modern, responsive social networking web application built using **Next.js 14**, **Tailwind CSS**, and **React Query**, with mock data APIs and Google Maps integration.

## 🚀 Project Description

This full-stack web application simulates a dynamic social platform featuring:

- User profiles
- Dynamic posts and comments
- Embedded Google Maps for user location visualization

It uses **Next.js App Router** and **React Query** for client-side data fetching and caching. The backend is simulated through local JSON data served via custom API routes (e.g., `/api/users`, `/api/posts`).

The UI is styled using **Tailwind CSS** with component support from **shadcn/ui**. The design is responsive and supports dark mode.

### 🌍 Google Maps Integration

User location is derived from profile addresses and displayed on an interactive map using embedded coordinates.

## 📁 Project Structure

```
app/         → Route-based pages (e.g., /users, /posts)
components/  → Reusable UI components (cards, buttons, etc.)
data/        → Static JSON data (users, posts, comments)
lib/         → API helpers, map logic, and config
```

## 🛠️ Setup & Installation

1. **Install Node.js (LTS)**  
   Download and install from [https://nodejs.org/en](https://nodejs.org/en).

2. **Verify Installation**

   ```bash
   node -v
   npm -v
   ```

3. **Create Next App**

   ```bash
   npx create-next-app@latest your-project-name
   ```

   During setup, choose:

   - TypeScript: **Yes**
   - ESLint: **Yes**
   - Tailwind CSS: **Yes**
   - Use `src/` directory: **Yes**
   - App Router: **Yes**
   - Import alias: **No**

4. **Install Required Packages**

   ```bash
   npm install @tanstack/react-query react react-dom \
   @radix-ui/react-label @radix-ui/react-slot \
   class-variance-authority clsx lucide-react tailwind-merge
   ```

5. **Initialize shadcn/ui**

   Scaffold reusable components using the [shadcn/ui CLI](https://ui.shadcn.com/).

6. **Configure Tailwind CSS**

   If missing, manually add `tailwind.config.js` and `postcss.config.js`.

   Ensure `globals.css` includes:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

7. **Google Map Embed**

   A `GoogleMapEmbed.tsx` component was added to `src/app/components/` to display dynamic maps using address data.

8. **Run the App**

   ```bash
   npm run dev
   ```

## 👨‍💻 Team Members & Contributions

- **Mark John Ernacio** – *Lead Developer*  
  Project setup, full implementation, UI, API routes, and Google Maps integration.

- **Mac Lean Senosin** – *Testing & Feedback*  
  Assisted with device testing, responsiveness, and UI feedback.

- **Jan Immanuel Ical** – *Research & Theme*  
  Contributed visual references and ensured cultural relevance to Sorsogon.

- **Dea Gliponeo** – *Documentation*  
  Reviewed and improved technical documentation.

## 🌐 Live Demo

👉 [Visit the Deployed Site](https://webtechfinals-zeta.vercel.app/)

## 📄 License

This project is for academic purposes under the College of Information and Communications Technology, Sorsogon State University – Bulan Campus.
......