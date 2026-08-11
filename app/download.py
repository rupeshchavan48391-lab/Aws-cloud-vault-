

from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME
from logger import logger

def download_file(file_name, download_path):
  
    try:

        s3.download_file(
            BUCKET_NAME,
            file_name,
            download_path
        )

       logger.info(f"File '{file_name}' downloaded successfully.")
       logger.info(f"Saved to: {download_path}")

  except ClientError as error:
    logger.error(f"Download failed: {error}")

except Exception as error:
    logger.error(f"Unexpected error: {error}")
