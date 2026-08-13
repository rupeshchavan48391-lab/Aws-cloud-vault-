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
