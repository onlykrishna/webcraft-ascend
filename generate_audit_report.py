"""
Scalvicon – Complete Project Audit Report Generator  (Phase 1 + Phase 2)
Generates a fully formatted Word (.docx) document.
Run: python3 generate_audit_report.py
"""

from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import datetime

# ─── Colour palette ───────────────────────────────────────────────────────────
C_DARK_BG    = RGBColor(0x0D, 0x16, 0x1F)
C_PRIMARY    = RGBColor(0x00, 0xE5, 0xA0)
C_WHITE      = RGBColor(0xFF, 0xFF, 0xFF)
C_LIGHT_GREY = RGBColor(0xF5, 0xF5, 0xF5)
C_TEXT       = RGBColor(0x1A, 0x1A, 0x2E)
C_RED        = RGBColor(0xC0, 0x39, 0x2B)
C_ORANGE     = RGBColor(0xE6, 0x7E, 0x22)
C_YELLOW     = RGBColor(0xF3, 0x9C, 0x12)
C_GREEN      = RGBColor(0x27, 0xAE, 0x60)
C_BLUE       = RGBColor(0x29, 0x80, 0xB9)

doc = Document()

# ─── Page setup ───────────────────────────────────────────────────────────────
section = doc.sections[0]
section.page_width    = Inches(8.5)
section.page_height   = Inches(11)
section.left_margin   = Inches(1)
section.right_margin  = Inches(1)
section.top_margin    = Inches(0.8)
section.bottom_margin = Inches(0.8)

TODAY = datetime.date.today().strftime("%-d %B %Y")

# ─── Helpers ──────────────────────────────────────────────────────────────────
def set_cell_bg(cell, hex_color: str):
    tc   = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  hex_color)
    tcPr.append(shd)

def add_h1(text: str):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after  = Pt(6)
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(20)
    run.font.color.rgb = C_WHITE
    pPr  = p._p.get_or_add_pPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),  "clear")
    shd.set(qn("w:color"),"auto")
    shd.set(qn("w:fill"), "0D161F")
    pPr.append(shd)
    pBdr = OxmlElement("w:pBdr")
    left = OxmlElement("w:left")
    left.set(qn("w:val"),   "thick")
    left.set(qn("w:sz"),    "24")
    left.set(qn("w:space"), "12")
    left.set(qn("w:color"), "00E5A0")
    pBdr.append(left)
    pPr.append(pBdr)
    p.paragraph_format.left_indent = Inches(0.25)
    return p

def add_h2(text: str):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after  = Pt(4)
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(13)
    run.font.color.rgb = C_PRIMARY
    pPr  = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bot  = OxmlElement("w:bottom")
    bot.set(qn("w:val"),   "single")
    bot.set(qn("w:sz"),    "4")
    bot.set(qn("w:space"), "2")
    bot.set(qn("w:color"), "00E5A0")
    pBdr.append(bot)
    pPr.append(pBdr)
    return p

def add_body(text: str, indent=False, bold=False, italic=False, colour=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    if indent:
        p.paragraph_format.left_indent = Inches(0.3)
    run = p.add_run(text)
    run.font.size = Pt(10.5)
    run.bold      = bold
    run.italic    = italic
    run.font.color.rgb = colour if colour else C_TEXT
    return p

def add_bullet(text: str, level=0, colour=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.left_indent = Inches(0.3 + level * 0.25)
    run = p.add_run(text)
    run.font.size = Pt(10)
    run.font.color.rgb = colour if colour else C_TEXT
    return p

def add_two_col_table(rows, header=None, header_bg="0D161F"):
    table = doc.add_table(rows=len(rows) + (1 if header else 0), cols=2)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    for row in table.rows:
        row.cells[0].width = Inches(2.4)
        row.cells[1].width = Inches(4.2)
    if header:
        hcells = table.rows[0].cells
        for i, h in enumerate(header):
            set_cell_bg(hcells[i], header_bg)
            run = hcells[i].paragraphs[0].add_run(h)
            run.bold = True
            run.font.color.rgb = C_WHITE
            run.font.size = Pt(9.5)
    for ri, (col_a, col_b) in enumerate(rows):
        actual_row = ri + (1 if header else 0)
        c0 = table.rows[actual_row].cells[0]
        c1 = table.rows[actual_row].cells[1]
        bg = "F5F5F5" if ri % 2 == 0 else "FFFFFF"
        set_cell_bg(c0, bg); set_cell_bg(c1, bg)
        r0 = c0.paragraphs[0].add_run(col_a)
        r0.font.size = Pt(9.5); r0.font.color.rgb = C_TEXT
        r1 = c1.paragraphs[0].add_run(col_b)
        r1.font.size = Pt(9.5); r1.font.color.rgb = C_TEXT
    doc.add_paragraph()

def add_three_col_table(rows, headers, header_bg="0D161F"):
    table = doc.add_table(rows=len(rows) + 1, cols=3)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    widths = [Inches(0.35), Inches(1.5), Inches(4.6)]
    for row in table.rows:
        for i, w in enumerate(widths):
            row.cells[i].width = w
    hcells = table.rows[0].cells
    for i, h in enumerate(headers):
        set_cell_bg(hcells[i], header_bg)
        run = hcells[i].paragraphs[0].add_run(h)
        run.bold = True; run.font.color.rgb = C_WHITE; run.font.size = Pt(9.5)
    severity_colors = {"🔴":"FADBD8","🟠":"FAE5D3","🟡":"FEF9E7","ℹ️":"EBF5FB"}
    for ri, row_data in enumerate(rows):
        actual_row = ri + 1
        bg = "FFFFFF"
        for emoji, colour in severity_colors.items():
            if emoji in row_data[0]:
                bg = colour; break
        for ci, val in enumerate(row_data):
            c = table.rows[actual_row].cells[ci]
            set_cell_bg(c, bg)
            run = c.paragraphs[0].add_run(val)
            run.font.size = Pt(9); run.font.color.rgb = C_TEXT
    doc.add_paragraph()

def add_score_table(rows):
    table = doc.add_table(rows=len(rows) + 1, cols=2)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    for row in table.rows:
        row.cells[0].width = Inches(2.5)
        row.cells[1].width = Inches(1.5)
    hcells = table.rows[0].cells
    for i, h in enumerate(["Area", "Score"]):
        set_cell_bg(hcells[i], "0D161F")
        run = hcells[i].paragraphs[0].add_run(h)
        run.bold = True; run.font.color.rgb = C_WHITE; run.font.size = Pt(9.5)
    def score_bg(score):
        if "N/A" in score: return "EBF5FB"
        val = int(score.replace("/10",""))
        if val >= 8: return "D5F5E3"
        if val >= 6: return "FEF9E7"
        return "FADBD8"
    for ri, (area, score) in enumerate(rows):
        actual_row = ri + 1
        bg = score_bg(score)
        c0 = table.rows[actual_row].cells[0]
        c1 = table.rows[actual_row].cells[1]
        set_cell_bg(c0, bg); set_cell_bg(c1, bg)
        r0 = c0.paragraphs[0].add_run(area)
        r0.font.size = Pt(9.5); r0.font.color.rgb = C_TEXT
        r1 = c1.paragraphs[0].add_run(score)
        r1.font.size = Pt(9.5); r1.bold = True; r1.font.color.rgb = C_TEXT
    doc.add_paragraph()


# ═══════════════════════════════════════════════════════════════════════════════
#  COVER PAGE
# ═══════════════════════════════════════════════════════════════════════════════
p = doc.add_paragraph()
p.paragraph_format.space_before = Pt(60)
p.paragraph_format.space_after  = Pt(4)
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("Scalvicon")
run.bold = True; run.font.size = Pt(38); run.font.color.rgb = C_PRIMARY

p2 = doc.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
p2.paragraph_format.space_after = Pt(4)
run2 = p2.add_run("Complete Project Audit Report — Phase 1 & Phase 2")
run2.bold = True; run2.font.size = Pt(18); run2.font.color.rgb = C_DARK_BG

p3 = doc.add_paragraph()
p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
run3 = p3.add_run(f"Audit Date: {TODAY}   •   Prepared by: Senior Software Engineer")
run3.font.size = Pt(10); run3.font.color.rgb = RGBColor(0x66,0x66,0x66); run3.italic = True

doc.add_paragraph()

# Banner
table_banner = doc.add_table(rows=1, cols=4)
table_banner.alignment = WD_TABLE_ALIGNMENT.CENTER
banner_data = [
    ("React 18 + Vite 5", "Stack"),
    ("Firebase Auth + Firestore", "Backend"),
    ("Marketing + Admin", "Type"),
    ("Indian SME Agency", "Purpose"),
]
banner_colors = ["0D161F","1A2A3A","0D161F","1A2A3A"]
for ci, ((val, label), bg) in enumerate(zip(banner_data, banner_colors)):
    cell = table_banner.rows[0].cells[ci]
    set_cell_bg(cell, bg)
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    vrun = cell.paragraphs[0].add_run(val+"\n")
    vrun.bold = True; vrun.font.color.rgb = C_PRIMARY; vrun.font.size = Pt(10)
    lrun = cell.paragraphs[0].add_run(label)
    lrun.font.color.rgb = C_WHITE; lrun.font.size = Pt(8)

doc.add_paragraph()
add_body("🔗  Live URL: https://scalvicon-9bf2f.web.app  |  Admin Panel: https://scalvicon-9bf2f.web.app/admin",
         bold=True, colour=C_BLUE)

doc.add_page_break()


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 1 – DELIVERY SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("1 · Delivery Summary")
add_body("This report covers two phases of the Scalvicon project. Phase 1 built and deployed "
         "the public marketing site with Firebase authentication, real data, and all UI/UX "
         "enhancements. Phase 2 built the internal admin dashboard with real-time lead "
         "management and analytics. Both phases are deployed and live at the URL above.")

add_h2("Phase 1 — Public Marketing Site")
add_two_col_table([
    ("Deployment",         "✅ Firebase Hosting — scalvicon-9bf2f.web.app"),
    ("Authentication",     "✅ Firebase Auth — Google OAuth + Email/Password"),
    ("Firestore",          "✅ leads collection for contact form submissions"),
    ("New Sections",       "✅ Services, ContactForm, WhatsApp float, Scroll-to-top"),
    ("Real Data",          "✅ Testimonials, Portfolio (6 projects), FAQ, Pricing all use data files"),
    ("Navbar",             "✅ Active section tracking via IntersectionObserver, 6 links including Services + Contact"),
    ("Pricing",            "✅ ₹14,999 / ₹24,999 / ₹34,999 real Indian market plans"),
    ("Process",            "✅ Real 5-week timeline with detailed step descriptions"),
    ("Footer",             "✅ Real contact details, scroll-to-section links, coming-soon toasts"),
    ("Bundle size",        "✅ 314 KB gzip — well under 1.5 MB target"),
], header=["Area", "Status"])

add_h2("Phase 2 — Admin Dashboard")
add_two_col_table([
    ("Route",              "✅ /admin — AdminRoute blocks non-admin users with toast"),
    ("Auth guard",         "✅ VITE_ADMIN_EMAIL env var — only krishnamaurya2204@gmail.com can access"),
    ("Real-time data",     "✅ onSnapshot listener — dashboard updates instantly on new form submission"),
    ("Leads Table",        "✅ All columns: Name, Business, Type, Phone, Email, Budget, Date, Status, Actions"),
    ("Status badges",      "✅ new (green) / contacted (blue) / converted (purple) / closed (gray)"),
    ("Filters",            "✅ Search, status, business type, date-range (today/week/month)"),
    ("Actions",            "✅ WhatsApp deeplink, Mark Contacted, Convert — all update Firestore"),
    ("Summary Cards",      "✅ Total Leads / New Today / Contacted / Converted / Conversion Rate%"),
    ("Analytics",          "✅ recharts: Line chart (30d), Pie chart (by type), Bar chart (by budget)"),
    ("Bundle size",        "✅ 438 KB gzip — within limit"),
], header=["Area", "Status"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 2 – PROJECT STRUCTURE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("2 · Project Structure & Files")
add_h2("Key Source Files (Phase 1 + 2 additions)")
add_two_col_table([
    ("src/pages/Index.tsx",             "Landing page — assembles all 12 sections including new Services & ContactForm"),
    ("src/pages/Admin.tsx",             "Admin dashboard — sidebar layout, onSnapshot Firestore listener"),
    ("src/pages/Dashboard.tsx",         "User dashboard — profile, project status, WhatsApp deeplink"),
    ("src/components/Navbar.tsx",       "Fixed nav — 6 links, IntersectionObserver active dot, scroll-depth blur"),
    ("src/components/Services.tsx",     "6 service cards (Business, Booking, E-commerce, Real Estate, SEO, Revamp)"),
    ("src/components/ContactForm.tsx",  "Lead form — Zod validation, Firestore write, WhatsApp fallback"),
    ("src/components/WhatsAppButton.tsx","Floating WhatsApp CTA — pulse ring, tooltip, route-aware visibility"),
    ("src/components/ScrollToTop.tsx",  "Scroll-to-top button — appears after 400px scroll"),
    ("src/components/AdminRoute.tsx",   "Auth guard — checks VITE_ADMIN_EMAIL, redirects with toast"),
    ("src/components/admin/LeadsTable.tsx",  "Full data table with filters and Firestore update actions"),
    ("src/components/admin/AnalyticsView.tsx","recharts: Line/Pie/Bar charts from live Firestore data"),
    ("src/components/admin/SummaryCards.tsx","5 stat cards computed live from leads array"),
    ("src/data/testimonials.ts",        "4 real Indian SME client testimonials with star ratings"),
    ("src/data/portfolio.ts",           "6 real case studies — gradient, icon, metrics, delivery weeks"),
    ("src/data/faq.ts",                 "6 honest Scalvicon-specific FAQ answers with pricing"),
    ("src/types/lead.ts",               "Lead + LeadStatus TypeScript types for Firestore documents"),
    ("src/lib/validations/contact.ts",  "Zod schema for contact form — Indian phone regex, budget, business type"),
    ("src/lib/scroll.ts",               "scrollToSection() utility — extracted, not duplicated"),
    ("firebase.json",                   "Hosting config — scalvicon-9bf2f, SPA rewrites, cache + security headers"),
    (".firebaserc",                     "Firebase project + hosting target mapping"),
    (".env",                            "VITE_FIREBASE_* + VITE_WHATSAPP_NUMBER + VITE_ADMIN_EMAIL"),
], header=["File", "Purpose"])

add_h2("Files Cleaned Up Since Original Audit")
add_two_col_table([
    ("scrollTo() duplication",              "✅ Extracted → src/lib/scroll.ts — no longer duplicated in Hero.tsx + Navbar.tsx"),
    ("static inline data arrays",           "✅ testimonials, portfolio, faq moved to src/data/ files"),
    ("pricing nav dead scroll",             "✅ Fixed — Pricing.tsx has correct id='pricing'"),
    ("@tanstack/react-query dead weight",   "✅ Removed from App.tsx — QueryClientProvider no longer wraps app"),
    ("dual toast system",                   "✅ Only sonner remains — shadcn Toaster removed"),
    ("'Book Free Call' with no action",     "✅ All CTAs now link to WhatsApp deeplink or contact form"),
    ("dead footer links",                   "✅ Footer links scroll to sections; blog/careers show coming-soon toast"),
], header=["Issue from original audit", "Resolution"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 3 – ARCHITECTURE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("3 · Architecture Overview")
add_two_col_table([
    ("Architecture",          "SPA (Vite + React 18 + TypeScript 5.8)"),
    ("Build tool",            "Vite 5.4 with @vitejs/plugin-react-swc"),
    ("Styling",               "Tailwind CSS 3.4 + CSS custom properties (HSL design tokens)"),
    ("UI components",         "shadcn/ui (Radix UI primitives)"),
    ("Animations",            "Framer Motion 12 — variants centralized in lib/animations.ts"),
    ("Routing",               "React Router DOM v6 — 6 routes: /, /login, /signup, /forgot-password, /dashboard, /admin"),
    ("Auth",                  "Firebase Auth v11 — Google OAuth + Email/Password"),
    ("Database",              "Firestore — users collection (auth) + leads collection (contact form)"),
    ("Real-time",             "onSnapshot listener in Admin.tsx — live updates without polling"),
    ("Deployment",            "Firebase Hosting — scalvicon-9bf2f.web.app"),
    ("Environment vars",      "VITE_FIREBASE_* (6 vars), VITE_WHATSAPP_NUMBER, VITE_ADMIN_EMAIL"),
    ("Charts",                "recharts — Line, Pie, Bar charts in AnalyticsView"),
    ("Form validation",       "react-hook-form + Zod — contact form with Indian phone regex"),
    ("State management",      "React local state + AuthContext — no global store needed"),
    ("Bundle (gzip)",         "438 KB — well under 1.5 MB budget"),
], header=["Dimension", "Detail"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 4 – FIREBASE IMPLEMENTATION
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("4 · Firebase Implementation")
add_two_col_table([
    ("SDK version",             "Firebase 11 — modular tree-shakeable imports"),
    ("Auth providers",          "✅ Google OAuth + Email/Password"),
    ("Auth singleton",          "✅ Single initializeApp() in src/lib/firebase.ts — no double-init"),
    ("Firestore — users",       "✅ Created/updated on auth — upsertUserDoc() helper"),
    ("Firestore — leads",       "✅ addDoc on contact form submit — includes serverTimestamp()"),
    ("Error handling",          "✅ All Firestore writes wrapped in try/catch with sonner toasts"),
    ("Real-time listener",      "✅ onSnapshot in Admin.tsx — unsub returned and called on cleanup"),
    ("Offline handling",        "Not configured — acceptable for MVP"),
    ("Security rules",          "⚠️ Must be configured in Firebase Console (documented in admin panel)"),
    ("Config exposure",         "✅ All Firebase keys in .env, baked by Vite at build time — correct for Firebase JS SDK"),
    ("Admin SDK",               "Not used — client SDK only (appropriate for this use case)"),
    ("Hosting",                 "✅ firebase.json — SPA rewrites, Cache-Control headers, X-Frame-Options"),
], header=["Check", "Result"])

add_body("⚠️  Firestore security rules must be set before data is considered production-ready. "
         "A Firestore rules template is documented in the admin panel Settings tab.", colour=C_ORANGE)


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 5 – AUTH & SECURITY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("5 · Authentication & Security")
add_two_col_table([
    ("Auth system",             "✅ Firebase Auth — Google + Email/Password"),
    ("ProtectedRoute",          "✅ Redirects to /login if no currentUser"),
    ("AdminRoute",              "✅ Checks email === VITE_ADMIN_EMAIL — redirects with toast on failure"),
    ("Admin email config",      "✅ VITE_ADMIN_EMAIL env var — not hardcoded"),
    ("HTTPS",                   "✅ Firebase Hosting enforces HTTPS automatically"),
    ("X-Frame-Options",         "✅ SAMEORIGIN set via firebase.json headers"),
    ("XSS risk",                "Low — no dangerouslySetInnerHTML; all UI rendered via React"),
    ("Firestore rules",         "⚠️ Pending — leads should only be readable by admin email"),
    ("Auth loading state",      "✅ loading flag in AuthContext prevents premature redirects"),
    ("Token email check",       "ℹ️  AdminRoute checks currentUser.email on client — server-side rule also needed"),
], header=["Check", "Status"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 6 – CODE QUALITY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("6 · Code Quality")

add_h2("Strengths")
strengths = [
    "Zero TypeScript errors (npx tsc --noEmit) — verified before every deploy",
    "LucideIcon type used for icon maps — no more FC<{}> type casting warnings",
    "Framer Motion variants centralized in lib/animations.ts — consistent across all components",
    "Data fully separated from UI — testimonials, portfolio, faq, pricing all in src/data/",
    "scrollToSection() extracted to src/lib/scroll.ts — DRY, no duplication",
    "Zod schema in src/lib/validations/contact.ts — typed form validation with Indian phone regex",
    "IntersectionObserver in Navbar with proper cleanup (disconnect on unmount)",
    "onSnapshot in Admin.tsx properly unsubscribed via useEffect return",
    "All Firestore writes in try/catch with user-facing toast feedback",
    "AnimatePresence used for mount/unmount animations (mobile menu, portfolio modal, admin sidebar overlay)",
    "Component file size: all components are focused and under ~220 lines",
]
for s in strengths:
    add_bullet("✅  " + s, colour=C_GREEN)

add_h2("Remaining Issues & Technical Debt")
issues = [
    ("Firestore security rules not yet applied",
     "The Firestore leads collection is currently unprotected. Apply rules in Firebase Console before sharing the admin URL publicly."),
    ("No code splitting",
     "The entire app is one 1.6MB JS chunk. recharts and framer-motion alone are large. Use dynamic import() for Admin.tsx to split the admin bundle."),
    ("VITE_ADMIN_EMAIL baked into bundle",
     "The admin email is visible in the compiled JS. This is the same file accessible to anyone — pair it with a Firestore rule for defense-in-depth."),
    ("No loading skeletons in admin table",
     "While Firestore loads, the leads table shows nothing. A skeleton loader would improve perceived performance."),
    ("No pagination on leads table",
     "Client-side filtering loads all leads at once. Fine for <500 leads; add Firestore pagination if the leads collection grows."),
    ("Test suite is still placeholder",
     "test/example.test.ts contains only expect(true).toBe(true). Write smoke tests for key components."),
    ("No error boundary",
     "If AnalyticsView or LeadsTable throw, the whole admin page crashes. Wrap in React ErrorBoundary."),
    ("bun.lockb still present",
     "Two lockfiles (bun.lockb + package-lock.json) create package manager ambiguity. Delete one."),
]
for title, desc in issues:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.left_indent = Inches(0.3)
    r1 = p.add_run("⚠️  " + title + " — ")
    r1.bold = True; r1.font.size = Pt(10); r1.font.color.rgb = C_ORANGE
    r2 = p.add_run(desc)
    r2.font.size = Pt(10); r2.font.color.rgb = C_TEXT

doc.add_paragraph()


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 7 – UI/UX & STYLING
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("7 · UI/UX & Styling")
add_two_col_table([
    ("Design system",         "✅ Consistent — Syne/DM Sans/JetBrains Mono, HSL tokens, named shadows & radii"),
    ("Dark mode",             "✅ Dark-first, premium aesthetic throughout"),
    ("Responsiveness",        "✅ All sections responsive; admin sidebar collapses on mobile with overlay"),
    ("Active nav tracking",   "✅ IntersectionObserver dot indicator on scroll position"),
    ("Floating elements",     "✅ WhatsApp button (pulse ring + tooltip) + scroll-to-top button"),
    ("Portfolio modal",       "✅ AnimatePresence modal with case study details, metrics, tags"),
    ("Category filter",       "✅ Animated filter buttons with smooth card transitions"),
    ("Contact form",          "✅ Zod validation, real-time field errors, success toast, WhatsApp fallback"),
    ("Admin table",           "✅ Alternating row colors, status badge pills, color-coded action buttons"),
    ("Admin sidebar badge",   "✅ New leads count badge in sidebar nav updates in real-time"),
    ("Pricing badges",        "✅ 'MOST POPULAR' badge on Business plan; colored left accent borders"),
    ("Stat cards",            "✅ Summary cards with icon, colored value, label — in admin and testimonials"),
], header=["Dimension", "Assessment"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 8 – ROUTING & NAVIGATION
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("8 · Routing & Navigation")
add_two_col_table([
    ("Router",              "React Router DOM v6 — BrowserRouter"),
    ("Routes",              "/ · /login · /signup · /forgot-password · /dashboard · /admin · * (404)"),
    ("Auth protection",     "ProtectedRoute wraps /dashboard; AdminRoute wraps /admin"),
    ("SPA rewrite",         "✅ firebase.json rewrites all paths to index.html — client-side routing works on refresh"),
    ("Scroll nav",          "✅ scrollToSection() in lib/scroll.ts — all 6 nav links scroll accurately"),
    ("Active highlight",    "✅ IntersectionObserver (threshold 0.35) tracks visible section"),
    ("404 page",            "✅ NotFound.tsx with React Router Link — no full reload"),
    ("Admin nav",           "✅ Sidebar tabs switch between Leads / Analytics / Settings with fadeUp transition"),
], header=["Check", "Status"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 9 – LEADS MANAGEMENT
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("9 · Leads Management System")
add_two_col_table([
    ("Collection",          "Firestore 'leads' collection — ordered by createdAt descending"),
    ("Real-time",           "onSnapshot — admin sees new submissions instantly without page refresh"),
    ("Filters",             "Search (name/email) + Status + Business type + Date range (today/week/month)"),
    ("Status workflow",     "new → contacted → converted (via action buttons)"),
    ("WhatsApp action",     "Pre-filled wa.me deeplink: 'Hi {name}! We received your inquiry for {type} website...'"),
    ("Firestore updates",   "updateDoc() on each action — updateStatus() helper with toast feedback"),
    ("Summary cards",       "Total / New Today / Contacted / Converted / Rate% — computed with useMemo"),
    ("Charts (Analytics)",  "Line: leads/day (30d) • Pie: by business type • Bar: by budget range"),
    ("Form source",         "ContactForm.tsx writes to 'leads' via addDoc with serverTimestamp()"),
    ("Data schema",         "name, businessName, businessType, phone, email, budget, message, status, source, createdAt"),
], header=["Feature", "Detail"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 10 – BUGS & OPEN ISSUES
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("10 · Remaining Issues & Bugs")
add_three_col_table([
    ("🔴", "HIGH",   "Firestore security rules not applied — leads collection is publicly readable/writable.\n→ Apply rules in Firebase Console → Firestore → Rules before launch"),
    ("🟠", "MEDIUM", "No code splitting — admin bundle (recharts + framer-motion) loaded even by non-admin visitors.\n→ Use React.lazy(() => import('./pages/Admin')) in App.tsx"),
    ("🟠", "MEDIUM", "No loading skeleton in admin leads table — shows blank during initial Firestore fetch.\n→ Add a skeleton rows component while loadingLeads is true"),
    ("🟠", "MEDIUM", "No React ErrorBoundary wrapping admin components — any render error crashes the whole admin page.\n→ Wrap Admin.tsx children in an ErrorBoundary"),
    ("🟡", "LOW",    "No pagination on leads — all documents fetched at once via onSnapshot.\n→ Add Firestore cursor-based pagination for >500 leads"),
    ("🟡", "LOW",    "VITE_ADMIN_EMAIL baked into JS bundle — visible to anyone who inspects the source.\n→ Pair with Firestore security rule: request.auth.token.email == 'admin@email'"),
    ("🟡", "LOW",    "bun.lockb and package-lock.json both present — package manager ambiguity.\n→ Delete bun.lockb if using npm"),
    ("🟡", "LOW",    "Test suite is only a placeholder — test/example.test.ts has expect(true).toBe(true).\n→ Write smoke tests for Navbar, ContactForm, AdminRoute"),
    ("ℹ️", "INFO",   "Browserslist database is 8 months old — minor warning during build.\n→ Run: npx update-browserslist-db@latest"),
    ("ℹ️", "INFO",   "Chunk size warning — JS bundle > 500KB before gzip.\n→ Acceptable for now; resolve with lazy loading and manualChunks"),
], headers=["", "Severity", "Description"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 11 – WHAT'S WORKING WELL
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("11 · What's Working Well")
wins = [
    "Full Firebase Auth flow — Google OAuth + email/password + forgot password, all working",
    "Real-time admin dashboard — onSnapshot shows new lead submissions instantly",
    "AdminRoute — clean email-based guard with toast notification on access denial",
    "Firestore leads pipeline — ContactForm → Firestore → Admin table, end-to-end",
    "IntersectionObserver nav — active section dot tracks scroll accurately, cleaned up on unmount",
    "Floating WhatsApp button — pulse animation, tooltip, hidden on auth routes",
    "Zero TypeScript errors — tsc --noEmit passes before every deploy",
    "Clean deploy pipeline — npm run deploy builds and deploys in one command",
    "All nav links scroll correctly — scrollToSection() DRY utility used everywhere",
    "Real Indian market data — ₹14,999/₹24,999/₹34,999 pricing, real FAQ answers, case study metrics",
    "Portfolio modal — AnimatePresence case study overlay with project metrics and tags",
    "Responsive admin sidebar — collapses with AnimatePresence overlay on mobile",
    "recharts analytics — live charts computed from real Firestore data with dark-theme styling",
    "Framer Motion animations — fadeUp, stagger, fadeUpWithDelay consistently applied",
    "Bundle within budget — 438 KB gzip vs 1.5 MB target",
    "Firebase Hosting headers — Cache-Control, X-Frame-Options configured in firebase.json",
]
for w in wins:
    add_bullet("✅  " + w, colour=C_GREEN)

doc.add_paragraph()


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 12 – NEXT STEPS & RECOMMENDATIONS
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("12 · Recommendations & Next Steps")

add_h2("🔴 Critical — Before Sharing Admin URL")
criticals = [
    ("Apply Firestore security rules",
     "Set rules in Firebase Console to restrict reads on 'leads' to admin email only, and 'users' to the authenticated UID. A ready-to-use template is in the admin panel Settings tab."),
]
for title, desc in criticals:
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.space_after = Pt(3)
    r1 = p.add_run(title+"\n"); r1.bold = True; r1.font.size = Pt(10.5); r1.font.color.rgb = C_RED
    r2 = p.add_run(desc); r2.font.size = Pt(10); r2.font.color.rgb = C_TEXT

add_h2("🟠 Important — Address in Phase 3")
importants = [
    ("Code-split the admin route",
     "Use React.lazy(() => import('./pages/Admin')) in App.tsx. recharts alone adds ~200KB to the bundle loaded by every public visitor."),
    ("Add React ErrorBoundary",
     "Wrap the admin panel content components so a runtime error doesn't crash the entire page. Show a graceful 'Something went wrong — reload' message."),
    ("Add skeleton loading",
     "Show skeleton table rows while loadingLeads is true in Admin.tsx to improve perceived performance."),
    ("Write real tests",
     "Add smoke tests for: AdminRoute (redirect behaviour), ContactForm (Zod validation errors), Navbar (active section tracking)."),
]
for title, desc in importants:
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.space_after = Pt(3)
    r1 = p.add_run(title+"\n"); r1.bold = True; r1.font.size = Pt(10.5); r1.font.color.rgb = C_ORANGE
    r2 = p.add_run(desc); r2.font.size = Pt(10); r2.font.color.rgb = C_TEXT

add_h2("🟡 Nice to Have — Phase 3 Backlog")
niceToHave = [
    "Email notification on new lead — Firebase Cloud Function triggers SendGrid/Nodemailer on new leads doc.",
    "Lead export — CSV download button in admin table using Papa Parse or native Blob.",
    "Cookie consent banner — GDPR/DPDPA compliant banner before Google Analytics loads.",
    "Google Analytics — add GA4 measurement ID to index.html (behind consent).",
    "Calendly embed — replace WhatsApp CTA with Calendly popup for automated booking.",
    "Portfolio real screenshots — replace Lucide icon cards with actual client website screenshots.",
    "Blog section — MDX-based blog for SEO content marketing (Next.js or Astro if SEO is priority).",
    "Delete bun.lockb — pick npm as the sole package manager.",
    "Update browserslist DB — npx update-browserslist-db@latest.",
    "Add manualChunks in vite.config.ts — split recharts and firebase into separate async chunks.",
]
for item in niceToHave:
    add_bullet(item)


# ═══════════════════════════════════════════════════════════════════════════════
#  SUMMARY SCORES
# ═══════════════════════════════════════════════════════════════════════════════
doc.add_page_break()
add_h1("Summary Score — Post Phase 1 & 2")

add_score_table([
    ("Project Structure",           "9/10"),
    ("Design & UI/UX",              "9/10"),
    ("Code Quality",                "8/10"),
    ("Routing & Navigation",        "9/10"),
    ("Firebase Auth",               "9/10"),
    ("Firebase Firestore",          "8/10"),
    ("Admin Panel",                 "8/10"),
    ("Security",                    "6/10"),
    ("Testing",                     "2/10"),
    ("Production Readiness",        "8/10"),
])

add_body(
    "Overall Verdict: The Scalvicon project has been transformed from a static marketing mockup into "
    "a fully functional SaaS-ready agency site with live Firebase Auth, Firestore lead capture, "
    "a real-time admin dashboard, and a clean deploy pipeline. "
    "The single critical remaining item is Firestore security rules — apply them before "
    "the admin URL is shared with anyone. All other items are polish and Phase 3 features.",
    bold=True, colour=C_DARK_BG
)

# ─── Footer ───────────────────────────────────────────────────────────────────
footer = doc.sections[0].footer
fp = footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
fr = fp.add_run(f"Scalvicon — Confidential Project Audit  |  Generated {TODAY}")
fr.font.size = Pt(8); fr.font.color.rgb = RGBColor(0xAA,0xAA,0xAA); fr.italic = True

# ─── Save ─────────────────────────────────────────────────────────────────────
output_path = "Scalvicon_Project_Audit_Report.docx"
doc.save(output_path)
print(f"✅  Report saved → {output_path}")
