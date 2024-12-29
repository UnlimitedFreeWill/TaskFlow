# Folosește o imagine oficială Java pentru backend
FROM eclipse-temurin:17-jdk AS build

# Setează directorul de lucru în container
WORKDIR /app

# Copiază fișierele de configurare ale backendului în container
COPY . .

# Construiește aplicația backend folosind Maven
RUN ./mvnw package -DskipTests

# Faza finală: rulează aplicația
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copiază JAR-ul rezultat din etapa de build
COPY --from=build /app/target/*.jar app.jar

# Expune portul pe care rulează backendul
EXPOSE 8080

# Comandă pentru rularea aplicației
CMD ["java", "-jar", "app.jar"]