import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { SocialProof } from "@/components/sections/SocialProof"
import { Problem } from "@/components/sections/Problem"
import { Features } from "@/components/sections/Features"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Testimonials } from "@/components/sections/Testimonials"
import { Pricing } from "@/components/sections/Pricing"
import { DemoForm } from "@/components/sections/DemoForm"
import { FAQ } from "@/components/sections/FAQ"
import { CTAFinal } from "@/components/sections/CTAFinal"
import { SeoText } from "@/components/sections/SeoText"
import { Footer } from "@/components/sections/Footer"
import { JsonLd } from "@/components/seo/JsonLd"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <DemoForm />
        <FAQ />
        <CTAFinal />
        <SeoText />
      </main>
      <Footer />
    </div>
  )
}
