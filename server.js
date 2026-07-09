

    const express = require("express");

const db = require("./config")
const gadget = require("./gadget.json");
const app = express();

app.use(express.json());
 

app.get("/gadget", (req, res) => {



    db.query("SELECT * FROM gadget", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });


});


app.post("/gadget", (req, res) => {

    const { product_id, product_name } = req.body;

    const sql = "INSERT INTO gadget (product_id, product_name) VALUES (?, ?)";

    db.query(sql, [product_id, product_name], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Product added successfully"
        });

    });

});


app.put("/gadget/:id", (req, res) => {

    const id = req.params.id;
    const { product_name } = req.body;

    const sql = "UPDATE gadget SET product_name = ? WHERE product_id = ?";

    db.query(sql, [product_name, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully"
        });

       

    });

});

app.delete("/gadget/:id",(req,res) =>{

   const id = req.params.id;
  
   const sql = "DELETE FROM gadget WHERE product_id = ?";
   

   db.query(sql,[id],(err,result) =>{

     res.json({
         message: "product successfully deleted"
     });

   });



});





//console.log("Loading my current server.js");

app.listen(3000, () => {
    console.log("Server running on port 3000");
}); 