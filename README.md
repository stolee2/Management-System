## Manager System

## Introduction
This is a Laravel-based API for managing projects, tasks, and categories. The API provides endpoints to create, retrieve, and filter projects, tasks, and categories.

## Installation
### Prerequisites
- PHP >= 8.1
- Composer
- MySQL 

### Setup Instructions
1. Clone the repository:
   -bash
   git clone https://github.com/stolee2/Management-System.git
   cd task_manager
  
2. Install PHP dependencies:
   -bash
   composer install
   
3. Configure the '.env' file:
   
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. Generate application key:
   -bash
   php artisan key:generate
   
5. Run database migrations:
   -bash
   php artisan migrate
   
6. Start the Laravel server:
   -bash
   php artisan serve
   
# API Endpoints

## Projects API

- **List all projects**  
  GET /api/projects

- **Create a new project**  
  POST /api/projects 

- **Filter projects by due date**  
  GET /api/projects/filter?due_date=YYYY-MM-DD

## Categories API
- **List all categories**  
  GET /api/categories 

- **Create a new category**  
  POST /api/categories

## Tasks API

- **List all tasks**  
 GET /api/tasks 

- **Create a new task**  
  POST /api/tasks 

- **Mark a task as completed**  
  PATCH /api/tasks/{task}/complete 
## Frontend Setup 
1. Navigate to the 'app/'
2. Create a 'frontend' folder:
   -bash
   mkdir frontend
   cd frontend
   
3. Initialize a React project:
   -bash
   npx create-react-app .
   ```
4. Start the frontend development server:
   -bash
   npm start

## Deployment
1. Set up a production environment with MySQL and PHP.
2. Run migrations and seed database if necessary:
   -bash
   php artisan migrate --seed
3. Use a process manager like Supervisor for background tasks.
## License
This project is licensed under the MIT License.


