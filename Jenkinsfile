pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Backend') {
            steps {
                sh 'cd taskflow-backend && docker build -t taskflow-backend .'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd taskflow-frontend && docker build -t taskflow-frontend .'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'docker-compose up -d'
                sh 'docker exec taskflow-backend npm test'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                SONAR_HOST_URL = 'http://taskflow-sonarqube:9000'
                SONAR_LOGIN = '<SONAR_TOKEN>'
            }
            steps {
                sh 'mvn sonar:sonar'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        always {
            sh 'docker-compose down'
        }
    }
}