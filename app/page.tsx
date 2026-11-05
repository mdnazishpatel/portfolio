import About from "@/app/components/about/About";
import Projects from "@/app/components/projects/Project";
import Contact from '@/app/components/contact/Contact'
import Hero from "@/app/components/home/Home"
import Skills from "./components/skills/Skills";


export default function Page() {
  return (
    <>
      <Hero/>
       <Skills/>
      <About />
      <Projects />
      <Contact/>
    </>
  );
}