import { CognitoUserPool } from "amazon-cognito-identity-js";

const baseURL = "https://apis.eduedges.com/api";

const config = {
  UserPool: new CognitoUserPool({
    UserPoolId: "eu-west-1_yeNM7X2En",
    ClientId: "17p7elrq7tqcqc494ghg4iei0i",
  }),
  //for local testing and developing
  // apiURL: "http://localhost:3002/api",
  // tenantsURL: "http://localhost:9000/api/tenants",

  //for production
  apiURL: baseURL + "/dbm",
  tenantsURL: baseURL + "/tm/tenants",

  TENANT_ID: "azharengineering2020",
};

export default config;
