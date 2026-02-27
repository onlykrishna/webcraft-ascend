import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ServiceDetail } from '@/types/service';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { StickyContactBar } from '@/components/StickyContactBar';
import { motion } from 'framer-motion';
import { Check, ExternalLink, ArrowLeft, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/SEO';

export const ServiceDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [service, setService] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Dynamic import based on slug
        const loadService = async () => {
            try {
                const module = await import(`@/data/services/${slug}.ts`);
                setService(module[`${slug?.replace(/-/g, '')}Detail`] || module[Object.keys(module).find(k => k.includes('Detail')) || '']);
            } catch (error) {
                console.error('Service not found:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadService();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="container flex flex-1 flex-col items-center justify-center px-4">
                    <h1 className="mb-4 text-4xl font-bold">Service Not Found</h1>
                    <Link to="/#services">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Services
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
                title={`${service.title} | Scalvicon`}
                description={service.subtitle}
                url={`https://scalvicon-9bf2f.web.app/services/${service.slug}`}
                keywords={[service.title, 'web development', 'India', 'SME', 'website']}
            />

            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container mx-auto px-4 pt-32 pb-16">
                    {/* Breadcrumb Navigation */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link to="/#services" className="hover:text-primary">Services</Link>
                        <span>/</span>
                        <span className="text-foreground">{service.title}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-5xl tracking-tight">
                            {service.title}
                        </h1>
                        <p className="mb-8 text-xl text-muted-foreground">
                            {service.subtitle}
                        </p>
                        <p className="text-lg leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                </section>

                {/* Quick Navigation */}
                <div className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur-lg">
                    <div className="container mx-auto px-4">
                        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
                            <a href="#mistakes" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Common Mistakes
                            </a>
                            <a href="#features" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Key Features
                            </a>
                            <a href="#case-studies" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Case Studies
                            </a>
                            <a href="#pricing" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                Pricing
                            </a>
                            <a href="#faq" className="whitespace-nowrap text-sm font-medium hover:text-primary">
                                FAQ
                            </a>
                        </div>
                    </div>
                </div>

                {/* Common Mistakes Section */}
                <section id="mistakes" className="border-t border-border bg-card/30 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-amber-500" />
                            <h2 className="text-3xl font-bold tracking-tight">Common Mistakes to Avoid</h2>
                            <p className="mt-2 text-muted-foreground">
                                Don't make these costly errors that most businesses make
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {service.commonMistakes.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-card border border-border bg-card p-6"
                                >
                                    <h3 className="mb-3 font-bold text-red-400">❌ {item.mistake}</h3>
                                    <p className="mb-3 text-sm text-muted-foreground">
                                        <strong className="text-foreground">Consequence:</strong> {item.consequence}
                                    </p>
                                    <p className="text-sm text-primary">
                                        <strong className="text-primary">✓ Solution:</strong> {item.solution}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Key Features Section */}
                <section id="features" className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <Lightbulb className="mx-auto mb-4 h-12 w-12 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight">What Makes It Great</h2>
                            <p className="mt-2 text-muted-foreground">
                                Essential features every professional solution needs
                            </p>
                        </div>

                        <div className="space-y-8 max-w-4xl mx-auto">
                            {service.keyFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-card border border-border bg-card p-6"
                                >
                                    <div className="flex flex-col md:flex-row items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                            <Check className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 text-xl font-bold">{feature.feature}</h3>
                                            <p className="mb-3 text-muted-foreground">{feature.description}</p>
                                            <div className="rounded-lg bg-background p-4 border border-border/50">
                                                <p className="text-sm">
                                                    <strong className="text-foreground">Example:</strong> <span className="text-muted-foreground">{feature.example}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Studies Section */}
                <section id="case-studies" className="border-t border-border bg-card/30 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight">Real Results from Real Businesses</h2>
                            <p className="mt-2 text-muted-foreground">
                                See how we helped businesses like yours
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                            {service.caseStudies.map((study, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-card border border-border bg-card p-8"
                                >
                                    <div className="mb-6 flex items-center gap-4 border-b border-border pb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                                            {study.client.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{study.client}</h3>
                                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{study.industry}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400">Challenge</h4>
                                            <p className="text-sm text-muted-foreground">{study.challenge}</p>
                                        </div>

                                        <div>
                                            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-400">Solution</h4>
                                            <p className="text-sm text-foreground">{study.solution}</p>
                                        </div>

                                        <div>
                                            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">Results</h4>
                                            <ul className="space-y-2">
                                                {study.results.map((result, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                        <span>{result}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Transparent Pricing</h2>

                        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                            {service.pricing.map((pkg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-card border border-border bg-card p-8 relative overflow-hidden"
                                >
                                    {index === 1 && (
                                        <div className="absolute top-0 right-0 bg-primary/20 text-primary px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-bl-lg">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="mb-2 text-2xl font-bold">{pkg.package}</h3>
                                    <div className="mb-6 flex items-baseline gap-2">
                                        <span className="text-4xl font-black tracking-tight text-white">
                                            ₹{pkg.price.toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-sm text-muted-foreground uppercase tracking-widest font-mono">one-time</span>
                                    </div>

                                    <ul className="mb-8 space-y-3">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/#contact">
                                        <Button className="w-full" variant={index === 1 ? 'default' : 'outline'} size="lg">
                                            Get Started
                                        </Button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sources Section */}
                <section className="border-t border-border bg-card/30 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Sources & Research</h2>
                        <div className="mx-auto max-w-3xl space-y-4">
                            {service.sources.map((source, index) => (
                                <a
                                    key={index}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block rounded-card border border-border bg-background p-5 transition-all hover:bg-card hover:border-border/80 group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="mb-1 font-semibold group-hover:text-primary transition-colors">{source.title}</h3>
                                            <p className="text-sm text-muted-foreground">{source.description}</p>
                                        </div>
                                        <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                        <div className="mx-auto max-w-3xl space-y-6">
                            {service.faq.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="rounded-card border border-border bg-card p-6"
                                >
                                    <h3 className="mb-2 font-bold text-lg">{item.question}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                <section className="border-t border-border bg-card/30 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-8 text-2xl font-bold tracking-tight">You Might Also Need</h2>
                        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                            {service.relatedServices.map((relatedSlug) => (
                                <Link key={relatedSlug} to={`/services/${relatedSlug}`}>
                                    <Button variant="outline" className="rounded-full">
                                        {relatedSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 pb-32">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl rounded-card border-none bg-primary/10 p-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none" />
                            <div className="relative z-10">
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                                    Ready to Get Started?
                                </h2>
                                <p className="mb-8 text-lg text-white/70 max-w-xl mx-auto">
                                    Let's discuss your project. No pressure, no jargon—just real advice from people who care about your business goals.
                                </p>
                                <Link to="/#contact">
                                    <Button size="lg" className="px-8 font-bold text-black h-12 text-base shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] transition-all">
                                        Book Your Free Consultation
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <StickyContactBar />
            </main >

            <Footer />
        </div >
    );
};
