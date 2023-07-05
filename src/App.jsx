import './App.css'

//react boostrap components
import 'bootstrap/dist/css/bootstrap.min.css';

//my components/views
import Header from "./components/header/Header.jsx";
import Home from "./views/home/Home.jsx";

function App() {

  return (
    <>
        <Header></Header>
        <Home></Home>
    </>
  )
}


export default App
