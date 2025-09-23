'use client'
//components
import Header from '/Users/anna/my-drama-project/src/components/Header.tsx';
import InfoPage from '/Users/anna/my-drama-project/src/infopage/page.tsx';
import './index.css';
import Carousel from '/Users/anna/my-drama-project/src/components/Carousel.tsx'
import { useEffect, useRef } from "react";

interface Drama {
  title: string;
  year: string;
  image: string;
  rating: string;
  rank: number;
  genres: string[];
};
const testDrama: Drama = {
  title: "The Prisoner of Beauty",
  year: "2025",
  image: "https://pub-affc0001b76247f59177d2bd8ccdc395.r2.dev/the-prisoner-of-beauty.jpeg",
  rating: "10",
  rank: 1,
  genres: ["Romance", "War", "Political Marriage"]
}
function App() {
  const typingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      const el = typingRef.current;
      const chars = el.textContent?.length ?? 0;

      el.style.setProperty("--chars", `${chars}ch`);
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = `
        typing ${chars * 0.1}s steps(${chars}, end),
        blink-caret .75s step-end infinite`;
    }
  }, []);

  return (
    <div className="bg-[#2d2d30] relative">
      {/* <Header></Header> */}
      <InfoPage drama={testDrama}/>
      {/* <div className="container">
        hello
      </div> */}
      <div className="blurb">
        <div className="title">
          <h1><span className="bold">⭐ Beyond the Drama ⭐</span></h1>
          <span ref={typingRef} className="typing">Stories Within the Story</span>
        </div>
        <p>Step deeper into top trending dramas. Discover the history behind the setting, the novels that inspired the plot, the soundtracks that set the mood, and the cultural details that shape every scene.</p>
      </div>
      <div className="header">
        <h1>Trending Dramas in China</h1>
      </div>
      <div className="trendingUS">
        <Carousel />
      </div>

    </div>
  )
}

export default App
