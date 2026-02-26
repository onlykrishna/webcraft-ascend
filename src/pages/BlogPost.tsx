import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    collection, query, where, getDocs,
    updateDoc, doc, increment,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Share2, Eye, BookOpen } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import type { BlogPost as BlogPostType } from "@/types/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { fadeUp } from "@/lib/animations";

// ─── Reading time ─────────────────────────────────────────────────────────────
const readingTime = (content: string) =>
    Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const PostSkeleton = () => (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl animate-pulse space-y-6">
        <div className="h-4 w-24 bg-muted rounded-full" />
        <div className="h-10 w-full bg-muted rounded-xl" />
        <div className="h-6 w-2/3 bg-muted rounded-xl" />
        <div className="aspect-video w-full bg-muted rounded-2xl" />
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-muted rounded-lg" style={{ width: `${75 + (i % 3) * 10}%` }} />
        ))}
    </div>
);

// ─── Main BlogPost page ─────────────────────────────────────────────────────────
const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fetchPost = async () => {
            try {
                const q = query(
                    collection(db, "blog"),
                    where("slug", "==", slug),
                    where("status", "==", "published"),
                );
                const snap = await getDocs(q);
                if (snap.empty) { setLoading(false); return; }
                const p = { id: snap.docs[0].id, ...snap.docs[0].data() } as BlogPostType;
                setPost(p);
                // Increment view count (fire-and-forget)
                updateDoc(doc(db, "blog", p.id), { views: increment(1) }).catch(() => { });
            } catch {
                toast.error("Failed to load post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: post?.title, text: post?.excerpt, url }).catch(() => { });
        } else {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <PostSkeleton />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-6 py-24">
                    <BookOpen size={56} className="text-muted-foreground/30" />
                    <h1 className="text-4xl font-display font-bold text-foreground">Post Not Found</h1>
                    <p className="text-muted-foreground max-w-md">
                        The blog post you're looking for doesn't exist or is not yet published.
                    </p>
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-background font-semibold hover:bg-primary/90 transition-all"
                    >
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.coverImage}
                url={`https://scalvicon-9bf2f.web.app/blog/${post.slug}`}
                type="article"
                publishedTime={post.publishedAt ? post.publishedAt.toDate().toISOString() : undefined}
                author={post.author.name}
                keywords={post.tags?.join(", ")}
            />
            <Navbar />

            <article className="pt-24 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    {/* Back */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
                    >
                        <ArrowLeft size={14} /> Back to Blog
                    </Link>

                    {/* Header */}
                    <motion.header
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mb-10"
                    >
                        {/* Category + Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                {post.category}
                            </span>
                            {post.tags?.map((t) => (
                                <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                                    #{t}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-y border-border py-4">
                            <span className="flex items-center gap-1.5">
                                <User size={14} /> {post.author.name}
                            </span>
                            {post.publishedAt && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {format(post.publishedAt.toDate(), "MMMM d, yyyy")}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {readingTime(post.content)} min read
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Eye size={14} /> {post.views} views
                            </span>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors ml-auto"
                            >
                                <Share2 size={14} /> Share
                            </button>
                        </div>
                    </motion.header>

                    {/* Cover image */}
                    {post.coverImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="mb-10 overflow-hidden rounded-2xl"
                        >
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full max-h-[480px] object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-display prose-headings:text-foreground
                            prose-p:text-muted-foreground prose-p:leading-relaxed
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-foreground
                            prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-pre:bg-card prose-pre:border prose-pre:border-border
                            prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                            prose-hr:border-border"
                    >
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </motion.div>

                    {/* Tags */}
                    {post.tags?.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-border">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((t) => (
                                    <span
                                        key={t}
                                        className="px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                                    >
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center"
                    >
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                            Ready to Build Your Website?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Get a professional, SEO-optimized website for your business starting at just ₹14,999.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                to="/#contact"
                                className="px-6 py-3 rounded-xl bg-primary text-background font-semibold hover:bg-primary/90 transition-all"
                            >
                                Get Started Today
                            </Link>
                            <Link
                                to="/blog"
                                className="px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all text-sm"
                            >
                                More Articles →
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default BlogPost;
