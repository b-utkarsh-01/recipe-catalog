import './App.css';
import Navbar from "./componenets/Navbar"
import MainRoute from './routes/MainRoute';

const App = () => {
  return (
    <div className="App min-h-screen w-full text-white py-4 px-4 sm:px-6 lg:px-12 xl:px-20">
      <Navbar/>
      <MainRoute/>
    </div>
  )
}

export default App
