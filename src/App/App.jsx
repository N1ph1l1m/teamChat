import MainLayour from '../Pages/mainLayout/mainLayout';
import '../App.scss';
import Automatization from '../Widgets/Automatization/automatization';
import Tasks from '../Widgets/Tasks/tasks';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayour/>}>
        <Route path="task" element= {<Tasks/>}/>
        <Route path="auto" element= {<Automatization/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
