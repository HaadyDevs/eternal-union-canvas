
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
import { ChevronDown, ChevronUp, Copy, Check, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const HoneymoonFundForm = () => {
  const [currentStep, setCurrentStep] = useState<'info' | 'payment'>('info');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFromSriLanka, setIsFromSriLanka] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
          "https://api.ipgeolocation.io/ipgeo?apiKey=fd3fea31afed4abd94c07792a05c4e67"
        );
        const data = await response.json();
        setIsFromSriLanka(data.country_code2 === "LK");
      } catch (error) {
        console.log("Could not determine location:", error);
        setIsFromSriLanka(false);
      } finally {
        setLocationLoading(false);
      }
    };

    checkLocation();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Store the form data and move to payment step
    setSubmittedData(data);
    setCurrentStep('payment');
    setIsSubmitting(false);
  };

  const handleStripePayment = () => {
    if (!submittedData) return;
    
    // TODO: Implement Stripe payment integration with user data
    console.log("Processing Stripe payment with data:", submittedData);
    console.log("Redirecting to Stripe payment...");
  };

  const handleBankTransferSubmit = () => {
    if (!submittedData) return;
    
    // Log the final submission with user data
    console.log("Bank transfer submission with data:", submittedData);
    
    // Here you would typically submit to your backend
    // For now, we'll show a success message or redirect
    alert(`Thank you ${submittedData.name}! Your bank transfer details have been noted. Please transfer to the account details shown and include your name in the reference.`);
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

  const handleBackToForm = () => {
    setCurrentStep('info');
    setShowBankDetails(false);
  };

  if (currentStep === 'payment' && submittedData) {
    return (
      <div className="bg-white border border-gray-200 rounded-none p-8 shadow-sm">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-cinzel text-gray-500">Step 2 of 2</span>
            <button
              onClick={handleBackToForm}
              className="flex items-center text-sm font-cinzel text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Edit Details
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-black h-2 rounded-full w-full transition-all duration-300"></div>
          </div>
        </div>

        {/* User Info Summary */}
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200">
          <h4 className="font-cinzel text-lg font-medium mb-3">Your Details</h4>
          <p className="font-sans text-base mb-2">
            <span className="font-medium">Name:</span> {submittedData.name}
          </p>
          {submittedData.message && (
            <p className="font-sans text-base">
              <span className="font-medium">Message:</span> {submittedData.message}
            </p>
          )}
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-xl md:text-2xl font-medium mb-6 text-center">
            Choose Your Payment Method
          </h3>

          <Button
            type="button"
            onClick={handleStripePayment}
            className="w-full font-cinzel text-sm md:text-lg uppercase tracking-wider bg-black text-white py-4 md:py-6 px-8 hover:bg-gray-800 border border-black transition-colors rounded-none h-auto"
          >
            Donate by Card
          </Button>

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
                  <p className="mt-4 text-xs md:text-base text-gray-600 font-sans mb-4">
                    Please include your name ({submittedData.name}) in the transfer reference
                  </p>
                  <Button
                    onClick={handleBankTransferSubmit}
                    className="w-full font-cinzel text-sm md:text-lg uppercase tracking-wider bg-black text-white py-3 md:py-4 px-8 hover:bg-gray-800 border border-black transition-colors rounded-none h-auto"
                  >
                    Confirm Bank Transfer Details
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-none p-8 shadow-sm">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-cinzel text-gray-500">Step 1 of 2</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-black h-2 rounded-full w-1/2 transition-all duration-300"></div>
        </div>
      </div>

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
                    placeholder="Share your wishes for our honeymoon journey..."
                    className="border-gray-300 focus:border-black rounded-none min-h-[120px] md:min-h-[180px] font-sans text-base md:text-xl resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Continue Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full font-cinzel text-sm md:text-lg uppercase tracking-wider bg-black text-white py-4 md:py-6 px-8 hover:bg-gray-800 border border-black transition-colors rounded-none h-auto"
              disabled={!form.formState.isValid || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HoneymoonFundForm;
