import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nestify Backend API",
      version: "1.0.0",
      description: "Nestify backend API documentation",
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || "http://localhost:4000",
        description: "Local server",
      },
    ],
  },
  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
