import { Hero } from "@/components/sections/Hero";
import { BannerQuote } from "@/components/sections/BannerQuote";
import { Story } from "@/components/sections/Story";
import { Projects } from "@/components/sections/Projects";
import { Sponsors } from "@/components/sections/Sponsors";
import { Stack } from "@/components/sections/Stack";
import { GitHubContributions } from "@/components/sections/GitHubContributions";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <BannerQuote />
      <Story />
      <Projects />
      <Sponsors />
      <Stack />
      <GitHubContributions />
      <Blog />
      <Contact />
    </main>
  );
}
