import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import './App.css';
import DashboardSummary from './DashboardSummary';

function App() {
  return (
    <Router>
      {/* <ScrollToTop /> */}
      <div className='min-h-screen dark:bg-dain bg-main bg-center px-5 md:px-20'>
        <ScrollToTop />
        <div className='p-0'>
          <Routes>
            <Route path='/' element={<DashboardSummary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
