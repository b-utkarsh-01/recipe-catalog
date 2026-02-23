import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import CreateRecipe from "../pages/CreateRecipe"
import Recipe from "../pages/Recipe"
import Single from "../pages/SingleRecipe"
import PageNotFound from "../pages/PageNotFound"
import Fav from "../pages/Fav"

const MainRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/create' element={<CreateRecipe/>}/>
      <Route path='/recipe' element={<Recipe/>}/>
      <Route path="/recipe/details/:id" element={<Single/>}/>
      <Route path="/recipe/detals/:id" element={<Single/>}/>
      <Route path="/favorites" element={<Fav/>}/>
      <Route path="/favroute" element={<Fav/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  )
}

export default MainRoute
