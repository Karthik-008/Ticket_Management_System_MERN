import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import TicketForm from './Components/TicketForm';
import TicketUpdateForm from './Components/UpdateForm';
import ViewForm from './Components/ViewForm';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/submit' element={<TicketForm/>}/>
        <Route path='/update' element={<TicketUpdateForm/>}/>
        <Route path='/view' element={<ViewForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
