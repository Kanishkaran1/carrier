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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Quick Enquiry</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className={`w-full bg-transparent border px-4 py-3 text-sm text-white ${
                errors.name ? "border-red-500" : "border-white/30"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className={`w-full bg-transparent border px-4 py-3 text-sm text-white ${
                errors.email ? "border-red-500" : "border-white/30"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone"
            className={`w-full bg-transparent border px-4 py-3 text-sm text-white ${
              errors.phone ? "border-red-500" : "border-white/30"
            }`}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <textarea
            {...register("message")}
            placeholder="Message"
            rows={5}
            className={`w-full bg-transparent border px-4 py-3 text-sm text-white ${
              errors.message ? "border-red-500" : "border-white/30"
            }`}
          />
          {errors.message && (
            <p className="text-red-400 text-xs">{errors.message.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSending}
            className="bg-primary px-6 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
