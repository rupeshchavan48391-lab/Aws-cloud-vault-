# ☁️ CloudVault

### AWS S3 Cloud File Manager

CloudVault is a Python-based command-line application for managing files in Amazon S3 using the AWS SDK for Python (Boto3).

The project demonstrates how a Python application can interact with AWS S3 to create buckets, upload files, download files, list objects, and delete files, while being packaged and executed using Docker.

---

## 🚀 Features

- Create an AWS S3 bucket
- List available S3 buckets
- Upload files to S3
- List files stored in S3
- Download files from S3
- Delete files from S3
- Delete S3 bucket
- Error handling
- Application logging
- Dockerized application
- AWS IAM-based authentication

---

## 🏗️ Architecture

```text
                CloudVault
                    │
                    ▼
              Python Application
                    │
                    ▼
                 Boto3
                    │
                    ▼
               AWS S3 API
                    │
                    ▼
             Amazon S3 Bucket

---

## 🐳 Docker Deployment

```text
GitHub Repository
       │
       ▼
   Dockerfile
       │
       ▼
 Docker Image
       │
       ▼
 Docker Container
       │
       ▼
     Boto3
       │
       ▼
     AWS S3


| Technology   | Purpose                      |
| ------------ | ---------------------------- |
| Python       | Application development      |
| Boto3        | AWS SDK for Python           |
| Amazon S3    | Cloud file storage           |
| Docker       | Application containerization |
| Ubuntu Linux | Development environment      |
| Git & GitHub | Version control              |
| AWS IAM      | Secure AWS access            |


🚀 Run the Project
1. Clone the repository
git clone https://github.com/rupeshchavan48391-lab/Aws-cloud-vault-.git
2. Enter the project directory
cd Aws-cloud-vault-
3. Build the Docker image
docker build -t cloudvault .
4. Run CloudVault
docker run -it --rm cloudvault

🔐 Security
AWS credentials are not stored in the source code.
AWS IAM controls access to Amazon S3.
EC2 IAM roles can provide temporary AWS credentials.
Never commit AWS access keys or secret keys to GitHub.
🎯 Learning Objectives

This project was built to gain hands-on experience with:

Python
Amazon S3
Boto3
AWS IAM
Linux / Ubuntu
Docker
Git & GitHub
Cloud application architecture

🔮 Future Improvements
Web-based interface using Flask
File search and filtering
File metadata display
Authentication
S3 presigned URLs
CI/CD pipeline with Jenkins
Kubernetes deployment
Monitoring and health checks

