-- uuid-ossp extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Create table for expenses
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    expense_id uuid DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT
);

-- Table Owner
ALTER TABLE expenses OWNER TO abhishekjaiswar;

-- Create table for incomes
CREATE TABLE IF NOT EXISTS incomes (
    id SERIAL PRIMARY KEY,
    income_id uuid DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT
);

-- Table Owner
ALTER TABLE incomes OWNER TO abhishekjaiswar;

-- Sample data for expenses
INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Groceries', 1200.00, '2024-09-13', 'Food', 'Monthly grocery shopping'),
    ('Rent', 15000.00, '2024-09-01', 'Housing', 'Rent for September'),
    ('Utility Bills', 3000.00, '2024-09-05', 'Utilities', 'Electricity and water bills'),
    ('Dining Out', 800.00, '2024-09-08', 'Food', 'Dinner with friends'),
    ('Car Maintenance', 5000.00, '2024-09-10', 'Transportation', 'Car service and repairs');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Internet Bill', 1500.00, '2024-09-15', 'Utilities', 'Monthly internet bill'),
    ('Health Insurance', 5000.00, '2024-09-20', 'Insurance', 'Health insurance premium'),
    ('Entertainment', 1000.00, '2024-09-25', 'Entertainment', 'Movie tickets and snacks'),
    ('Clothing', 2000.00, '2024-09-28', 'Shopping', 'New clothes for the season'),
    ('Travel', 3000.00, '2024-09-30', 'Travel', 'Weekend getaway with family');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Gym Membership', 2000.00, '2024-09-02', 'Health', 'Monthly gym membership fee'),
    ('Phone Bill', 1000.00, '2024-09-12', 'Utilities', 'Mobile phone bill'),
    ('Home Repairs', 4000.00, '2024-09-18', 'Home', 'Repairs and maintenance work'),
    ('Education', 5000.00, '2024-09-22', 'Education', 'Tuition fees for online course'),
    ('Gifts', 1500.00, '2024-09-29', 'Gifts', 'Birthday gift for friend');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Pet Supplies', 1000.00, '2024-09-03', 'Pets', 'Food and supplies for pet dog'),
    ('Charity Donation', 500.00, '2024-09-14', 'Charity', 'Donation to local charity organization'),
    ('Home Insurance', 3000.00, '2024-09-24', 'Insurance', 'Home insurance premium'),
    ('Books', 800.00, '2024-09-26', 'Education', 'Books for personal development'),
    ('Subscription Services', 500.00, '2024-09-27', 'Entertainment', 'Monthly subscription services');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Medical Expenses', 2000.00, '2024-09-04', 'Health', 'Doctor consultation and medication'),
    ('Car Insurance', 4000.00, '2024-09-16', 'Insurance', 'Car insurance premium'),
    ('Home Decor', 3000.00, '2024-09-19', 'Home', 'Decor items for home renovation'),
    ('Hobbies', 1000.00, '2024-09-23', 'Entertainment', 'Art supplies for painting hobby'),
    ('Personal Care', 500.00, '2024-09-30', 'Health', 'Personal care products');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Dental Checkup', 1000.00, '2024-09-06', 'Health', 'Dental checkup and cleaning'),
    ('Car Fuel', 2000.00, '2024-09-17', 'Transportation', 'Fuel for car'),
    ('Home Appliances', 5000.00, '2024-09-21', 'Home', 'New appliances for home'),
    ('Music Lessons', 1500.00, '2024-09-25', 'Education', 'Music lessons for guitar'),
    ('Sports Equipment', 1000.00, '2024-09-29', 'Sports', 'New sports equipment');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Eye Checkup', 800.00, '2024-09-07', 'Health', 'Eye checkup and prescription glasses'),
    ('Public Transport', 1000.00, '2024-09-18', 'Transportation', 'Public transport tickets'),
    ('Gardening Supplies', 500.00, '2024-09-22', 'Home', 'Supplies for gardening hobby'),
    ('Language Course', 2000.00, '2024-09-26', 'Education', 'Online language course'),
    ('Outdoor Activities', 1000.00, '2024-09-30', 'Sports', 'Outdoor sports activities');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Health Supplements', 500.00, '2024-09-08', 'Health', 'Vitamins and health supplements'),
    ('Taxi Fare', 500.00, '2024-09-19', 'Transportation', 'Taxi fare for travel'),
    ('DIY Projects', 1000.00, '2024-09-23', 'Home', 'Materials for DIY projects'),
    ('Online Course', 3000.00, '2024-09-27', 'Education', 'Online course for professional development'),
    ('Camping Gear', 2000.00, '2024-09-29', 'Sports', 'New camping gear');

INSERT INTO expenses (title, amount, date, category, description)
VALUES
    ('Fitness Classes', 2000.00, '2024-09-09', 'Health', 'Fitness classes and personal training'),
    ('Car Parking', 500.00, '2024-09-20', 'Transportation', 'Car parking fees'),
    ('Home Renovation', 5000.00, '2024-09-24', 'Home', 'Renovation work for home improvement'),
    ('Professional Certification', 4000.00, '2024-09-28', 'Education', 'Certification exam fees'),
    ('Biking Gear', 1000.00, '2024-09-30', 'Sports', 'New biking gear');

-- Sample data for incomes
INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Salary', 50000.00, '2024-09-01', 'September salary'),
    ('Freelance Project', 15000.00, '2024-09-10', 'Payment for freelance web development project'),
    ('Investment Dividend', 2000.00, '2024-09-12', 'Dividend from stock investments');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Rental Income', 10000.00, '2024-09-15', 'Rental income from property'),
    ('Consulting Fee', 5000.00, '2024-09-20', 'Consulting fee for business strategy project'),
    ('Interest Income', 1000.00, '2024-09-25', 'Interest income from savings account');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Bonus', 10000.00, '2024-09-02', 'Performance bonus for the month'),
    ('Selling Items', 2000.00, '2024-09-12', 'Income from selling personal items'),
    ('Gift Money', 500.00, '2024-09-22', 'Gift money from family member');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Side Gig', 3000.00, '2024-09-03', 'Income from side gig project'),
    ('Refund', 1000.00, '2024-09-14', 'Refund for overcharged bill'),
    ('Scholarship', 2000.00, '2024-09-24', 'Scholarship for academic achievement');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Commission', 5000.00, '2024-09-05', 'Commission from sales'),
    ('Selling Artwork', 1000.00, '2024-09-16', 'Income from selling artwork'),
    ('Donation', 500.00, '2024-09-26', 'Donation from anonymous donor');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Part-time Job', 2000.00, '2024-09-07', 'Income from part-time job'),
    ('Tax Refund', 1000.00, '2024-09-18', 'Tax refund from government'),
    ('Prize Money', 500.00, '2024-09-28', 'Prize money from contest');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Online Sales', 3000.00, '2024-09-09', 'Income from online sales'),
    ('Royalty Payment', 2000.00, '2024-09-20', 'Royalty payment for creative work'),
    ('Crowdfunding', 1000.00, '2024-09-29', 'Crowdfunding for personal project');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Tutoring', 5000.00, '2024-09-11', 'Income from tutoring services'),
    ('Selling Crafts', 1000.00, '2024-09-22', 'Income from selling handmade crafts'),
    ('Fundraising', 500.00, '2024-09-30', 'Fundraising for charity event');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Event Planning', 3000.00, '2024-09-13', 'Income from event planning services'),
    ('Selling Photography', 2000.00, '2024-09-24', 'Income from selling photography prints'),
    ('Sponsorship', 1000.00, '2024-09-30', 'Sponsorship for event');

INSERT INTO incomes (title, amount, date, description)
VALUES
    ('Writing Services', 5000.00, '2024-09-15', 'Income from writing services'),
    ('Selling Vintage Items', 1000.00, '2024-09-26', 'Income from selling vintage items'),
    ('Ad Revenue', 500.00, '2024-09-30', 'Ad revenue from website');
