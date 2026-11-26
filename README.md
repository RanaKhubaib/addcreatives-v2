# ADD Creatives website

The site is built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and
Lucide icons. Public pages include Home, Services, About, Contact, Case Studies,
and the Journal. Service, case-study, and article detail pages are generated
from the data files in `src/data`.

## Run locally

1. Install Node.js LTS.
2. In a terminal, open this folder and run `npm install`.
3. Run `npm run dev`.
4. Open <http://localhost:3000>.

Run `npm run lint` and `npm run build` before deploying.

## Update site content

- Business details, navigation, WhatsApp number, and services: `src/data/site-config.ts`
- Sample articles and illustrative case-study concepts: `src/data/sample-content.ts`
- Illustrative stock photography is stored in `public/images`; replace it with
  approved, properly licensed ADD Creatives and client imagery before launch.
  The photos are not ADD Creatives staff, client work, or campaign results.
- The official logo and approved letterhead details have not been supplied yet.
  Replace the text wordmark or update the relevant business details only after
  the owner provides the approved brand files and confirms the contact details.
- Replace the clearly labelled sample case studies with approved client work
  before launch. Do not present sample concepts as completed client results.
- Social links are empty until real profile URLs are supplied.

## Contact submissions

The selected setup is email plus Firestore, with enquiries addressed to
`info@addcreatives.com`. Copy `.env.example` to `.env.local` and configure both
delivery methods before accepting live submissions:

- **Email:** Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
  and optionally `CONTACT_FROM_NAME`. `CONTACT_TO_EMAIL` is prefilled with the
  selected receiving inbox. Gmail requires a Google App Password; never use
  your regular Gmail password. Keep the password only in `.env.local` or your
  deployment provider's secret settings.
- **Firestore:** Set `FIREBASE_ADMIN_PROJECT_ID`,
  `FIREBASE_ADMIN_CLIENT_EMAIL`, and `FIREBASE_ADMIN_PRIVATE_KEY` using a
  Firebase service account. Keep the private key secret. Submissions are stored
  in the `contactSubmissions` collection.

If both methods are configured, each enquiry is sent by email and stored in
Firestore. The endpoint validates input, uses a honeypot field, and limits
requests in memory. Configure durable rate limiting before high-volume
production use, since serverless instances do not share memory.

For an initial launch before Firebase is ready, SMTP alone can deliver
enquiries by email. Firestore storage starts after its server credentials are
added.

The public WhatsApp button uses the number in `src/data/site-config.ts`.

## Firebase sign-in and the admin area

Sign-in and sign-up are currently hidden from the public navigation and
excluded from search indexing. Their routes and Firebase integration remain
available for when you are ready to enable them.

The sign-in and sign-up pages support Google and email/password through
Firebase Authentication. Add the six `NEXT_PUBLIC_FIREBASE_*` web app values
from the Firebase console, enable Google and Email/Password sign-in, and add
the admin's email to `NEXT_PUBLIC_ADMIN_EMAILS`.

Publish `firestore.rules` to the Firestore Rules tab. After the admin signs up
once, use the Firebase console to change that account's `users/{uid}` document
to `role: "admin"`. The admin interface uses Firestore rules for authorization;
the email list only controls the user interface.

The admin area can create, edit, publish, and delete blog posts and case
studies. The public pages read published records from the `posts` and
`caseStudies` collections when Firebase Admin credentials are configured;
sample content is used if Firestore is empty or unavailable.

## Deploy

### Publish to GitHub

1. Create a new, empty repository on GitHub. Do not initialize it with a README,
   `.gitignore`, or license; this project already has those files.
2. In a terminal opened at the project folder, review `git status` and confirm
   that `.env.local` and any credentials are not listed.
3. Stage and commit the project:

   ```sh
   git add .
   git commit -m "Prepare ADD Creatives website"
   ```

4. Rename the local branch and connect the empty GitHub repository (replace the
   URL with the one GitHub shows for your new repository):

   ```sh
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/addcreatives-site.git
   git push -u origin main
   ```

`.env.local` is ignored by Git; `.env.example` is safe to publish. Never commit
SMTP passwords or Firebase service-account credentials.

### Deploy to Vercel

1. Sign in to Vercel with GitHub and choose **Add New → Project**.
2. Import the repository you just pushed. Keep the root directory as `./` and
   let Vercel detect Next.js and use the default build settings.
3. Deploy with the default settings. Vercel will give the site a
   `*.vercel.app` URL.
4. In **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to that
   public URL, then redeploy. If you connect a custom domain later, update this
   value to the custom URL and redeploy again.
5. To use your own domain, add it under **Settings → Domains** and follow
   Vercel’s DNS instructions.
6. Add contact-delivery variables in Vercel and redeploy before accepting
   enquiries. SMTP settings enable email delivery; Firestore storage needs the
   `FIREBASE_ADMIN_*` settings. Without either provider, the form cannot deliver
   submissions. Firebase sign-in/admin variables can be added later.
