document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });

        // Close menu when a link is clicked
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                navLinks.classList.remove('nav-active');
            }
        });
    }



    // --- Modal Functionality ---
    const modal = document.getElementById('contactModal');
    const contactBtns = [document.getElementById('contactBtn'), document.getElementById('footerContactBtn')];
    const closeBtn = document.querySelector('.close-btn');

    if (modal && closeBtn) {
        // Function to open modal
        const openModal = () => {
            modal.style.display = 'flex';
        };

        // Function to close modal
        const closeModal = () => {
            modal.style.display = 'none';
        };

        // Add event listeners to all contact buttons
        contactBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', openModal);
            }
        });

        // Event listener for close button
        closeBtn.addEventListener('click', closeModal);

        // Close modal if user clicks outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                closeModal();
            }
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const contactInfo = document.getElementById('contactInfo').value;
            const message = document.getElementById('message').value;

            if (!name || !contactInfo || !message) {
                alert('Please fill out all fields.');
                return;
            }

            const recipientEmail = 'contact@geminicars.com';
            const subject = `New Inquiry from ${name}`;
            const body = `Name: ${name}\nContact Info: ${contactInfo}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;

            if (modal) {
                modal.style.display = 'none';
            }
            this.reset();
        });
    }
    
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default for all but the footer contact button
            if (!this.id.includes('footerContactBtn')) {
                 e.preventDefault();
            }

            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Inventory Filtering ---
    const keywordSearch = document.getElementById('keywordSearch');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const inventoryItems = document.querySelectorAll('.inventory-item');

    function filterInventory() {
        const searchVal = keywordSearch.value.toLowerCase();
        const priceVal = parseInt(priceRange.value, 10);

        // Update price display
        if (priceValue) {
            priceValue.textContent = priceVal.toLocaleString();
        }

        inventoryItems.forEach(item => {
            const keywords = item.dataset.keywords.toLowerCase();
            const price = parseInt(item.dataset.price, 10);

            const keywordMatch = keywords.includes(searchVal);
            const priceMatch = price <= priceVal;

            if (keywordMatch && priceMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (keywordSearch && priceRange && inventoryItems) {
        keywordSearch.addEventListener('input', filterInventory);
        priceRange.addEventListener('input', filterInventory);
    }

});
