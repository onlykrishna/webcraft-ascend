"""
Scalvicon – Complete Project Audit Report Generator  (Phase 1 → Phase 4)
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
C_TEXT       = RGBColor(0x1A, 0x1A, 0x2E)
C_RED        = RGBColor(0xC0, 0x39, 0x2B)
C_ORANGE     = RGBColor(0xE6, 0x7E, 0x22)
C_GREEN      = RGBColor(0x27, 0xAE, 0x60)
C_BLUE       = RGBColor(0x29, 0x80, 0xB9)
C_PURPLE     = RGBColor(0x88, 0x55, 0xCC)

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
    shd.set(qn("w:color"), "auto")
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
    severity_colors = {"🔴":"FADBD8","🟠":"FAE5D3","🟡":"FEF9E7","ℹ️":"EBF5FB","✅":"D5F5E3"}
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
p.paragraph_format.space_before = Pt(50)
p.paragraph_format.space_after  = Pt(4)
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("Scalvicon")
run.bold = True; run.font.size = Pt(40); run.font.color.rgb = C_PRIMARY

p2 = doc.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
p2.paragraph_format.space_after = Pt(4)
run2 = p2.add_run("Complete Project Audit Report")
run2.bold = True; run2.font.size = Pt(18); run2.font.color.rgb = C_DARK_BG

p_sub = doc.add_paragraph()
p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_sub.paragraph_format.space_after = Pt(4)
run_sub = p_sub.add_run("Phase 1: Public Site  ·  Phase 2: Admin Dashboard  ·  Phase 3: Security & Performance  ·  Phase 4: Advanced Admin")
run_sub.font.size = Pt(10); run_sub.font.color.rgb = RGBColor(0x00, 0xE5, 0xA0); run_sub.italic = True

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
    ("Marketing + Admin Panel", "Type"),
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
add_body("🔗  Live Site: https://scalvicon-9bf2f.web.app  |  Admin: /admin  |  Repo: webcraft-ascend",
         bold=True, colour=C_BLUE)

doc.add_page_break()


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 1 – PHASE DELIVERY SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("1 · Phase-by-Phase Delivery Summary")

add_h2("Phase 1 — Public Marketing Site")
add_two_col_table([
    ("Firebase Hosting deploy",      "✅ https://scalvicon-9bf2f.web.app — live"),
    ("Firebase Auth",                "✅ Google OAuth + Email/Password + Forgot Password"),
    ("Navbar",                       "✅ IntersectionObserver active-section tracking, 6 scroll links"),
    ("Hero section",                 "✅ Animated mockup cards, dual CTAs wired to WhatsApp/contact"),
    ("Services section",             "✅ 6 service cards (Business, Booking, E-commerce, SEO, etc.)"),
    ("Process section",              "✅ Real 5-week timeline with weekly milestone descriptions"),
    ("Pricing section",              "✅ ₹14,999 / ₹24,999 / ₹34,999 — Most Popular badge, INR"),
    ("Portfolio section",            "✅ 6 real case studies — filterable, animated modal with metrics"),
    ("Testimonials section",         "✅ 4 real Indian SME testimonials with star ratings"),
    ("FAQ section",                  "✅ 6 Scalvicon-specific answers, Framer Motion accordion"),
    ("ContactForm",                  "✅ Zod validation, Firestore write, WhatsApp fallback"),
    ("WhatsApp floating button",     "✅ Pulse ring, tooltip, hidden on auth routes"),
    ("Scroll-to-top button",         "✅ Appears after 400px scroll"),
    ("Footer",                       "✅ Real links / coming-soon toasts for blog & careers"),
    ("Bundle (gzip)",                "✅ 314 KB — well under 1.5 MB budget"),
], header=["Feature", "Status"])

add_h2("Phase 2 — Admin Dashboard")
add_two_col_table([
    ("AdminRoute guard",             "✅ Email check via VITE_ADMIN_EMAIL — redirects with toast"),
    ("Real-time Firestore listener", "✅ onSnapshot — instant updates, properly unsubscribed"),
    ("Leads table",                  "✅ Name, Business, Type, Phone, Email, Budget, Date, Status, Actions"),
    ("Status badges",                "✅ new / contacted / converted / closed — color-coded pills"),
    ("Row actions",                  "✅ WhatsApp deeplink, Mark Contacted, Convert"),
    ("Summary cards",                "✅ Total / New Today / Contacted / Converted / Rate%"),
    ("Analytics — Line chart",       "✅ Leads per day — last 30 days"),
    ("Analytics — Pie chart",        "✅ Leads by business type"),
    ("Analytics — Bar chart",        "✅ Leads by budget range"),
    ("Mobile sidebar",               "✅ AnimatePresence overlay, collapses on tab select"),
    ("Bundle (gzip)",                "✅ 438 KB — within limit"),
], header=["Feature", "Status"])

add_h2("Phase 3 — Security & Performance Hardening")
add_two_col_table([
    ("Firestore security rules",     "✅ Applied — leads read/update restricted to admin email"),
    ("Code-split admin route",       "✅ React.lazy() — Admin chunk (22 KB gzip) loads only on /admin"),
    ("recharts chunk",               "✅ 155 KB gzip — only loads when visiting /admin, not public"),
    ("React ErrorBoundary",          "✅ Wraps all admin content — shows reload fallback on crash"),
    ("LeadsTableSkeleton",           "✅ 5 animated pulse rows while Firestore initially loads"),
    ("Manual chunks (vite.config)",  "✅ firebase / charts / motion / vendor split into async chunks"),
    ("bun.lockb removed",            "✅ Only package-lock.json remains — npm is sole package manager"),
    ("Browserslist DB updated",      "✅ caniuse-lite updated — no more build warning"),
    ("Smoke tests (4 tests)",        "✅ AdminRoute: loading, unauthenticated, non-admin, admin pass"),
    ("npx tsc --noEmit",             "✅ 0 TypeScript errors"),
    ("npm run build",                "✅ 9s build — 0 warnings"),
], header=["Item", "Status"])

add_h2("Phase 4 — Advanced Admin Features")
add_two_col_table([
    ("Trend indicators on stat cards", "✅ Total Leads shows ↑/↓ % vs last 7 days"),
    ("Multi-select status filter",   "✅ Custom checkbox dropdown — select 1, 2, or all statuses"),
    ("Row checkboxes (bulk select)", "✅ Select all / individual row, count shown in floating bar"),
    ("Bulk action floating bar",     "✅ Mark Contacted / Convert All / Close All / Clear"),
    ("Lead Details Modal",           "✅ 👁 Eye icon → full info grid, message, editable notes"),
    ("Internal notes → Firestore",   "✅ updateDoc() saves notes + lastUpdated serverTimestamp()"),
    ("CSV Export",                   "✅ papaparse — downloads scalvicon-leads-YYYY-MM-DD.csv"),
    ("Real-time lead notifications", "✅ Toast + Browser Notification API on new lead arrival"),
    ("Browser notification consent", "✅ Requested on mount + enable button in Settings tab"),
    ("Activity tab",                 "✅ Vertical timeline — last 10 leads with status dots + times"),
    ("Dark theme chart fix",         "✅ All recharts tooltips/axes use hsl(var(--card/border))"),
    ("notes + lastUpdated in Lead type", "✅ Optional fields in src/types/lead.ts"),
], header=["Feature", "Status"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 2 – ARCHITECTURE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("2 · Architecture Overview")
add_two_col_table([
    ("Architecture",       "SPA (Vite 5 + React 18 + TypeScript 5.8)"),
    ("Build tool",         "Vite 5.4 with @vitejs/plugin-react-swc (SWC — faster than Babel)"),
    ("Styling",            "Tailwind CSS 3.4 + CSS HSL design tokens + shadcn/ui"),
    ("Animations",         "Framer Motion 12 — variants in lib/animations.ts"),
    ("Routing",            "React Router DOM v6 — 7 routes: / /login /signup /forgot-password /dashboard /admin *"),
    ("Auth",               "Firebase Auth v11 — Google OAuth + Email/Password"),
    ("Database",           "Firestore — users collection + leads collection"),
    ("Real-time",          "onSnapshot in Admin.tsx — unsubscribed via useEffect cleanup"),
    ("Form validation",    "react-hook-form + Zod — Indian phone regex, budget, business type"),
    ("Charts",             "recharts — Line, Pie, Bar in AnalyticsView (lazy-loaded, admin-only)"),
    ("CSV export",         "papaparse — client-side CSV generation from filtered leads array"),
    ("Notifications",      "Sonner toasts + Browser Notification API (permission requested)"),
    ("Code splitting",     "manualChunks: firebase / charts / motion / vendor / Admin"),
    ("Error handling",     "React ErrorBoundary (class component) + per-Firestore try/catch toasts"),
    ("Testing",            "Vitest + @testing-library/react — 5 tests across 2 files"),
    ("Deployment",         "Firebase Hosting — SPA rewrites, Cache-Control, X-Frame-Options"),
    ("Bundle (Phase 4)",   "Admin 22 KB · charts 155 KB (admin-only) · vendor 7.7 KB · main 86 KB"),
], header=["Dimension", "Detail"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 3 – FILE TREE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("3 · Key Source Files")
add_two_col_table([
    ("src/pages/Index.tsx",                     "Landing page — 12 sections assembled in order"),
    ("src/pages/Admin.tsx",                     "Admin dashboard — sidebar, onSnapshot, notifications, 4 tabs"),
    ("src/pages/Login.tsx / Signup.tsx",        "Auth pages — Firebase Auth, Google OAuth flow"),
    ("src/pages/ForgotPassword.tsx",            "Password reset via Firebase Auth"),
    ("src/pages/Dashboard.tsx",                 "User dashboard — profile, project status"),
    ("src/components/AdminRoute.tsx",           "Route guard — checks VITE_ADMIN_EMAIL, toast on deny"),
    ("src/components/ErrorBoundary.tsx",        "Class-based boundary — reload fallback on render error"),
    ("src/components/ContactForm.tsx",          "Lead capture — Zod, react-hook-form, Firestore addDoc"),
    ("src/components/WhatsAppButton.tsx",       "Floating CTA — pulse ring, tooltip, route-aware"),
    ("src/components/admin/LeadsTable.tsx",     "Full table — multi-select filter, bulk actions, CSV, modal"),
    ("src/components/admin/LeadDetailsModal.tsx","Lead detail view — notes editor, Firestore update"),
    ("src/components/admin/SummaryCards.tsx",   "5 stat cards — Total with week-over-week trend arrow"),
    ("src/components/admin/AnalyticsView.tsx",  "recharts Line/Pie/Bar — dark-theme CSS var tooltips"),
    ("src/components/admin/ActivityTimeline.tsx","Vertical timeline — last 10 leads with status dots"),
    ("src/components/admin/LeadsTableSkeleton.tsx","Loading skeleton — 5 pulse rows during Firestore init"),
    ("src/types/lead.ts",                       "Lead + LeadStatus types — includes notes & lastUpdated"),
    ("src/lib/validations/contact.ts",          "Zod schema + BUSINESS_TYPES + BUDGET_RANGES exports"),
    ("src/lib/scroll.ts",                       "scrollToSection() — DRY utility, no duplication"),
    ("src/data/testimonials.ts",                "4 real client testimonials with star ratings"),
    ("src/data/portfolio.ts",                   "6 case studies — gradient, metrics, delivery weeks"),
    ("src/data/faq.ts",                         "6 real FAQ answers with Scalvicon pricing"),
    ("src/test/AdminRoute.test.tsx",            "4 smoke tests — loading / unauth / non-admin / admin"),
    ("vite.config.ts",                          "manualChunks: firebase/charts/motion/vendor"),
    ("firebase.json",                           "Hosting: SPA rewrite, cache headers, X-Frame-Options"),
    (".env / .env.example",                     "VITE_FIREBASE_* (6), VITE_WHATSAPP_NUMBER, VITE_ADMIN_EMAIL"),
], header=["File", "Purpose"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 4 – FIREBASE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("4 · Firebase Implementation")
add_two_col_table([
    ("SDK version",              "Firebase v11 — modular tree-shakeable imports"),
    ("Single initializeApp()",   "✅ One call in src/lib/firebase.ts — no double-init"),
    ("Auth providers",           "✅ GoogleAuthProvider + EmailAuthProvider"),
    ("Auth singleton pattern",   "✅ AuthContext wraps app — loading flag prevents premature redirects"),
    ("Firestore — users",        "✅ upsertUserDoc() — created/merged on every auth sign-in"),
    ("Firestore — leads",        "✅ addDoc on contact form — serverTimestamp(), all fields typed"),
    ("Firestore — notes",        "✅ updateDoc() from LeadDetailsModal — lastUpdated serverTimestamp()"),
    ("Real-time listener",       "✅ onSnapshot in Admin.tsx — unsub returned from useEffect"),
    ("Security rules",           "✅ APPLIED — leads read/update/delete: admin email only; create: authenticated"),
    ("Error handling",           "✅ All Firestore writes in try/catch with toast feedback"),
    ("Config exposure",          "✅ All keys baked by Vite from .env — correct pattern for Firebase JS SDK"),
    ("Hosting config",           "✅ firebase.json — Cache-Control, X-Frame-Options, SPA rewrite"),
    ("Build SDK chunk",          "✅ firebase split into 137 KB gzip async chunk via manualChunks"),
], header=["Check", "Result"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 5 – SECURITY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("5 · Security Audit")
add_two_col_table([
    ("Firestore rules",          "✅ Active — leads restricted to admin email at database layer"),
    ("AdminRoute client guard",  "✅ VITE_ADMIN_EMAIL check — redirects with toast"),
    ("Defense in depth",         "✅ Both client-side email check AND Firestore server-side rule applied"),
    ("HTTPS",                    "✅ Firebase Hosting enforces HTTPS automatically"),
    ("X-Frame-Options",          "✅ SAMEORIGIN — prevents clickjacking"),
    ("XSS risk",                 "Low — no dangerouslySetInnerHTML; all content via React's virtual DOM"),
    ("Auth loading state",       "✅ loading flag prevents route flash before auth state resolves"),
    ("ProtectedRoute",           "✅ /dashboard requires any authenticated user"),
    ("AdminRoute",               "✅ /admin requires specific email match"),
    ("VITE_ADMIN_EMAIL in bundle","ℹ️  Visible in compiled JS — mitigated by Firestore server-side rule"),
    ("Environment variables",    "✅ .env gitignored; .env.example committed with placeholder values"),
    ("No admin SDK exposed",     "✅ Client SDK only — no service account ever touches browser code"),
], header=["Check", "Status"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 6 – LEADS MANAGEMENT SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("6 · Leads Management System")
add_two_col_table([
    ("Data source",              "Firestore 'leads' collection — ordered by createdAt desc"),
    ("Real-time updates",        "onSnapshot — admin sees new submissions without page reload"),
    ("Status workflow",          "new → contacted → converted (row actions or bulk)"),
    ("Filters",                  "Search (name/email) + multi-select status + business type + date range"),
    ("Multi-select status",      "Custom checkbox dropdown — select any combination of statuses"),
    ("Bulk actions",             "Select rows → floating bar → Mark Contacted / Convert All / Close All"),
    ("Lead Details Modal",       "Full info grid, message, internal notes, quick action buttons"),
    ("Internal notes",           "Markdown textarea → updateDoc() with lastUpdated serverTimestamp()"),
    ("CSV export",               "papaparse → filtered leads → .csv download with all fields + notes"),
    ("WhatsApp action",          "Pre-filled wa.me deeplink with business-specific message template"),
    ("New lead notification",    "Toast + Browser Notification API — triggers on leads.length increase"),
    ("Activity timeline",        "Last 10 leads chronologically — colored status dots, formatted times"),
    ("Loading skeleton",         "5 pulse rows shown while loadingLeads === true on first load"),
    ("Summary cards — Total",    "Shows week-over-week % change with ↑/↓ trend arrow"),
    ("Summary cards — all",      "Total / New Today / Contacted / Converted / Conversion Rate%"),
    ("Lead data schema",         "name, businessName, businessType, phone, email, budget, message, status, source, createdAt, notes?, lastUpdated?"),
], header=["Feature", "Detail"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 7 – CODE QUALITY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("7 · Code Quality")

add_h2("Strengths")
strengths = [
    "Zero TypeScript errors — tsc --noEmit passes before every deploy",
    "5 smoke tests passing — AdminRoute: 4 cases covering all auth states",
    "React ErrorBoundary (class) wraps all admin content — no silent crashes",
    "Code splitting — recharts (155 KB) only loads on /admin, not public pages",
    "Framer Motion variants centralized in lib/animations.ts — zero duplication",
    "Data fully separated from UI — testimonials / portfolio / faq / pricing in src/data/",
    "scrollToSection() in lib/scroll.ts — DRY, used by Navbar + Hero + CTASection",
    "Zod schema with Indian phone regex — typed validation in lib/validations/contact.ts",
    "onSnapshot cleanup: useEffect returns unsub() — no memory leak",
    "prevCountRef for notification tracking — no stale state, uses ref not state",
    "Dirty-state Save button in notes modal — disabled when notes === Firestore value",
    "Bulk async update uses Promise.all() — concurrent Firestore writes, not sequential",
    "CSV export: URL.revokeObjectURL() called after download — no memory leak",
    "All Firestore writes in try/catch with per-operation toast feedback",
    "manualChunks config — deterministic chunk names, cache-friendly CDN headers",
]
for s in strengths:
    add_bullet("✅  " + s, colour=C_GREEN)

add_h2("Remaining Technical Debt")
issues = [
    ("No pagination on leads table",
     "All leads fetched at once via onSnapshot. Fine for <500 leads; add Firestore cursor-based pagination if collection grows large."),
    ("Test suite still minimal",
     "4 smoke tests for AdminRoute. No tests for ContactForm validation, LeadsTable filters, or AnalyticsView data transforms."),
    ("No manualChunks for admin sub-components",
     "LeadDetailsModal, ActivityTimeline, SummaryCards are in the Admin chunk (22 KB). Acceptable; no action needed unless chunk exceeds 100 KB."),
    ("Browser Notification API — no service worker",
     "Notifications only work while the tab is open. A Firebase Cloud Messaging integration would allow background push notifications."),
    ("Notes field is flat text only",
     "Internal notes are a plain textarea. No history, no author attribution. Consider adding a sub-collection for audit trail if needed."),
    ("No email-on-new-lead",
     "Admin must have the tab open to see real-time updates. A Firebase Cloud Function triggered on Firestore onCreate could send an email via SendGrid."),
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
#  SECTION 8 – OPEN ISSUES & BUGS
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("8 · Open Issues & Remaining Bugs")
add_three_col_table([
    ("🟠", "MEDIUM", "No pagination on leads. All documents fetched on every onSnapshot call.\n→ Add Firestore limit() + startAfter() cursor pagination if leads > 500"),
    ("🟠", "MEDIUM", "Browser notifications only work with tab open. No background push.\n→ Integrate Firebase Cloud Messaging + service worker for background alerts"),
    ("🟠", "MEDIUM", "No email notification on new lead arrival.\n→ Firebase Cloud Function: onCreate trigger → SendGrid/Nodemailer email to admin"),
    ("🟡", "LOW",    "Test coverage is minimal (4 smoke tests only).\n→ Add tests for ContactForm (Zod validation), LeadsTable (filter logic), analytics data transforms"),
    ("🟡", "LOW",    "No CSV export for analytics data — only leads table is exportable.\n→ Add Export Chart Data button in AnalyticsView"),
    ("🟡", "LOW",    "Notes field shows no edit history or author.\n→ Consider sub-collection 'notes' [{author, text, timestamp}] for audit trail"),
    ("🟡", "LOW",    "No lead re-assignment or team member tagging.\n→ Phase 5 feature if the agency scales to multiple team members"),
    ("ℹ️", "INFO",   "VITE_ADMIN_EMAIL is baked into the JS bundle (visible in DevTools).\n→ Mitigated by Firestore server-side rule; no action unless company email changes"),
    ("ℹ️", "INFO",   "recharts has no dark mode Legend component matched to design.\n→ Pie chart Legend removed in Phase 4 fix; acceptable with current layout"),
    ("✅", "FIXED",  "Pricing nav link scrolled to empty element. Fixed in Phase 1."),
    ("✅", "FIXED",  "CTA buttons had no action. Fixed in Phase 1 — wired to WhatsApp / contact form."),
    ("✅", "FIXED",  "Dual toast system (Toaster + Sonner). Fixed — only Sonner remains."),
    ("✅", "FIXED",  "Dead bun.lockb lockfile. Removed in Phase 3."),
    ("✅", "FIXED",  "Browserslist DB stale. Updated in Phase 3."),
], headers=["", "Severity", "Description"])


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 9 – WHAT'S WORKING WELL
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("9 · What's Working Well")
wins = [
    "End-to-end lead pipeline: ContactForm → Firestore → Admin table → status update",
    "Real-time admin dashboard — onSnapshot updates instantly on new form submission",
    "Multi-select status filter + bulk actions — power-user-level lead management",
    "LeadDetailsModal with editable notes — internal CRM-like workflow in the browser",
    "CSV export — one-click download of all filtered leads including notes",
    "Real-time notifications — toast on new lead + Browser Notification API consent + Settings toggle",
    "Activity timeline — chronological history of all lead activity with status color dots",
    "Week-over-week trend on Total Leads card — business intelligence at a glance",
    "Dark-theme recharts — all tooltips and axes use CSS custom properties",
    "Defense in depth security — AdminRoute client guard + Firestore server-side rule",
    "Code-split admin — 155 KB recharts chunk only loads when admin visits /admin",
    "React ErrorBoundary — admin panel crashes gracefully with reload button",
    "LeadsTableSkeleton — polished loading state instead of blank screen",
    "manualChunks vite config — firebase / charts / motion / vendor all async",
    "IntersectionObserver navbar — active section tracking, properly cleaned up on unmount",
    "Portfolio modal with AnimatePresence — case study overlay, metrics, tags",
    "Floating WhatsApp button — pulse animation, tooltip, hidden on auth pages",
    "Zero TypeScript errors, 5 tests passing, no linter warnings",
    "Bundle well within budget — 86 KB gzip for public app code",
    "Firebase Hosting headers — cache + SAMEORIGIN configured via firebase.json",
]
for w in wins:
    add_bullet("✅  " + w, colour=C_GREEN)

doc.add_paragraph()


# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 10 – PHASE 5 RECOMMENDATIONS
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("10 · Phase 5 Recommendations")

add_h2("🔴 High Value — Do Next")
p5_high = [
    ("Email notification on new lead",
     "Firebase Cloud Function (onCreate trigger on 'leads' collection) → send email via SendGrid or Resend to admin email with lead details. Cost: ~$0/month on free tier."),
    ("Real test coverage",
     "Write tests for: ContactForm (Zod errors on bad phone), LeadsTable (filter combinations), AnalyticsView (data aggregation). Target 80% coverage on business logic."),
    ("Calendly integration",
     "Replace 'Book Free Call' WhatsApp deeplink with Calendly popup widget. Automated scheduling removes back-and-forth phone tag and improves conversion rate."),
]
for title, desc in p5_high:
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.space_after = Pt(3)
    r1 = p.add_run(title+"\n"); r1.bold = True; r1.font.size = Pt(10.5); r1.font.color.rgb = C_RED
    r2 = p.add_run(desc); r2.font.size = Pt(10); r2.font.color.rgb = C_TEXT

add_h2("🟠 Medium — Improve Over Time")
p5_med = [
    ("Firebase Cloud Messaging (FCM)",
     "Background push notifications so admin is alerted to new leads even without the browser tab open."),
    ("Lead pagination",
     "Firestore limit(25) + startAfter(lastDoc) cursor pagination in LeadsTable. Required when leads > 500 for performance."),
    ("Google Analytics (GA4)",
     "Add gtag.js behind a cookie consent banner. Track page views, CTA clicks, form conversion funnel."),
    ("Blog / SEO content",
     "MDX-based blog on a subdomain or /blog route. 3-5 articles targeting Indian SME web design keywords — highest long-term ROI for organic traffic."),
    ("Portfolio real screenshots",
     "Replace Lucide icon placeholders in portfolio cards with actual client website screenshots."),
]
for title, desc in p5_med:
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.space_after = Pt(3)
    r1 = p.add_run(title+"\n"); r1.bold = True; r1.font.size = Pt(10.5); r1.font.color.rgb = C_ORANGE
    r2 = p.add_run(desc); r2.font.size = Pt(10); r2.font.color.rgb = C_TEXT

add_h2("🟡 Nice to Have")
p5_low = [
    "Lead notes history — sub-collection with [{author, text, timestamp}] for audit trail.",
    "Analytics CSV export — export chart data (line/pie/bar) as CSV from AnalyticsView.",
    "Team member tagging — assign leads to team members (requires multi-user auth + role system).",
    "Lead source tracking — UTM parameter capture on ContactForm for marketing attribution.",
    "Dark/light mode toggle — add light mode CSS tokens to complement current dark-first design.",
    "PWA manifest — add a web manifest + service worker for 'Add to Home Screen' on mobile.",
    "Automated deploy — GitHub Actions CI: run tests → build → firebase deploy on push to main.",
]
for item in p5_low:
    add_bullet(item)


# ═══════════════════════════════════════════════════════════════════════════════
#  SUMMARY SCORES
# ═══════════════════════════════════════════════════════════════════════════════
doc.add_page_break()
add_h1("Summary Scores — Post Phase 4")

add_score_table([
    ("Project Structure",        "9/10"),
    ("Design & UI/UX",           "9/10"),
    ("Code Quality",             "8/10"),
    ("Routing & Navigation",     "9/10"),
    ("Firebase Auth",            "9/10"),
    ("Firebase Firestore",       "9/10"),
    ("Admin Panel",              "9/10"),
    ("Security",                 "8/10"),
    ("Performance / Bundles",    "9/10"),
    ("Testing",                  "4/10"),
    ("Production Readiness",     "9/10"),
])

add_body(
    "Overall Verdict — Phase 4 Complete:\n\n"
    "Scalvicon has evolved from a static marketing mockup into a fully functional, "
    "production-grade agency platform. The public site captures leads via a validated "
    "contact form; the admin panel provides real-time lead management with multi-select "
    "filters, bulk actions, internal CRM notes, CSV export, browser notifications, an "
    "activity timeline, and trend-aware stat cards. Security is hardened with both "
    "client-side and Firestore server-side rules. Performance is optimized via code "
    "splitting, with recharts only loading for admin users.\n\n"
    "The single biggest opportunity remaining is email-on-new-lead notification "
    "(a 30-minute Firebase Cloud Function task) and expanding the test suite.",
    bold=False, colour=C_TEXT
)

# ─── Footer ───────────────────────────────────────────────────────────────────
footer = doc.sections[0].footer
fp = footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
fr = fp.add_run(f"Scalvicon — Confidential Project Audit  |  Phase 1–4  |  Generated {TODAY}")
fr.font.size = Pt(8); fr.font.color.rgb = RGBColor(0xAA,0xAA,0xAA); fr.italic = True

# ─── Save ─────────────────────────────────────────────────────────────────────
output_path = "Scalvicon_Project_Audit_Report.docx"
doc.save(output_path)
print(f"✅  Report saved → {output_path}")
