/* =========================================================
   CLOUDVAULT — DASHBOARD JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

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

                const fileRows =
                    document.querySelectorAll(
                        ".file-row:not(.table-header)"
                    );

                fileRows.forEach(row => {

                    const fileName =
                        row
                            .querySelector(".file-name")
                            ?.innerText
                            .toLowerCase() || "";

                    if (
                        fileName.includes(searchTerm)
                    ) {

                        row.style.display =
                            "grid";

                    } else {

                        row.style.display =
                            "none";

                    }

                });

            }
        );

    }


    /* =====================================================
       KEYBOARD SEARCH SHORTCUT
       Press "/" to focus search
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement.tagName !== "INPUT"
            ) {

                event.preventDefault();

                if (searchInput) {

                    searchInput.focus();

                }

            }

        }
    );


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
       CHOOSE FILES BUTTON
       ===================================================== */

    if (chooseButton) {

        chooseButton.addEventListener(
            "click",
            () => {

                fileInput.click();

            }
        );

    }


    /* =====================================================
       UPLOAD BUTTON
       ===================================================== */

    if (uploadButton) {

        uploadButton.addEventListener(
            "click",
            () => {

                fileInput.click();

            }
        );

    }


    /* =====================================================
       FILE SELECTION
       ===================================================== */

    fileInput.addEventListener(
        "change",
        () => {

            if (
                fileInput.files &&
                fileInput.files.length > 0
            ) {

                handleFiles(
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

                    handleFiles(files);

                }

            }
        );

    }


    /* =====================================================
       HANDLE SELECTED FILES
       ===================================================== */

    function handleFiles(files) {

        console.log(
            "Selected files:"
        );

        Array.from(files).forEach(
            file => {

                console.log(
                    file.name,
                    file.size,
                    file.type
                );

            }
        );


        showNotification(
            `${files.length} file(s) selected`
        );

    }


    /* =====================================================
       NOTIFICATION BUTTON
       ===================================================== */

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                showNotification(
                    "CloudVault is running normally."
                );

            }
        );

    }


    /* =====================================================
       FILE ACTION BUTTONS
       ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            ".file-actions button"
        );


    actionButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

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


                    if (
                        buttonText === "↓"
                    ) {

                        showNotification(
                            `Download requested: ${fileName}`
                        );

                    } else {

                        showNotification(
                            `More options for ${fileName}`
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       VIEW ALL
       ===================================================== */

    const viewAll =
        document.querySelector(
            ".view-all"
        );


    if (viewAll) {

        viewAll.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showNotification(
                    "Opening all files..."
                );

            }
        );

    }


    /* =====================================================
       SIDEBAR NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(
        link => {

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

        }
    );


    /* =====================================================
       SIMPLE NOTIFICATION
       ===================================================== */

    function showNotification(message) {

        const existing =
            document.querySelector(
                ".cloudvault-toast"
            );


        if (existing) {

            existing.remove();

        }


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
       TOAST STYLING
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

            border: 1px solid rgba(96,165,250,0.25);

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
