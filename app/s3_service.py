"""
Creates an AWS S3 client.
"""

import boto3
from config import AWS_REGION

# Create S3 Client
s3 = boto3.client(
    "s3",
    region_name=AWS_REGION
)
