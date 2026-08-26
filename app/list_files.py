from botocore.exceptions import ClientError

from s3_service import s3
from config import BUCKET_NAME
from logger import logger


def list_files():
    """
    Return all files stored in the configured S3 bucket.
    """

    try:

        response = s3.list_objects_v2(
            Bucket=BUCKET_NAME
        )

        if "Contents" not in response:

            logger.info(
                f"Bucket '{BUCKET_NAME}' is empty."
            )

            return []

        files = []

        for file in response["Contents"]:

            files.append({
                "name": file["Key"],
                "size": file["Size"],
                "last_modified": (
                    file["LastModified"].isoformat()
                )
            })

        logger.info(
            f"Found {len(files)} file(s) "
            f"in bucket '{BUCKET_NAME}'."
        )

        return files

    except ClientError as error:

        logger.error(
            f"Failed to list files: {error}"
        )

        return []

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )

        return []

