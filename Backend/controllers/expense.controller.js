import Expense from '../models/expense.model.js';

export const addExpense = async (req, res) => {
    try{
        const { description, amount, category } = req.body;
        const UserId = req.id;  //current loggedin user id
        console.log(req.body); 

        if(!description || !amount || !category) {      //if one of the fields is empty
            return res.status(400).json({ 
                message: "All fields are required",
                success: false 
            });
        }

        const expense = await Expense.create({   // Create a new expense
            description,
            amount,
            category,
            UserId   // Assuming req.user is set by authentication middleware (expense will be added by the logged-in user)
        });

        return res.status(201).json({
            message: "Expense added successfully",
            expense: expense,
            success: true
        })

    }
    catch (error) {
        console.error("Error in addExpense:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//the below code is for filtering expenses by user id
export const getAllExpense = async (req,res) => {
    try{
        const UserId = req.id;  //current loggedin user id
        let category = req.query.category || "";  //get category from query string
        const done = req.query.done || false;  //get done status from query string

        const query= {
            UserId, //filter by user id

        }

        if(category.toLowerCase() === "all") {
            //no need to filter by category
        }
        else{
            query.category = {$regex:category, $options:'i'}  //regex to match category and options to make it case insensitive
        } 
        
        if(String(done).toLowerCase() === "done"){  //to make sure that done is string  and convert it to lower case
            query.done = true;  //filter 
        } else if(String(done).toLowerCase() === "undone"){
            query.done = false;  //filter for expense mark as pending
        }

        const expense = await Expense.find(query);

        if(!expense || expense.length === 0){
            return res.status(404).json({
                message: "No expenses found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Expenses retrieved successfully",
            expense: expense,
            success:true
        })
    }
    catch(error){
        console.error("Error in getAllExpense:", error);
    }
}

export const markAsDoneOrUndone= async (req,res) => {
    try{
        const expenseId = req.params.id;  //get expense id from url params
        const done= req.body;
        const expense= await Expense.findByIdAndUpdate(expenseId, done, {new:true});

        if(!expense){
            return res.status(404).json({
                message: "Expense not found",
                success: false
            })
        }

        return res.status(200).json({
            message: `Expense mark as ${expense.done  ? "done" : "undone"}`,
            success: true
        })
    }
    catch(error){
        console.error("Error in markAsDoneOrUndone:", error);
    }
}

export const removeExpense = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }

        res.status(200).json({ success: true, message: 'Expense deleted successfully' });


    }
    catch(error){
        console.error("Error in removeExpense:", error);
    }
}

export const updateExpense = async (req, res) => {
    try{
        const { description, amount, category} = req.body;
        const expenseId = req.params.id;

        const updateData= { description, amount, category};

        const expense = await Expense.findByIdAndUpdate(expenseId, updateData, {new: true});

        return res.status(200).json({
            message: "Expense updated",
            expense: expense,
            success: true
        })

    }
    catch(error){
        console.error("Error in updateExpense:", error);
    }

}