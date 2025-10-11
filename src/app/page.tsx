import About from "@/components/About";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Movement from "@/components/Movement";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Events />
      <Movement />
      <Form />
      <Footer/>
    </div>
  );
}
