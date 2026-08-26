
from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    send_file
)

import os

from upload import upload_file
from download import download_file
from delete import delete_file
from list_files import list_files

from s3_service import s3
from config import BUCKET_NAME
from logger import logger


app = Flask(__name__)


# =========================================================
# DASHBOARD
# =========================================================

@app.route("/")
def dashboard():

    return render_template(
        "dashboard.html"
    )


# =========================================================
# LIST FILES
# =========================================================

@app.route(
    "/api/files",
    methods=["GET"]
)
def api_files():

    try:

        response = s3.list_objects_v2(
            Bucket=BUCKET_NAME
        )

        files = []

        for item in response.get(
            "Contents",
            []
        ):

            files.append({

                "name":
                    item["Key"],

                "size":
                    item["Size"],

                "last_modified":
                    item["LastModified"].isoformat()

            })


        return jsonify({

            "success": True,

            "files": files,

            "count": len(files)

        })


    except Exception as error:

        logger.error(
            f"Failed to load files: {error}"
        )


        return jsonify({

            "success": False,

            "error": str(error)

        }), 500


# =========================================================
# UPLOAD FILE
# =========================================================

@app.route(
    "/api/upload",
    methods=["POST"]
)
def api_upload():

    try:

        if "file" not in request.files:

            return jsonify({

                "success": False,

                "error":
                    "No file provided"

            }), 400


        file = request.files["file"]


        if not file.filename:

            return jsonify({

                "success": False,

                "error":
                    "No file selected"

            }), 400


        filename = os.path.basename(
            file.filename
        )


        upload_path = os.path.join(
            "/tmp",
            filename
        )


        file.save(
            upload_path
        )


        success = upload_file(
            upload_path
        )


        # Remove temporary file
        if os.path.exists(
            upload_path
        ):

            os.remove(
                upload_path
            )


        if not success:

            return jsonify({

                "success": False,

                "error":
                    "Upload to S3 failed"

            }), 500


        logger.info(
            f"API upload successful: {filename}"
        )


        return jsonify({

            "success": True,

            "message":
                "File uploaded successfully",

            "file_name":
                filename

        })


    except Exception as error:

        logger.error(
            f"Upload API error: {error}"
        )


        return jsonify({

            "success": False,

            "error": str(error)

        }), 500


# =========================================================
# DOWNLOAD FILE
# =========================================================

@app.route(
    "/api/download",
    methods=["POST"]
)
def api_download():

    try:

        data = request.get_json(
            silent=True
        ) or {}


        file_name = data.get(
            "file_name"
        )


        if not file_name:

            return jsonify({

                "success": False,

                "error":
                    "File name is required"

            }), 400


        file_name = os.path.basename(
            file_name
        )


        download_path = os.path.join(
            "/tmp",
            file_name
        )


        success = download_file(
            file_name,
            download_path
        )


        if not success:

            return jsonify({

                "success": False,

                "error":
                    "Download failed"

            }), 500


        logger.info(
            f"API download successful: {file_name}"
        )


        return send_file(

            download_path,

            as_attachment=True,

            download_name=file_name

        )


    except Exception as error:

        logger.error(
            f"Download API error: {error}"
        )


        return jsonify({

            "success": False,

            "error": str(error)

        }), 500


# =========================================================
# DELETE FILE
# =========================================================

@app.route(
    "/api/delete",
    methods=["DELETE"]
)
def api_delete():

    try:

        data = request.get_json(
            silent=True
        ) or {}


        file_name = data.get(
            "file_name"
        )


        if not file_name:

            return jsonify({

                "success": False,

                "error":
                    "File name is required"

            }), 400


        file_name = os.path.basename(
            file_name
        )


        success = delete_file(
            file_name
        )


        if success is False:

            return jsonify({

                "success": False,

                "error":
                    "Delete failed"

            }), 500


        logger.info(
            f"API delete successful: {file_name}"
        )


        return jsonify({

            "success": True,

            "message":
                "File deleted successfully",

            "file_name":
                file_name

        })


    except Exception as error:

        logger.error(
            f"Delete API error: {error}"
        )


        return jsonify({

            "success": False,

            "error": str(error)

        }), 500


# =========================================================
# APPLICATION START
# =========================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
