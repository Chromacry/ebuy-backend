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
		client_id = "d2790003-705b-4c71-8970-2140a1063f4e"
		client_secret = "KqO8Q~nR8.LHurD5jhm_Fj8P1ECcoy99A8n7NcV5"
	}
}