export function About() {
  return (
    <section id="despre" className="py-24 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Partea stângă: Text + Tehnologii */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Who is behind the code?</h2>
            <p className="text-muted-foreground text-lg">
              Hi, I'm Cătălin. With over 3 years of hands-on experience in web design and development, 
              I build digital solutions that turn visitors into customers.
            </p>
            <p className="text-muted-foreground text-lg">
              I believe an exceptional website requires more than just an attractive design. 
              I combine visual creativity with a deep understanding of business logic and data analysis.
            </p>
          </div>

          <div className="bg-secondary/30 p-6 rounded-xl border">
            <h3 className="font-semibold mb-4 text-lg">Technologies & Expertise:</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <p>✓ Next.js & React</p>
              <p>✓ Tailwind CSS</p>
              <p>✓ Framer Motion</p>
              <p>✓ UI/UX Design</p>
              <p>✓ E-commerce Custom</p>
              <p>✓ Database Architecture</p>
            </div>
          </div>
        </div>

        {/* Partea dreaptă: Carduri - le-am pus într-un layout care umple spațiul */}
        <div className="flex flex-col gap-4 h-full">
          <div className="p-6 border rounded-xl hover:border-primary transition-colors flex-1">
            <h4 className="font-bold mb-2">Custom Development</h4>
            <p className="text-sm text-muted-foreground">Solutions written from scratch, without the limitations of pre-built platforms.</p>
          </div>
          <div className="p-6 border rounded-xl hover:border-primary transition-colors flex-1">
            <h4 className="font-bold mb-2">Interactive Design</h4>
            <p className="text-sm text-muted-foreground">Fluid, animated interfaces that keep the user's attention.</p>
          </div>
          {/* Adăugăm un al treilea card aici pentru a umple golul vertical */}
          <div className="p-6 border rounded-xl hover:border-primary transition-colors flex-1 bg-primary/5">
            <h4 className="font-bold mb-2">Ongoing Support</h4>
            <p className="text-sm text-muted-foreground">Dedicated maintenance and performance optimization to ensure your growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
}