import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { PaymentModal } from "@/components/PaymentModal";

interface PlanData {
  title: string;
  price: string;
  period?: string;
  features: string[];
}

const formSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" }),
  phone: z.string()
    .trim()
    .regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian phone number starting with 6-9" })
    .length(10, { message: "Phone number must be exactly 10 digits" }),
  address: z.string().trim().max(500, { message: "Address must be less than 500 characters" }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const planData = location.state as PlanData;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!planData) {
    navigate("/");
    return null;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: user?.email || "",
      phone: "",
      address: "",
    },
  });

  // Prices already include GST, calculate backwards
  const priceNumber = parseFloat(planData.price.replace(/[^0-9.]/g, ""));
  const totalAmount = priceNumber;
  const baseAmount = Math.round((totalAmount / 1.18) * 100) / 100;
  const gstAmount = Math.round((totalAmount - baseAmount) * 100) / 100;

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  };

  const handleSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to continue with your purchase",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location } });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order in database
      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          plan_name: planData.title,
          full_name: values.name,
          email: values.email,
          phone: values.phone,
          project_address: values.address || null,
          base_amount: baseAmount,
          gst_amount: gstAmount,
          total_amount: totalAmount,
          payment_status: "pending",
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setOrderId(data.id);
        setShowPaymentModal(true);

        toast({
          title: "Order Created!",
          description: "Please complete the payment to activate your plan",
        });
      }
    } catch (error: any) {
      console.error("Order creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plans
        </Button>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-[hsl(280,60%,45%)] to-secondary bg-clip-text text-transparent">
            Complete Your Purchase
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="p-6 h-fit">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <h3 className="font-semibold text-lg mb-2">{planData.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-[hsl(280,60%,45%)] bg-clip-text text-transparent">
                      {planData.price}
                    </span>
                    {planData.period && (
                      <span className="text-muted-foreground">/{planData.period}</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Included Features:</h4>
                  <div className="space-y-2">
                    {planData.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="mt-0.5 rounded-full p-0.5 bg-gradient-to-br from-primary/20 to-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Amount:</span>
                    <span className="font-medium">{formatCurrency(baseAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">GST (18%):</span>
                    <span className="font-medium">{formatCurrency(gstAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold pt-2 border-t">
                    <span>Total Amount:</span>
                    <span className="bg-gradient-to-r from-primary to-[hsl(280,60%,45%)] bg-clip-text text-transparent">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Form */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your project location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-[hsl(280,60%,45%)] hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Order...
                        </>
                      ) : (
                        "Proceed to Payment"
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By proceeding, you agree to our terms of service and privacy policy
                  </p>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          navigate("/dashboard");
        }}
        amount={totalAmount}
        orderId={orderId}
        planName={planData.title}
      />
    </div>
  );
};

export default Checkout;
