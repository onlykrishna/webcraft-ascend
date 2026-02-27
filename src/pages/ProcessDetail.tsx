import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProcessDetail } from '@/types/process';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StickyContactBar } from '@/components/StickyContactBar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Clock,
    CheckCircle,
    Users,
    FileText,
    HelpCircle,
    ArrowRight,
    AlertTriangle,
} from 'lucide-react';
import { SEO } from '@/components/SEO';

export const ProcessDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [process, setProcess] = useState<ProcessDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProcess = async () => {
            try {
                const module = await import(`@/data/process/${slug}.ts`);
                const pData = module[`${slug?.replace(/-/g, '')}Detail`] || module[Object.keys(module).find(k => k.includes('Detail')) || ''];
                setProcess(pData);
            } catch (error) {
                console.error('Process not found:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadProcess();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!process) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="container flex-1 flex flex-col items-center justify-center px-4">
                    <h1 className="mb-4 text-4xl font-bold">Process Step Not Found</h1>
                    <Link to="/#process">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Process
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title={`Week ${process.weekNumber}: ${process.title} | Scalvicon Process`}
                description={process.subtitle}
                url={`https://scalvicon-9bf2f.web.app/process/${process.slug}`}
            />

            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container mx-auto px-4 pt-32 pb-8">
                    {/* Breadcrumb Navigation */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link to="/#process" className="hover:text-primary">Process</Link>
                        <span>/</span>
                        <span className="text-foreground">Week {process.weekNumber}</span>
                    </nav>

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
                                {process.weekNumber}
                            </div>
                            <div>
                                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {process.duration}
                                </div>
                                <h1 className="text-4xl font-bold md:text-5xl">{process.title}</h1>
                            </div>
                        </div>
                        <p className="mb-6 text-xl text-muted-foreground">{process.subtitle}</p>
                        <p className="text-lg leading-relaxed">{process.description}</p>
                    </motion.div>
                </section>

                {/* Quick Navigation */}
                <div className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur-lg">
                    <div className="container mx-auto px-4">
                        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
                            <a href="#activities" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Activities
                            </a>
                            <a href="#deliverables" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Deliverables
                            </a>
                            <a href="#client-tasks" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Your Tasks
                            </a>
                            <a href="#faq" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                FAQ
                            </a>
                            <a href="#next" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                What's Next
                            </a>
                        </div>
                    </div>
                </div>

                {/* Activities */}
                <section id="activities" className="border-t bg-muted/30 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
                            <h2 className="text-3xl font-bold">What Happens This Week</h2>
                            <p className="mt-2 text-muted-foreground">
                                Behind-the-scenes breakdown of our work
                            </p>
                        </div>

                        <div className="mx-auto max-w-4xl space-y-6">
                            {process.activities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-xl border bg-card p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-bold">{activity.activity}</h3>
                                            <p className="mb-3 text-muted-foreground">{activity.description}</p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">{activity.whoDoesIt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Deliverables */}
                <section id="deliverables" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-green-500" />
                            <h2 className="text-3xl font-bold">What You'll Receive</h2>
                            <p className="mt-2 text-muted-foreground">
                                Tangible deliverables at the end of this week
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                            {process.deliverables.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-xl border bg-card p-6"
                                >
                                    <h3 className="mb-2 font-bold">{item.deliverable}</h3>
                                    <p className="mb-3 text-sm text-muted-foreground">{item.description}</p>
                                    <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-foreground">
                                        Format: <span className="text-muted-foreground">{item.format}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Client Tasks */}
                <section id="client-tasks" className="border-t bg-muted/30 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <Users className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                            <h2 className="text-3xl font-bold">What We Need From You</h2>
                            <p className="mt-2 text-muted-foreground">
                                Your involvement this week (time required)
                            </p>
                        </div>

                        <div className="mx-auto max-w-3xl space-y-4">
                            {process.clientTasks.map((task, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 rounded-xl border bg-card p-6"
                                >
                                    <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="font-bold">{task.task}</h3>
                                            <div className="flex gap-3 text-sm">
                                                <span className="flex items-center gap-1 text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    {task.timeRequired}
                                                </span>
                                                <span className={`font-medium ${task.importance.includes('Critical') ? 'text-red-500' :
                                                        task.importance.includes('High') ? 'text-amber-500' :
                                                            'text-blue-500'
                                                    }`}>
                                                    {task.importance}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <HelpCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
                            <h2 className="text-3xl font-bold">Common Questions</h2>
                        </div>

                        <div className="mx-auto max-w-3xl space-y-6">
                            {process.faq.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="rounded-lg border bg-card p-6"
                                >
                                    <h3 className="mb-2 font-bold">{item.question}</h3>
                                    <p className="text-muted-foreground">{item.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Next Week Preview */}
                <section id="next" className="border-t bg-primary/5 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary bg-card p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <ArrowRight className="h-8 w-8 text-primary" />
                                <h2 className="text-2xl font-bold">What's Next</h2>
                            </div>
                            <p className="mb-4 text-lg text-foreground">{process.nextWeek.preview}</p>
                            <div className="rounded-lg bg-muted/50 p-4">
                                <p className="text-sm">
                                    <strong className="text-foreground">How to prepare:</strong> <span className="text-muted-foreground">{process.nextWeek.preparation}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Warning Signs */}
                <section className="border-t py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <AlertTriangle className="h-8 w-8 text-destructive" />
                                <h2 className="text-2xl font-bold">Red Flags to Watch For</h2>
                            </div>
                            <ul className="space-y-3">
                                {process.warningSigns.map((warning, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-lg text-foreground">{warning}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl rounded-2xl border-2 border-primary bg-primary/5 p-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold">
                                Ready to Start Your Project?
                            </h2>
                            <p className="mb-8 text-lg text-muted-foreground">
                                Let's discuss your timeline and get Week 1 scheduled
                            </p>
                            <Link to="/#contact">
                                <Button size="lg" className="px-8 font-bold text-black h-12 text-base shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] transition-all">
                                    Book Discovery Call
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
