# Techbase – User Profile Settings

A full-stack Next.js application for viewing and updating user profile information, built to match the Techbase Figma design spec.

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | Next.js 14 (App Router), React 18 |
| Backend   | Next.js API Routes                |
| Database  | PostgreSQL                        |
| ORM       | Prisma                            |
| Language  | TypeScript                        |
| Styling   | CSS-in-JS (inline styles + CSS variables) |

---

## Project Structure

```
techbase-profile/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script (default user)
├── public/
│   └── uploads/               # Uploaded profile images (auto-created)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── profile/
│   │   │   │   └── route.ts   # GET + PATCH /api/profile
│   │   │   └── upload/
│   │   │       └── route.ts   # POST /api/upload
│   │   ├── settings/
│   │   │   └── page.tsx       # /settings page
│   │   ├── globals.css        # CSS variables + global resets
│   │   ├── layout.tsx         # Root layout (fonts, metadata)
│   │   └── page.tsx           # Redirects / → /settings
│   ├── components/
│   │   ├── Navbar.tsx         # Top navigation bar
│   │   ├── SettingsTabs.tsx   # Profile / Security / Notifications tabs
│   │   ├── ProfileForm.tsx    # The main profile form (fully functional)
│   │   ├── SecurityTab.tsx    # Placeholder
│   │   └── NotificationsTab.tsx # Placeholder
│   └── lib/
│       └── prisma.ts          # Prisma client singleton
├── .env.example               # Environment variable template
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a hosted instance)
- npm or yarn

---

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd techbase-profile
npm install
```

---

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your database URL:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/techbase_profile"
```

> **Tip:** Create the database first if it doesn't exist:
> ```bash
> psql -U postgres -c "CREATE DATABASE techbase_profile;"
> ```

---

### 3. Run Database Migrations

```bash
npx prisma db push
```

This creates the `User` table based on `prisma/schema.prisma`.

---

### 4. Seed the Database (Optional)

Populates the database with a default user matching the Figma design:

```bash
npm run db:seed
```

---

### 5. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — it redirects automatically to `/settings`.

---

## API Reference

### `GET /api/profile`

Returns the current user's profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Oluwole Adigun",
    "email": "techbaseusertest@gmail.com",
    "phoneNumber": "8054975150",
    "address": "95, Oba Iseri Hamar Street, ...",
    "accountType": "Individual",
    "profileImage": null,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

> If no user exists, one is auto-created with default seed data.

---

### `PATCH /api/profile`

Updates the current user's profile.

**Request Body:**
```json
{
  "name": "Oluwole Adigun",
  "email": "techbaseusertest@gmail.com",
  "phoneNumber": "8054975150",
  "address": "95, Oba Iseri Hamar Street, Off Afon Adewale Street, VI Island, Lagos",
  "accountType": "Individual",
  "profileImage": "/uploads/abc123.png"
}
```

**Validation Rules:**
- `name` — required, minimum 2 characters
- `email` — required, must be a valid email format
- `phoneNumber` — optional, 7–15 digits
- `accountType` — optional, defaults to `"Individual"`


---

### `POST /api/upload`

Uploads a profile image file.

**Request:** `multipart/form-data` with field `file`

**Constraints:**
- Accepted types: JPEG, PNG, WebP, GIF
- Max size: 5MB

---

## Features Implemented

### Profile Tab (Fully Functional)
- Form pre-filled from `GET /api/profile` on page load
- Inline field validation (name, email, phone format)
- Profile image upload with preview and size/type validation
- Save via `PATCH /api/profile` with loading state
- Save button disabled while a request is in-flight
- Toast notifications for success and error states
- Changes persist to PostgreSQL via Prisma

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npx prisma db push` | Sync schema to database |
| `npx prisma studio` | Open Prisma visual DB browser |
| `npm run db:seed` | Seed default user |
