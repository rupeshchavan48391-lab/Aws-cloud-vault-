/* =========================================================
   CLOUDVAULT — DASHBOARD
   Frontend API Integration
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("searchInput");

    const dropZone =
        document.getElementById("dropZone");

    const chooseButton =
        document.querySelector(".secondary-button");

    const uploadButton =
        document.querySelector(".upload-button");

    const notificationButton =
        document.querySelector(".notification-button");

    const fileInput =
        document.createElement("input");

    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.style.display = "none";

    document.body.appendChild(fileInput);


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    loadFiles();


    /* =====================================================
       SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const searchTerm =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                const rows =
                    document.querySelectorAll(
                        ".file-row:not(.table-header)"
                    );

                rows.forEach(row => {

                    const fileName =
                        row
                            .querySelector(
                                ".file-name strong"
                            )
                            ?.innerText
                            .toLowerCase() || "";

                    row.style.display =
                        fileName.includes(searchTerm)
                            ? "grid"
                            : "none";

                });

            }
        );

    }


    /* =====================================================
       SEARCH SHORTCUT
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement.tagName !== "INPUT"
            ) {

                event.preventDefault();

                searchInput?.focus();

            }

        }
    );


    /* =====================================================
       CHOOSE FILE
       ===================================================== */

    chooseButton?.addEventListener(
        "click",
        () => {

            fileInput.click();

        }
    );


    uploadButton?.addEventListener(
        "click",
        () => {

            fileInput.click();

        }
    );


    /* =====================================================
       FILE SELECTED
       ===================================================== */

    fileInput.addEventListener(
        "change",
        () => {

            if (
                fileInput.files &&
                fileInput.files.length > 0
            ) {

                uploadFiles(
                    fileInput.files
                );

            }

        }
    );


    /* =====================================================
       DRAG & DROP
       ===================================================== */

    if (dropZone) {

        [
            "dragenter",
            "dragover"
        ].forEach(eventName => {

            dropZone.addEventListener(
                eventName,
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    dropZone.classList.add(
                        "drag-active"
                    );

                }
            );

        });


        [
            "dragleave",
            "drop"
        ].forEach(eventName => {

            dropZone.addEventListener(
                eventName,
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    dropZone.classList.remove(
                        "drag-active"
                    );

                }
            );

        });


        dropZone.addEventListener(
            "drop",
            event => {

                const files =
                    event.dataTransfer.files;

                if (
                    files &&
                    files.length > 0
                ) {

                    uploadFiles(files);

                }

            }
        );

    }


    /* =====================================================
       UPLOAD FILES
       ===================================================== */

    async function uploadFiles(files) {

        for (const file of files) {

            try {

                showNotification(
                    `Uploading ${file.name}...`
                );


                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );


                const response =
                    await fetch(
                        "/api/upload",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok || !result.success) {

                    throw new Error(
                        result.error ||
                        "Upload failed"
                    );

                }


                showNotification(
                    `${file.name} uploaded successfully`
                );


            } catch (error) {

                console.error(
                    "Upload error:",
                    error
                );


                showNotification(
                    `Upload failed: ${file.name}`
                );

            }

        }


        await loadFiles();

    }


    /* =====================================================
       LOAD FILES FROM AWS S3
       ===================================================== */

    async function loadFiles() {

        try {

            const response =
                await fetch(
                    "/api/files"
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.success
            ) {

                console.error(
                    "Unable to load files:",
                    result.error
                );

                return;

            }


            console.log(
                "CloudVault files:",
                result.files
            );


            /*
             * The backend is now connected.
             *
             * Once we confirm the exact structure returned
             * by your existing list_files.py, we'll render
             * the real S3 files into the dashboard table.
             */

        } catch (error) {

            console.error(
                "File loading error:",
                error
            );

        }

    }


    /* =====================================================
       DOWNLOAD FILE
       ===================================================== */

    async function downloadFile(
        fileName
    ) {

        try {

            showNotification(
                `Preparing ${fileName}...`
            );


            const response =
                await fetch(
                    "/api/download",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            file_name:
                                fileName,

                            download_path:
                                "/tmp"
                        })
                    }
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.success
            ) {

                throw new Error(
                    result.error ||
                    "Download failed"
                );

            }


            showNotification(
                `${fileName} downloaded successfully`
            );


        } catch (error) {

            console.error(
                "Download error:",
                error
            );


            showNotification(
                `Download failed: ${fileName}`
            );

        }

    }


    /* =====================================================
       DELETE FILE
       ===================================================== */

    async function deleteFile(
        fileName
    ) {

        const confirmed =
            confirm(
                `Delete "${fileName}" from CloudVault?`
            );


        if (!confirmed) {

            return;

        }


        try {

            showNotification(
                `Deleting ${fileName}...`
            );


            const response =
                await fetch(
                    "/api/delete",
                    {
                        method: "DELETE",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            file_name:
                                fileName
                        })
                    }
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.success
            ) {

                throw new Error(
                    result.error ||
                    "Delete failed"
                );

            }


            showNotification(
                `${fileName} deleted successfully`
            );


            await loadFiles();


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );


            showNotification(
                `Delete failed: ${fileName}`
            );

        }

    }


    /* =====================================================
       FILE ACTION BUTTONS
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".file-actions button"
                );


            if (!button) {

                return;

            }


            const row =
                button.closest(
                    ".file-row"
                );


            const fileName =
                row
                    ?.querySelector(
                        ".file-name strong"
                    )
                    ?.innerText;


            if (!fileName) {

                return;

            }


            const buttonText =
                button.innerText.trim();


            if (buttonText === "↓") {

                downloadFile(
                    fileName
                );

            } else {

                showNotification(
                    `Options for ${fileName}`
                );

            }

        }
    );


    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    notificationButton?.addEventListener(
        "click",
        () => {

            showNotification(
                "CloudVault is running normally."
            );

        }
    );


    /* =====================================================
       NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                navLinks.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       TOAST
       ===================================================== */

    function showNotification(
        message
    ) {

        const existing =
            document.querySelector(
                ".cloudvault-toast"
            );


        existing?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "cloudvault-toast";


        toast.innerHTML = `
            <span class="toast-icon">✓</span>
            <span>${message}</span>
        `;


        document.body.appendChild(
            toast
        );


        setTimeout(
            () => {

                toast.classList.add(
                    "toast-hide"
                );


                setTimeout(
                    () => {

                        toast.remove();

                    },
                    300
                );

            },
            2500
        );

    }


    /* =====================================================
       TOAST CSS
       ===================================================== */

    const toastStyle =
        document.createElement(
            "style"
        );


    toastStyle.innerHTML = `

        .cloudvault-toast {

            position: fixed;

            right: 25px;

            bottom: 25px;

            z-index: 9999;

            display: flex;

            align-items: center;

            gap: 10px;

            padding: 12px 16px;

            border-radius: 10px;

            background: #162238;

            border:
                1px solid
                rgba(96,165,250,0.25);

            color: #e2e8f0;

            font-size: 11px;

            box-shadow:
                0 15px 40px
                rgba(0,0,0,0.35);

            animation:
                cloudvaultToastIn
                0.25s ease;

        }


        .toast-icon {

            width: 22px;

            height: 22px;

            display: flex;

            align-items: center;

            justify-content: center;

            border-radius: 50%;

            background:
                rgba(34,197,94,0.12);

            color: #4ade80;

            font-size: 11px;

            font-weight: 700;

        }


        .toast-hide {

            opacity: 0;

            transform:
                translateY(10px);

            transition:
                0.3s ease;

        }


        @keyframes cloudvaultToastIn {

            from {

                opacity: 0;

                transform:
                    translateY(15px);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0);

            }

        }

    `;


    document.head.appendChild(
        toastStyle
    );

});
