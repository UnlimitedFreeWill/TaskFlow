# TaskFlow Project

## Descriere generală

TaskFlow este o aplicație destinată gestionării taskurilor. Proiectul este compus din două părți principale:
1. **Backend** - construit cu Spring Boot pentru gestionarea logicii de server și a operațiilor CRUD.
2. **Frontend** - construit cu React și TypeScript pentru o interfață de utilizator intuitivă.

Aplicația folosește **MongoDB** ca bază de date și este containerizată cu **Docker**, fiind orchestrată cu ajutorul unui fișier `docker-compose.yml`.

## Structura proiectului

```
TaskFlow/
├── taskflow-backend/       # Backend-ul aplicației
├── taskflow-frontend/      # Frontend-ul aplicației
├── docker-compose.yml      # Configurația Docker Compose
├── Jenkinsfile             # Pipeline-ul CI/CD pentru Jenkins
├── sonar-project.properties # Configurația pentru analiza statică SonarQube
```

## Configurare Docker Compose

Fișierul `docker-compose.yml` definește serviciile necesare pentru rularea aplicației:

```yaml
services:
  mongo:
    image: mongo:latest
    container_name: taskflow-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build:
      context: ./taskflow-backend
    image: taskflow-backend
    container_name: taskflow-backend
    ports:
      - "8080:8080"
    depends_on:
      - mongo

  frontend:
    build:
      context: ./taskflow-frontend
    image: taskflow-frontend
    container_name: taskflow-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

## Pipeline CI/CD

Fișierul `Jenkinsfile` definește pașii pentru integrarea continuă și livrarea continuă:

1. **Clean Environment:** Curățarea containerelor existente.
2. **Ensure Mongo is Running:** Verificarea rulării containerului MongoDB.
3. **Build Images:** Construirea imaginilor Docker pentru backend și frontend.
4. **Build Project:** Construirea aplicației backend folosind Maven.
5. **SonarQube Analysis:** Analiza statică a codului folosind SonarQube.
6. **Deploy:** Pornirea containerelor pentru frontend și backend.
7. **Quality Gate Check:** Verificarea pragului de calitate configurat în SonarQube.

## Analize și Testare

1. **Analiza statică:**
   - Configurată în `sonar-project.properties` pentru a rula analiza statică pe backend.
2. **Analiza dinamică:**
   - Testarea endpointurilor backend-ului folosind JMeter sau Postman.

## Comenzi utile

1. **Pornire aplicație cu Docker Compose:**
   ```bash
   docker-compose up -d
   ```
2. **Verificare loguri:**
   ```bash
   docker-compose logs -f
   ```
3. **Stop aplicație:**
   ```bash
   docker-compose down
   ```

## Documentație adițională

- [README pentru Backend](./taskflow-backend/README.md)
- [README pentru Frontend](./taskflow-frontend/README.md)

## Resurse externe

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [Docker Documentation](https://docs.docker.com/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/)
