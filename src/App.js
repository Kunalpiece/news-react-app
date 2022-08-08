import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default class App extends Component {
  pageSize = 5;
  apiKey = "023873f9493441fa9059487471631e04";

  state = {
    progress:0
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar/> 
          <Routes>
            <Route path="/" element={
              <News key="everything" category="News"/>
            } />
            <Route path="/general" element={
              <News key="general" category="general"/>
            } /> 
            <Route path="/business" element={
              <News key="business" category="business"/>
            } /> 
            <Route path="/entertainment" element={
              <News key="entertainment" category="entertainment"/>
            } />
            <Route path="/health" element={
              <News key="health" category="health"/>
            } />
            <Route path="/science" element={
              <News key="science" category="science"/>
            } />
            <Route path="/sports" element={
              <News key="sports" category="sports"/>
            } />
            <Route path="/technology" element={
              <News key="technology" category="technology"/>
            } /> 
          </Routes>
        </Router>
      </div>
    )
  }
}