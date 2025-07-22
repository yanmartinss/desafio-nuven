import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Define as opções
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Desafio Nuven",
      version: "1.0.0",
      description: "Documentação completa da API",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Certifique-se de que há comentários Swagger nos arquivos
};

// Gera o documento OpenAPI
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function setupSwagger(server: Express) {
  const options = {
    customSiteTitle: "API Docs - Desafio Nuven",
    customCss: ".swagger-ui .topbar { display: none }",
  };

  server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, options)
  );
}
