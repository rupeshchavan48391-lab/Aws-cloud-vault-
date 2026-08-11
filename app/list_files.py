

from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME
from logger import logger


def list_files():
    """
    Display all files stored in the configured S3 bucket.
    """

    try:

        response = s3.list_objects_v2(
            Bucket=BUCKET_NAME
        )

        if "Contents" not in response:

            logger.info(
                f"Bucket '{BUCKET_NAME}' is empty."
            )

            return

        logger.info(
            f"Files found in bucket '{BUCKET_NAME}':"
        )

        for file in response["Contents"]:

            file_name = file["Key"]
            file_size = file["Size"]
            last_modified = file["LastModified"]

            print(f"📄 File      : {file_name}")
            print(f"📦 Size      : {file_size} bytes")
            print(f"🕒 Modified  : {last_modified}")
            print("-----------------------------------")

    except ClientError as error:

        logger.error(f"Failed to list files: {error}")

    except Exception as error:

        logger.error(f"Unexpected error: {error}")
