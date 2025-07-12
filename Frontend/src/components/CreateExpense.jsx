import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "@/redux/expenseSlice";

const CreateExpense = () => {

  const [formData, setFormData] = useState({
    description:"",
    amount:"",
    category:""
  });

  const [loading, setLoading] = useState(false);  // this is for loading the expense dialog

  const [isOpen, setIsOpen] = useState(false);   //for opening and closing of dialog box

  const dispatch= useDispatch();
  const {expenses} = useSelector(store=>store.expense)

  const changeEventHandler = (e) => {
    const {name,value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:value
    }));
  }

  const changeCategoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category:value
    }))
  }

  const submmitHandler = async (e) => {
    e.preventDefault();  //will remove direct refreshing
    console.log(formData); 
    try{
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/expense/add", formData,{
        headers: {
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(res.data.success){
        dispatch(setExpenses([...expenses,res.data.expense]))
        toast.success(res.data.message);
        setIsOpen(false);
      }
    }
    catch(error){
      console.log(error);
      
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={ ()=> {setIsOpen(true)}} variant="outline">Add New Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Create expense here. Click add when expense is done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submmitHandler} action="">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="decription"
                  className="col-span-3"
                  value={formData.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  placeholder="xxx in ₹"
                  className="col-span-3"
                  value={formData.amount}
                  onChange={changeEventHandler}
                />
              </div>
              <Select onValueChange={changeCategoryHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectGroup>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <br />
            <DialogFooter>
              {
                loading ? <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 animate-spin">Please wait for a while</Loader2>
                </Button> :
                <Button type="submit" className="bg-black text-white">Add</Button>

              }
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateExpense;
