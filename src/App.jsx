import './App.css'
import {Route, Routes} from "react-router-dom";

//react boostrap components
import 'bootstrap/dist/css/bootstrap.min.css';

//my components/views
import Header from "./components/header/Header.jsx";
import Home from "./views/home/Home.jsx";
import Events from "./views/events/Events.jsx";
import Gallery from "./views/gallery/Gallery.jsx";
import Contact from "./views/contact/Contact.jsx";
import NotFound from "./views/not_found/NotFound.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<Header />}>
                <Route index element={<Home />} />
                <Route path={"/events"} element={<Events />}></Route>
                <Route path={"/gallery"} element={<Gallery />}></Route>
                <Route path={"/contact"} element={<Contact />}></Route>
                <Route path={"*"} element={<NotFound />}></Route>
            </Route>
        </Routes>
    </>
  )
}


export default App
