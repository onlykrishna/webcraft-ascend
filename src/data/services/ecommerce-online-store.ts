import { ServiceDetail } from '@/types/service';

export const ecommerceonlinestoreDetail: ServiceDetail = {
    id: 'ecommerce-online-store',
    slug: 'ecommerce-online-store',
    title: 'E-commerce Website & Online Store',
    subtitle: 'Sell online, skip the middleman. Keep 100% of your profits.',
    heroImage: '/images/services/ecommerce-hero.jpg',
    description: `
    Stop paying 20-25% commission to Zomato, Swiggy, Amazon, or Flipkart. 
    Your own e-commerce store means: your brand, your customers, your profit. 
    Accept payments, manage inventory, and ship products—all from one dashboard.
  `,

    commonMistakes: [
        {
            mistake: 'Listing on marketplaces only (Amazon, Flipkart)',
            consequence: 'Lose 20-30% per sale + no customer data + compete on price alone',
            solution: 'Own store builds your brand and customer loyalty',
        },
        {
            mistake: 'Complicated checkout (8+ fields)',
            consequence: '70% cart abandonment rate',
            solution: '3-field checkout: Name, Phone, Address (rest optional)',
        },
        {
            mistake: 'No mobile payment options (UPI, wallets)',
            consequence: 'Lose 60% of Indian customers who prefer UPI',
            solution: 'Razorpay integration: UPI, cards, net banking, wallets',
        },
        {
            mistake: 'Manual inventory tracking (Excel sheets)',
            consequence: 'Overselling, stock-outs, angry customers',
            solution: 'Auto inventory sync—stock decreases with every sale',
        },
        {
            mistake: 'No product images or single angle',
            consequence: '50% higher return rate',
            solution: '4-5 images per product: front, back, detail shots, lifestyle',
        },
    ],

    keyFeatures: [
        {
            feature: 'Razorpay Payment Gateway',
            description: 'Accept all Indian payment methods instantly',
            example: 'Customer pays ₹2,499 via UPI → Money reaches you in 2 days → Customer gets order confirmation',
        },
        {
            feature: 'Inventory Management Dashboard',
            description: 'Track stock in real-time, get low-stock alerts',
            example: 'Red kurta has 3 left → System alerts you → Auto hides "Buy" button at 0 stock',
        },
        {
            feature: 'Order Tracking System',
            description: 'Customers track shipment status',
            example: 'Order placed → Packed → Shipped → Out for delivery (automated WhatsApp updates)',
        },
        {
            feature: 'Product Variants',
            description: 'Size, color, material options in one listing',
            example: 'T-shirt listing: S/M/L/XL sizes + Black/White/Red colors = 12 variants',
        },
        {
            feature: 'Discount & Coupon System',
            description: 'Run promotions, seasonal sales, bulk discounts',
            example: 'Coupon DIWALI25 gives 25% off → Tracks usage → Expires automatically',
        },
        {
            feature: 'Customer Accounts',
            description: 'Save addresses, view order history, reorder quickly',
            example: 'Customer logs in → Sees past orders → Clicks "Buy Again" → Checkout in 10 seconds',
        },
    ],

    caseStudies: [
        {
            client: 'Desi Threads Boutique',
            industry: 'Fashion & Apparel',
            challenge: 'Paying ₹45,000/month commission to Myntra, losing brand identity',
            solution: 'Custom e-commerce store with product catalog, size guide, and express checkout',
            results: [
                'Saved ₹40,000/month in commissions',
                '150 orders in first month',
                'Average order value: ₹2,800 (vs ₹1,200 on Myntra)',
                'Built email list of 800 customers for repeat marketing',
            ],
        },
        {
            client: 'SpiceBox Gourmet',
            industry: 'Food & Gourmet Products',
            challenge: 'Limited to local market, wanted pan-India reach',
            solution: 'E-commerce store with subscription model, recipe blog, and COD option',
            results: [
                'Ships to 18 states within 4 months',
                '₹2.5 lakh monthly revenue',
                '35% customers are repeat buyers',
                'Featured in local newspaper due to professional brand image',
            ],
        },
    ],

    technicalStack: [
        {
            category: 'E-commerce Platform',
            technologies: ['React', 'Firebase', 'Stripe/Razorpay'],
        },
        {
            category: 'Payment Gateway',
            technologies: ['Razorpay', 'PayU', 'Cashfree'],
        },
        {
            category: 'Shipping',
            technologies: ['Shiprocket', 'Delhivery', 'DHL API'],
        },
        {
            category: 'Inventory',
            technologies: ['Firebase Realtime Database', 'Zoho Inventory'],
        },
    ],

    pricing: [
        {
            package: 'Starter Store',
            price: 29999,
            features: [
                'Up to 50 products',
                'Razorpay integration',
                'Mobile responsive',
                'Inventory management',
                'Order tracking',
                'Customer accounts',
                'Email notifications',
                '30 days support',
                '4 weeks delivery',
            ],
        },
        {
            package: 'Professional Store',
            price: 44999,
            features: [
                'Unlimited products',
                'Multi-currency support',
                'Advanced inventory',
                'Shipping integration',
                'Discount/coupon system',
                'Analytics dashboard',
                'SEO optimization',
                'Product reviews',
                'Abandoned cart recovery',
                '60 days support',
                '5 weeks delivery',
            ],
        },
    ],

    sources: [
        {
            title: 'NASSCOM: E-commerce Growth in India',
            url: 'https://nasscom.in/knowledge-center/publications/indian-ecommerce-industry',
            description: 'Report on Indian e-commerce market growth and UPI adoption',
        },
        {
            title: 'Baymard Institute: Cart Abandonment Study',
            url: 'https://baymard.com/lists/cart-abandonment-rate',
            description: 'Research showing average 70% cart abandonment rate and reasons',
        },
        {
            title: 'Razorpay: Payment Preferences Report',
            url: 'https://razorpay.com/blog/payment-preferences-india/',
            description: 'Data on UPI being preferred payment method for 60% of Indian customers',
        },
    ],

    relatedServices: [
        'business-website',
        'booking-appointment-sites',
    ],

    faq: [
        {
            question: 'Do I need GST registration to sell online?',
            answer: 'Yes, if your annual turnover exceeds ₹20 lakhs (₹40 lakhs for services). We guide you through the process.',
        },
        {
            question: 'How do I handle shipping?',
            answer: 'We integrate Shiprocket/Delhivery. You print labels, courier picks up from your location.',
        },
        {
            question: 'Can customers pay Cash on Delivery (COD)?',
            answer: 'Yes. We integrate COD option. Courier collects cash and transfers to you (minus 2-3% fee).',
        },
        {
            question: 'What if I want to sell internationally?',
            answer: 'We set up multi-currency, international shipping, and Stripe for global payments.',
        },
        {
            question: 'How do I add new products myself?',
            answer: 'Simple admin panel—upload image, add price, description, stock. Takes 2 minutes per product.',
        },
    ],
};
