import { setExpenses } from "@/redux/expenseSlice";
import store from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetExpense = () => {

    const dispatch= useDispatch();
    const{category, markAsDone} = useSelector(store => store.expense);  //useSelector is a React-Redux hook that allows a component to access data from the Redux store.

    useEffect(() => {
        const fetchExpenses = async () => {
            try{
                axios.defaults.withCredentials=true;
                const res=await axios.get(`http://localhost:8000/api/v1/expense/getall?category=${category}&done=${markAsDone}`)  //? is there because we are sending category and done as query
                if(res.data.success){
                    dispatch(setExpenses(res.data.expense));  //in backend we are returning expense
                }
            }
            catch(error){
                console.log(error);
                
            }
        }
        fetchExpenses();
    }, [dispatch, category, markAsDone]);  //will fetch when category, markAsDone will be changed.
}

export default useGetExpense;