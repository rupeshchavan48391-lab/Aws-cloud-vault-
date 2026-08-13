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
## 🏗️ System Architecture

CloudVault follows a simple cloud-based architecture where the Python application communicates with Amazon S3 through Boto3.

```text
                         ☁️ CLOUDVAULT
                              │
                              ▼
                    ┌───────────────────┐
                    │  Python CLI App   │
                    │    CloudVault     │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │      Boto3        │
                    │     AWS SDK       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Amazon S3      │
                    │   Cloud Storage   │
                    └─────────┬─────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ cloudvault-rupesh-2026 │
                  │                        │
                  │ 📄 Files / Objects     │
                  └────────────────────────┘
```

### 🔄 Application Flow

```text
User
 │
 │ Selects operation
 ▼
CloudVault CLI
 │
 │ Python function
 ▼
Boto3
 │
 │ AWS API Request
 ▼
Amazon S3
 │
 ├── 📤 Upload
 ├── 📥 Download
 ├── 📋 List
 ├── 🗑️ Delete
 └── 📦 Bucket Management
```

> **Note:** AWS IAM authorizes the application's access to AWS resources. It is not a separate storage/API step between Boto3 and S3.

---

## 🐳 Docker Architecture

CloudVault is packaged as a Docker container to provide a consistent and portable runtime environment.

```text
       👨‍💻 Developer
             │
             ▼
       🌐 GitHub Repository
             │
             ▼
        ┌───────────┐
        │ Dockerfile│
        └─────┬─────┘
              │
              ▼
        🐳 Docker Image
              │
              ▼
        📦 Container
              │
              ▼
       ☁️ CloudVault
              │
              ▼
           Boto3
              │
              ▼
         ☁️ Amazon S3
```

### 🔗 Complete Project Flow

```text
🌐 GitHub
    │
    ▼
🐳 Docker
    │
    ▼
🐍 Python CloudVault
    │
    ▼
🔗 Boto3
    │
    ▼
☁️ Amazon S3
    │
    ▼
📦 Cloud File Storage

🔐 AWS IAM
    │
    └── Authorizes access to AWS resources
```

---

## 🛠️ Technology Stack

| Technology | Role |
|---|---|
| 🐍 Python | Application logic |
| ☁️ Amazon S3 | Cloud file storage |
| 🔗 Boto3 | AWS SDK for Python |
| 🐳 Docker | Application containerization |
| 🐧 Ubuntu Linux | Development and deployment environment |
| 🔐 AWS IAM | Identity and access management |
| 🌐 Git & GitHub | Version control |

---

## 🚀 Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rupeshchavan48391-lab/Aws-cloud-vault-.git
```

### 2️⃣ Navigate to the Project

```bash
cd Aws-cloud-vault-
```

### 3️⃣ Build the Docker Image

```bash
docker build -t cloudvault .
```

### 4️⃣ Run CloudVault

```bash
docker run -it --rm cloudvault
```


## 🎯 Learning Objectives

This project was built as a hands-on Cloud & DevOps project to gain practical experience with:

- 🐍 Python application development
- ☁️ Amazon S3
- 🔗 Boto3
- 🔐 AWS IAM
- 🐧 Linux / Ubuntu
- 🐳 Docker
- 🌐 Git & GitHub
- 🏗️ Cloud application architecture

---

## 🔮 Future Enhancements

The project can be extended with:

- 🌐 Web-based interface using Flask
- 🔎 File search and filtering
- 📊 File metadata and storage statistics
- 🔐 User authentication
- 🔗 S3 presigned URLs
- ⚙️ CI/CD pipeline using Jenkins
- ☸️ Kubernetes deployment
- 📈 Application monitoring and health checks

---

## ⭐ Project Highlights

☁️ AWS S3 Integration
🐍 Python + Boto3
🐳 Dockerized Application
🔐 IAM-based AWS Access
🐧 Linux Deployment
🌐 GitHub Version Control
🏗️ Cloud Application Architecture
```


---

