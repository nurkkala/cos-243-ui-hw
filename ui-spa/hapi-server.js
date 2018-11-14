// Standard Node modules
const Path = require('path');

// Hapi
const Joi = require('joi');     // Input validation
const Hapi = require('hapi');   // Server

const server = Hapi.server({
    host: 'localhost',
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'dist')
        }
    }
});

async function init() {
    // Show routes at startup.
    await server.register(require('blipp'));

    // Output logging information.
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true
        }
    });

    // Configure static file service.
    await server.register(require('inert'));

    // Configure routes.
    server.route([
        {
            method: 'POST',
            path: '/api/sign-up',
            config: {
                description: 'Sign Up',
                validate: {
                    payload: {
                        email: Joi.string().email().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async(request, h) => {
                // Do some fake parameter checking.
                if (request.payload.email.match(/^foo@/)) {
                    return {
                        ok: false,
                        msge: `Email address ${request.payload.email} not available.`
                    };
                }
                return {
                    ok: true,
                    msge: `Successfully signed up with email ${request.payload.email}`
                };
            }
        },
        {
            method: 'GET',
            path: '/{param*}',
            config: {
                description: 'Production Application'
            },
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true
                }
            }
        }
    ]);

    // Start the server.
    await server.start();
    server.logger().info(`Server running at ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

// Go!
init();