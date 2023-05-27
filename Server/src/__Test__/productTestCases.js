var chai = require("chai");
let { expect, assert } = require("chai");

var jp = require("jsonpath");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

let id;

//1.Testion add product API
// describe("1. Add product", () => {
// 	it("Add Product (POST)", async () => {
// 		let res = await chai
// 			.request("https://ctms-api.vercel.app/api")
// 			.post("/product/create")
// 			.send({
// 				name : "test",
//                 price : "500",
//                 color : "red",
//                 size : "10",
//                 productImage : "https://www.pharmavends.com/userspics/f0068da20ba2553ce9e40a3a063f28f6.jpg",
//                 description : "test description",
// 			});

//             console.log(res.body);

// 		expect(res).to.have.status(200);
// 	});
// });

// 2. Testing get all products API
describe("2.Add product", () => {
	it("Retrieve product (GET)", async () => {
		let res = await chai
			.request("https://ctms-api.vercel.app/api")
			.get("/product/getAll");

		expect(res).to.have.status(200);
		expect(res.body.message).to.equal("Fetching product successfull !");

		console.log(res.body);
	});
});

// 3. Testing get specific product API
describe("3. HTTP Retrieve Specific product", () => {
	it("Retrive One product (GET)", async () => {
		let res = await chai
			.request("https://ctms-api.vercel.app/api")
			.get(`/product/get/${id}`);

		expect(res).to.have.status(200);
		expect(res.body.message).to.equal("Product Found !");

		console.log(res.body);
	});
});


// 4. Testing product update API
describe("4. HTTP Update Specific User PUT", () => {
	it("Update User (PUT)", async () => {
		let res = await chai
			.request("https://ctms-api.vercel.app/api")
			.patch(`product/update/${id}`)
			.send({
				name : "test 1",
			});

		console.log("\n Updated Lastname: ", res.body.lastname);

		expect(res).to.have.status(200);
		expect(res.body.message).to.equal("User Updated Successfully !");
	});
});

// 4. Testing product delete API
describe("4. HTTP Delete Specific Product Delete", () => {
	it("Delete User (DELETE)", async () => {
		let res = await chai
			.request("https://ctms-api.vercel.app/api")
			.delete(`/product/delete/${id}`);

		expect(res).to.have.status(200);
		expect(res.body.message).to.equal("Product Deleted Successfully !");
	});
});
