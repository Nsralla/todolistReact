import './App.css'
import MainPage from './components/MainPage'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RightSection from './components/RightSection';
import SpecificTodo from './Pages/SpecificTodo.jsx';
const router = createBrowserRouter([
  {
    path:'/',
    element:<MainPage/>,

    children:[
      {
      path:'/addTodo',
      element:<RightSection/>,
      },
    {
      path:'/:todoId',
      element:<SpecificTodo/>
    }]
  },
]);
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
