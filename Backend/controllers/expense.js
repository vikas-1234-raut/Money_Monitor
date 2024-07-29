const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  // Parse the amount to a number
  const parsedAmount = parseFloat(amount);

  // Validate input data
  if (!title || !category || !description || !date) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number!' });
  }

  // Convert date string to Date object
  const [day, month, year] = date.split('-');
  const parsedDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: 'Invalid date format!' });
  }


  const expense = new ExpenseSchema({
    title,
    amount: parsedAmount,
    category,
    description,
    date: parsedDate
  });

  try {
    await expense.save();
    res.status(200).json({ message: 'expense Added Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add expense', error: error.message });
  }
  
  console.log(expense);
}
  exports.getExpense =async (req ,res ) =>{
  try {
   const expense = await ExpenseSchema.find().sort({createdAt:-1})
   res.status(200).json(expense)
  } catch (error) {
   res.status(500).json({message:'Server Error'})
  }
  }

  exports.deleteExpense =async (req ,res ) =>{
   const {id} = req.params;
   
   ExpenseSchema.findByIdAndDelete(id)
      .then((expense)=>{
         res.status(200).json({message:'Expense Deleted'})   
      })
      .catch((err)=>{
         res.status(500).json({message:'Server Error'})
      })
      


};
