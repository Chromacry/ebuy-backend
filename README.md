# ebuy-backend

## Authors
-Goh Zong Xian
-Si Thu Aung
-Yao Yutong
-Song Siong Pin Alston

## Description
This is the backend application for the Ebuy platform. It provides the necessary server-side functionality for the Ebuy application.

## Prerequisites
Before running the application, make sure you have the following installed on your PC:
- Node.js (v18.18.0 or newer)

## Installation
To install dependencies, run the following command:
```bash
npm install
```

## Deployment Setup
### Pre-setup requirements
- WSL2 (For windows 11)
- Install azure-cli
- Install docker
- Install jenkins
- Register for Docker Hub Account registration
- Register for Azure Cloud Account registration

### Windows 11 WSL Linux Setup with docker & docker-compose for bash init shell script
```bash
#* Check if you have any wsl2 linux distro
wsl -l -v

#* Option 1: If no linux distro found run this
wsl --install -d Ubuntu
wsl --set-default Ubuntu

bash

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
service docker status
service docker start


#* Option 2: Ignore if step 1 is done. If you see Ubuntu or any other Distro in ur wsl2 list
wsl --set-default ReplacewithNameofDistroInurWSL2List

```

### Run Docker and Azure deployment
- Go into the init-deploy-setup.sh and change the following:
- 
```bash
bash init-deploy-setup.sh
```

## Manual Setup
#### Docker Build Image
```bash
docker login -u YourDockerUsername -p YourDockerPassword

docker-compose build
docker tag jenkins-projectx-jenkins:latest YourDockerUsername/jenkins-projectx-jenkins:latest
docker push YourDockerUsername/jenkins-projectx-jenkins:latest
```

#### Azure Init Deployment Setup
```bash
az login

az group create --name dvopsResourceGroup --location eastus
az aks create --resource-group dvopsResourceGroup --name dvopsAKSCluster --node-count 1 --generate-ssh-keys

az aks install-cli
az aks get-credentials --resource-group dvopsResourceGroup --name dvopsAKSCluster

kubectl apply -f deployment.yaml
kubectl apply -f deploy-service.yaml
kubectl get pods
kubectl get services
```

#### Jenkins Azure login setup
- Get your id and replace with Your ID here and copy and paste that into jenkins build command.
```bash
az account show --query "id" --output tsv

az aks get-credentials --resource-group "dvopsResourceGroup" --name "dvopsAKSCluster"
--overwrite-existing --subscription "Your ID here"
```