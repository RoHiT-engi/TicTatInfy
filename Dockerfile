# Build stage
FROM openjdk:17-jdk-alpine as builder
WORKDIR /app
COPY backend/tactify/gradlew backend/tactify/gradle/ backend/tactify/build.gradle backend/tactify/settings.gradle ./
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon
COPY backend/tactify ./
RUN ./gradlew bootJar --no-daemon

# Run stage
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/tactify.jar .
ENTRYPOINT ["java", "-jar", "tactify.jar"]
