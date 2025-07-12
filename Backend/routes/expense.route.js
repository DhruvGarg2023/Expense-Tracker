import express from 'express';
import { addExpense, markAsDoneOrUndone, getAllExpense, removeExpense, updateExpense } from '../controllers/expense.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route('/add').post(isAuthenticated, addExpense);  //addexpense will happen when user will be authenticated.
router.route('/getall').get(isAuthenticated, getAllExpense);  //addexpense will happen when user will be authenticated.
router.route('/remove/:id').delete(isAuthenticated, removeExpense);  //addexpense will happen when user will be authenticated.
router.route('/update/:id').put(isAuthenticated, updateExpense);  //addexpense will happen when user will be authenticated.
router.route('/:id/done').put(isAuthenticated, markAsDoneOrUndone);  //addexpense will happen when user will be authenticated.


export default router;