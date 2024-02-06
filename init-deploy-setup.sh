#!/bin/bash
#* Configuration
#* Use this command to get ID, Run the command below inside ur cmd/powershell
#*$ az account show --query "id" --output tsv

export azure_account_id=""
export kube_config_filedrive="c" #* Default is c drive. Specify if needed. 
export your_windows_account_username="" #* Enter your windows account username
export docker_username="" #* Docker account username


docker login

# docker-compose build
# docker-compose push

docker build -t projectx-backend-init-img .
docker tag projectx-backend-init-img:latest $docker_username/projectx-backend-init-img:latest
docker push $docker_username/projectx-backend-init-img:latest

az login

az group create --name dvopsResourceGroup --location eastus
az aks create --resource-group dvopsResourceGroup --name dvopsAKSCluster --node-count 1 --generate-ssh-keys
az aks delete --resource-group "dvopsResourceGroup" --name "dvopsAKSCluster" --yes --no-wait


az aks install-cli
az aks get-credentials --resource-group dvopsResourceGroup --name dvopsAKSCluster


# az aks get-credentials --resource-group "dvopsResourceGroup" --name "dvopsAKSCluster" --overwrite-existing --subscription $azure_account_id

export KUBECONFIG=/mnt/c/Users/$your_windows_account_username/.kube/config

kubectl apply -f deployment.yaml
kubectl apply -f deploy-service.yaml
kubectl get pods
kubectl get services

kubectl set image deployment/projectx-backend-deployment projectx-backend-container=$docker_username/ebuy-backend-projectx-backend:latest
