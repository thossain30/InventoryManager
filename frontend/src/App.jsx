import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DisplayCar, Home, PageNotFound } from './pages'
import './index.css'
import { AppNav } from './Components/NavigationBar'

export const App = () => {
    return (
        <BrowserRouter>
            {/* Place navbar here because I want it on every page */}
            {/* Navigating between pages will carry this navbar with us */}
            <AppNav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='car' element={<DisplayCar />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
            <footer>Footer!</footer>
        </BrowserRouter>
    )
}