import { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from '../../../../utils/errorHandler';
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb', // Set limit to 10 MB
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {

    try {
        const schema = {
  description: "Expense Data",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      title: {
        type: SchemaType.STRING,
        description: "Name of the receipt",
        nullable: false,
      },
      total_amount: {
        type: SchemaType.NUMBER,
        description: "Expense Total Amount",
        nullable: false,
      },
      date: {
        type: SchemaType.STRING,
        description: "Expense Date",
        nullable: false,
      },
      category: {
        type: SchemaType.STRING,
        description: "Expense Category",
        nullable: false,
      },
      description: {
        type: SchemaType.STRING,
        description: "Expense Description",
        nullable: false,
      },
    },
    required: ["title","total_amount","date","category","description"],
  },
                     };

        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
          },
        });



const expenseCategories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Entertainment",
  "Clothing",
  "Medical & Healthcare",
  "Household Items/Supplies",
  "Education",
  "Gifts",
  "Personal Spending",
  "Savings",
  "Other",
];

const prompt = `the image of receipt I want array of object contain {date,description,category,total_amount,title} date could be current date or if it is given in receipt assign that in the formate YYYY-MM-DD set relevant title assign relevant category from ${expenseCategories} and description could all the items belong to same expenseCategories image and  and total_amount for those item belong to same category like if items belong to food category calculate all the item price set set to total_amount and set all those items to description and description should be comma separated give me output`;

const image = {
  inlineData: {
    data: req.body.image,
    mimeType: "image/*",
  },
};

     const result = await model.generateContent([prompt,image]);

     if(JSON.parse(result.response.text())[0].total_amount===0){
      errorHandler(res, 404, 'No Receipt Detected please upload valid receipt');
     }

     
     res.status(201).json(JSON.parse(result.response.text()));


    } 
    catch (error) {
      errorHandler(res, 500, 'Failed to add expense');
    }
  } 
  
  else {
    errorHandler(res, 405, `Method ${req.method} Not Allowed`);
  }
}
