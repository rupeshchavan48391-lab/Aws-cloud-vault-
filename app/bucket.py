
from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME, AWS_REGION
from logger import logger


def create_bucket():
    """
    Create the configured S3 bucket.
    """

    try:

        s3.create_bucket(
            Bucket=BUCKET_NAME,
            CreateBucketConfiguration={
                "LocationConstraint": AWS_REGION
            }
        )

        logger.info(
            f"Bucket '{BUCKET_NAME}' created successfully."
        )

    except ClientError as error:

        logger.error(
            f"Bucket creation failed: {error}"
        )

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )


def list_buckets():
    """
    Display all available S3 buckets.
    """

    try:

        response = s3.list_buckets()

        logger.info("Available S3 buckets:")

        for bucket in response["Buckets"]:

            print(f"• {bucket['Name']}")

    except ClientError as error:

        logger.error(
            f"Failed to list buckets: {error}"
        )

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )


def delete_bucket():
    """
    Delete the configured S3 bucket.
    """

    try:

        s3.delete_bucket(
            Bucket=BUCKET_NAME
        )

        logger.info(
            f"Bucket '{BUCKET_NAME}' deleted successfully."
        )

    except ClientError as error:

        logger.error(
            f"Bucket deletion failed: {error}"
        )

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )
