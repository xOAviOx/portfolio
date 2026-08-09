import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Experience } from "@/components/sections/Experience";
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
      <Story />
      <Experience />
      <Projects />
      <Sponsors />
      <Stack />
      <GitHubContributions />
      <Blog />
      <Contact />
    </main>
  );
}
