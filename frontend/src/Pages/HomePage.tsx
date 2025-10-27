import Hero from "../Landing/Hero";
import GrowWithSimu from "../Landing/GrowWithSimu";
import SimuTools from "../Landing/SimuTools";
import Footer from "../layout/Footer";
import { MessageCircle} from 'lucide-react'

function HomePage() {
  return (
    <div>
      
      <Hero />
      <SimuTools />
      <GrowWithSimu />
      <Footer/>
      <MessageCircle className="fixed bottom-6 right-6 bg-red-600 text-white rounded-full p-4 w-14 h-14 cursor-pointer hover:bg-red-700 transition-all duration-300"/>
      
    </div>
  );
}

export default HomePage;
