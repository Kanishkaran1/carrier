import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          subject: "New Contact Form Enquiry",
        },
        publicKey
      );

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const inputBase =
    "w-full rounded-lg bg-white/[0.06] border px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors duration-200 focus:bg-white/[0.09] focus:border-ice/60 focus:outline-none";

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 tracking-tight">Quick Enquiry</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="cf-name" className="sr-only">
              Full Name
            </label>
            <input
              {...register("name")}
              id="cf-name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              className={`${inputBase} ${
                errors.name ? "border-red-500" : "border-white/15"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="cf-email" className="sr-only">
              Email Address
            </label>
            <input
              {...register("email")}
              id="cf-email"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              className={`${inputBase} ${
                errors.email ? "border-red-500" : "border-white/15"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label htmlFor="cf-phone" className="sr-only">
            Phone Number
          </label>
          <input
            {...register("phone")}
            id="cf-phone"
            type="tel"
            placeholder="Phone"
            autoComplete="tel"
            className={`${inputBase} ${
              errors.phone ? "border-red-500" : "border-white/15"
            }`}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label htmlFor="cf-message" className="sr-only">
            Message
          </label>
          <textarea
            {...register("message")}
            id="cf-message"
            placeholder="Message"
            rows={5}
            className={`${inputBase} resize-none ${
              errors.message ? "border-red-500" : "border-white/15"
            }`}
          />
          {errors.message && (
            <p className="text-red-400 text-xs" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSending}
            className="rounded-full bg-gradient-to-r from-primary to-electric px-8 py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-50 hover:shadow-[0_0_24px_hsl(var(--primary)/0.45)] active:scale-[0.98] transition-all duration-200"
          >
            {isSending ? "Sending…" : "Send Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
