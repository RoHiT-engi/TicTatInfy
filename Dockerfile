# Use a Maven image to build the project
FROM maven:3.9.4-eclipse-temurin-17 AS builder

# Set the working directory for the build
WORKDIR /app

# Copy the Maven project files
COPY backend/tictatinfy/pom.xml backend/tictatinfy/

# Download Maven dependencies (leverage Docker cache)
RUN mvn -f backend/tictatinfy/pom.xml dependency:resolve dependency:resolve-plugins

# Copy the rest of the application source code
COPY backend/tictatinfy/ backend/tictatinfy/

# Package the application
RUN mvn -f backend/tictatinfy/pom.xml clean package -DskipTests

# Use a minimal image to run the application
FROM openjdk:17-jdk-alpine

# Set the working directory for the application
WORKDIR /app

# Copy the packaged application from the build stage
COPY --from=builder /app/backend/tictatinfy/target/*.jar app.jar

# Expose the port your application listens on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

