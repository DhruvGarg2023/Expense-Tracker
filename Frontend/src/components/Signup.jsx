import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Logo from './shared/Logo'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'


const Signup = () => {

  const [input, setInput] = React.useState({   //for storing the input values
    fullname:"",
    email:"",
    password:""
  });

  const changeHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})  // update the input state
  }

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();   // prevent default form submission
    console.log(input); // print the input values

    try{
      const res= await axios.post("http://localhost:8000/api/v1/user/register", input , {
        headers:{ // add headers to the request
          'Content-Type':'application/json'          
        },
        withCredentials:true   // send cookies with the request
      })
      console.log(res);
      if(res.data.success){
          toast.success(res.data.message);   //toast means a pop up message
          navigate('/login');
      }
      
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={submitHandler} className='w-96 p-8 bg-white rounded-lg shadow-lg'>
        <div className='w-full flex justify-center mb-5'>
          <Logo/>
        </div>
        <div>
            <Label>Full Name</Label>
            <Input
                type='text'
                name='fullname'
                value={input.fullname}
                onChange={changeHandler}                
                />
                
        </div>
        <br/>
        <div>
            <Label>Email</Label>
            <Input
                type='email'
                name='email'
                value={input.email}
                onChange={changeHandler}
                />
        </div>
        <br/>
        <div>
            <Label>Password</Label>
            <Input
                type='password'
                name='password'
                value={input.password}
                onChange={changeHandler}
                />
        </div>
        <Button className="w-full my-5 bg-blue-900 text-white p-4 rounded-lg">Signup</Button>
        <p className='text-sm text-center  '>Already have an account? <Link to='/login' className='text-blue-600' >Login</Link></p>

      </form>
    </div>
  )
}

export default Signup
