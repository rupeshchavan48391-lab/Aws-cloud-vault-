"""
Lists all available S3 buckets.
"""

from s3_service import s3


def list_buckets():
    response = s3.list_buckets()

    print("\nAvailable Buckets\n")

    for bucket in response["Buckets"]:
        print(f"• {bucket['Name']}")

if __name__ == "__main__":
    list_buckets()
