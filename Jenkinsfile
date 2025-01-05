pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clean Environment') {
            steps {
                script {
                    echo "Cleaning up existing containers and resources..."
                    sh '''
                    docker-compose down || true
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    echo "Building backend image..."
                    sh '''
                    cd taskflow-backend
                    docker build -t taskflow-backend .
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    echo "Building frontend image..."
                    sh '''
                    cd taskflow-frontend
                    docker build -t taskflow-frontend .
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "Starting containers and running tests..."
                    sh '''
                    docker-compose up -d
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    echo "Running SonarQube analysis..."
                    sh '''
                    docker run --rm --network taskflow-network \
                    -e SONAR_HOST_URL=http://taskflow-sonarqube:9000 \
                    -e SONAR_LOGIN=<sonarqube-token> \
                    sonarsource/sonar-scanner-cli \
                    -Dsonar.projectKey=taskflow \
                    -Dsonar.sources=./taskflow-backend/src \
                    -Dsonar.language=java
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying application..."
                    sh '''
                    docker-compose up -d
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Cleaning up resources..."
                sh '''
                docker-compose down || true
                '''
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for more details.'
        }
    }
}