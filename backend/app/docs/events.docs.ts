export const eventDocs = {
    '/events': {
        post: {
            summary: 'Get Event Recommendations',
            description: 'Fetches event recommendations based on city, month, and year.',
            tags: ['Events'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                city: {
                                    type: 'string',
                                    description: 'The city where the event is located.',
                                    example: 'New York',
                                },
                                month: {
                                    type: 'string',
                                    description: 'The month of the event.',
                                    example: 'March',
                                },
                                year: {
                                    type: 'number',
                                    description: 'The year of the event.',
                                    example: 2025,
                                },
                            },
                            required: ['city', 'month', 'year'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Event recommendations retrieved successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Recommendation added successfully',
                                    },
                                    recommendations: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'number', example: 1 },
                                                heading: { type: 'string', example: 'Music Festival' },
                                                date: {
                                                    type: 'object',
                                                    properties: {
                                                        month: { type: 'string', example: 'March' },
                                                        year: { type: 'number', example: 2025 },
                                                    },
                                                },
                                                location: { type: 'string', example: 'New York' },
                                                category: { type: 'string', example: 'Concert' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input or missing fields.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'All fields are required',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

};
