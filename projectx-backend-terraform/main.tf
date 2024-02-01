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
		client_id = "8279042b-f7e0-4831-b8cb-a8d898da09b4"
		client_secret = "~oe8Q~EDLhPJ0nl8zdEhfFcKNtHDw8pp51CNzbh-"
	}
}