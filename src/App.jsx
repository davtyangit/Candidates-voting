import { Route, Routes } from 'react-router-dom';
import { CandidatesPage } from './pages/candidates/candidates-page/CandidatesPage';
import { SingleCandidate } from './pages/candidates/single-candidate/SingleCandidate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <ToastContainer theme="colored" autoClose={500} />
      <Routes>
        <Route path="/" element={<CandidatesPage />} />
        <Route path="/candidates/:id" element={<SingleCandidate />} />
      </Routes>
    </div>
  );
};

export default App;
