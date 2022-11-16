
## yatdl
This is is an advanced pomodoro tracking web application that has been on my mind for a while.

The key features I am trying to implement are as follows:

- The user should be able to add todos where each todo has a todo name, todo description, created date and time, modified date and time, and optionally a pomodoro.
- The user should be able to add 1 or more pomodoro sessions for a task.

### How to run
Ensure that the environment variables in ".compose.env" are set to the appropriate values. The defaults should
in this case. See the ".compose.example.env" for descriptions of the environment variables. See the "compose.yaml"
for how the environment variables are used in the respective Docker containers for "postgres", "pgadmin4", "backend",
and "frontend".

#### Docker installation
- Ensure that the Docker engine is installed. Instuctions for installation is [here](https://docs.docker.com/get-docker/)
- Verify that the Docker daemon is running via `docker -v`

### Starting or stopping the services via Docker Compose
- Ensure that "compose-up.sh" and "compose-down.sh" are executable using `chmod +x compose-up.sh compose-down.sh`
- Start the services using `./compose-up.sh`
- Check the the "postgres", "pgadmin4", "backend", and "frontend" containers are all running. Wait for a little bit to make sure everything is running.
- Go to http://localhost:2357 in your browser. 2357 is the client port set in ".compose.env".
- When you're done and you want to stop the services run `./compose-down.sh`

### Clean up Docker images and Docker volumes
- You may want to remove the images and volumes created for "pgadmin4" and "postgres" container. See [here](https://docs.docker.com/engine/reference/commandline/image_rm/) for removing images and [here](https://docs.docker.com/engine/reference/commandline/volume_rm/) for removing docker volumes







