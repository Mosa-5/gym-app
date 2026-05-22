# GymGear

A full-stack e-commerce web application for gym equipment and apparel.

**Live demo:** [https://gym-app-7y5y.vercel.app/](https://gym-app-7y5y.vercel.app/)

---

## Features

- Product browsing with search, filtering (price range, category), and sorting
- Shopping cart with quantity controls, persisted to `localStorage`
- Order placement and per-order detail pages
- Product reviews with star ratings, likes, and write-review dialog
- User authentication (sign up, sign in, guest account)
- Profile management — name, username, phone, address, avatar upload
- Wishlist
- Dark / light mode
- English and Georgian (`en` / `ka`) language support with URL-persisted `?lang=` param
- Fully responsive — mobile, tablet, laptop (125% zoom), and 1920×1080 desktop

---

## Tech Stack

| Layer               | Technology                                           |
| ------------------- | ---------------------------------------------------- |
| Framework           | React 18                                             |
| Language            | TypeScript 5.6                                       |
| Build Tool          | Vite 6                                               |
| Styling             | Tailwind CSS 3                                       |
| Backend / DB        | Supabase (PostgreSQL)                                |
| Auth                | Supabase Auth                                        |
| State (server)      | TanStack React Query v5                              |
| State (client)      | React Context API                                    |
| Routing             | React Router DOM v7                                  |
| Forms               | React Hook Form + Zod                                |
| Animations          | Framer Motion                                        |
| i18n                | i18next + react-i18next                              |
| UI Components       | shadcn/ui (Radix UI primitives)                      |
| Icons               | Lucide React                                         |
| Toast notifications | Sonner                                               |
| Carousel            | Embla Carousel                                       |
| Virtualization      | TanStack Virtual                                     |
| Theme               | next-themes                                          |
| Class utilities     | CVA (class-variance-authority), clsx, tailwind-merge |
| Linting             | ESLint + typescript-eslint                           |
| Formatting          | Prettier                                             |
| Git Hooks           | Husky                                                |
| Image Optimization  | vite-plugin-image-optimizer + sharp + svgo           |
| CI                  | GitHub Actions (keep-supabase-alive workflow)        |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Installation

```bash
git clone https://github.com/your-username/gym-app.git
cd gym-app
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Both values are found in your Supabase project under **Settings → API**.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

TypeScript is checked as part of the build (`tsc -b && vite build`). Run the check standalone with:

```bash
npm run ts-check
```

### Preview production build

```bash
npm run preview
```

### Lint / format

```bash
npm run lint
npm run format
```

### Regenerate Supabase types

```bash
npm run generate-supabase-types
```

Requires the Supabase CLI to be installed and authenticated. Updates `src/supabase/supabase.types.ts` from the live schema.

---

## CI / GitHub Secrets

The project includes a GitHub Actions workflow (`.github/workflows/keep-supabase-alive.yml`) that pings the Supabase `products` table every Monday at 9 AM UTC to prevent the free-tier project from pausing due to inactivity.

Add these secrets to your GitHub repository under **Settings → Secrets and variables → Actions**:

| Secret                     | Value                                                    |
| -------------------------- | -------------------------------------------------------- |
| `SUPABASE_URL`             | `https://your-project-id.supabase.co`                    |
| `SUPABASE_PUBLISHABLE_KEY` | your publishable key from Supabase → Settings → API Keys |

---

## Project Structure

```
src/
  assets/            Static assets (images, SVGs)
  componentsShadcn/  shadcn/ui components + theme provider
  context/           React Context (AuthContext, CartContext)
  convenienceTools/  ScrollToTop and other small utilities
  i18n/              i18next config + locale JSON files (en, ka)
  layouts/           DashboardLayout, AuthLayout
  pages/             Thin page-level wrappers (lazy loaded)
  pageComponents/    Section-level components grouped by page
    forHome/
    forAbout/
    forProducts/
    forSingleProductPage/
    forProfilePage/
    header/
    footer/
    menuCart/
    logIn/
    register/
    route-guards/
    idOrder/
    loader/
  reactQuery/        TanStack React Query hooks
    query/           useQuery hooks per domain
    mutations/       useMutation hooks per domain
  supabase/          Raw Supabase client calls grouped by domain
```

---

## Pages

| Route                          | Page           | Auth required      |
| ------------------------------ | -------------- | ------------------ |
| `/dashboard/main`              | Home           | No                 |
| `/dashboard/products`          | Shop           | No                 |
| `/dashboard/productDetail/:id` | Product Detail | No                 |
| `/dashboard/cartPage`          | Cart           | No                 |
| `/dashboard/about`             | About          | No                 |
| `/dashboard/profilePage`       | Profile        | Yes                |
| `/dashboard/orders/:OrderId`   | Order Detail   | No                 |
| `/auth/signIn`                 | Sign In        | Redirect if authed |
| `/auth/register`               | Register       | Redirect if authed |

---

## Supabase Schema

| Table          | Purpose                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------- |
| `product`      | Product catalogue (name, price, category, description, image_url[], sales_number)           |
| `profiles`     | User profile data (full_name_en, full_name_ka, username, phone_number, address, avatar_url) |
| `reviews`      | Product reviews (user_id, product_id, rating, comment, like_count)                          |
| `review_likes` | Join table tracking which users liked which reviews                                         |
| `orders`       | User orders (user_id, items JSON, total_price, status, created_at)                          |
| `wishlist`     | Wishlisted products per user (user_id, product_id)                                          |

RPC functions:

- `increment_like_count(review_id)` — increments `like_count` on a review
- `decrement_like_count(review_id)` — decrements `like_count` on a review

Storage buckets:

- `product_images` — public bucket for product photos
- `avatars` — public bucket for user avatars, scoped per user ID (`{userId}/avatar`)
