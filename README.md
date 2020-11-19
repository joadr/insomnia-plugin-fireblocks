# Fireblocks JWT Generator for Insomnia Client
This is a plugin for [Insomnia](https://insomnia.rest/) that allows the
creation of JSON Web Tokens with Fireblocks method.

## Instalation

Install the `insomnia-plugin-fireblocks` plugin from Preferences > Plugins.

## Usage

Add the `fireblocks` template tag as the bearer token and set the x-api-key as header and you are good to go.

The recommended way to set up is to create environment variable called bearerToken and set it up to be `fireblock` template tag, this way, you only have to set up the credentials once.

## How to connect the whole environment

Insomnia allows you to import environments in multiple formats including OpenAPI, this way you can import the [OpenAPI Specification](https://api.fireblocks.io/docs/v1/swagger) and all API calls will be added to a new environment. Now on the top left, click `OpenAPI env` and click `Manage Environments`. There you can change the `xApiKey` environment with your API Key and change the `bearerToken` with `fireblocks`. There you will be prompted to fill your `Secret Key PATH` and `API Key` and you will be ready to make any call to the Fireblocks API