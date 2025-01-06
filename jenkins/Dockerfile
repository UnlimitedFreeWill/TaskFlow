# Folosește imaginea oficială Jenkins LTS ca bază
FROM jenkins/jenkins:lts

# Rulează toate comenzile ca utilizator root
USER root

# Instalează Docker și Docker Compose
RUN apt-get update && apt-get install -y docker.io && \
    curl -L "https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose && \
    ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Adaugă utilizatorul Jenkins în grupul Docker, doar dacă grupul nu există deja
RUN if ! getent group docker; then groupadd -g 999 docker; fi && usermod -aG docker jenkins

# Revine la utilizatorul Jenkins
USER jenkins