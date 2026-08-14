# Technical Reference — Database & Schemas

## Database Engine
- **Engine**: MongoDB
- **ODM**: Mongoose v9.9.2

## Mongoose Schemas (15 Collections)

### 1. `User` Collection (`users`)
- `name`: String (Required)
- `email`: String (Required, Unique, Lowercase)
- `password`: String (Required, Encrypted with bcrypt)
- `role`: Enum `["SUPER_ADMIN", "ADMIN", "EDITOR"]` (Default: `"ADMIN"`)
- `status`: Enum `["ACTIVE", "INACTIVE"]` (Default: `"ACTIVE"`)
- `avatar`: String
- `timestamps`: True

### 2. `SiteSettings` Collection (`sitesettings`)
- `siteName`: String (Default: `"DIGITAL THREE"`)
- `tagline`: String
- `description`: String
- `heroHeading`: String
- `heroSubheading`: String
- `contactEmail`: String
- `contactPhone`: String
- `address`: String
- `seo`: `{ metaTitle, metaDescription, keywords: [String], siteUrl, ogImage }`
- `stats`: `{ projectsCompleted, satisfiedClients, teamExperts, yearsExperience }`

### 3. `Portfolio` Collection (`portfolios`)
- `title`: String (Required)
- `slug`: String (Required, Unique)
- `client`: String
- `category`: String
- `description`: String
- `fullDescription`: String
- `thumbnail`: String
- `gallery`: `[String]`
- `technologies`: `[String]`
- `featured`: Boolean
- `published`: Boolean
- `order`: Number

### 4. `Service` Collection (`services`)
- `title`: String, `slug`: String (Unique), `description`: String, `icon`: String, `features`: `[String]`, `order`: Number, `published`: Boolean.

### 5. `BlogPost` Collection (`blogposts`)
- `title`: String, `slug`: String (Unique), `excerpt`: String, `content`: String, `thumbnail`: String, `category`: String, `author`: String, `status`: Enum `["DRAFT", "PUBLISHED", "ARCHIVED"]`, `publishedAt`: Date.

### 6. `ContactMessage` Collection (`contactmessages`)
- `name`: String, `email`: String, `company`: String, `phone`: String, `service`: String, `budget`: String, `message`: String, `status`: Enum `["NEW", "READ", "REPLIED", "ARCHIVED"]`.

### 7. `ActivityLog` Collection (`activitylogs`)
- `userId`: String, `userName`: String, `action`: String, `module`: String, `details`: String, `createdAt`: Date.

### 8. Additional Collections
- `Technology`, `ProcessStep`, `Testimonial`, `TeamMember`, `PricingPlan`, `FAQ`, `Media`, `PageVisit`.
