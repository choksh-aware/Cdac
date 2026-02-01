
import { BrowserRouter, Navigate, Routes } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "./context/AppContext" // Your context
import Expence from "./pages/Expence"
import Income from "./pages/Income"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Category from "./pages/Category"
import { Route } from "react-router-dom"
import React from 'react'
import Home from "./pages/Home"
import Filter from "./pages/Filter"
import { Toaster } from "react-hot-toast"
import Contact from "./pages/Contact"
import Dashboard from "./components/Dashboard"
import AboutUs from "./pages/AboutUs"
import LandingPage from "./pages/LandingPage"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token")
  return isAuthenticated ? children : <Navigate to="/login" />
}

// Public Route Component (redirects authenticated users)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token")
  return !isAuthenticated ? children : <Navigate to="/dashboard" />
}

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page - shows to non-authenticated users */}
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />
          
          {/* Auth Routes - only for non-authenticated users */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          
          {/* Public pages accessible to everyone */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Protected Routes - only for authenticated users */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/income" element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          } />
          
          <Route path="/expense" element={
            <ProtectedRoute>
              <Expence />
            </ProtectedRoute>
          } />
          
          <Route path="/category" element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          } />
          
          <Route path="/filter" element={
            <ProtectedRoute>
              <Filter />
            </ProtectedRoute>
          } />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
