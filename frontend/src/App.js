import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router

import FormEditor from './components/FormEditor';
import FormPreview from './components/FormPreview';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormEditor />} />
          <Route path="/preview" element={<FormPreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
