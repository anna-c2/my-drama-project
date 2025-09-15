'use client'
//components
import Header from '/Users/anna/my-drama-project/src/components/Header.tsx';
import InfoPage from '/Users/anna/my-drama-project/src/infopage/page.tsx';
import './index.css';
// import Carousel from '/Users/anna/my-drama-project/src/components/Carousel.tsx'

function App() {

  return (
    <div className="bg-[#2d2d30] relative">
      {/* <Header></Header> */}
      <InfoPage/>
      {/* <div className="container">
        hello
      </div> */}
      
      {/* <div className="header">
        <h1>Trending Dramas in China</h1>
      </div>
      <div className="trendingUS">
        <Carousel/>
      </div>
      <div className="header">
        <h1>Trending Dramas in the United States</h1>
      </div>
      <div className="trendingUS">
        <Carousel/>
      </div> */}
    </div>
  )
}

export default App
