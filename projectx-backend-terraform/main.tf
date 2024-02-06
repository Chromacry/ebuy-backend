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
		client_id = "d5935f60-377d-4ef9-a171-3fe6905b0e2b"
		client_secret = "_EE8Q~IfRP_etU1RqNM2-X8qf6MBnC-Zc5zPMc.a"
	}
}