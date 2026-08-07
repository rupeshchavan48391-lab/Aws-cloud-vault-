
from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME

import os


def upload_file(file_path):
    """
    Upload a file to the configured S3 bucket.

    Parameters
    ----------
    file_path : str
        Local path of the file to upload.
    """
    try:

        # Check whether the file exists
        if not os.path.isfile(file_path):
            print("❌ File not found.")
            return

        # Extract only the filename
        file_name = os.path.basename(file_path)

        # Upload file
        s3.upload_file(
            file_path,
            BUCKET_NAME,
            file_name
        )

        print(f"✅ '{file_name}' uploaded successfully.")
        print(f"Bucket : {BUCKET_NAME}")

    except ClientError as error:
        print(f"❌ Upload Failed\n{error}")

    except Exception as error:
        print(error)
