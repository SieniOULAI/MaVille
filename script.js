// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingBar = document.querySelector('.loading-bar');

    let progress = 0;
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const loadingInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 200);
        }

        loadingPercentage.textContent = Math.round(progress) + '%';
        loadingBar.style.width = progress + '%';
    }, interval);
});

// Navigation avec animations améliorées
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');
const fab = document.getElementById('fab');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.id.replace('nav-', '');
        showSection(targetId);
    });
});

fab.addEventListener('click', () => {
    showSection('signalement');
    fab.classList.add('fab-pulse');
    setTimeout(() => fab.classList.remove('fab-pulse'), 2000);
});

function showSection(sectionId) {
    // Prevent multiple rapid clicks
    if (document.querySelector('.section-transitioning')) return;

    const currentSection = document.querySelector('.section.active');
    const targetSection = document.getElementById(sectionId);
    const targetNav = document.getElementById('nav-' + sectionId);

    if (!targetSection || targetSection === currentSection) return;

    // Add transitioning class to prevent multiple transitions
    targetSection.classList.add('section-transitioning');

    // Hide current section with animation
    if (currentSection) {
        currentSection.style.transform = 'translateX(-20px)';
        currentSection.style.opacity = '0';
        setTimeout(() => {
            currentSection.classList.add('hidden');
            currentSection.classList.remove('active');
        }, 150);
    }

    // Update navigation
    navItems.forEach(item => {
        item.classList.remove('active');
        item.classList.add('text-text-secondary', 'dark:text-gray-400');
        item.classList.remove('text-primary');
        const iconDiv = item.querySelector('div');
        iconDiv.classList.remove('bg-primary/10');
        iconDiv.style.transform = 'scale(1)';
    });

    if (targetNav) {
        targetNav.classList.add('active');
        targetNav.classList.remove('text-text-secondary', 'dark:text-gray-400');
        targetNav.classList.add('text-primary');
        const iconDiv = targetNav.querySelector('div');
        iconDiv.classList.add('bg-primary/10');
        iconDiv.style.transform = 'scale(1.1)';
    }

    // Show target section with animation
    setTimeout(() => {
        targetSection.classList.remove('hidden');
        targetSection.style.transform = 'translateX(20px)';
        targetSection.style.opacity = '0';

        // Force reflow
        targetSection.offsetHeight;

        targetSection.style.transform = 'translateX(0)';
        targetSection.style.opacity = '1';
        targetSection.classList.add('active');

        // Scroll to top smoothly
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Remove transitioning class after animation
        setTimeout(() => {
            targetSection.classList.remove('section-transitioning');
        }, 300);
    }, currentSection ? 150 : 0);
}

// PWA Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Theme toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const icon = themeToggle.querySelector('.material-symbols-outlined');
    icon.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});
document.body.appendChild(themeToggle);

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.querySelector('.material-symbols-outlined').textContent = 'light_mode';
}

// Géolocalisation pour signalement
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const locationInput = document.querySelector('#signalement-form input[type="text"]');
                if (locationInput) {
                    locationInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                    locationInput.placeholder = 'Coordonnées GPS obtenues';
                }
            },
            error => {
                console.error('Erreur de géolocalisation:', error);
                alert('Impossible d\'obtenir votre position. Veuillez entrer l\'adresse manuellement.');
            }
        );
    } else {
        alert('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
}

// Stockage local pour signalements
function saveSignalement(data) {
    const signalements = JSON.parse(localStorage.getItem('signalements') || '[]');
    signalements.push({ ...data, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('signalements', JSON.stringify(signalements));
    return signalements.length;
}

// Charger signalements sauvegardés
function loadSignalements() {
    return JSON.parse(localStorage.getItem('signalements') || '[]');
}

// Form handling avec améliorations
const signalementForm = document.getElementById('signalement-form');
if (signalementForm) {
    const locationBtn = document.createElement('button');
    locationBtn.type = 'button';
    locationBtn.className = 'w-full mt-2 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2';
    locationBtn.innerHTML = '<span class="material-symbols-outlined text-sm">location_on</span> Utiliser ma position actuelle';
    locationBtn.addEventListener('click', getLocation);
    signalementForm.querySelector('input[type="text"]').parentNode.appendChild(locationBtn);

    signalementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(signalementForm);
        const data = {
            type: formData.get('select'),
            description: formData.get('textarea'),
            lieu: formData.get('text'),
            photo: formData.get('file')?.name || null
        };

        const count = saveSignalement(data);
        alert(`Signalement #${count} envoyé avec succès !`);

        // Animation de succès
        const submitBtn = signalementForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<span class="loading"></span> Envoi...';
        setTimeout(() => {
            submitBtn.innerHTML = 'Envoyer le signalement';
            signalementForm.reset();
        }, 2000);
    });
}

// Sondages interactifs
function handleVote(pollId, option) {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    if (!votes[pollId]) votes[pollId] = {};
    votes[pollId][option] = (votes[pollId][option] || 0) + 1;
    localStorage.setItem('votes', JSON.stringify(votes));

    // Mettre à jour l'affichage
    updatePollResults(pollId);
    alert('Vote enregistré !');
}

function updatePollResults(pollId) {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    const pollVotes = votes[pollId] || {};
    const total = Object.values(pollVotes).reduce((a, b) => a + b, 0);

    // Simuler mise à jour des barres
    console.log(`Résultats pour ${pollId}:`, pollVotes, `Total: ${total}`);
}

// Ajouter événements aux boutons de vote
document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const option = btn.getAttribute('data-option');
        handleVote('poll1', option);
    });
});

// Notifications (si permis)
if ('Notification' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });
}

// Animations au scroll améliorées
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation for multiple cards
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.card-hover').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Swipe navigation (mobile)
let startX = 0;
let currentX = 0;
let isDragging = false;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

document.addEventListener('touchend', () => {
    if (!isDragging) return;
    const diff = startX - currentX;
    const threshold = 100;

    if (Math.abs(diff) > threshold) {
        const currentSection = document.querySelector('.section.active');
        const sectionsArray = Array.from(sections);
        const currentIndex = sectionsArray.indexOf(currentSection);

        if (diff > 0 && currentIndex < sectionsArray.length - 1) {
            // Swipe left - next section
            showSection(sectionsArray[currentIndex + 1].id);
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous section
            showSection(sectionsArray[currentIndex - 1].id);
        }
    }

    isDragging = false;
});

// === NOUVELLES FONCTIONNALITÉS ===

// Gestion des catégories dans la section Proximité
document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            categoryBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('bg-white', 'dark:bg-card-dark', 'border-slate-100', 'dark:border-slate-800');
                b.classList.remove('bg-primary', 'text-text-main');
            });

            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            btn.classList.remove('bg-white', 'dark:bg-card-dark', 'border-slate-100', 'dark:border-slate-800');
            btn.classList.add('bg-primary', 'text-text-main');

            const category = btn.getAttribute('data-category');

            // Filtrer les services
            serviceCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Gestion du formulaire de signalement amélioré
document.addEventListener('DOMContentLoaded', () => {
    const signalementForm = document.getElementById('signalement-form');
    if (signalementForm) {
        // Gestion des boutons de type de problème
        const problemTypeBtns = document.querySelectorAll('.problem-type-btn');
        const problemTypeInput = document.getElementById('problem-type');

        problemTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                problemTypeBtns.forEach(b => {
                    b.classList.remove('border-primary', 'bg-primary/5');
                    b.classList.add('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-card-dark');
                });

                // Ajouter la classe active au bouton cliqué
                btn.classList.add('border-primary', 'bg-primary/5');
                btn.classList.remove('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-card-dark');

                // Mettre à jour la valeur cachée
                problemTypeInput.value = btn.getAttribute('data-type');
            });
        });

        // Gestion des boutons d'urgence
        const urgencyBtns = document.querySelectorAll('.urgency-btn');
        const urgencyInput = document.getElementById('urgency-level');

        urgencyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                urgencyBtns.forEach(b => {
                    b.classList.remove('border-green-500', 'border-yellow-500', 'border-red-500', 'bg-green-500/10', 'bg-yellow-500/10', 'bg-red-500/10');
                    b.classList.add('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-card-dark');
                });

                // Ajouter la classe active au bouton cliqué
                const urgency = btn.getAttribute('data-urgency');
                btn.classList.add(`border-${urgency === 'high' ? 'red' : urgency === 'medium' ? 'yellow' : 'green'}-500`, `bg-${urgency === 'high' ? 'red' : urgency === 'medium' ? 'yellow' : 'green'}-500/10`);
                btn.classList.remove('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-card-dark');

                // Mettre à jour la valeur cachée
                urgencyInput.value = urgency;
            });
        });

        // Compteur de caractères pour la description
        const descriptionTextarea = document.getElementById('description');
        const charCount = document.getElementById('char-count');

        if (descriptionTextarea && charCount) {
            descriptionTextarea.addEventListener('input', () => {
                const count = descriptionTextarea.value.length;
                charCount.textContent = `${count}/500`;

                if (count > 450) {
                    charCount.classList.add('text-orange-500');
                    charCount.classList.remove('text-gray-500', 'dark:text-gray-400');
                } else if (count > 480) {
                    charCount.classList.add('text-red-500');
                    charCount.classList.remove('text-gray-500', 'dark:text-gray-400', 'text-orange-500');
                } else {
                    charCount.classList.add('text-gray-500', 'dark:text-gray-400');
                    charCount.classList.remove('text-orange-500', 'text-red-500');
                }
            });
        }

        // Gestion de la géolocalisation
        const getLocationBtn = document.getElementById('get-location-btn');
        const locationInput = document.getElementById('location');

        if (getLocationBtn && locationInput) {
            getLocationBtn.addEventListener('click', () => {
                if (navigator.geolocation) {
                    getLocationBtn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin">refresh</span> Recherche...';
                    getLocationBtn.disabled = true;

                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords;
                            locationInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                            getLocationBtn.innerHTML = '<span class="material-symbols-outlined text-sm">check_circle</span> Position trouvée';
                            setTimeout(() => {
                                getLocationBtn.innerHTML = '<span class="material-symbols-outlined text-sm">my_location</span> Ma position';
                                getLocationBtn.disabled = false;
                            }, 2000);
                        },
                        error => {
                            console.error('Erreur de géolocalisation:', error);
                            getLocationBtn.innerHTML = '<span class="material-symbols-outlined text-sm">error</span> Erreur';
                            setTimeout(() => {
                                getLocationBtn.innerHTML = '<span class="material-symbols-outlined text-sm">my_location</span> Ma position';
                                getLocationBtn.disabled = false;
                            }, 2000);
                        },
                        { enableHighAccuracy: true, timeout: 10000 }
                    );
                } else {
                    alert('La géolocalisation n\'est pas supportée par ce navigateur.');
                }
            });
        }

        // Gestion de l'upload de photo
        const photoInput = document.getElementById('photo');
        const photoPreview = document.getElementById('photo-preview');
        const previewImg = document.getElementById('preview-img');
        const removePhotoBtn = document.getElementById('remove-photo');

        if (photoInput && photoPreview && previewImg && removePhotoBtn) {
            photoInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        previewImg.src = e.target.result;
                        photoPreview.classList.remove('hidden');
                    };
                    reader.readAsDataURL(file);
                }
            });

            removePhotoBtn.addEventListener('click', () => {
                photoInput.value = '';
                photoPreview.classList.add('hidden');
            });
        }

        // Validation et soumission du formulaire
        signalementForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const successMessage = document.getElementById('success-message');

            // Validation
            const problemType = problemTypeInput.value;
            const description = descriptionTextarea.value.trim();
            const location = locationInput.value.trim();

            if (!problemType) {
                alert('Veuillez sélectionner un type de problème.');
                return;
            }

            if (description.length < 20) {
                alert('La description doit contenir au moins 20 caractères.');
                return;
            }

            if (!location) {
                alert('Veuillez indiquer la localisation.');
                return;
            }

            // Désactiver le bouton et afficher le chargement
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin" style="font-size: 20px;">refresh</span> Envoi en cours...';

            // Simuler l'envoi (remplacer par un vrai appel API)
            setTimeout(() => {
                // Sauvegarder le signalement
                const formData = new FormData(signalementForm);
                const signalementData = {
                    type: problemType,
                    description: description,
                    location: location,
                    urgency: document.getElementById('urgency-level').value,
                    photo: photoInput.files[0]?.name || null,
                    timestamp: new Date().toISOString(),
                    id: 'SIG-' + Date.now()
                };

                saveSignalement(signalementData);

                // Afficher le message de succès
                successMessage.classList.remove('hidden');
                submitBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 20px;">check_circle</span> Envoyé !';

                // Reset du formulaire après un délai
                setTimeout(() => {
                    signalementForm.reset();
                    successMessage.classList.add('hidden');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 20px;">send</span> <span>Envoyer le signalement</span>';

                    // Reset des styles des boutons
                    problemTypeBtns.forEach(btn => {
                        btn.classList.remove('border-primary', 'bg-primary/5');
                        btn.classList.add('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-card-dark');
                    });
                    urgencyBtns.forEach(btn => {
                        btn.classList.remove('border-green-500', 'border-yellow-500', 'border-red-500', 'bg-green-500/10', 'bg-yellow-500/10', 'bg-red-500/10');
                        btn.classList.add('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-card-dark');
                    });
                    photoPreview.classList.add('hidden');
                    problemTypeInput.value = '';
                    document.getElementById('urgency-level').value = 'medium';
                    if (charCount) charCount.textContent = '0/500';
                }, 3000);
            }, 2000);
        });
    }
});