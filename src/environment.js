const environment = {
    baseUrl: "http://localhost:3000",
    supplierServiceUri: 'http://localhost:8081/supplier'
}

if (process.env.REACT_APP_ENV === "development") {
    environment.baseUrl = "http://localhost:3000";
    environment.supplierServiceUri = 'http://localhost:8081/supplier';
}

if (process.env.REACT_APP_ENV === "production") {
    environment.baseUrl = "http://localhost:3002";
    environment.supplierServiceUri = 'http://localhost:8081/supplier';
}

export default environment;
