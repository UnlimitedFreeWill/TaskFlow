# TaskFlow Backend

## Descriere

Backend-ul aplicației TaskFlow este construit folosind **Spring Boot** și gestionează toate operațiunile server-side. Acesta include logica aplicației, operațiile CRUD pentru taskuri și interacțiunea cu baza de date MongoDB.

## Structura proiectului

```
taskflow-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com.taskflow.backend/
│   │   │   │   ├── config/         # Configurări generale (ex: CorsConfig)
│   │   │   │   ├── controller/    # Controller pentru gestionarea endpointurilor (TaskController)
│   │   │   │   ├── model/         # Modelul de date (Task.java)
│   │   │   │   ├── repository/    # Repozitoriul pentru MongoDB (TaskRepository)
│   │   │   │   ├── TaskFlowBackendApplication.java  # Clasa principală Spring Boot
│   │   ├── resources/            # Resursele aplicației (application.properties)
│   ├── test/                    # Testele aplicației
├── Dockerfile                   # Configurația Docker pentru backend
├── pom.xml                      # Fișierul Maven pentru dependințe
```

## Funcționalități implementate

1. **Gestionarea taskurilor:**
   - Operații CRUD (Create, Read, Update, Delete) pentru taskuri utilizând REST API.
   - Endpointurile sunt definite în `TaskController.java`.
2. **Persistența datelor:**
   - Integrare cu MongoDB utilizând Spring Data MongoDB.
   - `TaskRepository.java` gestionează operațiile cu baza de date.
3. **Configurare CORS:**
   - Configurație pentru a permite accesul din frontend (`CorsConfig.java`).

## Endpointuri REST API

| Metodă | Endpoint         | Descriere                             |
|--------|------------------|---------------------------------------|
| GET    | `/tasks`         | Returnează lista de taskuri           |
| GET    | `/tasks/{id}`    | Returnează un task specific           |
| POST   | `/tasks`         | Adaugă un task nou                   |
| PUT    | `/tasks/{id}`    | Actualizează un task existent         |
| DELETE | `/tasks/{id}`    | Șterge un task existent               |

## Configurare

1. **Fișier `application.properties`**
   ```properties
   spring.data.mongodb.uri=mongodb://taskflow-mongo:27017/taskflow
   spring.main.allow-bean-definition-overriding=true
   spring.application.name=TaskFlow
   ```

2. **Dockerfile pentru backend**
   ```dockerfile
   FROM eclipse-temurin:17-jdk AS build
   WORKDIR /app
   COPY . .
   RUN ./mvnw package -DskipTests

   FROM eclipse-temurin:17-jre
   WORKDIR /app
   COPY --from=build /app/target/*.jar app.jar
   EXPOSE 8080
   CMD ["java", "-jar", "app.jar"]
   ```

## Comenzi utile

1. **Rulare locală:**
   ```bash
   ./mvnw spring-boot:run
   ```
2. **Construire aplicație:**
   ```bash
   ./mvnw clean install -DskipTests
   ```
3. **Pornire container Docker:**
   ```bash
   docker build -t taskflow-backend .
   docker run -p 8080:8080 taskflow-backend
   ```

## Testare

Testarea codului și a endpointurilor poate fi realizată utilizând **Postman** sau **JMeter** pentru analiza dinamică.
