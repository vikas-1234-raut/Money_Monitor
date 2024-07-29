const IncomeSchema = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
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

  const income = new IncomeSchema({
    title,
    amount: parsedAmount,
    category,
    description,
    date: parsedDate
  });

  try {
    await income.save();
    res.status(200).json({ message: 'Income Added Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add income', error: error.message });
  }

  console.log(income);
}


  exports.getIncomes =async (req ,res ) =>{
  try {
   const incomes = await IncomeSchema.find().sort({createdAt:-1})
   res.status(200).json(incomes)
  } catch (error) {
   res.status(500).json({message:'Server Error'})
  }
  }

  exports.deleteIncome =async (req ,res ) =>{
   const {id} = req.params;
   
   IncomeSchema.findByIdAndDelete(id)
      .then((income)=>{
         res.status(200).json({message:'Income Deleted'})   
      })
      .catch((err)=>{
         res.status(500).json({message:'Server Error'})
      })
      


};
