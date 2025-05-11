This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.








# Dynamic web application - next.js & tailwindcss

A fully functional, performance-optimized web application built using **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **React Query**, structured with modern development standards. This project emphasizes the internal architecture, tools used, modular design, and implementation choices made during the development lifecycle.

---

## 🔧 Project Description (Technical Overview)

This web application demonstrates a modern frontend architecture using:

* **Next.js 14** with App Router and React Server Components for routing, layout, and optimized server-side rendering.
* **TypeScript** for type safety and scalable codebase management.
* **Tailwind CSS** for utility-first, responsive UI styling.
* **React Query (@tanstack/react-query)** for powerful data fetching, caching, and asynchronous state management.
* **Shadcn/ui** library for accessible, pre-built and customizable UI components using Radix UI primitives.
* **Google Maps JavaScript API** embedded via dynamic address parsing for geolocation rendering.
* **Modular structure** using `src/` layout with clearly defined folders: `app/`, `components/`, `lib/`, and `data/`.
* Custom API routes using Next.js' `pages/api/` system for serving local static data (users, posts, comments) as mock backend endpoints.

---

## ⚙️ Setup & Installation

### 1. **Create a new Next.js project**

```bash
npx create-next-app@latest final --typescript --tailwind --eslint
```

**Prompts:**

* Use TypeScript → Yes
* Use ESLint → Yes
* Use Tailwind CSS → Yes
* Use `src/` directory → Yes
* Use App Router → Yes
* Customize import alias → Yes

### 2. **Navigate to project directory**

```bash
cd final
```

### 3. **Install required dependencies**

```bash
npm install @tanstack/react-query
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install clsx
npm install tailwind-merge
npm install lucide-react
```

### 4. **Initialize `shadcn/ui` CLI**

```bash
npx shadcn-ui@latest init
```

**Relevant prompts (others skipped if config detected):**

* Base color → Slate
* CSS variables → Yes
* Tailwind config path → tailwind.config.js
* Component alias → @/components
* Utils alias → @/lib/utils
* React Server Components → Yes

> ⚠️ Note: If `tailwind.config.js` is not created after `npx tailwindcss -p`, manually create it and configure it. Add Tailwind imports in `src/app/globals.css`.

### 5. **Install UI components**

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add skeleton
```

### 6. **Create folder structure**

```bash
mkdir src/data
mkdir src/lib
mkdir src/components
```

### 7. **Create environment file**

We created a file  under the src/app/components named GoogleMapEmbed.tsx with this code to implement the embedding of google map on our project.
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env.local
```

### 8. **Run development server**

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/          # Charting and analytics
│   ├── posts/              # Post listing and detail
│   └── users/              # User profiles and Google Maps integration
├── components/             # UI components (Shadcn and custom)
├── data/                   # Static JSON data (users.json, posts.json, etc.)
├── lib/                    # Utilities: API client (api.ts), Maps helper (maps.ts)
└── app/globals.css         # Tailwind & global styles
```

---

## 📡 API Routes

* `GET /api/users` → Returns all users from `users.json`
* `GET /api/posts` → Returns all posts
* `GET /api/comments` → Returns all comments

Each user has their address dynamically converted to Google Maps embed links for visual rendering.

---

## 👥 Team Contributions

### Lead Developer: **Mark John Ernacio**

* Created and structured the entire Next.js project.
* Installed and configured all required dependencies.
* Implemented data fetching using React Query.
* Integrated Google Maps API dynamically.
* Designed and customized components using Shadcn/ui.
* Created mock API routes and embedded local JSON data.

### Contributor: **Mac Lean Senosin**

* Provided UI testing and usability suggestions.
* Helped verify responsiveness and layout issues.

### Contributor: **Jan Immanuel Ical**

* Assisted in documentation polishing and formatting.
* help Integrated Google Maps API dynamically.

### Contributor: **Dea Gliponeo**

* Participated in brainstorming and gave peer feedback.
* Designed and customized components using Shadcn/ui.
---


---

## 🙌 Acknowledgments

* [Shadcn UI](https://ui.shadcn.com/)
* [Google Maps JavaScript API](https://developers.google.com/maps)
* [TanStack React Query](https://tanstack.com/query/latest)








## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
