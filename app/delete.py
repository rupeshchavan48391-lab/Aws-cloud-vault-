
from botocore.exceptions import ClientError

from s3_service import s3
from config import BUCKET_NAME
from logger import logger


def delete_file(file_name):
    """
    Delete a file from the configured S3 bucket.
    """

    try:

        s3.delete_object(
            Bucket=BUCKET_NAME,
            Key=file_name
        )

        logger.info(
            f"File '{file_name}' deleted successfully."
        )

        return True

    except ClientError as error:

        logger.error(
            f"Delete failed: {error}"
        )

        return False

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )

        return False
