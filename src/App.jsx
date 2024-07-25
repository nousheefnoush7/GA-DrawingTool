import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import GoJSDiagram from './demo'
import './App.css'
import Home from './Home';
import Testing from './DatabaseTesting';


function App() {

  return (
    <Router basename='/'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Testing />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
