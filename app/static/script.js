/* =========================================================
   CLOUDVAULT
   Dashboard Frontend
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


    /* =====================================================
       FILE INPUT
       ===================================================== */

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

    searchInput?.addEventListener(
        "input",
        () => {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();

            const rows =
                document.querySelectorAll(
                    "#fileList .file-row"
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
       UPLOAD
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


                if (
                    !response.ok ||
                    !result.success
                ) {

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
       LOAD FILES
       ===================================================== */

    async function loadFiles() {

        const fileList =
            document.getElementById(
                "fileList"
            );


        if (!fileList) {

            return;

        }


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

                throw new Error(
                    result.error ||
                    "Unable to load files"
                );

            }


            const files =
                result.files || [];


            updateStatistics(
                files
            );


            renderFiles(
                files
            );


        } catch (error) {

            console.error(
                "File loading error:",
                error
            );


            fileList.innerHTML = `

                <div class="file-row">

                    <span
                        style="
                            grid-column: 1 / -1;
                        "
                    >

                        ❌ Unable to load files from S3.

                    </span>

                </div>

            `;

        }

    }


    /* =====================================================
       UPDATE DASHBOARD STATISTICS
       ===================================================== */

    function updateStatistics(files) {

        const totalFiles =
            files.length;


        let totalBytes = 0;


        let documentsBytes = 0;

        let imagesBytes = 0;

        let archivesBytes = 0;

        let otherBytes = 0;


        files.forEach(file => {

            const size =
                Number(file.size) || 0;


            totalBytes += size;


            const extension =
                getExtension(
                    file.name
                );


            if (
                [
                    "pdf",
                    "doc",
                    "docx",
                    "txt",
                    "xls",
                    "xlsx",
                    "ppt",
                    "pptx",
                    "csv"
                ].includes(extension)
            ) {

                documentsBytes += size;

            }

            else if (
                [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                    "svg"
                ].includes(extension)
            ) {

                imagesBytes += size;

            }

            else if (
                [
                    "zip",
                    "rar",
                    "7z",
                    "tar",
                    "gz"
                ].includes(extension)
            ) {

                archivesBytes += size;

            }

            else {

                otherBytes += size;

            }

        });


        /* =================================================
           TOTAL FILES
           ================================================= */

        setText(
            "totalFiles",
            totalFiles
        );


        /* =================================================
           STORAGE USED
           ================================================= */

        setText(
            "storageUsed",
            formatFileSize(
                totalBytes
            )
        );


        /* =================================================
           RECENT FILES
           ================================================= */

        const recentCount =
            Math.min(
                totalFiles,
                5
            );


        setText(
            "recentFiles",
            recentCount
        );


        /* =================================================
           STORAGE LIMIT
           ================================================= */

        const storageLimit =
            10 * 1024 * 1024 * 1024;


        const percentage =
            Math.min(
                100,
                (
                    totalBytes /
                    storageLimit
                ) * 100
            );


        setText(
            "storagePercentage",
            `${percentage.toFixed(1)}%`
        );


        /* =================================================
           STORAGE BREAKDOWN
           ================================================= */

        setText(
            "documentsSize",
            formatFileSize(
                documentsBytes
            )
        );


        setText(
            "imagesSize",
            formatFileSize(
                imagesBytes
            )
        );


        setText(
            "archivesSize",
            formatFileSize(
                archivesBytes
            )
        );


        setText(
            "otherSize",
            formatFileSize(
                otherBytes
            )
        );


        /* =================================================
           SIDEBAR STORAGE
           ================================================= */

        const sidebarPercent =
            document.querySelector(
                ".storage-percent"
            );


        const sidebarUsed =
            document.querySelector(
                ".storage-details span"
            );


        if (sidebarPercent) {

            sidebarPercent.textContent =
                `${percentage.toFixed(0)}%`;

        }


        if (sidebarUsed) {

            sidebarUsed.textContent =
                `${formatFileSize(totalBytes)} used`;

        }


        /* =================================================
           PROGRESS BAR
           ================================================= */

        const progressBar =
            document.querySelector(
                ".storage-progress-bar"
            );


        if (progressBar) {

            progressBar.style.width =
                `${percentage}%`;

        }

    }


    /* =====================================================
       RENDER FILES
       ===================================================== */

    function renderFiles(files) {

        const fileList =
            document.getElementById(
                "fileList"
            );


        if (!fileList) {

            return;

        }


        fileList.innerHTML = "";


        if (files.length === 0) {

            fileList.innerHTML = `

                <div class="file-row">

                    <span
                        style="
                            grid-column: 1 / -1;
                        "
                    >

                        ☁️ Your CloudVault bucket is empty.

                    </span>

                </div>

            `;

            return;

        }


        /* =================================================
           SORT BY LAST MODIFIED
           ================================================= */

        const sortedFiles =
            [...files].sort(
                (a, b) => {

                    return (
                        new Date(
                            b.last_modified
                        ) -
                        new Date(
                            a.last_modified
                        )
                    );

                }
            );


        /* =================================================
           SHOW RECENT FILES
           ================================================= */

        const recentFiles =
            sortedFiles.slice(
                0,
                10
            );


        recentFiles.forEach(
            file => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "file-row";


                const icon =
                    getFileIcon(
                        file.name
                    );


                row.innerHTML = `

                    <div class="file-name">

                        <div
                            class="file-icon ${icon.className}"
                        >
                            ${icon.text}
                        </div>


                        <div>

                            <strong>
                                ${escapeHtml(
                                    file.name
                                )}
                            </strong>

                            <small>
                                S3 Object
                            </small>

                        </div>

                    </div>


                    <span>
                        ${formatFileSize(
                            file.size
                        )}
                    </span>


                    <span>
                        ${formatDate(
                            file.last_modified
                        )}
                    </span>


                    <span
                        class="status success"
                    >
                        ● Stored
                    </span>


                    <div class="file-actions">

                        <button
                            type="button"
                            title="Download"
                        >
                            ↓
                        </button>


                        <button
                            type="button"
                            title="Delete"
                        >
                            ×
                        </button>

                    </div>

                `;


                fileList.appendChild(
                    row
                );

            }
        );

    }


    /* =====================================================
       DOWNLOAD
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
                                `/tmp/${fileName}`

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
       DELETE
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
       ACTION BUTTONS
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


            if (
                button.title ===
                "Download"
            ) {

                downloadFile(
                    fileName
                );

            }


            else if (
                button.title ===
                "Delete"
            ) {

                deleteFile(
                    fileName
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
       UTILITY FUNCTIONS
       ===================================================== */

    function setText(
        elementId,
        value
    ) {

        const element =
            document.getElementById(
                elementId
            );


        if (element) {

            element.textContent =
                value;

        }

    }


    function formatFileSize(
        bytes
    ) {

        if (
            !bytes ||
            bytes <= 0
        ) {

            return "0 B";

        }


        const units = [
            "B",
            "KB",
            "MB",
            "GB",
            "TB"
        ];


        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        const safeIndex =
            Math.min(
                index,
                units.length - 1
            );


        return (
            parseFloat(
                (
                    bytes /
                    Math.pow(
                        1024,
                        safeIndex
                    )
                ).toFixed(1)
            ) +
            " " +
            units[safeIndex]
        );

    }


    function formatDate(
        dateString
    ) {

        if (!dateString) {

            return "Unknown";

        }


        const date =
            new Date(
                dateString
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "Unknown";

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function getExtension(
        fileName
    ) {

        return (
            fileName
                .split(".")
                .pop()
                .toLowerCase()
        );

    }


    function getFileIcon(
        fileName
    ) {

        const extension =
            getExtension(
                fileName
            );


        if (
            extension === "pdf"
        ) {

            return {
                className: "pdf",
                text: "PDF"
            };

        }


        if (
            [
                "py",
                "js",
                "json",
                "html",
                "css",
                "java",
                "sh"
            ].includes(extension)
        ) {

            return {
                className: "python",
                text: "CODE"
            };

        }


        if (
            [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "webp",
                "svg"
            ].includes(extension)
        ) {

            return {
                className: "image",
                text: "IMG"
            };

        }


        if (
            [
                "zip",
                "rar",
                "7z",
                "tar",
                "gz"
            ].includes(extension)
        ) {

            return {
                className: "archive",
                text: "ZIP"
            };

        }


        if (
            [
                "doc",
                "docx",
                "txt",
                "xls",
                "xlsx",
                "ppt",
                "pptx"
            ].includes(extension)
        ) {

            return {
                className: "blue-icon",
                text: "DOC"
            };

        }


        return {
            className: "blue-icon",
            text: "FILE"
        };

    }


    function escapeHtml(
        value
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            value;


        return div.innerHTML;

    }


    /* =====================================================
       TOAST NOTIFICATION
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

            <span class="toast-icon">
                ✓
            </span>

            <span>
                ${escapeHtml(message)}
            </span>

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
       TOAST STYLES
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
