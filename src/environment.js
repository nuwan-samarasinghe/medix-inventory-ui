const environment = {
    baseUrl: "http://localhost:3000",
    inventoryServiceUri: 'http://localhost:8090'
}

if (process.env.REACT_APP_ENV === "development") {
    environment.baseUrl = "http://localhost:3000";
    environment.inventoryServiceUri = 'http://localhost:8090';
}

if (process.env.REACT_APP_ENV === "production") {
    environment.baseUrl = "http://localhost:3002";
    environment.inventoryServiceUri = 'http://localhost:8090';
}

export default environment;
