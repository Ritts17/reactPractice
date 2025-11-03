// import NavBar from './components/NavBar';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './components/Home';
// import Cart from './components/Cart';
// import Payment from './components/Payment';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <NavBar />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/cart/payment' element={<Payment />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { Suspense, lazy } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Payment from './components/Payment';

const Home = lazy(() => import('./components/Home'));

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route 
            path='/' 
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            } 
          />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/payment' element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;