import Hero from "../Landing/Hero";
import GrowWithSimu from "../Landing/GrowWithSimu";
import SimuTools from "../Landing/SimuTools";
import Footer from "../layout/Footer";

function HomePage() {
  return (
    <div>
      <Hero />
      <SimuTools />
      <GrowWithSimu />
      <Footer/>
    </div>
  );
}

export default HomePage;
