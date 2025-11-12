import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, Users, CheckCircle, MessageCircle, AlertTriangle, Search, FileCheck, Star, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Rohit P.",
      location: "Mumbai",
      text: "I thought I'd get cheated again, but The Marble Manager helped me save nearly ₹80,000 and find the exact marble I wanted.",
      rating: 5
    },
    {
      name: "Aarushi K.",
      location: "Pune",
      text: "Their comparison sheet was an eye-opener. Vendors were quoting ₹350 for the same marble others sold for ₹280!",
      rating: 5
    },
    {
      name: "Amit S.",
      location: "Ahmedabad",
      text: "Finally someone who tells the truth about this industry. Worth every rupee.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Marble Manager
              </span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button onClick={() => navigate("/plans")}>
                    View Plans
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

      {/* Hero Section - Hook */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 pt-20 pb-24 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground pb-3" style={{ lineHeight: '1.2' }}>
              Buying marble?<br />
              <span className="text-destructive">Don't get fooled by fake rates.</span>
            </h1>
            
            <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">
                <span className="text-destructive font-bold">9 out of 10 homeowners overpay</span> for marble - not because they're cheated, but because they're kept in the dark.
              </p>
              
              <p>
                Hidden commissions, fake "Italian" labels, and showroom quotes that look fair - until you realize you just lost ₹50,000 without even knowing how.
              </p>
              
              <p className="text-xl md:text-2xl font-semibold text-foreground pt-4">
                You don't deserve confusion when you're building your dream home.<br />
                <span className="text-primary">You deserve clarity, honesty, and peace of mind.</span>
              </p>
            </div>

            <div className="pt-6">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('problem')}
                className="text-lg px-10 py-6 hover-scale"
              >
                👉 See How We Bring Transparency
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Emotional + Fear */}
      <section id="problem" className="relative bg-gradient-to-br from-destructive/5 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                The Truth No One Talks About
              </h2>
              <p className="text-lg text-muted-foreground">
                The marble market runs on hidden commissions and misleading quotes
              </p>
            </div>
            
            <div className="space-y-6 mb-12">
              <Card className="border-l-4 border-l-destructive hover-scale">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg leading-relaxed">
                        <strong className="text-foreground">Vendors push the materials that make them the highest margin</strong> - not what's right for your home.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive hover-scale">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg leading-relaxed">
                        <strong className="text-foreground">Online photos look beautiful</strong> - but half of them are edited, filtered, or outdated.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive hover-scale">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg leading-relaxed">
                        You visit <strong className="text-foreground">5 showrooms, get 5 different rates for the same material</strong> - and still don't know what's genuine.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive hover-scale">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg leading-relaxed">
                        Meanwhile, you're <strong className="text-foreground">spending lakhs and trusting people who have zero accountability.</strong>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center p-8 bg-card border-2 border-primary/20 rounded-lg">
              <p className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                🧱 You wouldn't buy a car without checking its papers -<br />
                <span className="text-primary">so why buy marble without verifying the truth?</span>
              </p>
              <Button 
                size="lg"
                onClick={() => scrollToSection('solution')}
                className="hover-scale"
              >
                🔍 Discover the Transparent Way
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - The Shift */}
      <section id="solution" className="relative bg-gradient-to-br from-background via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                That's Exactly Why We Created<br />
                <span className="text-primary" style={{ lineHeight: '1.3' }}>The Marble Manager</span>
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground">
                <p className="text-xl font-semibold text-foreground">
                  We're not vendors. We're not middlemen.<br />
                  We're your personal marble consultants - working for <em>you</em>, not on commission.
                </p>
                <p className="text-lg">
                  Our mission is simple: To bring <strong>transparency, verification, and trust</strong> into one of India's most confusing industries.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="hover-scale border-primary/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Know what you're paying for</h3>
                  <p className="text-muted-foreground text-sm">Every quote, every material, fully transparent</p>
                </CardContent>
              </Card>

              <Card className="hover-scale border-primary/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Know who you're buying from</h3>
                  <p className="text-muted-foreground text-sm">Verified vendors with proven track records</p>
                </CardContent>
              </Card>

              <Card className="hover-scale border-primary/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Know your marble is genuine</h3>
                  <p className="text-muted-foreground text-sm">Verified, not assumed - samples & proof</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-2 border-primary/30">
              <CardContent className="pt-8 pb-8">
                <p className="text-center text-lg text-muted-foreground mb-6">
                  From material shortlisting to vendor verification to transport coordination -<br />
                  <strong className="text-foreground">every rupee and every slab is tracked, verified, and reported to you.</strong>
                </p>
                <div className="text-center">
                  <Button 
                    size="lg"
                    onClick={() => scrollToSection('promise')}
                    className="hover-scale"
                  >
                    💎 See How It Works
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promise Section - Transparency Process */}
      <section id="promise" className="relative bg-gradient-to-br from-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Transparency isn't our slogan -<br />
                <span className="text-primary">it's our process.</span>
              </h2>
            </div>

            <div className="space-y-6 mb-12">
              <Card className="hover-scale">
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Multiple vendor quotes for real market comparison</h3>
                      <p className="text-muted-foreground">No guessing games. See the actual market rates side-by-side.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Quality confirmation through verified samples and photos</h3>
                      <p className="text-muted-foreground">Real images of your actual marble - no stock photos, no edits.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Zero hidden commissions</h3>
                      <p className="text-muted-foreground">You pay us for our expertise, not for someone else's margin.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center p-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
              <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                You don't have to worry about being "fooled" or "overcharged" ever again.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We stand between you and confusion - and bring clarity to your marble buying journey.
              </p>
              <Link to="/plans">
                <Button size="lg" className="text-lg px-10 py-6 hover-scale">
                  🪨 Explore Our Consultancy Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="relative bg-gradient-to-br from-background via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Trusted by 200+ Homeowners Across India
              </h2>
              <p className="text-lg text-muted-foreground">
                From Mumbai to Ahmedabad to Bangalore - homeowners and architects trust The Marble Manager
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover-scale border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - The Pitch */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Let's Make Your Marble Journey<br />
              <span className="text-primary">Simple and Honest</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-6">
              Buying marble should feel <strong className="text-foreground">exciting</strong> - not overwhelming.
            </p>
            
            <div className="max-w-2xl mx-auto mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                That's why we built The Marble Manager - to make sure you get exactly what you deserve:<br />
                <span className="text-foreground font-semibold">real marble, real rates, real peace of mind.</span>
              </p>
            </div>

            <div className="bg-card p-10 rounded-2xl border-2 border-primary/30 mb-8 animate-scale-in">
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Stop guessing. <span className="text-primary">Start knowing.</span>
              </p>
              <Link to="/plans">
                <Button size="lg" className="text-xl px-12 py-7 hover-scale">
                  👉 See Our Plans and Start with a ₹999 Consultation
                </Button>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground space-y-2 italic">
              <p>The Marble Manager is an independent consultancy based in Kishangarh - India's marble capital.</p>
              <p>We work only for clients, not vendors.</p>
              <p className="text-base font-semibold text-foreground pt-2">
                "Transparency isn't expensive - confusion is."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918079011187"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex flex-col items-center gap-2"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="text-xs font-medium whitespace-nowrap">Get personalised guidance</span>
      </a>
    </div>
  );
};

export default Landing;
