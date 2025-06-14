
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  guestName: z.string().min(2, {
    message: "Guest name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  plusOnes: z.number().min(0).max(5, {
    message: "Maximum 5 plus ones allowed.",
  }),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const RsvpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      email: "",
      plusOnes: 0,
      dietaryRestrictions: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("RSVP Form Data:", values);
      toast({
        title: "RSVP Submitted Successfully!",
        description: "Thank you for your response. We can't wait to celebrate with you!",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="text-center pb-8">
        <CardTitle className="font-cinzel text-2xl md:text-3xl font-medium tracking-wide flex items-center justify-center gap-3">
          <Heart className="w-6 h-6 text-black" />
          Your Response
          <Heart className="w-6 h-6 text-black" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 md:px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Guest Name */}
            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-base font-medium tracking-wide">
                    Full Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="h-12 border-gray-300 focus:border-black transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-base font-medium tracking-wide">
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-12 border-gray-300 focus:border-black transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Plus Ones */}
            <FormField
              control={form.control}
              name="plusOnes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-base font-medium tracking-wide flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Number of Plus Ones
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      placeholder="0"
                      className="h-12 border-gray-300 focus:border-black transition-colors"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-gray-500 mt-1">
                    Please let us know how many guests you'll be bringing (max 5)
                  </p>
                </FormItem>
              )}
            />

            {/* Dietary Restrictions */}
            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-base font-medium tracking-wide">
                    Dietary Restrictions or Allergies
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please let us know about any dietary restrictions or allergies..."
                      className="min-h-[100px] border-gray-300 focus:border-black transition-colors resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Special Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-base font-medium tracking-wide">
                    Special Message for the Couple
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your wishes, memories, or any special message..."
                      className="min-h-[100px] border-gray-300 focus:border-black transition-colors resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 font-sans text-lg uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Submitting..." : "Submit RSVP"}
              </Button>
            </div>
          </form>
        </Form>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            If you have any questions or need to make changes to your RSVP,
            <br />
            please don't hesitate to contact us directly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RsvpForm;
