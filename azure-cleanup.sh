#!/bin/bash
#* Configuration
export kube_config_filedrive="c"
export your_windows_account_username="" #* Enter your windows account username
export KUBECONFIG=/mnt/$kube_config_filedrive/Users/$your_windows_account_username/.kube/config

kubectl scale deployment projectx-backend-deployment --replicas=0
kubectl delete deployment projectx-backend-deployment
kubectl delete service projectx-backend-service
az aks delete --resource-group "dvopsResourceGroup" --name "dvopsAKSCluster" --yes --no-wait