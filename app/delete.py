
from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME


def delete_file(file_name):
    try:

        s3.delete_object(
            Bucket=BUCKET_NAME,
            Key=file_name
        )

        print(f"🗑 '{file_name}' deleted successfully.")

    except ClientError as error:
        print(f"❌ Delete Failed\n{error}")

    except Exception as error:
        print(error)
