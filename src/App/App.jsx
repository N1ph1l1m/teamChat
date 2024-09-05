
import '../App.scss';
import Automatization from '../Widgets/Automatization/automatization';
import Tasks from '../Widgets/Tasks/tasks';
import { Route, Routes } from 'react-router-dom';
import MainLayour from '../Pages/mainLayout/mainLayout';
import Login from '../Pages/login/login';


function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element= {<Login/>}/>
      <Route path="/" element={<MainLayour/>}>
        <Route path="task" element= {<Tasks/>}/>
        <Route path="auto" element= {<Automatization/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
