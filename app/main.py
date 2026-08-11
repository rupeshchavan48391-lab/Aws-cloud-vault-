

from bucket import create_bucket, list_buckets, delete_bucket
from upload import upload_file
from download import download_file
from delete import delete_file
from list_files import list_files


def display_menu():
    """
    Display the CloudVault main menu.
    """

    print("\n===================================")
    print("          ☁️ CloudVault")
    print("===================================")
    print("1. Create Bucket")
    print("2. List Buckets")
    print("3. Upload File")
    print("4. List Files")
    print("5. Download File")
    print("6. Delete File")
    print("7. Delete Bucket")
    print("8. Exit")
    print("===================================")


def main():
    """
    Run the CloudVault application.
    """

    while True:

        display_menu()

        choice = input("Enter your choice: ").strip()

        # -------------------------------
        # Create Bucket
        # -------------------------------

        if choice == "1":

            create_bucket()

        # -------------------------------
        # List Buckets
        # -------------------------------

        elif choice == "2":

            list_buckets()

        # -------------------------------
        # Upload File
        # -------------------------------

        elif choice == "3":

            file_path = input(
                "Enter the full path of the file to upload: "
            ).strip()

            upload_file(file_path)

        # -------------------------------
        # List Files
        # -------------------------------

        elif choice == "4":

            list_files()

        # -------------------------------
        # Download File
        # -------------------------------

        elif choice == "5":

            file_name = input(
                "Enter the S3 file name: "
            ).strip()

            download_path = input(
                "Enter the local path where you want to save the file: "
            ).strip()

            download_file(
                file_name,
                download_path
            )

        # -------------------------------
        # Delete File
        # -------------------------------

        elif choice == "6":

            file_name = input(
                "Enter the S3 file name to delete: "
            ).strip()

            delete_file(file_name)

        # -------------------------------
        # Delete Bucket
        # -------------------------------

        elif choice == "7":

            print("\n⚠️ Warning: The bucket must be empty before")
            print("it can be deleted.\n")

            delete_bucket()

        # -------------------------------
        # Exit
        # -------------------------------

        elif choice == "8":

            print("\n☁️ Thank you for using CloudVault!")
            break

        # -------------------------------
        # Invalid Choice
        # -------------------------------

        else:

            print("\n❌ Invalid choice. Please select 1-8.")


if __name__ == "__main__":
    main()
