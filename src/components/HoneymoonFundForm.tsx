import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { submitDonation } from "../services/donationService";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const HoneymoonFundForm = () => {
  const locationApiKey = import.meta.env.VITE_LOCATION_API_KEY;
  const stripeLankanUrl = import.meta.env.VITE_STRIPE_SRILANKAN_URL;
  const stripeUsdUrl = import.meta.env.VITE_STRIPE_USD_URL;

  const [showBankDetails, setShowBankDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFromSriLanka, setIsFromSriLanka] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  // Check user's location
  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${locationApiKey}`
        );
        const data = await response.json();
        setIsFromSriLanka(data.country_code2 === "LK");
      } catch (error) {
        console.log("Could not determine location:", error);
        // Default to showing bank details if we can't determine location
        setIsFromSriLanka(false);
      } finally {
        setLocationLoading(false);
      }
    };

    checkLocation();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData: FormData = {
        name: data.name,
        message: data.message,
      };
      
      await submitDonation(formData);
      
      toast({
        title: "Thank you!",
        description: "Your donation details have been recorded successfully.",
      });
      
      // Redirect to success page
      window.location.href = "/honeymoon-fund?paymentSuccess=true";
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast({
        title: "Submission Error",
        description: "There was an error recording your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripePayment = async () => {
    // First submit the form data to Firebase
    if (!form.formState.isValid) {
      toast({
        title: "Please fill in required fields",
        description: "Name is required before proceeding with payment.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = form.getValues();
      await submitDonation(formData);
      
      // Then open Stripe payment URL
      const paymentUrl = isFromSriLanka ? stripeLankanUrl : stripeUsdUrl;
      window.open(paymentUrl, '_blank');
      
      toast({
        title: "Donation recorded",
        description: "Your details have been saved. Complete payment in the new tab.",
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast({
        title: "Submission Error",
        description: "There was an error recording your donation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-none p-8 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-cinzel text-lg md:text-2xl uppercase tracking-wider">
                  Your Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="border-gray-300 focus:border-black rounded-none py-3 md:py-6 font-sans text-base md:text-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-cinzel text-lg md:text-2xl uppercase tracking-wider">
                  Personal Message (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your wishes for us"
                    className="border-gray-300 focus:border-black rounded-none min-h-[120px] md:min-h-[180px] font-sans text-base md:text-xl resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Buttons */}
          <div className="space-y-4 pt-4">
            <Button
              type="button"
              onClick={handleStripePayment}
              className="w-full font-cinzel text-sm md:text-lg uppercase tracking-wider bg-black text-white py-4 md:py-6 px-8 hover:bg-gray-800 border border-black transition-colors rounded-none h-auto"
              disabled={!form.formState.isValid || isSubmitting}
            >
              Donate by Card
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2 flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure payment powered by{" "}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
                alt="Stripe"
                className="h-3 inline-block"
              />
            </p>

            {/* Bank Transfer Option - Only show for Sri Lanka users */}
            {!locationLoading && isFromSriLanka && (
              <div className="relative pt-3">
                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 font-cinzel text-sm md:text-base text-gray-500">
                    or
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBankDetails(!showBankDetails)}
                  className="flex items-center justify-center w-full font-cinzel text-sm md:text-lg uppercase tracking-wider text-gray-600 hover:text-black transition-colors mt-6"
                >
                  Direct Bank Transfer
                  {showBankDetails ? (
                    <ChevronUp className="ml-2 h-4 w-4 md:h-6 md:w-6" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4 md:h-6 md:w-6" />
                  )}
                </button>

                {showBankDetails && (
                  <div className="mt-4 p-6 bg-gray-50 border border-gray-200 animate-fade-in">
                    <h4 className="font-cinzel text-lg md:text-2xl font-medium mb-4 tracking-wide">
                      Bank Account Details
                    </h4>
                    <div className="space-y-3 font-sans text-sm md:text-lg">
                      <div className="flex items-center justify-between">
                        <p>
                          <span className="font-medium">Acc Number:</span>{" "}
                          8119034264
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard("8119034264", "accNumber")
                          }
                          className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {copiedField === "accNumber" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>
                          <span className="font-medium">Acc Name:</span> Ahamed
                          Farzan Abdul Haady
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              "Ahamed Farzan Abdul Haady",
                              "accName"
                            )
                          }
                          className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {copiedField === "accName" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>
                          <span className="font-medium">Bank:</span> Commercial
                          Bank{" "}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard("Commercial Bank", "bank")
                          }
                          className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {copiedField === "bank" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>
                          <span className="font-medium">Branch:</span>{" "}
                          Kotikawatte
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard("Kotikawatte", "branch")
                          }
                          className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {copiedField === "branch" ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 text-xs md:text-base text-gray-600 font-sans">
                      Please include your name in the transfer reference
                    </p>
                    <div className="mt-6">
                      <Button
                        type="button"
                        onClick={() => form.handleSubmit(onSubmit)()}
                        className="w-full font-cinzel text-sm md:text-lg uppercase tracking-wider bg-black text-white py-4 md:py-6 px-8 hover:bg-gray-800 border border-black transition-colors rounded-none h-auto"
                        disabled={!form.formState.isValid || isSubmitting}
                      >
                        {isSubmitting ? "Confirming..." : "Confirm Transferred"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HoneymoonFundForm;
