
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
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitRsvp } from "../services/rsvpService";

const formSchema = z.object({
  guestName: z.string().min(2, {
    message: "Guest name must be at least 2 characters.",
  }),
  plusOnes: z.number().min(0).max(5, {
    message: "Maximum 5 plus ones allowed.",
  }),
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
      plusOnes: 0,
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);

    try {
      const rsvpId = await submitRsvp(values);
      console.log("RSVP submitted successfully with ID:", rsvpId);
      
      toast({
        title: "RSVP Submitted Successfully!",
        description:
          "Thank you for your response. We can't wait to celebrate with you!",
      });
      
      form.reset();
    } catch (error) {
      console.error("RSVP submission error:", error);
      
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your RSVP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border bg-white">
      <CardHeader className="text-center pb-8">
        <CardTitle className="font-cinzel text-2xl md:text-3xl font-medium tracking-wide flex items-center justify-center gap-3">
          Your Response
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
                      className="h-12 border-gray-300 focus:border-black transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          field.onChange(0);
                        } else {
                          const numValue = parseInt(value);
                          if (!isNaN(numValue)) {
                            field.onChange(numValue);
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-gray-500 mt-1">
                    Please let us know how many invited guests are coming with
                    you (Spouse, children ect)
                  </p>
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
                className="w-full h-14 font-sans rounded-none text-lg uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            please don't hesitate to contact us directly or Whatsapp on <br />{" "}
            +94 72 382 3256
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RsvpForm;
