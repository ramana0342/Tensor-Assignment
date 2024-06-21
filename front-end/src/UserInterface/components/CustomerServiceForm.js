

import React, { useState } from 'react';
import axios from 'axios';

const CustomerServiceForm = () => {
  
  const [queryForm, setqueryForm] = useState({ category:"", comments:"" });



  const handleChange=(field,value)=>{
    setqueryForm({...queryForm, [field]:value})
    console.log(queryForm)
  }

  const handleSubmit = async () => {
   try {
      const response = await axios.post('http://localhost:5000/api/submit',queryForm);
      console.log(response.data.message);
    
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div>
      <h2>Customer Service Form</h2>
     
        <label>
          Category:
          <br></br>
            <br></br>
          <select onChange={(e) => handleChange("category",e.target.value)}>
            <option value="">Select Category</option>
            
            <option value="General Queries">General Queries</option>
            <option value="Product Features Queries">Product Features Queries</option>
            <option value="Product Pricing Queries">Product Pricing Queries</option>
            <option value="Product Feature Implementation Requests">Product Feature Implementation Requests</option>
          </select>
        </label>
        <br />
        <label><br></br>
        <br></br>
          Comments:
          <br></br>
            <br></br>
          <textarea onChange={(e) => handleChange("comments",e.target.value)} />
        </label>
        <br />
        <button type="submit" onClick={()=>{handleSubmit()}}>Submit</button>
      
    </div>
  );
};

export default CustomerServiceForm;
