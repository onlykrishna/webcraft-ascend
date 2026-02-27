import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProblemDetail } from '@/types/problem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StickyContactBar } from '@/components/StickyContactBar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    AlertTriangle,
    TrendingDown,
    CheckCircle,
    TrendingUp,
    Clock,
    DollarSign,
    Target,
    Search,
} from 'lucide-react';
import { SEO } from '@/components/SEO';

const iconMap: Record<string, any> = {
    AlertTriangle,
    TrendingDown,
    Clock,
    Search,
};

export const ProblemDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [problem, setProblem] = useState<ProblemDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProblem = async () => {
            try {
                const module = await import(`@/data/problems/${slug}.ts`);
                const pData = module[`${slug?.replace(/-/g, '')}Detail`] || module[Object.keys(module).find(k => k.includes('Detail')) || ''];
                setProblem(pData);
            } catch (error) {
                console.error('Problem not found:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadProblem();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="container flex-1 flex flex-col items-center justify-center px-4">
                    <h1 className="mb-4 text-4xl font-bold">Problem Not Found</h1>
                    <Link to="/">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const IconComponent = iconMap[problem.icon] || AlertTriangle;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title={`${problem.title} — How to Fix | Scalvicon`}
                description={problem.subtitle}
                url={`https://scalvicon-9bf2f.web.app/problems/${problem.slug}`}
            />

            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container mx-auto px-4 pt-32 pb-8">
                    {/* Breadcrumb Navigation */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <span className="text-foreground">{problem.title}</span>
                    </nav>

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
                                <IconComponent className="h-8 w-8 text-red-500" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold md:text-5xl">{problem.title}</h1>
                            </div>
                        </div>
                        <p className="mb-6 text-xl text-muted-foreground">{problem.subtitle}</p>
                        <p className="text-lg leading-relaxed">{problem.description}</p>
                    </motion.div>
                </section>

                {/* Quick Navigation */}
                <div className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur-lg">
                    <div className="container mx-auto px-4">
                        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
                            <a href="#symptoms" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Symptoms
                            </a>
                            <a href="#cost" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Real Cost
                            </a>
                            <a href="#solution" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Solution Steps
                            </a>
                            <a href="#metrics" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Expected Results
                            </a>
                            <a href="#cases" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Case Studies
                            </a>
                        </div>
                    </div>
                </div>

                {/* Symptoms */}
                <section id="symptoms" className="border-t bg-muted/30 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <TrendingDown className="mx-auto mb-4 h-12 w-12 text-red-500" />
                            <h2 className="text-3xl font-bold">How to Recognize This Problem</h2>
                            <p className="mt-2 text-muted-foreground">
                                Warning signs your business is affected
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {problem.symptoms.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-xl border-2 border-red-500/20 bg-card p-6"
                                >
                                    <h3 className="mb-2 font-bold text-red-500">⚠️ {item.symptom}</h3>
                                    <p className="text-muted-foreground">{item.impact}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cost Analysis */}
                <section id="cost" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <DollarSign className="mx-auto mb-4 h-12 w-12 text-amber-500" />
                            <h2 className="text-3xl font-bold">The Real Cost to Your Business</h2>
                            <p className="mt-2 text-muted-foreground">
                                What this problem is actually costing you
                            </p>
                        </div>

                        <div className="mx-auto max-w-4xl space-y-6">
                            {problem.costAnalysis.map((cost, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-xl border bg-card p-8"
                                >
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="mb-2 text-2xl font-bold text-red-500">
                                                {cost.lostRevenue}
                                            </h3>
                                            <p className="font-medium">{cost.description}</p>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-4">
                                        <p className="text-sm">
                                            <strong className="text-foreground">How we calculate:</strong> <span className="text-muted-foreground">{cost.calculation}</span>
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Solution Steps */}
                <section id="solution" className="border-t bg-muted/30 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                            <h2 className="text-3xl font-bold">How We Fix This Problem</h2>
                            <p className="mt-2 text-muted-foreground">
                                Our proven step-by-step solution process
                            </p>
                        </div>

                        <div className="mx-auto max-w-3xl space-y-6">
                            {problem.solution.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-6"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 rounded-xl border bg-card p-6">
                                        <div className="mb-2 flex items-center justify-between gap-4">
                                            <h3 className="font-bold">{step.step}</h3>
                                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                {step.timeframe}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Success Metrics */}
                <section id="metrics" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-green-500" />
                            <h2 className="text-3xl font-bold">Expected Results</h2>
                            <p className="mt-2 text-muted-foreground">
                                Average improvements our clients see
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
                            {problem.successMetrics.map((metric, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-xl border bg-card p-6 text-center"
                                >
                                    <h3 className="mb-4 font-semibold">{metric.metric}</h3>
                                    <div className="mb-2 flex items-center justify-center gap-2 text-sm text-red-500">
                                        <TrendingDown className="h-4 w-4" />
                                        <span>Before: {metric.before}</span>
                                    </div>
                                    <div className="mb-4 flex items-center justify-center gap-2 text-sm text-green-500">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>After: {metric.after}</span>
                                    </div>
                                    <div className="rounded-lg bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
                                        {metric.improvement}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Studies */}
                <section id="cases" className="border-t bg-muted/30 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold">Real Businesses We've Helped</h2>

                        <div className="grid gap-8 lg:grid-cols-2">
                            {problem.caseStudies.map((study, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-xl border bg-card p-8"
                                >
                                    <h3 className="mb-4 text-xl font-bold">{study.business}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="mb-2 font-semibold text-red-500">Problem:</h4>
                                            <p className="text-sm text-muted-foreground">{study.problem}</p>
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-blue-500">Solution:</h4>
                                            <p className="text-sm text-foreground">{study.solution}</p>
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-green-500">Result:</h4>
                                            <p className="text-sm font-medium">{study.result}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Prevention Tips */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary bg-primary/5 p-8">
                            <h2 className="mb-6 text-2xl font-bold">Prevention Tips</h2>
                            <ul className="space-y-3">
                                {problem.preventionTips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                        <span className="text-muted-foreground">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Sources */}
                <section className="border-t bg-muted/30 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-center text-2xl font-bold">Research & Sources</h2>
                        <div className="mx-auto max-w-3xl space-y-4">
                            {problem.sources.map((source, index) => (
                                <a
                                    key={index}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block rounded-lg border bg-card p-4 transition-all hover:border-primary group"
                                >
                                    <h3 className="mb-1 font-semibold group-hover:text-primary transition-colors">{source.title}</h3>
                                    <p className="text-sm text-muted-foreground">{source.description}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl rounded-2xl border-2 border-primary bg-primary/5 p-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold">
                                Ready to Fix This Problem?
                            </h2>
                            <p className="mb-8 text-lg text-muted-foreground">
                                Let's discuss your situation and create a custom solution
                            </p>
                            <Link to="/#contact">
                                <Button size="lg" className="px-8 font-bold text-black h-12 text-base shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] transition-all">
                                    Get Your Free Consultation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <StickyContactBar />
            </main>
            <Footer />
        </div>
    );
};
