/* =====================================================
   MEWAN ROYALE HOTEL
   JavaScript interactions
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });


    // Close mobile menu after clicking a link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuBtn.textContent = "☰";

        });

    });


    /* =================================================
       ROOM FILTER
    ================================================= */

    const filters = document.querySelectorAll(".filter");
    const rooms = document.querySelectorAll(".room-card");

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(btn => {
                btn.classList.remove("active");
            });

            filter.classList.add("active");

            const selected = filter.dataset.filter;

            rooms.forEach(room => {

                const category = room.dataset.category;

                if (
                    selected === "all" ||
                    category === selected
                ) {

                    room.style.display = "block";

                } else {

                    room.style.display = "none";

                }

            });

        });

    });


    /* =================================================
       ROOM DETAILS MODAL
    ================================================= */

    const modal = document.getElementById("roomModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const closeModal =
        document.getElementById("closeModal");

    const modalBook =
        document.getElementById("modalBook");


    const roomDescriptions = {

        "Classic King":
            "A refined king room designed for restful stays. Enjoy a premium king bed, elegant furnishings, modern bathroom facilities and beautiful city-facing views.",

        "Deluxe Garden":
            "A spacious retreat overlooking our landscaped gardens. The room features a king bed, private seating area, premium amenities and a peaceful atmosphere.",

        "Royal Executive Suite":
            "Our signature suite offers a separate lounge, luxurious king bedroom, premium finishes and a private balcony designed for an unforgettable stay."

    };


    document.querySelectorAll(".details-btn").forEach(button => {

        button.addEventListener("click", () => {

            const roomName = button.dataset.room;

            modalTitle.textContent = roomName;

            modalDescription.textContent =
                roomDescriptions[roomName];

            modal.classList.add("show");

        });

    });


    closeModal.addEventListener("click", () => {

        modal.classList.remove("show");

    });


    modal.addEventListener("click", event => {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    });


    modalBook.addEventListener("click", () => {

        modal.classList.remove("show");

        document
            .getElementById("booking")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* =================================================
       GALLERY FILTER
    ================================================= */

    const galleryFilters =
        document.querySelectorAll(".gallery-filter");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    galleryFilters.forEach(filter => {

        filter.addEventListener("click", () => {

            galleryFilters.forEach(button => {
                button.classList.remove("active");
            });

            filter.classList.add("active");

            const selected =
                filter.dataset.type;


            galleryItems.forEach(item => {

                if (
                    selected === "all" ||
                    item.dataset.type === selected
                ) {

                    item.style.display = "block";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    /* =================================================
       GALLERY LIGHTBOX
    ================================================= */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeLightbox =
        document.getElementById("closeLightbox");

    const previousImage =
        document.getElementById("previousImage");

    const nextImage =
        document.getElementById("nextImage");


    let currentImage = 0;

    let visibleImages = [];


    function updateVisibleImages() {

        visibleImages =
            Array.from(galleryItems)
                .filter(item => {

                    return item.style.display !== "none";

                });

    }


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            updateVisibleImages();

            currentImage =
                visibleImages.indexOf(item);

            showImage();

            lightbox.classList.add("show");

        });

    });


    function showImage() {

        const item =
            visibleImages[currentImage];

        if (!item) return;

        const image =
            item.querySelector("img");

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

    }


    nextImage.addEventListener("click", () => {

        if (visibleImages.length === 0) return;

        currentImage++;

        if (
            currentImage >=
            visibleImages.length
        ) {

            currentImage = 0;

        }

        showImage();

    });


    previousImage.addEventListener("click", () => {

        if (visibleImages.length === 0) return;

        currentImage--;

        if (currentImage < 0) {

            currentImage =
                visibleImages.length - 1;

        }

        showImage();

    });


    closeLightbox.addEventListener("click", () => {

        lightbox.classList.remove("show");

    });


    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            lightbox.classList.remove("show");

        }

    });


    /* =================================================
       TESTIMONIAL SLIDER
    ================================================= */

    const testimonials =
        document.querySelectorAll(".testimonial");

    const previousTestimonial =
        document.getElementById(
            "prevTestimonial"
        );

    const nextTestimonial =
        document.getElementById(
            "nextTestimonial"
        );

    const testimonialNumber =
        document.getElementById(
            "testimonialNumber"
        );


    let testimonialIndex = 0;


    function showTestimonial(index) {

        testimonials.forEach(item => {

            item.classList.remove("active");

        });


        testimonials[index]
            .classList.add("active");


        testimonialNumber.textContent =
            `0${index + 1} / 0${testimonials.length}`;

    }


    nextTestimonial.addEventListener("click", () => {

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonials.length
        ) {

            testimonialIndex = 0;

        }

        showTestimonial(testimonialIndex);

    });


    previousTestimonial.addEventListener("click", () => {

        testimonialIndex--;

        if (testimonialIndex < 0) {

            testimonialIndex =
                testimonials.length - 1;

        }

        showTestimonial(testimonialIndex);

    });


    /* =================================================
       BOOKING FORM
    ================================================= */

    const bookingForm =
        document.getElementById("bookingForm");

    const checkIn =
        document.getElementById("checkIn");

    const checkOut =
        document.getElementById("checkOut");

    const formMessage =
        document.getElementById("formMessage");


    // Prevent selecting dates in the past

    const today =
        new Date().toISOString().split("T")[0];

    checkIn.min = today;

    checkOut.min = today;


    checkIn.addEventListener("change", () => {

        checkOut.min = checkIn.value;

        if (
            checkOut.value &&
            checkOut.value <= checkIn.value
        ) {

            checkOut.value = "";

        }

    });


    bookingForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const guests =
            document.getElementById("guests").value;

        const room =
            document.getElementById("roomType").value;


        formMessage.className = "";


        // Required fields

        if (
            !name ||
            !email ||
            !phone ||
            !guests ||
            !checkIn.value ||
            !checkOut.value ||
            !room
        ) {

            formMessage.textContent =
                "Please complete all required fields.";

            formMessage.classList.add("error");

            return;

        }


        // Email validation

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.classList.add("error");

            return;

        }


        // Date validation

        if (
            checkOut.value <=
            checkIn.value
        ) {

            formMessage.textContent =
                "Check-out must be after check-in.";

            formMessage.classList.add("error");

            return;

        }


        // Success

        formMessage.textContent =
            `Thank you, ${name}! Your reservation request has been received. This demo does not process real payments or bookings.`;

        formMessage.classList.add("success");


        bookingForm.reset();

        checkIn.min = today;

        checkOut.min = today;

    });


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backTop =
        document.getElementById("backTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });


    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            modal.classList.remove("show");

            lightbox.classList.remove("show");

        }

    });


    /* =================================================
       FOOTER YEAR
    ================================================= */

    document.getElementById("year")
        .textContent =
        new Date().getFullYear();

});