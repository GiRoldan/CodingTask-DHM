// Sample coding task:
// A shop wants to find out who their top customer is,
//and need you to write a program to sum up their customer transactions.
//I've attached two sample JSON files which contain the customer data, and two sample transactions.
// Can you write a Python or JavaScript program to load the JSON data and return the top-spending customer?
//Assume this is only sample data and will be different in the future.

const database = require('./database.json');
console.log("My database is: ");
console.table(database);

const transactions = require('./transactions.json');
console.log("The transactions are: ");
console.table(transactions);

//Who their the top-spending customer is?
//ASUMPTION: Top customer is the one who purchases more money
console.log("********************Top customer is the one who purchases more money********************" + "\n");

function findTopCustomerPerPurchaseAmount(t, d) {

    //1st step: create a new array with total purchase per transaction:
    const totalPurchase = t.map(trans => {

        function calculatePurchasePerTransaction(totalPurchase, currentProduct) {
            // console.log(`Total purchase is: ${totalPurchase} and current products are:`);
            // console.log(currentProduct);
            return totalPurchase + currentProduct.quantity * currentProduct.unit_price;
        };

        let properties = {
            "order_id": trans.order_id,
            "customer_email": trans.customer.email,
            "totalPurchase": trans.products.reduce(calculatePurchasePerTransaction, 0)
        }
        return properties
    });
    // console.log("Total purchase transactions: ");
    // console.table(totalPurchase);

    //2nd step: sorted the obteined array starting from the bigest purchase amount
    let sortedPurchase = totalPurchase.sort((q1, q2) => (q1.totalPurchase < q2.totalPurchase) ? 1 : (q1.totalPurchase > q2.totalPurchase) ? -1 : 0);
    // console.log("Sorted purchase: ");
    // console.table(sortedPurchase);

    //3rd step: let´s get customer email to find customer information in the database
    let emailTopCustomer = sortedPurchase[0].customer_email;
    //console.log(emailTopCustomer);

    //4th step: finding the customer data from our database and providing a final report
    let topCustomerData = d.filter(c => c.email === emailTopCustomer);

    return `***REPORT***
    \n
    Our top customer is:
        Name: ${topCustomerData[0].name},
        Customer id:  ${topCustomerData[0].customer_id},
        Email:  ${topCustomerData[0].email}.
        He has purchased ${sortedPurchase[0].totalPurchase} in total.`;
}

//findTopCustomerPerPurchaseAmount(transactions, database);
console.log(findTopCustomerPerPurchaseAmount(transactions, database));