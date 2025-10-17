import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TraineeAdd() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");    
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const addTrainee = async (e) => {
        e.preventDefault();
        let obj = { name, email, age, city };

        try {
            if (Number(age) < 18) {
                alert("age must be greater than or equal to 18!!!");
                return;
            }
            
            const response = await axios.post('https://nandha-mern-backend-weld.vercel.app/v1/api/students/addAStudent', obj);

            if (response.data.message === "Student Added Successfully!") {
                alert(response.data.message);
                setName('');
                setEmail('');                
                setAge('');
                setCity('');

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
              else {
                alert(response.data.errors);
                return;
            }
            
        } catch (error) {
            console.log('Error adding student:', error);
            alert('Failed to add student');
        }
    };



    return (
        <div>

            <div class="position-fixed top-50 start-50 translate-middle shadow p-4 rounded bg-white my-2" style={{ width: "450px" }}>
                <h4 className='text-success'>STUDENT DETAILS</h4>
                <form onSubmit={addTrainee}>
                    <input type="text" class="form-control mb-3" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
                    <input type="email" class="form-control mb-3" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="number" class="form-control mb-3" onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                    <input type="text" class="form-control mb-3" onChange={(e) => setCity(e.target.value)} placeholder="City" required />
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TraineeAdd