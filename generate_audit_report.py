"""
WebCraft Ascend – Project Audit Report Generator
Generates a fully formatted Word (.docx) document.
Run: python3 generate_audit_report.py
"""

from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import datetime

# ─── Colour palette ──────────────────────────────────────────────────────────
C_DARK_BG    = RGBColor(0x0D, 0x16, 0x1F)   # near-black navy
C_PRIMARY    = RGBColor(0x00, 0xE5, 0xA0)   # green accent
C_HEADING    = RGBColor(0x0D, 0x16, 0x1F)   # dark for body headings
C_WHITE      = RGBColor(0xFF, 0xFF, 0xFF)
C_LIGHT_GREY = RGBColor(0xF5, 0xF5, 0xF5)
C_MID_GREY   = RGBColor(0xDD, 0xDD, 0xDD)
C_TEXT       = RGBColor(0x1A, 0x1A, 0x2E)
C_RED        = RGBColor(0xC0, 0x39, 0x2B)
C_ORANGE     = RGBColor(0xE6, 0x7E, 0x22)
C_YELLOW     = RGBColor(0xF3, 0x9C, 0x12)
C_GREEN      = RGBColor(0x27, 0xAE, 0x60)
C_BLUE       = RGBColor(0x29, 0x80, 0xB9)

doc = Document()

# ─── Page setup ──────────────────────────────────────────────────────────────
section = doc.sections[0]
section.page_width  = Inches(8.5)
section.page_height = Inches(11)
section.left_margin   = Inches(1)
section.right_margin  = Inches(1)
section.top_margin    = Inches(0.8)
section.bottom_margin = Inches(0.8)

# ─── Helpers ─────────────────────────────────────────────────────────────────

def set_cell_bg(cell, hex_color: str):
    """Set table cell background shading."""
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
    run.bold      = True
    run.font.size = Pt(22)
    run.font.color.rgb = C_WHITE

    # shade whole paragraph dark
    pPr  = p._p.get_or_add_pPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  "0D161F")
    pPr.append(shd)

    # left thick border as accent
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
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after  = Pt(4)
    run = p.add_run(text)
    run.bold      = True
    run.font.size = Pt(14)
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
    run.font.size  = Pt(10.5)
    run.bold   = bold
    run.italic = italic
    if colour:
        run.font.color.rgb = colour
    else:
        run.font.color.rgb = C_TEXT
    return p


def add_bullet(text: str, level=0, colour=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after  = Pt(2)
    p.paragraph_format.left_indent  = Inches(0.3 + level * 0.25)
    run = p.add_run(text)
    run.font.size = Pt(10)
    if colour:
        run.font.color.rgb = colour
    else:
        run.font.color.rgb = C_TEXT
    return p


def add_code(text: str):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.left_indent = Inches(0.35)
    run = p.add_run(text)
    run.font.name = "Courier New"
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0xC0, 0x39, 0x2B)

    pPr = p._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  "F0F0F0")
    pPr.append(shd)
    return p


def add_two_col_table(rows, header=None, header_bg="0D161F"):
    """Create a 2-column table with optional header row."""
    col_count = 2
    table = doc.add_table(rows=len(rows) + (1 if header else 0), cols=col_count)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.LEFT

    # set column widths
    for row in table.rows:
        row.cells[0].width = Inches(2.5)
        row.cells[1].width = Inches(4.0)

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
        set_cell_bg(c0, bg)
        set_cell_bg(c1, bg)
        r0 = c0.paragraphs[0].add_run(col_a)
        r0.font.size = Pt(9.5)
        r0.font.color.rgb = C_TEXT
        r1 = c1.paragraphs[0].add_run(col_b)
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = C_TEXT

    doc.add_paragraph()  # spacing after table


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
        run.bold = True
        run.font.color.rgb = C_WHITE
        run.font.size = Pt(9.5)

    severity_colors = {
        "🔴": "FADBD8",
        "🟠": "FAE5D3",
        "🟡": "FEF9E7",
        "ℹ️": "EBF5FB",
    }

    for ri, row_data in enumerate(rows):
        actual_row = ri + 1
        bg = "FFFFFF"
        for emoji, colour in severity_colors.items():
            if emoji in row_data[0]:
                bg = colour
                break
        for ci, val in enumerate(row_data):
            c = table.rows[actual_row].cells[ci]
            set_cell_bg(c, bg)
            run = c.paragraphs[0].add_run(val)
            run.font.size = Pt(9)
            run.font.color.rgb = C_TEXT

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
        run.bold = True
        run.font.color.rgb = C_WHITE
        run.font.size = Pt(9.5)

    def score_bg(score):
        if "N/A" in score: return "EBF5FB"
        val = int(score.replace("/10", ""))
        if val >= 8: return "D5F5E3"
        if val >= 6: return "FEF9E7"
        return "FADBD8"

    for ri, (area, score) in enumerate(rows):
        actual_row = ri + 1
        bg = score_bg(score)
        c0 = table.rows[actual_row].cells[0]
        c1 = table.rows[actual_row].cells[1]
        set_cell_bg(c0, bg)
        set_cell_bg(c1, bg)
        r0 = c0.paragraphs[0].add_run(area)
        r0.font.size = Pt(9.5)
        r0.font.color.rgb = C_TEXT
        r1 = c1.paragraphs[0].add_run(score)
        r1.font.size = Pt(9.5)
        r1.bold = True
        r1.font.color.rgb = C_TEXT

    doc.add_paragraph()


# ═══════════════════════════════════════════════════════════════════════════════
#  COVER PAGE
# ═══════════════════════════════════════════════════════════════════════════════

# Title block
p = doc.add_paragraph()
p.paragraph_format.space_before = Pt(60)
p.paragraph_format.space_after  = Pt(4)
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("WebCraft Ascend")
run.bold = True
run.font.size = Pt(34)
run.font.color.rgb = C_PRIMARY

p2 = doc.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
p2.paragraph_format.space_after = Pt(6)
run2 = p2.add_run("Complete Project Audit Report")
run2.bold = True
run2.font.size = Pt(20)
run2.font.color.rgb = C_DARK_BG

p3 = doc.add_paragraph()
p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
run3 = p3.add_run(f"Audit Date: 23 February 2026   •   Prepared by: Senior Software Engineer")
run3.font.size = Pt(10)
run3.font.color.rgb = RGBColor(0x66, 0x66, 0x66)
run3.italic = True

doc.add_paragraph()

# Summary banner
table_banner = doc.add_table(rows=1, cols=4)
table_banner.alignment = WD_TABLE_ALIGNMENT.CENTER
banner_data = [
    ("React 18 + Vite 5", "Stack"),
    ("TypeScript + Tailwind", "Styling"),
    ("Marketing Landing Page", "Type"),
    ("Indian SME Agency", "Purpose"),
]
banner_colors = ["0D161F", "1A2A3A", "0D161F", "1A2A3A"]
for ci, ((val, label), bg) in enumerate(zip(banner_data, banner_colors)):
    cell = table_banner.rows[0].cells[ci]
    set_cell_bg(cell, bg)
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    vrun = cell.paragraphs[0].add_run(val + "\n")
    vrun.bold = True
    vrun.font.color.rgb = C_PRIMARY
    vrun.font.size = Pt(10)
    lrun = cell.paragraphs[0].add_run(label)
    lrun.font.color.rgb = C_WHITE
    lrun.font.size = Pt(8)

doc.add_page_break()

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 1 – PROJECT STRUCTURE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("1 · Project Structure & Files")
add_body("The project is a Vite + React + TypeScript SPA scaffolded via the Lovable platform using the shadcn/ui template.")

add_h2("Root-Level Files")
add_two_col_table([
    ("index.html",            "SPA entry point; holds meta tags, OG/Twitter cards, page title"),
    ("package.json",          "Dependency manifest and npm scripts"),
    ("vite.config.ts",        "Vite build config with SWC plugin, path alias (@), dev-server settings"),
    ("tailwind.config.ts",    "Tailwind design system — custom colors, fonts, border radii, shadows"),
    ("components.json",       "shadcn/ui CLI configuration (style, aliases, CSS variables)"),
    ("tsconfig*.json (×3)",   "TypeScript configs for app and node contexts"),
    ("vitest.config.ts",      "Vitest test runner config (jsdom environment)"),
    ("postcss.config.js",     "PostCSS config (Tailwind + autoprefixer)"),
    ("eslint.config.js",      "ESLint config for React + TypeScript"),
    ("bun.lockb",             "⚠️ Bun lockfile — conflicts with package-lock.json"),
    (".gitignore",            "Standard ignores; correctly excludes node_modules, dist, .env*"),
    ("README.md",             "⚠️ Boilerplate Lovable README with placeholder project ID"),
], header=["File", "Purpose"])

add_h2("src/ Directory")
add_two_col_table([
    ("main.tsx",                "App entry point — mounts React root into #root div"),
    ("App.tsx",                 "Top-level component — global providers, BrowserRouter, routes"),
    ("App.css",                 "⚠️ DEAD FILE — Vite boilerplate, never imported"),
    ("index.css",               "Global styles, CSS design tokens, utility classes, keyframe animations"),
    ("vite-env.d.ts",           "Vite environment type declarations"),
    ("pages/Index.tsx",         "Home page — assembles all landing page sections in order"),
    ("pages/NotFound.tsx",      "404 error page"),
    ("components/Navbar.tsx",   "Fixed top nav with desktop links + mobile hamburger"),
    ("components/Hero.tsx",     "Hero section with animated mockup cards and CTAs"),
    ("components/MarqueeTicker.tsx", "Infinite scrolling ticker of industry types"),
    ("components/PainPoints.tsx","Problem-framing section (4 pain point cards)"),
    ("components/Services.tsx", "⚠️ MISLABELED — actually renders pricing tiers, not services"),
    ("components/Process.tsx",  "5-step delivery timeline with desktop + mobile layouts"),
    ("components/Portfolio.tsx","Filterable portfolio case studies"),
    ("components/Testimonials.tsx","3 client quotes + differentiator badges"),
    ("components/FAQSection.tsx","Custom accordion FAQ (6 items)"),
    ("components/CTASection.tsx","Booking call-to-action section"),
    ("components/Footer.tsx",   "4-column footer with brand, services, company, contact"),
    ("components/NavLink.tsx",  "⚠️ UNUSED — Router-aware NavLink wrapper, never imported"),
    ("components/ui/ (49 files)","shadcn/ui primitives — many are installed but not used"),
    ("hooks/use-mobile.tsx",    "useIsMobile() hook using matchMedia"),
    ("hooks/use-toast.ts",      "Custom toast state manager (reducer + pub/sub pattern)"),
    ("lib/animations.ts",       "Centralized Framer Motion variant presets (fadeUp, stagger, etc.)"),
    ("lib/utils.ts",            "cn() classname helper (clsx + tailwind-merge)"),
    ("test/example.test.ts",    "Placeholder test — expect(true).toBe(true)"),
    ("test/setup.ts",           "jsdom + jest-dom test environment setup"),
], header=["File / Path", "Purpose"])

add_h2("Missing / Redundant / Misplaced Files")
add_two_col_table([
    ("App.css",                       "Dead Vite boilerplate — not imported anywhere, safe to delete"),
    ("NavLink.tsx",                   "Defined, exported, never used — delete or wire into Navbar"),
    ("components/ui/use-toast.ts",    "Thin re-export duplicate of hooks/use-toast.ts"),
    ("No .env / .env.example",        "Zero environment configuration files exist"),
    ("No services/ or api/ folder",   "Fine now (static), needed when backend is added"),
    ("bun.lockb + package-lock.json", "Two lockfiles from two different package managers"),
    ("README.md (placeholders)",      "REPLACE_WITH_PROJECT_ID still present; author: Lovable in index.html"),
], header=["Issue", "Detail"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 2 – WEBSITE IDEA
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("2 · Website Idea & Purpose")
add_two_col_table([
    ("What it does",        "Marketing / agency landing page for 'WebCraft' — an Indian web design & development studio"),
    ("Target audience",     "Indian SMEs: restaurants, clinics, salons, real estate agencies, retail stores, etc."),
    ("Problem solved",      "Positions the agency as the solution for SMEs with outdated, slow, or non-existent websites"),
    ("Reflected in code?",  "✅ Yes — pricing in INR (₹), India-specific copy, case studies, FAQ answers all tightly aligned"),
], header=["Dimension", "Assessment"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 3 – ARCHITECTURE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("3 · Architecture Overview")
add_two_col_table([
    ("Architecture",        "Single-Page Application (SPA) — component-based, no server"),
    ("Framework",           "React 18.3 + TypeScript 5.8"),
    ("Build tool",          "Vite 5.4 with @vitejs/plugin-react-swc (SWC compiler)"),
    ("Styling",             "Tailwind CSS 3.4 + tailwindcss-animate + CSS custom properties (HSL design tokens)"),
    ("Component library",   "shadcn/ui (49 primitives installed via Radix UI)"),
    ("Animations",          "Framer Motion 12"),
    ("Routing",             "React Router DOM v6 — BrowserRouter + Routes (currently 2 routes)"),
    ("State management",    "None — purely UI driven. React Query is wired but never used"),
    ("Backend",             "❌ None — fully static, no API calls"),
    ("Third-party integrations", "lovable-tagger (dev-only, Lovable platform tooling); Google Fonts (CSS @import)"),
    ("Font stack",          "Syne (display/headings), DM Sans (body), JetBrains Mono (mono/labels)"),
], header=["Dimension", "Detail"])

add_body("⚠️  Naming confusion: Services.tsx renders pricing plans, but the nav labels and section headings say 'Services'/'Packages'. There is no dedicated Services section describing what the agency actually does.", bold=True, colour=C_ORANGE)

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 4 – FIREBASE
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("4 · Firebase Initialization Check")
add_body("Firebase is completely absent from this project. No imports, no config, no services.", bold=True, colour=C_BLUE)
add_two_col_table([
    ("Firebase present?",               "❌ Not used at all"),
    ("initializeApp / firebaseConfig",  "Not found anywhere in the codebase"),
    ("Firebase service imports",        "Zero — Auth, Firestore, Storage, Functions: none"),
    ("Config security",                 "N/A"),
    ("Multiple initializations",        "N/A"),
    ("Modular SDK vs compat",           "N/A"),
], header=["Check", "Result"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 5 – CONFIGURATION & ENVIRONMENT
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("5 · Configuration & Environment")
add_two_col_table([
    (".env files",              "❌ None exist"),
    (".env.example",            "❌ Not present"),
    ("Hardcoded sensitive data","⚠️ Signed Google Cloud Storage URLs in index.html (lines 15, 19) expose GoogleAccessId and signature from the Lovable/GPT-Engineer platform"),
    ("package.json name",       "⚠️ Still 'vite_react_shadcn_ts' — the Lovable template default"),
    ("package.json version",    "Still '0.0.0' — not updated"),
    ("Two lockfiles",           "⚠️ bun.lockb and package-lock.json coexist — pick one package manager"),
], header=["Check", "Status"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 6 – CODE QUALITY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("6 · Component & Code Quality")

add_h2("Strengths")
strengths = [
    "Clean, focused, single-responsibility section components",
    "Framer Motion variants centralized in src/lib/animations.ts — no duplicated animation config",
    "cn() utility properly set up and consistently used for conditional classnames",
    "TypeScript throughout — no any types spotted",
    "Responsive desktop + mobile layouts in every component",
]
for s in strengths:
    add_bullet("✅  " + s, colour=C_GREEN)

add_h2("Issues & Anti-Patterns")

issues = [
    ("Data hardcoded inline in components",
     "plans, projects, testimonials, faqs, steps, pains — all defined as arrays inside component files. Fine for now, but means no CMS, no separation of data from presentation."),
    ("Services.tsx is mislabeled",
     "Renders pricing tiers, not services. The section id is #services but heading says 'Simple, Transparent Pricing'. Should be renamed Pricing.tsx."),
    ("scrollTo() duplicated",
     "Identical scrollTo function defined independently in Hero.tsx (line 6) and Navbar.tsx (line 10). Extract to src/lib/utils.ts."),
    ("@tanstack/react-query wired but never used",
     "QueryClientProvider wraps the app in App.tsx but no useQuery or useMutation is called anywhere. Adds ~50KB to bundle for zero benefit."),
    ("NavLink.tsx never imported",
     "Defined and exported but no file imports it. The Navbar uses plain <button> elements."),
    ("App.css is dead code",
     "Contains Vite starter boilerplate (#root { max-width: 1280px }) that would conflict with full-width layout if imported."),
    ("MarqueeTicker uses index as React key on duplicated array",
     "[...items, ...items].map((item, i) => <span key={i}>) — index key on a duplicated array is an anti-pattern."),
    ("CTASection CTA button is non-functional",
     "'Book Your Free Call' button has no onClick handler — no form, no Calendly, no WhatsApp link."),
    ("Footer links are dead #anchors",
     "All footer nav items (About Us, Blog, Careers) and social links (WhatsApp, Instagram, LinkedIn) are href='#'."),
    ("TOAST_REMOVE_DELAY = 1,000,000ms",
     "Toasts linger in memory for ~16 minutes before cleanup. Should be 3000–6000ms."),
    ("stagger variant missing hidden state",
     "The stagger Variants object only defines visible. Children must always define their own hidden — fragile."),
    ("Dual toast system",
     "<Toaster> (shadcn Radix) and <Sonner> are both mounted in App.tsx. They serve the same purpose — use only one."),
]
for title, desc in issues:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.left_indent = Inches(0.3)
    r1 = p.add_run("⚠️  " + title + " — ")
    r1.bold = True
    r1.font.size = Pt(10)
    r1.font.color.rgb = C_ORANGE
    r2 = p.add_run(desc)
    r2.font.size = Pt(10)
    r2.font.color.rgb = C_TEXT

doc.add_paragraph()

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 7 – UI/UX & STYLING
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("7 · UI/UX & Styling")
add_two_col_table([
    ("Styling approach",    "Tailwind CSS 3 + CSS custom properties (HSL design tokens in :root)"),
    ("Design system",       "✅ Consistent — Syne/DM Sans/JetBrains Mono fonts, green/blue/gold/orange palette, named radii & shadows"),
    ("Dark mode",           "✅ Dark-first design; no light mode tokens defined (intentional)"),
    ("Responsiveness",      "✅ Responsive grids, mobile hamburger nav, mobile process layout"),
    ("Animations",          "✅ Scroll-triggered fadeUp, floating hero cards, marquee ticker, drift orbs — all transform-only (performant)"),
    ("Consistency",         "✅ .section-padding, .card-shadow, .glow-green, .dot-grid-bg utilities used throughout"),
    ("Google Fonts loading","⚠️ Loaded via CSS @import — slower than <link rel='preload'> in index.html"),
    ("Portfolio images",    "⚠️ Cards show only a large letter initial — no real screenshots or mockups"),
    ("App.css conflict",    "⚠️ If App.css were imported, #root { max-width:1280px; padding:2rem } would break full-width layout"),
], header=["Dimension", "Assessment"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 8 – ROUTING & NAVIGATION
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("8 · Routing & Navigation")
add_two_col_table([
    ("Router",              "React Router DOM v6 — BrowserRouter"),
    ("Defined routes",      "/ → Index page,  * → NotFound (404 catch-all)"),
    ("Protected routes",    "N/A — no authentication"),
    ("404 page",            "✅ Exists — NotFound.tsx logs error, provides home link"),
    ("Navigation style",    "Hash-based smooth scroll (single-page) — not multi-page routing"),
    ("NotFound home link",  "⚠️ Uses <a href='/'> — should use React Router <Link to='/'> to avoid full page reload"),
    ("Pricing scroll bug",  "⚠️ Index.tsx line 23: <section id='pricing' /> is an empty self-closing element. Services.tsx has id='services'. Clicking 'Pricing' in nav scrolls to an empty point."),
], header=["Check", "Status"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 9 – AUTHENTICATION & SECURITY
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("9 · Authentication & Security")
add_two_col_table([
    ("Authentication",      "❌ None — not required for a static marketing site"),
    ("Protected routes",    "N/A"),
    ("Session management",  "N/A"),
    ("XSS risks",           "Low — no user-generated content rendered"),
    ("HTTPS",               "Depends on hosting; Vite dev server does not enforce HTTPS"),
    ("console.error in 404","Minor — logs user-attempted paths; acceptable for debug, remove in production"),
], header=["Check", "Status"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 10 – BUGS & ISSUES
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("10 · Potential Issues & Bugs")
add_three_col_table([
    ("🔴", "HIGH",  "Pricing nav link scrolls to empty <section id='pricing' />, not the actual pricing content\n→ Index.tsx:23, Services.tsx:27"),
    ("🔴", "HIGH",  "'Book Free Call' / 'Book Your Free Call' buttons have no action — no form, Calendly, or WhatsApp redirect\n→ CTASection.tsx:16, Hero.tsx:31, Navbar.tsx:35,67"),
    ("🟠", "MEDIUM","TOAST_REMOVE_DELAY = 1,000,000ms — toasts stay in memory ~16 minutes\n→ hooks/use-toast.ts:6"),
    ("🟠", "MEDIUM","@tanstack/react-query installed and wired but never used — dead bundle weight (~50KB)\n→ App.tsx:4,9,12"),
    ("🟠", "MEDIUM","Duplicate scrollTo() function defined in both Hero.tsx and Navbar.tsx"),
    ("🟠", "MEDIUM","Two toast libraries mounted simultaneously (<Toaster> + <Sonner>)\n→ App.tsx:1-2,14-15"),
    ("🟡", "LOW",   "NavLink.tsx component defined but never imported anywhere"),
    ("🟡", "LOW",   "App.css contains dead Vite boilerplate, not imported anywhere"),
    ("🟡", "LOW",   "MarqueeTicker uses array index as React key on a duplicated array\n→ MarqueeTicker.tsx:15"),
    ("🟡", "LOW",   "NotFound.tsx uses <a href='/'> instead of React Router <Link to='/'> — causes full page reload\n→ NotFound.tsx:16"),
    ("🟡", "LOW",   "Footer social/company links are all href='#' — completely dead\n→ Footer.tsx:25-50"),
    ("🟡", "LOW",   "package.json name is still 'vite_react_shadcn_ts' (template default)"),
    ("🟡", "LOW",   "stagger variant has no 'hidden' key — fragile for children that don't define their own\n→ lib/animations.ts:8-10"),
    ("ℹ️", "INFO",  "Signed GCS URL with GoogleAccessId hardcoded in og:image / twitter:image\n→ index.html:15,19"),
    ("ℹ️", "INFO",  "bun.lockb and package-lock.json both exist (package manager ambiguity)"),
], headers=["", "Severity", "Description"])

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 11 – WHAT'S WORKING WELL
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("11 · What's Working Well")
wins = [
    "Beautiful, cohesive design system — HSL tokens, Syne + DM Sans typography, premium dark palette",
    "Smooth, performant animations — Framer Motion variants centralized in lib/animations.ts and consistently reused",
    "CSS micro-animations — ticker, float, drift and float-delayed are transform-only (GPU-accelerated)",
    "Mobile-first responsive — all sections use Tailwind responsive grids; mobile nav via AnimatePresence",
    "TypeScript throughout — no any types, forwardRef used correctly in NavLink.tsx",
    "Clean component separation — pages, components, hooks, lib all neatly organized",
    "Vitest + jsdom test infrastructure — ready for unit tests even if currently only a placeholder",
    "Portfolio category filter — AnimatePresence mode='wait' gives smooth transition between filtered views",
    "Custom FAQ accordion — Framer Motion height animation avoids the CLS artefacts of CSS max-height hacks",
    "Semantic HTML — <section>, <nav>, <footer>, correct h1/h2/h3 hierarchy",
    "index.html SEO basics — meta description, OG tags, Twitter card present",
    "Scroll-triggered animations use viewport={{ once: true }} — no re-triggering on scroll-up",
]
for w in wins:
    add_bullet("✅  " + w, colour=C_GREEN)

doc.add_paragraph()

# ═══════════════════════════════════════════════════════════════════════════════
#  SECTION 12 – RECOMMENDATIONS
# ═══════════════════════════════════════════════════════════════════════════════
add_h1("12 · Recommendations & Next Steps")

add_h2("🔴 Critical — Fix Before Launch")
criticals = [
    ("Fix the Pricing nav dead scroll",
     "Either rename id='pricing' in Index.tsx to fix the scroll target, or move id='pricing' onto Services.tsx (and rename the file to Pricing.tsx). Currently clicking 'Pricing' in the nav scrolls to an empty invisible element."),
    ("Wire the booking CTA buttons",
     "Integrate a real booking mechanism on all three 'Book Free Call' buttons: Calendly embed, WhatsApp deeplink (https://wa.me/91XXXXXXXXXX?text=...), or a form backed by Formspree / EmailJS. This is the single most critical revenue path on the page."),
    ("Replace expiring OG image URL",
     "Replace the signed GCS URL in index.html with a static file in public/og-image.png or an external CDN image you control."),
]
for title, desc in criticals:
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.space_after = Pt(3)
    r1 = p.add_run(title + "\n")
    r1.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = C_RED
    r2 = p.add_run(desc)
    r2.font.size = Pt(10)
    r2.font.color.rgb = C_TEXT

add_h2("🟠 Important — Address Soon")
importants = [
    ("Remove or use @tanstack/react-query",
     "If no API calls are planned, uninstall it. If backend integration is coming, start using it for form submissions or dynamic data (e.g., portfolio from a CMS)."),
    ("Pick one toast library",
     "Remove either <Toaster> (Radix-based shadcn) or <Sonner> from App.tsx. Sonner is the modern recommended choice."),
    ("Fix TOAST_REMOVE_DELAY",
     "Change TOAST_REMOVE_DELAY from 1000000 to 5000 (5 seconds) in hooks/use-toast.ts."),
    ("Extract scrollTo() utility",
     "Move to src/lib/utils.ts so it isn't duplicated between Hero.tsx and Navbar.tsx."),
    ("Fix NotFound.tsx home link",
     "Replace <a href='/'> with <Link to='/'> from react-router-dom to prevent a full page reload on 404 recovery."),
]
for title, desc in importants:
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.space_after = Pt(3)
    r1 = p.add_run(title + "\n")
    r1.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = C_ORANGE
    r2 = p.add_run(desc)
    r2.font.size = Pt(10)
    r2.font.color.rgb = C_TEXT

add_h2("🟡 Nice to Have — Polish & Technical Debt")
niceToHave = [
    "Delete App.css — dead Vite boilerplate.",
    "Delete or wire NavLink.tsx — currently orphaned.",
    "Update package.json: name → 'webcraft-ascend', version → '1.0.0'.",
    "Update README.md — replace all Lovable placeholder content with real project info.",
    "Fix MarqueeTicker key — use '${item}-${i}' instead of just i.",
    "Add hidden to the stagger variant in lib/animations.ts.",
    "Move Google Fonts to <link rel='preload'> in index.html for faster font loading.",
    "Add real footer links — About, Blog, Careers, WhatsApp, Instagram, LinkedIn.",
    "Resolve package manager ambiguity — delete bun.lockb (npm) or package-lock.json (bun), pick one.",
    "Add real portfolio screenshots — replace letter-initial placeholders with images.",
    "Write meaningful component tests — at minimum, smoke tests for Hero, Navbar, FAQSection.",
    "Create a data/ or content/ folder — move inline arrays (plans, projects, testimonials, faqs) there.",
    "Add .env.example — document any future environment variable requirements.",
    "Consider adding a 'Services' section — currently Services.tsx is just pricing; add a section describing what the agency actually does (web design, SEO, maintenance, etc.).",
]
for item in niceToHave:
    add_bullet(item)

# ═══════════════════════════════════════════════════════════════════════════════
#  SUMMARY SCORES
# ═══════════════════════════════════════════════════════════════════════════════
doc.add_page_break()
add_h1("Summary Score")

add_score_table([
    ("Project Structure",        "8/10"),
    ("Design & UI/UX",           "9/10"),
    ("Code Quality",             "7/10"),
    ("Routing & Navigation",     "7/10"),
    ("Firebase",                 "N/A"),
    ("Security",                 "8/10"),
    ("Testing",                  "2/10"),
    ("Production Readiness",     "5/10"),
])

add_body(
    "Overall Verdict: Solid foundation with a beautiful design system and smooth animations. "
    "The critical conversion paths — booking CTA buttons and the Pricing nav scroll — are broken "
    "and must be fixed before this site can serve its actual business purpose. "
    "Address the Critical and Important items first; the rest is polish.",
    bold=True, colour=C_DARK_BG
)

# ─── Footer on each page ─────────────────────────────────────────────────────
# (Word page footers via python-docx)
footer_section = doc.sections[0]
footer = footer_section.footer
fp = footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
fr = fp.add_run("WebCraft Ascend — Confidential Project Audit  |  Generated 23 Feb 2026")
fr.font.size = Pt(8)
fr.font.color.rgb = RGBColor(0xAA, 0xAA, 0xAA)
fr.italic = True

# ─── Save ────────────────────────────────────────────────────────────────────
output_path = "WebCraft_Ascend_Project_Audit_Report.docx"
doc.save(output_path)
print(f"✅  Report saved → {output_path}")
