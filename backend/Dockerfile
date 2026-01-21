# 1. Use Java 17 image
FROM eclipse-temurin:17-jdk

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy all backend files
COPY . .

# 4. Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# 5. Expose Spring Boot port
EXPOSE 8080

# 6. Run the jar file
CMD ["java", "-jar", "target/*.jar"]
