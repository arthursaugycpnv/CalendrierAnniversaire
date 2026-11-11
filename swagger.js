import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.4',
        info: {
            title: 'CalendrierAnniversaire',
            description: 'API REST pour chercher, ajouter, mettre à jour, supprimer des anniversaires',
            version: '1.0.0',
        },
        servers : [
            {
                url : 'http://localhost:3001/',
            },
        ],
        "components":
        {
            "schemas":
            {
                "birthday":
                {
                    "type": "object",
                    "properties":
                    {
                        "id": { "type": "integer", "example": 1, "description": "Identifiant de l'anniversaire" },
                        "name": { "type": "string", "example": "Michel", "description": "Nom (de la personne ou de l'anniversaire) relié à l'anniversaire"  },
                        "type" : { "type": "string", "example": "person", "description": "Type de l'anniversaire (d'une personne ou d'un événement)"  },
                        "is_anonymous" : {"type": "integer", "example": "1", "description": "Booléen indiquant si les données doivent restées secretes"}
                    },
                    required: ['id', 'name', 'type', "is_anonymous"]
                },
            },
        }
    },
    apis: ['./routes/*.js'], // where to find information to generate documentation
};

const openApiSpecification = swaggerJsdoc(options);
export {openApiSpecification};