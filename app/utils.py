
import os


def check_file_exists(file_path):
    """
    Check whether a local file exists.
    """

    return os.path.isfile(file_path)


def get_file_name(file_path):
    """
    Extract the file name from a file path.
    """

    return os.path.basename(file_path)


def validate_file_name(file_name):
    """
    Check whether an S3 file name was provided.
    """

    if not file_name:
        return False

    return True


def validate_download_path(download_path):
    """
    Check whether a download path was provided.
    """

    if not download_path:
        return False

    return True
