import Hero from "../Landing/Hero";
import GrowWithSimu from "../Landing/GrowWithSimu";
import SimuTools from "../Landing/SimuTools";
import Footer from "../layout/Footer";
import User from "../Modals/User";

function HomePage() {
  return (
    <div>
      <Hero />
      <SimuTools />
      <GrowWithSimu />
      <Footer/>
      <User/>
    </div>
  );
}

export default HomePage;
