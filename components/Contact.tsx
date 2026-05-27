"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Ref pentru a reseta formularul în siguranță
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      setErrorMsg("An error occurred: " + error.message);
      setIsSubmitting(false);
    } else {
      setIsSuccess(true);
      setIsSubmitting(false);
      
      // Resetare sigură folosind Ref
      formRef.current?.reset();
      
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 max-w-2xl text-center mx-auto">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Let's discuss your project
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Atașăm formRef aici */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input name="name" required className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="john@company.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">How can I help you?</label>
              <textarea name="message" required rows={5} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none" placeholder="Briefly describe your project..." />
            </div>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-12 text-md">
              {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}