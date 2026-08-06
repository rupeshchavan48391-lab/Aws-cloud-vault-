"""
=========================================
File Name : bucket.py
"
from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME, AWS_REGION


def create_bucket():
    """
    Creates a new S3 bucket.
    """
    try:

        s3.create_bucket(
            Bucket=BUCKET_NAME,
            CreateBucketConfiguration={
                "LocationConstraint": AWS_REGION
            }
        )

        print(f"✅ Bucket '{BUCKET_NAME}' created successfully.")

    except ClientError as error:
        print(f"❌ Failed to create bucket.\n{error}")


def list_buckets():
    """
    Displays all S3 buckets available
    in  AWS account.
    """
    try:
  response = s3.list_buckets()
        print("\n========== S3 Buckets ==========\n")

        if not response["Buckets"]:
            print("No buckets found.")

        for bucket in response["Buckets"]:
            print(f"• {bucket['Name']}")

    except ClientError as error:
        print(error)


def delete_bucket():
    """
    Deletes the configured bucket.
    """
    try:
 s3.delete_bucket(
            Bucket=BUCKET_NAME
        )

        print(f"🗑 Bucket '{BUCKET_NAME}' deleted successfully.")

    except ClientError as error:
        print(error)
