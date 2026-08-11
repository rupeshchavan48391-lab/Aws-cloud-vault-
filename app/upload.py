
from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME
from logger import logger
from utils import check_file_exists, get_file_name


def upload_file(file_path):

    try:

        if not check_file_exists(file_path):
            print("❌ File not found.")
            return

        file_name = get_file_name(file_path)

        s3.upload_file(
            file_path,
            BUCKET_NAME,
            file_name
        )

       logger.info(f"File '{file_name}' uploaded successfully.")
logger.info(f"Bucket: {BUCKET_NAME}")
    except ClientError as error:
        print(f"❌ Upload Failed\n{error}")

    except Exception as error:
        print(error)
