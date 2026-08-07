

from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME


def download_file(file_name, download_path):
  
    try:

        s3.download_file(
            BUCKET_NAME,
            file_name,
            download_path
        )

        print(f"✅ '{file_name}' downloaded successfully.")
        print(f"Saved To : {download_path}")

    except ClientError as error:
        print(f"❌ Download Failed\n{error}")

    except Exception as error:
        print(error)
