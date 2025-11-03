import './App.css';
import Container from './Components/Container';
import Header from './Components/Header';

function App() {
  return (
    <div className="min-vh-100 bg-light text-dark d-flex flex-column align-items-center">
      <Header />
      <Container />
    </div>
  );
}

export default App;
