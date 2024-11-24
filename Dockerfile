# Build stage
FROM openjdk:17-jdk-alpine as builder
WORKDIR /app
COPY backend/tictatinfy/gradlew backend/tictatinfy/gradle/ backend/tictatinfy/build.gradle backend/tictatinfy/settings.gradle ./
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon
COPY backend/tictatinfy ./
RUN ./gradlew bootJar --no-daemon

# Run stage
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/tictatinfy.jar .
ENTRYPOINT ["java", "-jar", "tictatinfy.jar"]
