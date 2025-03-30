### Proof of Concept: NX Angular Monorepo with NestJS Backend & MongoDB (Prisma)

#### 1. Create NX Workspace

```sh
npx create-nx-workspace@latest ot-app --preset=angular
```

- Choose `integrated` monorepo
- Application name: `provider`
- Bundler: `webpack`
- Styles: `scss`
- No SSR
- Unit Testing: `jest`
- E2E Testing: `cypress`
- Skip CI & remote caching

#### 2. Generate Additional Applications

```sh
nx generate @nx/angular:app inventory
```

This creates:

```
apps/
  provider/
  provider-e2e/
  inventory/
  inventory-e2e/
```

#### 3. Generate NestJS Backend App

```sh
npm install -D @nx/nest
nx g @nx/nest:application backend
```

#### 4. Setup MongoDB & Prisma

1. Install Prisma & Client:

```sh
npm install -D prisma @prisma/client
```

2. Initialize Prisma:

```sh
npx prisma init
```

This creates:

```
prisma/
  schema.prisma
.env
```

3. Configure `schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
}
```

4. Update `.env`:

```env
DATABASE_URL="mongodb://localhost:27017/ot-app"
```

5. Push to DB:

```sh
npx prisma db push
```

#### 5. Start the NX Backend

```sh
nx serve backend
```

### Status:

✅ NX Workspace with Angular Apps & NestJS Backend
✅ MongoDB Configured with Prisma
✅ Database Schema Pushed

🚀 Ready for API & Frontend Development!
