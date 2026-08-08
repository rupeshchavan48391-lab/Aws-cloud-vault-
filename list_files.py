
from botocore.exceptions import ClientError
from s3_service import s3
from config import BUCKET_NAME


def list_files():
    """
    Display all files stored in the configured S3 bucket.
    """

    try:

        response = s3.list_objects_v2(
            Bucket=BUCKET_NAME
        )

        print("\n===================================")
        print(f"Files in Bucket: {BUCKET_NAME}")
        print("===================================\n")

        # Check whether the bucket contains files
        if "Contents" not in response:
            print("📂 Bucket is empty.")
            return

        # Display each file
        for file in response["Contents"]:

            file_name = file["Key"]
            file_size = file["Size"]
            last_modified = file["LastModified"]

            print(f"📄 File       : {file_name}")
            print(f"📦 Size       : {file_size} bytes")
            print(f"🕒 Modified   : {last_modified}")
            print("-----------------------------------")

    except ClientError as error:

        print(f"❌ Failed to list files.\n{error}")

    except Exception as error:

        print(f"❌ Unexpected error: {error}")
