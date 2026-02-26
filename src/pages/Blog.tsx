import { useState, useEffect, useMemo } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight, Search, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/types/blog";
import { BLOG_CATEGORIES } from "@/types/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/animations";

// ─── Reading time estimate ────────────────────────────────────────────────────
const readingTime = (content: string) =>
    Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

// ─── Post Card ───────────────────────────────────────────────────────────────
const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.article
        variants={fadeUp}
        custom={index}
        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
        {/* Cover */}
        {post.coverImage ? (
            <div className="aspect-video overflow-hidden">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        ) : (
            <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
                <BookOpen size={40} className="text-primary/30" />
            </div>
        )}

        <div className="flex flex-col flex-1 p-6">
            {/* Category + read time */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <Clock size={11} />
                    {readingTime(post.content)} min read
                </span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">
                {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            <Tag size={8} />#{t}
                        </span>
                    ))}
                </div>
            )}

            {/* Meta + CTA */}
            <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={11} />
                    {post.publishedAt
                        ? format(post.publishedAt.toDate(), "dd MMM yyyy")
                        : "Draft"}
                </div>
                <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                >
                    Read More <ArrowRight size={13} />
                </Link>
            </div>
        </div>
    </motion.article>
);

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
        <div className="aspect-video bg-muted" />
        <div className="p-6 space-y-3">
            <div className="h-4 w-24 bg-muted rounded-full" />
            <div className="h-5 w-full bg-muted rounded-lg" />
            <div className="h-4 w-3/4 bg-muted rounded-lg" />
            <div className="h-4 w-1/2 bg-muted rounded-lg" />
        </div>
    </div>
);

// ─── Main Blog page ───────────────────────────────────────────────────────────
const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const q = query(
            collection(db, "blog"),
            where("status", "==", "published"),
            orderBy("publishedAt", "desc"),
        );
        const unsub = onSnapshot(q, (snap) => {
            setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as BlogPost[]);
            setLoading(false);
        }, () => setLoading(false));
        return () => unsub();
    }, []);

    const categories = useMemo(
        () => ["all", ...BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c))],
        [posts],
    );

    const filtered = useMemo(() => {
        return posts.filter((p) => {
            const matchCat = selectedCategory === "all" || p.category === selectedCategory;
            const matchSearch =
                search.trim() === "" ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                p.tags?.some((t) => t.includes(search.toLowerCase()));
            return matchCat && matchSearch;
        });
    }, [posts, selectedCategory, search]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEO
                title="Blog — Web Development & SEO Tips for Indian Businesses"
                description="Expert insights on web development, SEO, and digital marketing for Indian SMEs. Grow your business online with Scalvicon."
                url="https://scalvicon-9bf2f.web.app/blog"
                keywords="web development tips India, SEO guide India, Indian SME digital marketing, website design blog"
            />
            <Navbar />

            <main className="pt-24">
                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="container mx-auto px-4 md:px-8 py-16 text-center">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4"
                    >
                        Scalvicon <span className="text-primary">Blog</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
                    >
                        Web development insights, SEO tips, and success stories from Indian businesses
                    </motion.p>

                    {/* Search */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="relative max-w-md mx-auto"
                    >
                        <Search
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search posts…"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                    </motion.div>
                </section>

                {/* ── Category filter ───────────────────────────────────── */}
                <div className="container mx-auto px-4 md:px-8 pb-8">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-5 py-2 rounded-full text-sm font-medium transition-all border",
                                    selectedCategory === cat
                                        ? "bg-primary text-background border-primary shadow-lg shadow-primary/20"
                                        : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground",
                                )}
                            >
                                {cat === "all" ? "All Posts" : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Grid ─────────────────────────────────────────────── */}
                <div className="container mx-auto px-4 md:px-8 pb-24">
                    {loading ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-4"
                            >
                                <BookOpen size={48} className="opacity-20" />
                                <p className="text-sm">
                                    {posts.length === 0
                                        ? "No blog posts yet. Check back soon!"
                                        : "No posts match your search."}
                                </p>
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {filtered.map((post, i) => (
                                <PostCard key={post.id} post={post} index={i} />
                            ))}
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
