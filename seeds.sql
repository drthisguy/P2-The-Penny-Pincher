USE pennypinch_dev;


INSERT INTO Categories (category) 
VALUES ('insurance'), ('auto'), ('housing'), ('phone'), ('misc'), ('nutrition'), ('memberships'), ('utilities'), ('childcare'), ('education'), ('gas'), ('medical'), ('loans/cc');



INSERT INTO Expenses (name, user_id, category_id, priority, amount) 
VALUES ('car insurance', 1, 1, 'High' 100.00), ('auto bill', 2, 1, 'High' 200.00), ('mortgage', 3, 1, 'High' 800.00) ('cell phone' 4, 1, 'Medium' 45.00), ('home insurance', 1, 1, 'High' 180.00), ('bar tab',  5, 1, 'Low' 35.00), 


-- ('movies', 0, 21.00, 5), ('festival bill', 0, 35.00, 5), ('groceries', 0, 250.00, 6), ('netflix', 0, 12.00, 7), ('hulu', 0, 9.00, 7), ('gym bill', 0, 10.00, 7), ('gas bill', 1, 75.00, 8), ('electric bill', 1, 80.00, 8), ('water bill', 1, 40.00, 8), ('trash bill', 0, 40.00, 8), ('day care bill', 0, 160.00, 9), ('student loan', 0, 100.00, 10), ('gas for car', 0, 150, 11), ('co-pays', 0, 60.00, 12), ('capital one cc', 0, 45.00, 13), ('personal loan', 0, 90.00, 13);