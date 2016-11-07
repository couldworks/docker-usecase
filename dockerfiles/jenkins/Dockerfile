FROM couldworks/java-base:8u92
MAINTAINER Couldworks

USER root

RUN apk add --no-cache wget git curl zip && rm -rf /var/lib/apt/lists/*

## install python-software-properties (so you can do add-apt-repository)
#RUN apt-get update
#RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q python-software-properties software-properties-common

## install SSH server so we can connect multiple times to the container
RUN apk add --no-cache openssh && mkdir /var/run/sshd

## install oracle java and R base from PPA
#RUN add-apt-repository ppa:cwchien/gradle -y
#RUN apt-get update
RUN apk add --no-cache gradle

# Configure default locale, see https://github.com/rocker-org/rocker/issues/19
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
        && locale-gen en_US.utf8 \
        && /usr/sbin/update-locale LANG=en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

ENV JENKINS_OPTS --httpPort=9080
ENV JENKINS_HOME /var/jenkins_home

# Jenkins is ran with user `jenkins`, uid = 1000
# If you bind mount a volume from host/vloume from a data container,
# ensure you use same uid
RUN useradd -d "$JENKINS_HOME" -u 1001 -m -s /bin/bash jenkins

# Jenkins home directoy is a volume, so configuration and build history
# can be persisted and survive image upgrades
VOLUME ["/var/jenkins_home"]

# `/usr/share/jenkins/ref/` contains all reference configuration we want
# to set on a fresh new installation. Use it to bundle additional plugins
# or config file with your custom jenkins Docker image.
RUN mkdir -p /usr/share/jenkins/ref/init.groovy.d

# Use tini as subreaper in Docker container to adopt zombie processes
RUN curl -fL https://github.com/krallin/tini/releases/download/v0.5.0/tini-static -o /bin/tini && chmod +x /bin/tini

COPY init.groovy /usr/share/jenkins/ref/init.groovy.d/tcp-slave-agent-port.groovy

ENV JENKINS_VERSION 2.0
ENV JENKINS_SHA 59215da16f9f8a781d185dde683c05fcf11450ef

# could use ADD but this one does not check Last-Modified header
# see https://github.com/docker/docker/issues/8331
RUN curl -fL http://mirrors.jenkins-ci.org/war-rc/$JENKINS_VERSION/jenkins.war -o /usr/share/jenkins/jenkins.war
#  && echo "$JENKINS_SHA /usr/share/jenkins/jenkins.war" | sha1sum -c -

ENV JENKINS_UC https://updates.jenkins-ci.org
RUN chown -R jenkins "$JENKINS_HOME" /usr/share/jenkins/ref



#######################
# Install Android SDK #
#######################
# Dependencies
RUN dpkg --add-architecture i386 && apt-get update && apt-get install -yq libstdc++6:i386 zlib1g:i386 libncurses5:i386 ant maven --no-install-recommends
#ENV GRADLE_URL http://services.gradle.org/distributions/gradle-2.2.1-all.zip
#RUN curl -L ${GRADLE_URL} -o /tmp/gradle-2.2.1-all.zip && unzip /tmp/gradle-2.2.1-all.zip -d /usr/local && rm /tmp/gradle-2.2.1-all.zip
#ENV GRADLE_HOME /usr/local/gradle-2.2.1

# Download and untar SDK
ENV ANDROID_SDK_URL http://dl.google.com/android/android-sdk_r24.4.1-linux.tgz
RUN curl -L ${ANDROID_SDK_URL} | tar xz -C /usr/local
ENV ANDROID_HOME /usr/local/android-sdk-linux

# Install Android SDK components
ENV ANDROID_SDK_COMPONENTS platform-tools,build-tools-23.0.2,build-tools-22.0.1,android-22,android-23,extra-android-support,extra-google-google_play_services,extra-android-m2repository,extra-google-m2repository
RUN ( sleep 5 && while [ 1 ]; do sleep 1; echo y; done ) | ${ANDROID_HOME}/tools/android update sdk --no-ui --all --filter "${ANDROID_SDK_COMPONENTS}"

# Path
#ENV PATH $PATH:${ANDROID_HOME}/tools:$ANDROID_HOME/platform-tools:${GRADLE_HOME}/bin
ENV PATH $PATH:${ANDROID_HOME}/tools:$ANDROID_HOME/platform-tools

RUN sudo chmod -R 755 ${ANDROID_HOME}

#######################
# Install Android SDK #
#######################



# for main web interface:
EXPOSE 9081

# will be used by attached slave agents:
EXPOSE 59081

ENV COPY_REFERENCE_FILE_LOG $JENKINS_HOME/copy_reference_file.log

COPY jenkins.sh /usr/local/bin/jenkins.sh
ENTRYPOINT ["/bin/tini", "--", "/usr/local/bin/jenkins.sh"]

# from a derived Dockerfile, can use `RUN plugin.sh active.txt` to setup /usr/share/jenkins/ref/plugins from a support bundle
COPY plugins.sh /usr/local/bin/plugins.sh
RUN sudo chmod -R 755 /usr/local
RUN mkdir -p /jenkins-support
COPY plugins.txt /jenkins-support/plugins.txt
RUN /usr/local/bin/plugins.sh /jenkins-support/plugins.txt
