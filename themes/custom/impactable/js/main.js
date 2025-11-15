/**
 * @file
 * Main JavaScript file for Impactable theme.
 */

(function (Drupal) {
  'use strict';

  /**
   * Smooth scroll behavior for anchor links.
   */
  Drupal.behaviors.smoothScroll = {
    attach: function (context, settings) {
      const links = context.querySelectorAll('a[href^="#"]');
      
      links.forEach(link => {
        link.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href !== '#' && href !== '#main-content') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
    }
  };

  /**
   * Add animation on scroll for sections.
   */
  Drupal.behaviors.animateOnScroll = {
    attach: function (context, settings) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const sections = context.querySelectorAll('.card, .insight-card, .about-section, .interested-section');
      sections.forEach(section => {
        observer.observe(section);
      });
    }
  };

  /**
   * Mobile menu toggle.
   */
  Drupal.behaviors.mobileMenu = {
    attach: function (context, settings) {
      const menuToggle = context.querySelector('.menu-toggle');
      const mainMenu = context.querySelector('.main-menu');
      
      if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
          mainMenu.classList.toggle('active');
          this.classList.toggle('active');
        });
      }
    }
  };

  /**
   * Form validation for interested section.
   */
  Drupal.behaviors.formValidation = {
    attach: function (context, settings) {
      const form = context.querySelector('.interested-form');
      
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const select = this.querySelector('.form-select');
          const input = this.querySelector('.form-input');
          
          if (!select.value) {
            alert('Please select a service you are interested in.');
            return false;
          }
          
          if (!input.value || !input.value.includes('@')) {
            alert('Please enter a valid email address.');
            return false;
          }
          
          // If validation passes
          alert('Thank you for your interest! We will contact you soon.');
          this.reset();
        });
      }
    }
  };

})(Drupal);
