from flask import Flask, render_template, request, jsonify
import os

from bucket import create_bucket, list_buckets, delete_bucket
from upload import upload_file
from download import download_file
from delete import delete_file
from list_files import list_files


app = Flask(__name__)


# =========================================================
# DASHBOARD
# =========================================================

@app.route("/")
def dashboard():
    return render_template("dashboard.html")


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "application": "CloudVault"
    })


# =========================================================
# LIST FILES
# =========================================================

@app.route("/api/files", methods=["GET"])
def get_files():

    try:

        result = list_files()

        return jsonify({
            "success": True,
            "files": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# UPLOAD FILE
# =========================================================

@app.route("/api/upload", methods=["POST"])
def upload():

    try:

        if "file" not in request.files:

            return jsonify({
                "success": False,
                "error": "No file provided"
            }), 400


        file = request.files["file"]


        if file.filename == "":

            return jsonify({
                "success": False,
                "error": "No file selected"
            }), 400


        upload_directory = "/tmp/cloudvault_uploads"

        os.makedirs(
            upload_directory,
            exist_ok=True
        )


        file_path = os.path.join(
            upload_directory,
            file.filename
        )


        file.save(file_path)


        result = upload_file(
            file_path
        )


        return jsonify({
            "success": True,
            "message": "File uploaded successfully",
            "result": result
        })


    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# DOWNLOAD FILE
# =========================================================

@app.route("/api/download", methods=["POST"])
def download():

    try:

        data = request.get_json()

        file_name = data.get(
            "file_name"
        )

        download_path = data.get(
            "download_path",
            "/tmp"
        )


        if not file_name:

            return jsonify({
                "success": False,
                "error": "File name is required"
            }), 400


        result = download_file(
            file_name,
            download_path
        )


        return jsonify({
            "success": True,
            "message": "File downloaded successfully",
            "result": result
        })


    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# DELETE FILE
# =========================================================

@app.route("/api/delete", methods=["DELETE"])
def delete():

    try:

        data = request.get_json()

        file_name = data.get(
            "file_name"
        )


        if not file_name:

            return jsonify({
                "success": False,
                "error": "File name is required"
            }), 400


        result = delete_file(
            file_name
        )


        return jsonify({
            "success": True,
            "message": "File deleted successfully",
            "result": result
        })


    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# BUCKETS
# =========================================================

@app.route("/api/buckets", methods=["GET"])
def get_buckets():

    try:

        result = list_buckets()

        return jsonify({
            "success": True,
            "buckets": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# CREATE BUCKET
# =========================================================

@app.route("/api/buckets", methods=["POST"])
def create_new_bucket():

    try:

        result = create_bucket()

        return jsonify({
            "success": True,
            "message": "Bucket created successfully",
            "result": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# DELETE BUCKET
# =========================================================

@app.route("/api/buckets", methods=["DELETE"])
def remove_bucket():

    try:

        result = delete_bucket()

        return jsonify({
            "success": True,
            "message": "Bucket deleted successfully",
            "result": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# START APPLICATION
# =========================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
