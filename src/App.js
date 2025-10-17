import logo from './logo.svg';
import './App.css';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TraineeList from './Components/TraineeList';
import TraineeAdd from './Components/TraineeAdd';
import TraineeUpdate from './Components/TraineeUpdate';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Layout />
        <Routes>
          <Route exact path='/' element={<TraineeList />}></Route>
          <Route path='/add' element={<TraineeAdd />}></Route>
          <Route path='/update' element={<TraineeUpdate />}></Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
