# 🏥 Health Planner - BMI Calculator & Wellness App

A modern, full-stack health planning application that calculates BMI, generates personalized meal and workout plans, and sends results via email.

## ✨ Features

- **BMI Calculator** - Calculate your Body Mass Index with instant results
- **Personalized Meal Plans** - Tailored nutrition recommendations based on BMI category
- **Workout Plans** - Customized exercise routines for your fitness level
- **Health Tips & Motivation** - Daily wellness advice and motivational quotes
- **Quick Health Challenges** - Random activities from Bored API to keep you active
- **Email Integration** - Receive your complete health plan via email using Twilio SendGrid
- **Full CRUD Operations** - Create, read, update, and delete health entries
- **Modern UI/UX** - Beautiful, responsive design with gradients and animations
- **RESTful API** - Complete backend API with Swagger documentation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations
- **Vitest** - Unit testing framework

### Backend
- **Spring Boot 3.3.2** - Java backend framework
- **Spring Data JPA** - Database ORM
- **MySQL** - Relational database
- **Maven** - Dependency management
- **Swagger/OpenAPI** - API documentation
- **Twilio SendGrid** - Email service
- **JUnit 5** - Unit testing

## 🚀 Quick Start

### Prerequisites
- Java 17 (JDK)
- Node.js (v16 or higher)
- MySQL (running on localhost:3306)
- Maven (or use IntelliJ's bundled Maven)

### 1. Clone the Repository
```bash
git clone https://github.com/lamijabasalic/bmihealthplanner.git
cd bmihealthplanner
```

### 2. Database Setup

#### **Option A: Aiven Cloud Database (Recommended)**
1. Go to [Aiven Console](https://console.aiven.io/)
2. Create a new MySQL service
3. Get your connection details:
   - Host: `your-service-name-your-project.aivencloud.com`
   - Port: `12345` (usually)
   - Database: `defaultdb`
   - Username: `avnadmin`
   - Password: (from Aiven console)

#### **Option B: Local MySQL**
```sql
-- Create database
CREATE DATABASE IF NOT EXISTS health_db;

-- Use database
USE health_db;

-- Create table (if not exists)
CREATE TABLE IF NOT EXISTS health_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    bmi DECIMAL(6,2) NOT NULL,
    bmi_category VARCHAR(32) NOT NULL,
    meal_plan_json TEXT NULL,
    workout_plan_json TEXT NULL,
    tips_json TEXT NULL,
    quotes_json TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Backend Configuration
1. Navigate to `backend/` directory
2. Create `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://your-aiven-host:12345/defaultdb?useSSL=true&sslmode=require&serverTimezone=UTC
    username: avnadmin
    password: ${AIVEN_DB_PASSWORD:your-aiven-password}
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

sendgrid:
  api-key: ${SENDGRID_API_KEY:your-sendgrid-api-key}
  from-email: ${SENDGRID_FROM_EMAIL:your-verified-email@domain.com}
```

### 4. Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend will start on: `http://localhost:8080`

### 5. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on: `http://localhost:5173`

## 📱 Usage

1. **Open the application** at `http://localhost:5173`
2. **Enter your details**:
   - Email address
   - Weight (in kg)
   - Height (in cm)
3. **Click "Generate Plan"** to get your personalized health plan
4. **Check your email** for the complete plan
5. **Try the Quick Health Challenge** for random activities

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
mvn test
```

## 📚 API Documentation

- **Swagger UI**: `http://localhost:8080/swagger`
- **API Endpoints**: `http://localhost:8080/api/entries`

### Available Endpoints
- `GET /api/entries` - Get all health entries
- `GET /api/entries/{id}` - Get specific entry
- `POST /api/entries` - Create new health entry
- `PUT /api/entries/{id}` - Update existing entry
- `DELETE /api/entries/{id}` - Delete entry
- `GET /api/test-email` - Test email functionality

## 🎨 Features in Detail

### BMI Categories
- **Underweight**: < 18.5
- **Normal weight**: 18.5 - 24.9
- **Overweight**: 25.0 - 29.9
- **Obesity**: ≥ 30.0

### Personalized Plans
Each BMI category receives tailored:
- **Meal Plans**: 4 meals per day with specific recommendations
- **Workout Plans**: Exercise routines matching fitness level
- **Health Tips**: Practical advice for daily wellness
- **Motivational Quotes**: Inspirational messages

### Email Integration
- Uses Twilio SendGrid for reliable email delivery
- HTML-formatted emails with complete health plan
- Error handling for failed email attempts

### Quick Health Challenges
- Integrates with Bored API for random activities
- Fallback activities if API is unavailable
- Encourages daily movement and engagement

## 🔧 Configuration

### Environment Variables
- `VITE_API_URL` - Frontend API base URL (default: http://localhost:8080)
- `SENDGRID_API_KEY` - Twilio SendGrid API key
- `SENDGRID_FROM_EMAIL` - Verified sender email address

### Database Configuration
- Database: `health_db`
- Table: `health_entries`
- Connection: `localhost:3306`

## 📁 Project Structure

```
bmihealthplanner/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/java/
│   │   │   └── com/example/simple/
│   │   │       ├── model/          # JPA entities
│   │   │       ├── repository/     # Data access layer
│   │   │       ├── service/        # Business logic
│   │   │       ├── web/            # REST controllers
│   │   │       └── web/dto/        # Data transfer objects
│   │   └── resources/
│   │       └── application.yml     # Configuration
│   └── pom.xml                     # Maven dependencies
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── styles/          # CSS files
│   │   └── api.js           # API configuration
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Vite configuration
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bored API** - For random activity suggestions
- **Twilio SendGrid** - For email delivery service
- **Spring Boot** - For robust backend framework
- **React** - For modern frontend development

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by Lamija Basalic**
