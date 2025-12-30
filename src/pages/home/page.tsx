import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import Impact from './components/Impact';
import SDGs from './components/SDGs';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <Features />
      {/* <Impact /> */}
      <SDGs />
      <BackToTop />
      <Footer />
    </div>
  );
}