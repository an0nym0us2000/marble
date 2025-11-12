import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, UserPlus, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import PricingCard from "@/components/PricingCard";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };
  const plans = [
    {
      title: "Consultation Plan",
      subtitle: "Perfect for initial guidance",
      description: "Perfect if you only need guidance to avoid mistakes.",
      price: "₹999",
      period: "session",
      priceNote: "(including GST)",
      features: [
        { text: "30-minute Zoom consultation", included: true },
        { text: "Material recommendations", included: true },
        { text: "Vendor recommendations", included: true },
        { text: "Basic guidance and tips", included: true },
        { text: "Sourcing assistance", included: false },
        { text: "Quality confirmation", included: false },
        { text: "Price negotiation", included: false },
        { text: "Transport coordination", included: false },
      ],
      buttonVariant: "default" as const,
    },
    {
      title: "Premium Plan",
      subtitle: "Comprehensive sourcing support",
      description: "Most people choose this because it covers everything except execution.",
      price: "₹4,999",
      period: "project",
      priceNote: "(including GST)",
      popular: true,
      features: [
        { text: "Everything in Consultation Plan", included: true },
        { text: "Complete sourcing assistance", included: true },
        { text: "Material finalization support", included: true },
        { text: "Quality confirmation", included: true },
        { text: "Vendor coordination", included: true },
        { text: "Multiple vendor comparisons", included: true },
        { text: "Full project management", included: false },
        { text: "Transport coordination", included: false },
      ],
      buttonVariant: "secondary" as const,
    },
    {
      title: "Full Service Plan",
      subtitle: "End-to-end project management",
      description: "Ideal for busy homeowners or NRIs.",
      price: "₹24,999",
      period: "project",
      priceNote: "(including GST)",
      features: [
        { text: "Everything in Premium Plan", included: true },
        { text: "Complete project management", included: true },
        { text: "Material quality checks", included: true },
        { text: "Price negotiation from your end", included: true },
        { text: "Final material selection", included: true },
        { text: "Transport support & coordination", included: true },
        { text: "Door-to-door delivery support", included: true },
        { text: "Installation guidance", included: true },
      ],
      buttonVariant: "default" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Marble Manager
              </span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button onClick={() => navigate("/signup")}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-[hsl(280,60%,45%)] to-secondary bg-clip-text text-transparent pb-3" style={{ lineHeight: '1.3' }}>
          The Marble Manager
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
          Expert marble sourcing and project management services
        </p>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          From consultation to installation, we handle your marble needs with precision and care
        </p>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-2xl">✓</span>
            <span className="font-semibold">Trusted by 200+ homeowners</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-2xl">✓</span>
            <span className="font-semibold">Zero hidden commissions</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-2xl">✓</span>
            <span className="font-semibold">Based in Kishangarh - the heart of India's marble market</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold mb-4">Why Choose The Marble Manager?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Years of experience in marble sourcing and quality assessment
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold mb-1">Quality Assured</h3>
              <p className="text-muted-foreground">
                Every piece verified for authenticity and quality standards
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold mb-1">Trusted Network</h3>
              <p className="text-muted-foreground">
                Access to verified vendors and competitive pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                How long does a typical marble project take?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">The timeline varies based on the plan you choose. Consultation sessions are scheduled within 48 hours. Premium Plan sourcing typically takes 7-10 days. Full Service Plan projects usually complete within 3-4 weeks, depending on project scope and material availability.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                Can I upgrade to Premium or Full Service later?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">Absolutely! You can upgrade anytime. If you start with the Consultation Plan and decide you need more support, we'll adjust the pricing and credit your initial payment towards the higher plan.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                What if I'm not satisfied with the plan?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">We offer a satisfaction guarantee. If you're not happy with the Consultation Plan within the first session, we'll provide a full refund. For Premium and Full Service plans, we work closely with you throughout the process to ensure your needs are met.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                How do I know if the marble quality is genuine?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">We conduct thorough quality checks on all materials. Being based in Kishangarh, we have direct relationships with verified suppliers and manufacturers. We inspect each batch for authenticity, grade, and defects before recommending them to you.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                Do you charge any hidden commissions from vendors?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">No, absolutely not. We operate on complete transparency. Our fee is only what you pay upfront for the service plan. We don't take any commissions from vendors, which means we negotiate the best prices for you without any conflict of interest.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                What areas do you serve?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">We serve clients across India and internationally, including NRIs. While we're based in Kishangarh (Rajasthan), we coordinate transportation and delivery nationwide. Our consultation sessions are conducted online via Zoom.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                What's the difference between Premium and Full Service?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">Premium Plan covers material sourcing, vendor coordination, and quality checks. Full Service Plan includes everything in Premium plus complete project management, price negotiation, transport coordination, and door-to-door delivery support – perfect if you want a hands-off experience.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                How much money can I save by using your service?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">Clients typically save 20-30% on marble costs by avoiding middlemen markups and getting direct wholesale prices. Our service fee is minimal compared to potential savings on material costs and avoiding costly mistakes from inexperience.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                What types of marble do you source?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">We source all types of natural marble including Italian marble, Indian marble, granite, and other natural stones. From Statuario and Calacatta to Makrana and Rajnagar, we have access to the complete range through our network in Kishangarh.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                Do you help with installation?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">The Full Service Plan includes installation guidance and coordination. While we don't directly install, we connect you with skilled installers in your area and provide technical guidance to ensure proper installation of your marble.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                What payment methods do you accept?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">We accept bank transfers, UPI, and all major payment methods. Payment is required upfront for the service plan you choose. For the Full Service Plan, the ₹9,999 advance is adjusted against the total project value.</p>
            </details>

            <details className="group bg-card p-6 rounded-lg border">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                Can I see samples before ordering?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">Yes! We can arrange physical samples to be sent to you, or you can visit Kishangarh to see materials in person. We also provide detailed photos and videos of available materials during the selection process.</p>
            </details>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className="bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border text-sm font-medium whitespace-nowrap">
          Get personalised guidance
        </div>
        <a
          href="https://wa.me/918079011187"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Index;
