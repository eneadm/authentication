# Authentication App 🔒

This is a basic example of an authentication application with a backend built in **Laravel** and a frontend in **React.js**. The app demonstrates user login functionality and includes a test user for demonstration purposes. 

> This app **requires Docker** to work, make sure you have docker installed in your system. 

## Installation 🛠️

Follow these steps to set up and run the application on your local machine:

### 1. Install Dependencies 🧰

Use Docker to install dependencies via Laravel Sail:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```

### 2. Start the Application 🚀

Start the application using Laravel Sail in detached mode:

```bash
./vendor/bin/sail up -d
```

### 3. Run Database Migrations 🗄️

Run the migrations to set up the database schema. Note that you may encounter a `Connection refused` error if the Sail containers are not fully ready. If this happens, wait a few seconds and retry the command.

```bash
./vendor/bin/sail art migrate
```

### 4. Seed the Database 🌱

Seed the database with a test user:

```bash
./vendor/bin/sail art db:seed
```

### 5. Install Frontend Dependencies 📦

Install the required frontend dependencies and compile assets:

```bash
npm i
npm run dev
```
### 6. Access the Application 🌐

Open http://localhost in your browser. You should see the login form. Use the following test credentials to log in:

- Email: `test@example.com`
- Password: `password`

After successful login, you will be redirected to a page showing the user's email and name. 🎉

