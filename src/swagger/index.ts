export default {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "API",
    description: "API",
  },
  basePath: "/api/v1",
  tags: [
  ],
  securityDefinitions: {
    JWTUser: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJsaW1raW1"
    }
  },
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/user/": {
      post: {
        tags: ["User"],
        description: "Create new user",
        produces: ["application/json"],
        summary: "Create new user",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "User data",
            required: true,
            schema: {
              type: "object",
              required: [
                "username",
                "email",
                "password",
                "passwordConfirmation",
                "country",
                "phoneNumber"
              ],
              properties: {
                username: {
                  type: "string",
                  example: "johnd",
                  description: "User name"
                },
                email: {
                  type: "string",
                  example: "John.d@gmail.com",
                  description: "User email address"
                },
                password: {
                  type: "string",
                  example: "John.d90",
                  description: "User password"
                },
                passwordConfirmation: {
                  type: "string",
                  example: "John.d90",
                  description: "User password confirmation"
                },
                country: {
                  type: "string",
                  example: "USA",
                  description: "User country"
                },
                phoneNumber: {
                  type: "string",
                  example: "+18882538313",
                  description: "User phone number"
                }
              }
            },
          }
        ],
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "InR5cCI6IkpXVCJ9..."
                },
                refreshToken: {
                  type: "string",
                  example: "PAVjatUeFZa3oZ5P4..."
                },
                accessTokenExpiredAt: {
                  type: "number",
                  example: 1529626007
                }
              }
            }
          }
        }
      },
      put: {
        tags: ["User"],
        description: "Create new user",
        produces: ["application/json"],
        security: [{
          JWTUser: []
        }],
        summary: "Create new user",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "User data",
            required: true,
            schema: {
              type: "object",
              required: [
              ],
              properties: {
                username: {
                  type: "string",
                  example: "john_d",
                  description: "User name"
                },
                email: {
                  type: "string",
                  example: "John_d@gmail.com",
                  description: "User email address"
                },
                password: {
                  type: "string",
                  example: "John.d91",
                  description: "User password"
                },
                passwordConfirmation: {
                  type: "string",
                  example: "John.d91",
                  description: "User password confirmation"
                },
                country: {
                  type: "string",
                  example: "UK",
                  description: "User country"
                },
                phoneNumber: {
                  type: "string",
                  example: "+4408000885396",
                  description: "User phone number"
                }
              }
            },
          }
        ],
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "InR5cCI6IkpXVCJ9..."
                },
                refreshToken: {
                  type: "string",
                  example: "PAVjatUeFZa3oZ5P4..."
                },
                accessTokenExpiredAt: {
                  type: "number",
                  example: 1529626007
                }
              }
            }
          }
        }
      },
      get: {
        tags: ["User"],
        description: "Get current user data",
        security: [{
          JWTUser: []
        }],
        produces: ["application/json"],
        summary: "Get self user data",
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  example: "johnd",
                  description: "User name"
                },
                email: {
                  type: "string",
                  example: "John.d@gmail.com",
                  description: "User email address"
                },
                password: {
                  type: "string",
                  example: "John.d90",
                  description: "User password"
                },
                passwordConfirmation: {
                  type: "string",
                  example: "John.d90",
                  description: "User password confirmation"
                },
                country: {
                  type: "string",
                  example: "USA",
                  description: "User country"
                },
                phoneNumber: {
                  type: "string",
                  example: "+18882538313",
                  description: "User phone number"
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ["User"],
        description: "Delete current user",
        security: [{
          JWTUser: []
        }],
        produces: ["application/json"],
        summary: "Delete current user",
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "number",
              example: "1",
              description: "1 user successfully deleted, 0 user didn't delete"
            }
          }
        }
      }
    },
    "/user/refresh-token": {
      post: {
        tags: ["User"],
        description: "Refresh user tokens",
        produces: ["application/json"],
        summary: "Refresh user tokens",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "Refresh token",
            required: true,
            schema: {
              type: "object",
              required: [
                "refreshToken",
              ],
              properties: {
                refreshToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...",
                  description: "User refresh token"
                }
              }
            },
          }
        ],
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "InR5cCI6IkpXVCJ9..."
                },
                refreshToken: {
                  type: "string",
                  example: "PAVjatUeFZa3oZ5P4..."
                },
                accessTokenExpiredAt: {
                  type: "number",
                  example: 1529626007
                }
              }
            }
          }
        }
      },
    },
    "/user/login": {
      post: {
        tags: ["User"],
        description: "User login",
        produces: ["application/json"],
        summary: "User login",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "Get token by login",
            required: true,
            schema: {
              type: "object",
              required: [
                "username",
                "password"
              ],
              properties: {
                username: {
                  type: "string",
                  example: "john.d",
                  description: "User name"
                },
                password: {
                  type: "string",
                  example: "123321",
                  description: "password"
                }
              }
            },
          }
        ],
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "InR5cCI6IkpXVCJ9..."
                },
                refreshToken: {
                  type: "string",
                  example: "PAVjatUeFZa3oZ5P4..."
                },
                accessTokenExpiredAt: {
                  type: "number",
                  example: 1529626007
                }
              }
            }
          }
        }
      },
    },
    "/user/email-verify": {
      get: {
        tags: ["User"],
        description: "Email verification",
        produces: ["application/json"],
        summary: "Email verification",
        parameters: [
          {
            name: "token",
            in: "query",
            description: "verify token",
            required: true,
            schema: {
              type: "object",
              required: [
                "token",
              ],
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...",
                  description: "Email verify token"
                }
              }
            },
          }
        ],
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "InR5cCI6IkpXVCJ9..."
                },
                refreshToken: {
                  type: "string",
                  example: "PAVjatUeFZa3oZ5P4..."
                },
                accessTokenExpiredAt: {
                  type: "number",
                  example: 1529626007
                }
              }
            }
          }
        }
      },
    },
    "/user/collected-data": {
      get: {
        tags: ["User"],
        description: "Get collected user data",
        security: [{
          JWTUser: []
        }],
        produces: ["application/json"],
        summary: "Get collected user data",
        responses: {
          200: {
            description: "User request payload",
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                      example: "johnd",
                      description: "User name"
                    },
                    email: {
                      type: "string",
                      example: "John.d@gmail.com",
                      description: "User email address"
                    },
                    password: {
                      type: "string",
                      example: "John.d90",
                      description: "User password"
                    },
                    passwordConfirmation: {
                      type: "string",
                      example: "John.d90",
                      description: "User password confirmation"
                    },
                    country: {
                      type: "string",
                      example: "USA",
                      description: "User country"
                    },
                    phoneNumber: {
                      type: "string",
                      example: "+18882538313",
                      description: "User phone number"
                    }
                  }
                }
              }
            }
          }
        }
      },
    }
  }
};