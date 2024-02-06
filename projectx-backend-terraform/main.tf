terraform {
	required_providers {
		azurerm = {
			source = "hashicorp/azurerm"
		}
	}
}
provider "azurerm" {
	features {}
}
resource "azurerm_resource_group" "dvopsResourceGroup" {
	name = "dvopsResourceGroup"
	location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
	name = "dvopsAKSCluster"
	location = azurerm_resource_group.dvopsResourceGroup.location
	resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
	dns_prefix = "rms-aks"
	default_node_pool {
		name = "default"
		node_count = 1
		vm_size = "Standard_DS2_v2"
	}
	service_principal {
		client_id = "a9e48420-fd1d-4bbb-8756-880c9cd2b39e"
		client_secret = "QDu8Q~AUlr9k4jrlPSsuu2J1WapCK1cPgi2UvbJX"
	}
}