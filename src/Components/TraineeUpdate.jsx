import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TraineeUpdate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem("name"))
    setEmail(localStorage.getItem("email"))    
    setAge(localStorage.getItem("age"))
    setCity(localStorage.getItem("city"))
  }, [])

  const updateStudent = async (e) => {
    e.preventDefault();
    if (!name || !email || !age || !city) {
      alert("All fields are required");
      return;
    }
    if (Number(age) < 18) {
      alert("age must be greater than or equal to 18!!!");
      return;
    }
   
    await axios.put('https://nandha-mern-backend-weld.vercel.app/v1/api/students/updateAStudent', {
      name, email, age, city
    })
      .then((res) => {
        alert('Student has been updated successfully')
        setTimeout(() => {
          navigate('/')
        }, 2000)
      })
      .catch((err) => {
        console.log(err);

      })
  }


  return (
    <div>
      <div class="position-fixed top-50 start-50 translate-middle shadow p-4 rounded bg-white my-2" style={{ width: "450px" }}>
        <h4 className='text-success'>UPDATE STUDENT</h4>
        <form onSubmit={updateStudent}>
          <input type="text" class="form-control mb-3" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" class="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" disabled required />
          <input type="number" class="form-control mb-3" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
          <input type="text" class="form-control mb-3" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
          <button type="submit" class="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  )
}

export default TraineeUpdate