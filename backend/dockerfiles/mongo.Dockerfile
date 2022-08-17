FROM mongo:latest
# update and upgrade
RUN apt-get update && apt-get upgrade -y
# change bash prompt to "[USERNAME]@[HOSTNAME] [CURRENT_DIRECTORY_NAME] %"
RUN echo 'PS1="\u@\h \W % "' >> /root/.bashrc
