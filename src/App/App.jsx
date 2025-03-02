import Automatization from "../Widgets/Automatization/automatization";
import Tasks from "../Pages/Tasks/tasks";
import Chats from "../Pages/Chats/chats";
import GroupChat from "../Pages/groupChats/groupChats"
import { Route, Routes } from "react-router-dom";
import MainLayour from "../Pages/mainLayout/mainLayout";
import Login from "../Pages/login/login";
import PrivateRouter from "./Routers/privateRouter/privateRouter";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<MainLayour />}>
            <Route path="task/" element={<Tasks />} />
            <Route path="chats/" element={<Chats />} />
            <Route path="chats/:id/" element={<Chats />} />
            <Route path="grchats/" element={<GroupChat />} />
            <Route path="grchats/:id/" element={<GroupChat />} />
            <Route path="auto" element={<Automatization />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
