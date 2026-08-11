import os


def check_file_exists(file_path):
    """
    Check whether a local file exists.

    Parameters
    ----------
    file_path : str
        Path of the local file.

    Returns
    -------
    bool
        True if the file exists, otherwise False.
    """

    if os.path.isfile(file_path):
        return True

    return False


def get_file_name(file_path):
    """
    Extract the file name from a file path.

    Parameters
    ----------
    file_path : str
        Full path of a file.

    Returns
    -------
    str
        File name.
    """

    return os.path.basename(file_path)
