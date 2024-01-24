# Auth-Core Project

This project provides a Node.js-based authentication core. The core is designed to manage user authentication and authorization processes.

## Installation

1. Clone the project:

    ```bash
    git clone https://github.com/your-username/auth-core.git
    ```

2. Navigate to the project directory:

    ```bash
    cd auth-core
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create the configuration file:

    Copy the `config.example.js` file inside the `config` folder, rename it to `config.js`, and then make the necessary configurations.

## Usage

Once the project is successfully installed, you can use the auth core by following these steps:

1. Start the auth core:

    ```bash
    npm start
    ```

2. Manage users using API endpoints:

    - Create a user:
        ```
        POST /api/users/register
        ```
        - Request body:
            ```json
            {
                "username": "username",
                "password": "password123"
            }
            ```

    - User login:
        ```
        POST /api/users/login
        ```
        - Request body:
            ```json
            {
                "username": "username",
                "password": "password123"
            }
            ```

    - Get user profile:
        ```
        GET /api/users/profile
        ```
        - Include the token in the header:
            ```
            Authorization: Bearer {token}
            ```

3. Customize the auth core:

    You can customize the auth core to fit your project's needs. Modify middleware or database connections as needed.

## Contribution

If you want to contribute to the project, please check [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
