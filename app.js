const db = require('./db');

async function run() {
    try {
        // 1
        await db.query(`CREATE TABLE IF NOT EXISTS Suppliers (SupplierID INT AUTO_INCREMENT PRIMARY KEY, SupplierName VARCHAR(255), ContactNumber VARCHAR(255))`);
        await db.query(`CREATE TABLE IF NOT EXISTS Products (ProductID INT AUTO_INCREMENT PRIMARY KEY, ProductName VARCHAR(255), Price DECIMAL(10,2), StockQuantity INT, SupplierID INT, FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID))`);
        await db.query(`CREATE TABLE IF NOT EXISTS Sales (SaleID INT AUTO_INCREMENT PRIMARY KEY, ProductID INT, QuantitySold INT, SaleDate DATE, FOREIGN KEY (ProductID) REFERENCES Products(ProductID))`);

        // 2
        await db.query(`ALTER TABLE Products ADD COLUMN Category VARCHAR(255)`);

        // 3
        await db.query(`ALTER TABLE Products DROP COLUMN Category`);

        // 4
        await db.query(`ALTER TABLE Suppliers MODIFY COLUMN ContactNumber VARCHAR(15)`);

        // 5
        await db.query(`ALTER TABLE Products MODIFY COLUMN ProductName VARCHAR(255) NOT NULL`);

        // 6
        await db.query(`INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES ('FreshFoods', '01001234567')`);
        await db.query(`INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES ('Milk', 15.00, 50, 1), ('Bread', 10.00, 30, 1), ('Eggs', 20.00, 40, 1)`);
        await db.query(`INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (1, 2, '2025-05-20')`);

        // 7
        await db.query(`UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread'`);

        // 8
        await db.query(`DELETE FROM Products WHERE ProductName = 'Eggs'`);

        // 9
        const [r9] = await db.query(`SELECT p.ProductName, SUM(s.QuantitySold) AS TotalSold FROM Products p JOIN Sales s ON p.ProductID = s.ProductID GROUP BY p.ProductID`);
        console.log('9:', r9);

        // 10
        const [r10] = await db.query(`SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1`);
        console.log('10:', r10);

        // 11
        const [r11] = await db.query(`SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'`);
        console.log('11:', r11);

        // 12
        const [r12] = await db.query(`SELECT ProductName FROM Products WHERE ProductID NOT IN (SELECT ProductID FROM Sales)`);
        console.log('12:', r12);

        // 13
        const [r13] = await db.query(`SELECT s.SaleID, p.ProductName, s.SaleDate FROM Sales s JOIN Products p ON s.ProductID = p.ProductID`);
        console.log('13:', r13);

        // 14
        await db.query(`DROP USER IF EXISTS 'store_manager'@'localhost'`);
        await db.query(`CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'pass123'`);
        await db.query(`GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost'`);

        // 15
        await db.query(`REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost'`);

        // 16
        await db.query(`GRANT DELETE ON retail_store.Sales TO 'store_manager'@'localhost'`);
        await db.query(`FLUSH PRIVILEGES`);

        console.log('All 16 tasks executed.');

    } catch (err) {
        console.log(err);
    }
}

run();