
from botocore.exceptions import ClientError

from s3_service import s3
from config import BUCKET_NAME
from logger import logger
from utils import check_file_exists, get_file_name


def upload_file(file_path):

    try:

        # Check whether the local file exists
        if not check_file_exists(file_path):

            logger.warning(
                f"File not found: {file_path}"
            )

            return False

        # Extract file name
        file_name = get_file_name(
            file_path
        )

        # Upload file to S3
        s3.upload_file(
            file_path,
            BUCKET_NAME,
            file_name
        )

        logger.info(
            f"File '{file_name}' uploaded successfully."
        )

        logger.info(
            f"Bucket: {BUCKET_NAME}"
        )

        return True

    except ClientError as error:

        logger.error(
            f"Upload failed: {error}"
        )

        return False

    except Exception as error:

        logger.error(
            f"Unexpected error: {error}"
        )

        return False
