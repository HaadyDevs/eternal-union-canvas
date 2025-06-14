
import React, { useState } from "react";
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
import { ChevronDown, ChevronUp } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  amount: z.number().min(1, "Amount must be at least $1"),
});

type FormData = z.infer<typeof formSchema>;

const HoneymoonFundForm = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
  };

  const handleStripePayment = () => {
    // TODO: Implement Stripe payment integration
    console.log("Redirecting to Stripe payment...");
  };

  const handleCardPayment = () => {
    // TODO: Implement card payment integration
    console.log("Processing card payment...");
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
                <FormLabel className="font-cinzel text-lg uppercase tracking-wider">
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="border-gray-300 focus:border-black rounded-none py-3 font-sans text-base"
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
                <FormLabel className="font-cinzel text-lg uppercase tracking-wider">
                  Personal Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your wishes for our honeymoon journey..."
                    className="border-gray-300 focus:border-black rounded-none min-h-[120px] font-sans text-base resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount Field */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-cinzel text-lg uppercase tracking-wider">
                  Contribution Amount (USD)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-sans">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-gray-300 focus:border-black rounded-none py-3 pl-8 font-sans text-base"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Buttons */}
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                onClick={handleStripePayment}
                className="font-cinzel text-sm uppercase tracking-wider bg-black text-white py-4 px-8 hover:bg-gray-800 border border-black transition-colors rounded-none h-auto"
                disabled={!form.formState.isValid || isSubmitting}
              >
                Pay via Stripe
              </Button>
              <Button
                type="button"
                onClick={handleCardPayment}
                className="font-cinzel text-sm uppercase tracking-wider bg-white text-black py-4 px-8 hover:bg-gray-50 border border-black transition-colors rounded-none h-auto"
                disabled={!form.formState.isValid || isSubmitting}
              >
                Pay by Card
              </Button>
            </div>

            {/* Bank Transfer Option */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setShowBankDetails(!showBankDetails)}
                className="flex items-center justify-center w-full font-cinzel text-sm uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Bank Transfer Details
                {showBankDetails ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </button>

              {showBankDetails && (
                <div className="mt-4 p-6 bg-gray-50 border border-gray-200 animate-fade-in">
                  <h4 className="font-cinzel text-lg font-medium mb-4 tracking-wide">
                    Bank Account Details
                  </h4>
                  <div className="space-y-2 font-sans text-sm">
                    <p>
                      <span className="font-medium">Account Name:</span> Haady & Nizra Wedding Fund
                    </p>
                    <p>
                      <span className="font-medium">Bank:</span> Example Bank
                    </p>
                    <p>
                      <span className="font-medium">Account Number:</span> 1234567890
                    </p>
                    <p>
                      <span className="font-medium">Routing Number:</span> 123456789
                    </p>
                    <p>
                      <span className="font-medium">SWIFT Code:</span> EXAMPLESWIFT
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-gray-600 font-sans">
                    Please include your name in the transfer reference
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HoneymoonFundForm;
