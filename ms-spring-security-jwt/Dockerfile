FROM openjdk:17-slim

WORKDIR /app

COPY target/backend-0.0.1-SNAPSHOT.jar /app/ms-spring-security-jwt.jar

EXPOSE 3000

CMD ["java", "-jar", "/app/ms-spring-security-jwt.jar"]