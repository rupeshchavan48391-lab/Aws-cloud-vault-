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

        return True

    except ClientError as error:

        logger.error(
            f"Bucket creation failed: {error}"
        )

        return False

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )

        return False


def list_buckets():
    """
    Return all available S3 buckets.
    """

    try:

        response = s3.list_buckets()

        buckets = []

        for bucket in response.get(
            "Buckets",
            []
        ):

            buckets.append({
                "name": bucket["Name"],
                "creation_date": (
                    bucket["CreationDate"].isoformat()
                )
            })

        logger.info(
            f"Found {len(buckets)} S3 bucket(s)."
        )

        return buckets

    except ClientError as error:

        logger.error(
            f"Failed to list buckets: {error}"
        )

        return []

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )

        return []


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

        return True

    except ClientError as error:

        logger.error(
            f"Bucket deletion failed: {error}"
        )

        return False

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )

        return False
