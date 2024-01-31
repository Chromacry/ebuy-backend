#!/bin/bash
#* Configuration
# export jenkins_server_host_url="http://localhost:8080/" #* Jenkins server host url
export jenkins_server_host_url="http://$(hostname).local:8080/" #* Jenkins server host url from wsl2

export jenkins_cli_file_path="/mnt/storagedriveletter/path/to/ebuy-backend"; #* Get the filepath by executing the command in terminal/powershell -> $ bash -c pwd
export exported_job_filename="projectx_backend_jenkins_job_config.xml" #* Exported jenkins config file name DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING!!
export new_jenkins_job_name="Project-X-Backend" #* Specify the name of the job in jenkins
export old_jenkins_job_name="Project X Backend" #* Specify the name of the job in jenkins

#* Credentials
export jenkins_username="admin" #* Default username. Changed if needed.
export jenkins_password="da1cd6b1e7b54d44bb09f9c326502163"


#* Create a backup of current job
java -jar jenkins-cli.jar -s $jenkins_server_host_url -auth $jenkins_username:$jenkins_password get-job $old_jenkins_job_name > $exported_job_filename

#* Imports the exported job into jenkins
# java -jar $jenkins_cli_file_path/jenkins-cli.jar -s $jenkins_server_host_url -auth $jenkins_username:$jenkins_password create-job $new_jenkins_job_name < $exported_job_filename

