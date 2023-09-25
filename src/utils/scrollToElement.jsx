export const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);

    if (element) {
        // Calculate the vertical position of the element
        const offsetTop = element.getBoundingClientRect().top + window.scrollY;

        // Scroll to the element's position
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth', // Add smooth scrolling for a smoother animation
        });
    }
}