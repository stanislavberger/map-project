import './App.css'
import { Routes, Route } from "react-router-dom";
import Campaign from './pages/Campaign';
import Home from './pages/Home';
import AddCampaign from './pages/AddCampaign';

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/addcampaign' element={<AddCampaign />} />
      <Route path='/campaign' element={<Campaign />} />
    </Routes>
    </>
  )
}

export default App
