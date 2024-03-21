import './App.css';
import Footer from './Footer';
import GameBoard from './GameBoard/GameBoard';
import GameInformationSummary from './GameBoard/GameInformationSummary';
import Menu from './Menu';
import NavBar from './NavBar';
import ScoreBoard from './GameBoard/ScoreBoard';

function App() {

  return (
    <>
      <NavBar />
      <main className="bg-cyan-800 flex-1 flex flex-col lg:flex-row justify-center items-stretch gap-2 lg:gap-4 lg:py-4">
        <Menu />
        <GameBoard />
        <div className="space-y-8">
          <GameInformationSummary />
          <ScoreBoard />
        </div>

      </main>
      <Footer />

    </>
  );
}

export default App;
