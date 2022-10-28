FROM node:18.12.0
# update and upgrade
RUN apt-get update && apt-get upgrade -y

WORKDIR /home/node/yatdl/backend

# change bash prompt to "[USERNAME]@[HOSTNAME] [CURRENT_DIRECTORY_NAME] %"
RUN echo 'PS1="\u@\h \W % "' >> /root/.bashrc
