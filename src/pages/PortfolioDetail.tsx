import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StickyContactBar } from '@/components/StickyContactBar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle,
    ExternalLink,
    Target,
    Lightbulb,
    Building2,
    Stethoscope,
    Sparkles,
    UtensilsCrossed,
    Dumbbell,
    Scale,
    Users, Search, Zap, Calendar, TrendingDown, PieChart, Clock,
    MessageCircle, MapPin, UserPlus, TrendingUp, FileText, Shield,
    ChartBar,
    LucideIcon
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { portfolioProjects, PortfolioProject } from '@/data/portfolio';

const iconMap: Record<string, LucideIcon> = {
    Stethoscope, Sparkles, Building2, UtensilsCrossed, Dumbbell, Scale,
    Users, Search, Zap, Calendar, TrendingDown, PieChart, Clock,
    MessageCircle, MapPin, UserPlus, TrendingUp, FileText, Shield,
};

export const PortfolioDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<PortfolioProject | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const found = portfolioProjects.find(p => p.slug === slug);
        setProject(found || null);
        setLoading(false);
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="container flex flex-1 flex-col items-center justify-center px-4">
                    <h1 className="mb-4 text-4xl font-bold">Case Study Not Found</h1>
                    <Link to="/#portfolio">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Portfolio
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const IconComponent = iconMap[project.icon] || ExternalLink;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title={`Case Study: ${project.title} | Scalvicon`}
                description={project.description}
                url={`https://scalvicon-9bf2f.web.app/portfolio/${project.slug}`}
            />

            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container mx-auto px-4 pt-32 pb-8">
                    {/* Breadcrumb Navigation */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link to="/#portfolio" className="hover:text-primary">Portfolio</Link>
                        <span>/</span>
                        <span className="text-foreground">{project.title}</span>
                    </nav>

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="mb-4 flex items-center gap-4">
                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} text-2xl`}>
                                <IconComponent style={{ color: project.accentColor }} size={32} />
                            </div>
                            <div>
                                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider font-mono">
                                    {project.category}
                                </div>
                                <h1 className="text-4xl font-bold md:text-5xl">{project.title}</h1>
                            </div>
                        </div>
                        <p className="mb-6 text-xl text-muted-foreground leading-relaxed">{project.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full border border-border text-sm text-muted-foreground bg-muted/30">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Quick Navigation */}
                <div className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur-lg">
                    <div className="container mx-auto px-4">
                        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
                            <a href="#metrics" className="whitespace-nowrap text-sm font-medium hover:text-primary text-foreground text-opacity-80">
                                Impact Metrics
                            </a>
                            {project.challenge && (
                                <a href="#challenge" className="whitespace-nowrap text-sm font-medium hover:text-primary text-foreground text-opacity-80">
                                    The Challenge
                                </a>
                            )}
                            {project.solutionTitle && (
                                <a href="#solution" className="whitespace-nowrap text-sm font-medium hover:text-primary text-foreground text-opacity-80">
                                    Our Solution
                                </a>
                            )}
                            {project.testimonial && (
                                <a href="#client" className="whitespace-nowrap text-sm font-medium hover:text-primary text-foreground text-opacity-80">
                                    Client Word
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Metrics Spotlight */}
                <section id="metrics" className="py-12 border-t bg-muted/30 border-b">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {project.metrics.map((metric, index) => {
                                const MIcon = iconMap[metric.icon] || ChartBar;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-card border border-border rounded-xl p-6 text-center card-shadow"
                                    >
                                        <div className="mx-auto w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${project.accentColor}15` }}>
                                            <MIcon size={24} style={{ color: project.accentColor }} />
                                        </div>
                                        <h3 className="text-4xl font-bold mb-2 font-display" style={{ color: project.accentColor }}>{metric.value}</h3>
                                        <p className="text-muted-foreground uppercase text-sm tracking-wider font-medium">{metric.label}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Core Content Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-3 gap-12">
                            {/* Left Col: Main Details */}
                            <div className="md:col-span-2 space-y-12">
                                {project.challenge && (
                                    <motion.div id="challenge" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Target className="text-destructive h-8 w-8" />
                                            <h2 className="text-3xl font-bold">The Challenge</h2>
                                        </div>
                                        <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-destructive/50 pl-6 py-2">
                                            {project.challenge}
                                        </p>
                                    </motion.div>
                                )}

                                {project.solutionTitle && project.solutionDetails && (
                                    <motion.div id="solution" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Lightbulb className="text-primary h-8 w-8" />
                                            <h2 className="text-3xl font-bold">{project.solutionTitle}</h2>
                                        </div>
                                        <ul className="space-y-4">
                                            {project.solutionDetails.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                                    <CheckCircle className="text-primary mt-1 shrink-0 h-5 w-5" />
                                                    <span className="text-foreground leading-relaxed">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}

                                {project.testimonial && (
                                    <motion.div id="client" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                        <div className="bg-card border border-border rounded-2xl p-8 card-shadow my-8 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                                <MessageCircle size={100} />
                                            </div>
                                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                                <MessageCircle className="text-primary" /> Client Perspective
                                            </h2>
                                            <blockquote className="text-xl italic leading-relaxed text-muted-foreground mb-6">
                                                "{project.testimonial.quote}"
                                            </blockquote>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-xl uppercase" style={{ color: project.accentColor }}>
                                                    {project.testimonial.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-foreground">{project.testimonial.author}</div>
                                                    <div className="text-sm text-muted-foreground">{project.testimonial.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Right Col: Sidebar */}
                            <div className="space-y-8">
                                {/* Project Meta */}
                                <div className="bg-card border border-border p-6 rounded-xl">
                                    <h3 className="font-bold border-b border-border pb-4 mb-4 text-lg">Project Scope</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-sm text-muted-foreground block mb-1">Timeline</span>
                                            <span className="font-medium flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> {project.deliveryWeeks} Weeks Turnaround
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground block mb-1">Industry</span>
                                            <span className="font-medium text-foreground">{project.category}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                {project.techStack && (
                                    <div className="bg-card border border-border p-6 rounded-xl">
                                        <h3 className="font-bold border-b border-border pb-4 mb-4 text-lg">Technology Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map(tech => (
                                                <span key={tech} className="px-3 py-1 bg-muted/50 rounded-md text-sm font-mono text-muted-foreground border border-border/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action */}
                                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 rounded-xl text-center">
                                    <h3 className="font-bold text-lg mb-2 text-primary">Need Similar Results?</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Let's discuss how we can grow your business online.</p>
                                    <Link to="/#contact" className="w-full">
                                        <Button className="w-full shadow-lg">Start a Project</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t py-16 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold">
                                Ready to be our next success story?
                            </h2>
                            <p className="mb-8 text-lg text-muted-foreground">
                                Stop losing customers to competitors with better websites.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link to="/#contact">
                                    <Button size="lg" className="px-8 font-bold text-black shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] transition-all">
                                        Get a Free Strategy Call
                                    </Button>
                                </Link>
                                <Link to="/#portfolio">
                                    <Button variant="outline" size="lg" className="px-8">
                                        View More Work
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <StickyContactBar />
            </main>
            <Footer />
        </div>
    );
};
