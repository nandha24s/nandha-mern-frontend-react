import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function TraineeList() {
    const [traineeList, setTraineeList] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const getDatas = () => {
        axios.get('https://nandha-mern-backend-weld.vercel.app/v1/api/students/readAllStudents')
            .then((res) => {
                setTraineeList(res.data)
            })
            .catch((err) => {
                console.log(err);

            })
    }

    useEffect(() => {
        getDatas();
    }, [])



   const showStudent = () => {
        const object = {
            "name": search,
            "email": search
        }
        axios.post('https://nandha-mern-backend-weld.vercel.app/v1/api/students/readAStudent', object)
            .then((res) => {                 
                                         
                try{
                    const result = res.data;
                    if(result.length < 1){
                        alert("No Student found!!!");
                         setTraineeList([]);
                    } else{
                        setTraineeList(res.data); 
                    }
                }catch(err){
                    console.log(err);
                    
                }
                setTraineeList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching trainee:", err);
            });
    };

 




    const clearSearch = () => {
        setSearch('')
        getDatas();
    }

    const deleteData = (email) => {
        axios.delete('https://nandha-mern-backend-weld.vercel.app/v1/api/students/deleteAStudent', {
            data: { email: email }
        })
            .then((res) => {
                console.log("Data Deleted", res);
                alert("Trainee Deleted Successfully!");
                getDatas();
            }).catch((err) => {
                console.log(err);
            })

    }

    const editData = ({ name, email, age, city }) => {
        navigate('/update');
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("age", age)
        localStorage.setItem("city", city)
    }


    return (
        <div>
            <h1 className='my-3 text-success' >TRAINEE LIST</h1>
            <div className='my-2'>
                <input type="text" className='rounded-4 py-1 px-3 w-25' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Name or Email' />

                <button className='btn btn-info text-white fw-semibold rounded-4' onClick={showStudent}>Search by Name or Email</button>
                <button className='btn btn-info text-white fw-semibold rounded-4' onClick={clearSearch}>Clear Search</button>

            </div>
            <table className="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>AGE</th>
                        <th>CITY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        traineeList.map((res, i) => {
                            return (
                                <tr key={i}>
                                    <td>{res.name}</td>
                                    <td>{res.email}</td>
                                    <td>{res.age}</td>
                                    <td>{res.city}</td>
                                    <td>
                                        <button className='btn btn-primary mx-1' onClick={e => editData(res)}>EDIT</button>
                                        <button className='btn btn-danger mx-1' onClick={e => deleteData(res.email)}>DELETE</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default TraineeList