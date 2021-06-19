<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [搭建gitlab](#%E6%90%AD%E5%BB%BAgitlab)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

![gitlab](https://docs.gitlab.com/assets/images/docs-gitlab.svg)

## 搭建gitlab 

> 官网地址 https://about.gitlab.com/

1. 进入官网点击导航栏 **Resources** -> **GitLab docs** ->点击 **GitLab**   

   ## Select a product area

    **GitLab**   

   [ Install, use, and administer GitLab self-managed and GitLab.com.](https://docs.gitlab.com/ee/README.html)

   - 点击 [**Install GitLab**](https://about.gitlab.com/install/)

   - 选择  [Docker](https://docs.gitlab.com/ee/install/docker.html) 安装 

     

     ## Omnibus GitLab based images

     GitLab maintains a set of [official Docker images](https://hub.docker.com/u/gitlab) based on our [Omnibus GitLab package](https://docs.gitlab.com/omnibus/README.html). These images include:

     - [GitLab Community Edition](https://hub.docker.com/r/gitlab/gitlab-ce/)  社区免费版
     - [GitLab Enterprise Edition](https://hub.docker.com/r/gitlab/gitlab-ee/) 企业付费版
     - [GitLab Runner](https://hub.docker.com/r/gitlab/gitlab-runner/)

     A [complete usage guide](https://docs.gitlab.com/omnibus/docker/) to these images is available, as well as the [Dockerfile used for building the images](https://gitlab.com/gitlab-org/omnibus-gitlab/tree/master/docker).

   - 点击[complete usage guide](https://docs.gitlab.com/omnibus/docker/)查看完整的使用指南
   
     ### 安装一个测试的练下手（社区版）
   
     ```
     sudo docker run --detach \
       --hostname 192.168.0.105 \
       --publish 13800:80 --publish 13822:22 \
       --name gitlab_test \
       --restart always \
       gitlab/gitlab-ee:latest
       
       firewall-cmd --add-port=13800/tcp --zone=public --permanent
       firewall-cmd --reload  // 更新防火墙规则
       docker logs -f gitlab_test //持续打印gitlab_test日志
     ```
   
     打开 192.168.0.105:13800 进入gitlab首页，设置密码，帐号root
   
     ### 使用docker-compose安装 gitlab
   
     ```
     web:
       image: 'gitlab/gitlab-ee:latest'
       restart: always
       hostname: 'gitlab.example.com'
       environment:
         GITLAB_OMNIBUS_CONFIG: |
           external_url 'https://gitlab.example.com'
           # Add any other gitlab.rb configuration here, each on its own line
       ports:
         - '80:80'
         - '443:443'
         - '22:22'
       volumes:
         - '$GITLAB_HOME/config:/etc/gitlab'
         - '$GITLAB_HOME/logs:/var/log/gitlab'
         - '$GITLAB_HOME/data:/var/opt/gitlab'
     ```
   
     **推荐的方式**
   
     使用国外小哥开发的镜像docker-gitlab，我fork了一份
   
     https://github.com/zoujian3820/docker-gitlab
   
     ```
     先停止上面gitlab_test的运行
     docker stop gitlab_test
     再删除掉gitlab_test
     docker rm gitlab_test
     
     cd srv
     vi docker-compose.yml
     然后复制粘贴以下内容
     ```
   
     ```
     version: '2.3'
     
     services:
       redis:
         restart: always
         image: redis:5.0.9
         command:
         - --loglevel warning
         volumes:
         - /srv/docker/gitlab/redis-data:/var/lib/redis:Z
     
       postgresql:
         restart: always
         image: sameersbn/postgresql:11-20200524
         volumes:
         - /srv/docker/gitlab/postgresql-data:/var/lib/postgresql:Z
         environment:
         - DB_USER=gitlab
         - DB_PASS=password
         - DB_NAME=gitlabhq_production
         - DB_EXTENSION=pg_trgm,btree_gist
     
       gitlab:
         restart: always
         image: sameersbn/gitlab:13.2.3
         depends_on:
         - redis
         - postgresql
         ports:
         - "13800:80" # 80端口印射
         - "13822:22" # 22端口印射
         volumes:
         - /srv/docker/gitlab/gitlab-data:/home/git/data:Z
         healthcheck:
           test: ["CMD", "/usr/local/sbin/healthcheck"]
           interval: 5m
           timeout: 10s
           retries: 3
           start_period: 5m
         environment:
         - DEBUG=false
     
         - DB_ADAPTER=postgresql
         - DB_HOST=postgresql
         - DB_PORT=5432
         - DB_USER=gitlab
         - DB_PASS=password
         - DB_NAME=gitlabhq_production
     
         - REDIS_HOST=redis
         - REDIS_PORT=6379
     
         - TZ=Asia/Kolkata
         - GITLAB_TIMEZONE=Kolkata
     
         - GITLAB_HTTPS=false
         - SSL_SELF_SIGNED=false
     
         - GITLAB_HOST=192.168.0.105 # 云服务器公网ip
         - GITLAB_PORT=13800  # 默认印射端口
         - GITLAB_SSH_PORT=13822  # ssh服务印射端口
         - GITLAB_RELATIVE_URL_ROOT=
         - GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alphanumeric-string
         - GITLAB_SECRETS_SECRET_KEY_BASE=long-and-random-alphanumeric-string
         - GITLAB_SECRETS_OTP_KEY_BASE=long-and-random-alphanumeric-string
     
         - GITLAB_ROOT_PASSWORD=12345678  # 初始管理员密码
         - GITLAB_ROOT_EMAIL=388888888@qq.com # 管理员邮箱
     
         - GITLAB_NOTIFY_ON_BROKEN_BUILDS=true
         - GITLAB_NOTIFY_PUSHER=false
     
         - GITLAB_EMAIL=notifications@example.com
         - GITLAB_EMAIL_REPLY_TO=noreply@example.com
         - GITLAB_INCOMING_EMAIL_ADDRESS=reply@example.com
     
         - GITLAB_BACKUP_SCHEDULE=daily
         - GITLAB_BACKUP_TIME=01:00
     
         - SMTP_ENABLED=false
         - SMTP_DOMAIN=www.example.com
         - SMTP_HOST=smtp.gmail.com
         - SMTP_PORT=587
         - SMTP_USER=mailer@example.com
         - SMTP_PASS=password
         - SMTP_STARTTLS=true
         - SMTP_AUTHENTICATION=login
     
         - IMAP_ENABLED=false
         - IMAP_HOST=imap.gmail.com
         - IMAP_PORT=993
         - IMAP_USER=mailer@example.com
         - IMAP_PASS=password
         - IMAP_SSL=true
         - IMAP_STARTTLS=false
     
         - OAUTH_ENABLED=false
         - OAUTH_AUTO_SIGN_IN_WITH_PROVIDER=
         - OAUTH_ALLOW_SSO=
         - OAUTH_BLOCK_AUTO_CREATED_USERS=true
         - OAUTH_AUTO_LINK_LDAP_USER=false
         - OAUTH_AUTO_LINK_SAML_USER=false
         - OAUTH_EXTERNAL_PROVIDERS=
     
         - OAUTH_CAS3_LABEL=cas3
         - OAUTH_CAS3_SERVER=
         - OAUTH_CAS3_DISABLE_SSL_VERIFICATION=false
         - OAUTH_CAS3_LOGIN_URL=/cas/login
         - OAUTH_CAS3_VALIDATE_URL=/cas/p3/serviceValidate
         - OAUTH_CAS3_LOGOUT_URL=/cas/logout
     
         - OAUTH_GOOGLE_API_KEY=
         - OAUTH_GOOGLE_APP_SECRET=
         - OAUTH_GOOGLE_RESTRICT_DOMAIN=
     
         - OAUTH_FACEBOOK_API_KEY=
         - OAUTH_FACEBOOK_APP_SECRET=
     
         - OAUTH_TWITTER_API_KEY=
         - OAUTH_TWITTER_APP_SECRET=
     
         - OAUTH_GITHUB_API_KEY=
         - OAUTH_GITHUB_APP_SECRET=
         - OAUTH_GITHUB_URL=
         - OAUTH_GITHUB_VERIFY_SSL=
     
         - OAUTH_GITLAB_API_KEY=
         - OAUTH_GITLAB_APP_SECRET=
     
         - OAUTH_BITBUCKET_API_KEY=
         - OAUTH_BITBUCKET_APP_SECRET=
     
         - OAUTH_SAML_ASSERTION_CONSUMER_SERVICE_URL=
         - OAUTH_SAML_IDP_CERT_FINGERPRINT=
         - OAUTH_SAML_IDP_SSO_TARGET_URL=
         - OAUTH_SAML_ISSUER=
         - OAUTH_SAML_LABEL="Our SAML Provider"
         - OAUTH_SAML_NAME_IDENTIFIER_FORMAT=urn:oasis:names:tc:SAML:2.0:nameid-format:transient
         - OAUTH_SAML_GROUPS_ATTRIBUTE=
         - OAUTH_SAML_EXTERNAL_GROUPS=
         - OAUTH_SAML_ATTRIBUTE_STATEMENTS_EMAIL=
         - OAUTH_SAML_ATTRIBUTE_STATEMENTS_NAME=
         - OAUTH_SAML_ATTRIBUTE_STATEMENTS_USERNAME=
         - OAUTH_SAML_ATTRIBUTE_STATEMENTS_FIRST_NAME=
         - OAUTH_SAML_ATTRIBUTE_STATEMENTS_LAST_NAME=
     
         - OAUTH_CROWD_SERVER_URL=
         - OAUTH_CROWD_APP_NAME=
         - OAUTH_CROWD_APP_PASSWORD=
     
         - OAUTH_AUTH0_CLIENT_ID=
         - OAUTH_AUTH0_CLIENT_SECRET=
         - OAUTH_AUTH0_DOMAIN=
         - OAUTH_AUTH0_SCOPE=
     
         - OAUTH_AZURE_API_KEY=
         - OAUTH_AZURE_API_SECRET=
         - OAUTH_AZURE_TENANT_ID=
     
     # volumes:
     #   redis-data: 
     #   postgresql-data: 
     #   gitlab-data: 
     
     ```
   
     ```
     docker-compose up -d
     ```
   
     