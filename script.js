// StackFinder - API Comparison Platform
class StackFinder {
    constructor() {
        this.nav = document.getElementById('nav');
        this.useCaseFilter = document.getElementById('useCaseFilter');
        this.inputFilter = document.getElementById('inputFilter');
        this.outputFilter = document.getElementById('outputFilter');
        this.pricingFilter = document.getElementById('pricingFilter');
        this.costFilter = document.getElementById('costFilter');
        this.sortFilter = document.getElementById('sortFilter');
        this.applyFiltersBtn = document.getElementById('applyFilters');
        this.clearFiltersBtn = document.getElementById('clearFilters');
        this.apiResults = document.getElementById('apiResults');
        this.resultsCount = document.getElementById('resultsCount');
        this.comparisonTable = document.getElementById('comparisonTable');

        this.currentFilters = {};
        this.filteredAPIs = [];

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupScrollNavigation();
        this.loadInitialResults();
        this.showWelcomeAnimation();
    }

    bindEvents() {
        // Filter events
        this.applyFiltersBtn.addEventListener('click', () => this.applyFilters());
        this.clearFiltersBtn.addEventListener('click', () => this.clearFilters());

        // Filter change events
        [this.useCaseFilter, this.inputFilter, this.outputFilter, this.pricingFilter, this.costFilter, this.sortFilter].forEach(filter => {
            filter.addEventListener('change', () => this.handleFilterChange());
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId + 'Section') || document.querySelector(`.${targetId}-section`);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupScrollNavigation() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    // Add/remove scrolled class based on scroll position
                    if (scrollY > 50) {
                        this.nav.classList.add('scrolled');
                    } else {
                        this.nav.classList.remove('scrolled');
                    }

                    // Update active navigation link based on scroll position
                    this.updateActiveNavLink();

                    ticking = false;
                });
            }
            ticking = true;
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    showWelcomeAnimation() {
        // Animate floating cards on load
        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
            });
        }, 500);

        // Animate stats
        setTimeout(() => {
            const stats = document.querySelectorAll('.stat');
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.transform = 'translateY(0)';
                    stat.style.opacity = '1';
                    this.animateNumber(stat);
                }, index * 100);
            });
        }, 1000);
    }

    animateNumber(statElement) {
        const numberElement = statElement.querySelector('.stat-number');
        const finalNumber = numberElement.textContent;

        // Remove non-numeric characters for animation
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        const suffix = finalNumber.replace(/[\d,]/g, '');

        let current = 0;
        const increment = numericValue / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                numberElement.textContent = finalNumber;
                clearInterval(timer);
            } else {
                numberElement.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 30);
    }

    handleFilterChange() {
        // Auto-apply filters when selection changes (with debounce)
        clearTimeout(this.filterTimeout);
        this.filterTimeout = setTimeout(() => {
            this.applyFilters();
        }, 300);
    }

    applyFilters() {
        this.currentFilters = {
            useCase: this.useCaseFilter.value,
            input: this.inputFilter.value,
            output: this.outputFilter.value,
            pricing: this.pricingFilter.value,
            cost: this.costFilter.value,
            sort: this.sortFilter.value
        };

        // Show loading state
        this.showLoadingState();

        // Simulate API call delay
        setTimeout(() => {
            this.filterAndSortAPIs();
            this.renderResults();
            this.hideLoadingState();
        }, 800);
    }

    clearFilters() {
        // Reset all filters
        [this.useCaseFilter, this.inputFilter, this.outputFilter, this.pricingFilter, this.costFilter, this.sortFilter].forEach(filter => {
            filter.value = '';
        });

        this.currentFilters = {};
        this.applyFilters();
    }

    filterAndSortAPIs() {
        let filtered = Object.values(apiDatabase);

        // Apply filters
        if (this.currentFilters.useCase) {
            filtered = filtered.filter(api => this.matchesUseCase(api, this.currentFilters.useCase));
        }

        if (this.currentFilters.input) {
            filtered = filtered.filter(api => this.matchesInput(api, this.currentFilters.input));
        }

        if (this.currentFilters.output) {
            filtered = filtered.filter(api => this.matchesOutput(api, this.currentFilters.output));
        }

        if (this.currentFilters.pricing) {
            filtered = filtered.filter(api => this.matchesPricing(api, this.currentFilters.pricing));
        }

        if (this.currentFilters.cost) {
            filtered = filtered.filter(api => this.matchesCost(api, this.currentFilters.cost));
        }

        // Apply sorting
        this.sortAPIs(filtered, this.currentFilters.sort);

        this.filteredAPIs = filtered;
    }

    matchesUseCase(api, useCase) {
        const useCaseMap = {
            'chatbot': ['chatbot', 'text-generation'],
            'text-generation': ['text-generation'],
            'image-generation': ['image-generation'],
            'speech-to-text': ['speech-to-text'],
            'text-to-speech': ['text-to-speech'],
            'code-generation': ['code-generation'],
            'multimodal': ['multimodal']
        };

        return useCaseMap[useCase]?.includes(api.category) || false;
    }

    matchesInput(api, input) {
        if (input === 'text') return api.features.some(f => f.toLowerCase().includes('text'));
        if (input === 'image') return api.features.some(f => f.toLowerCase().includes('vision') || f.toLowerCase().includes('image'));
        if (input === 'audio') return api.features.some(f => f.toLowerCase().includes('speech') || f.toLowerCase().includes('audio'));
        if (input === 'code') return api.features.some(f => f.toLowerCase().includes('code'));
        if (input === 'multimodal') return api.features.some(f => f.toLowerCase().includes('multi'));
        return true;
    }

    matchesOutput(api, output) {
        if (output === 'text') return api.category === 'text-generation' || api.category === 'code-generation';
        if (output === 'image') return api.category === 'image-generation';
        if (output === 'audio') return api.category === 'text-to-speech';
        if (output === 'code') return api.category === 'code-generation';
        if (output === 'json') return api.features.some(f => f.toLowerCase().includes('json') || f.toLowerCase().includes('structured'));
        return true;
    }

    matchesPricing(api, pricing) {
        if (pricing === 'free') return api.pricing && Object.values(api.pricing)[0].cost === 0;
        if (pricing === 'pay-per-use') return api.category !== 'code-generation';
        if (pricing === 'subscription') return api.category === 'code-generation';
        if (pricing === 'enterprise') return api.popularity > 80;
        return true;
    }

    matchesCost(api, cost) {
        const monthlyCost = this.calculateMonthlyCost(api);
        const costRanges = {
            '10': [0, 10],
            '50': [10, 50],
            '100': [50, 100],
            '500': [100, 500],
            '1000': [500, Infinity]
        };

        const range = costRanges[cost];
        if (range) {
            return monthlyCost >= range[0] && monthlyCost < range[1];
        }
        return true;
    }

    sortAPIs(apis, sortBy) {
        switch (sortBy) {
            case 'popularity':
                apis.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'cost-low':
                apis.sort((a, b) => this.calculateMonthlyCost(a) - this.calculateMonthlyCost(b));
                break;
            case 'cost-high':
                apis.sort((a, b) => this.calculateMonthlyCost(b) - this.calculateMonthlyCost(a));
                break;
            case 'reliability':
                apis.sort((a, b) => b.reliability - a.reliability);
                break;
            case 'features':
                apis.sort((a, b) => b.features.length - a.features.length);
                break;
            default:
                // Default sort by popularity
                apis.sort((a, b) => b.popularity - a.popularity);
        }
    }

    calculateMonthlyCost(api) {
        const usage = getUsageEstimate('chatbot'); // Default usage estimate
        return calculateMonthlyCost(Object.keys(apiDatabase).find(key =>
            apiDatabase[key].name === api.name
        ), usage);
    }

    renderResults() {
        this.apiResults.innerHTML = '';

        if (this.filteredAPIs.length === 0) {
            this.showNoResults();
            return;
        }

        this.updateResultsCount();

        this.filteredAPIs.forEach((api, index) => {
            setTimeout(() => {
                this.addAPITableRow(api);
            }, index * 50);
        });
    }

    addAPITableRow(api) {
        const row = document.createElement('tr');
        const monthlyCost = this.calculateMonthlyCost(api);
        const reliabilityWidth = `${api.reliability}%`;

        row.innerHTML = `
            <td>
                <div class="api-name">
                    <div class="api-icon">${api.icon}</div>
                    <div>
                        <div style="font-weight: 600; color: var(--gray-800);">${api.name}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">${api.provider}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="provider-badge" style="background: ${this.getProviderColor(api.provider)}">${api.provider}</span>
            </td>
            <td>
                <span class="category-badge">${this.formatCategory(api.category)}</span>
            </td>
            <td>
                <div class="cost-display">$${monthlyCost.toFixed(2)}</div>
                <div style="font-size: 0.75rem; color: var(--gray-500);">per month</div>
            </td>
            <td>
                <div class="features-list">
                    ${api.features.slice(0, 3).map(feature =>
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                    ${api.features.length > 3 ? `<span class="feature-tag">+${api.features.length - 3} more</span>` : ''}
                </div>
            </td>
            <td>
                <div class="reliability-bar">
                    <div class="reliability-fill" style="width: ${reliabilityWidth}; background: ${this.getReliabilityColor(api.reliability)};"></div>
                    <span style="font-size: 0.75rem; color: var(--gray-600);">${api.reliability}%</span>
                </div>
            </td>
            <td>
                <div class="popularity-display">
                    <i class="fas fa-star" style="color: #fbbf24;"></i>
                    <span>${api.popularity}%</span>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewAPIDetails('${api.name}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn select" onclick="selectAPI('${api.name}')" title="Select API">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            </td>
        `;

        this.apiResults.appendChild(row);
    }

    getProviderColor(provider) {
        const colors = {
            'OpenAI': 'linear-gradient(135deg, #412991, #7c3aed)',
            'Anthropic': 'linear-gradient(135deg, #ff6b35, #f7931e)',
            'Google': 'linear-gradient(135deg, #4285f4, #34a853)',
            'Midjourney': 'linear-gradient(135deg, #764abc, #9c27b0)',
            'ElevenLabs': 'linear-gradient(135deg, #ff6b35, #f7931e)',
            'GitHub': 'linear-gradient(135deg, #24292f, #6b7280)'
        };
        return colors[provider] || 'var(--primary-gradient)';
    }

    getReliabilityColor(reliability) {
        if (reliability >= 90) return 'var(--success-gradient)';
        if (reliability >= 75) return 'linear-gradient(135deg, #43e97b, #38f9d7)';
        return 'linear-gradient(135deg, #fa709a, #fee140)';
    }

    formatCategory(category) {
        const categories = {
            'text-generation': 'Text Gen',
            'image-generation': 'Image Gen',
            'speech-to-text': 'Speech-Text',
            'text-to-speech': 'Text-Speech',
            'code-generation': 'Code Gen',
            'multimodal': 'Multimodal'
        };
        return categories[category] || category;
    }

    updateResultsCount() {
        const count = this.filteredAPIs.length;
        const total = Object.keys(apiDatabase).length;
        this.resultsCount.textContent = `Showing ${count} of ${total} APIs`;
    }

    showLoadingState() {
        this.apiResults.innerHTML = `
            <tr>
                <td colspan="8" class="loading">
                    <div class="spinner"></div>
                    Finding the best APIs for you...
                </td>
            </tr>
        `;
    }

    hideLoadingState() {
        // Loading state is replaced by results
    }

    showNoResults() {
        this.apiResults.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: var(--gray-600);">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                    <div style="font-size: 1.125rem; margin-bottom: 0.5rem;">No APIs found matching your criteria</div>
                    <div style="font-size: 0.875rem;">Try adjusting your filters or clearing them to see all available APIs.</div>
                </td>
            </tr>
        `;
        this.resultsCount.textContent = 'No results found';
    }

    loadInitialResults() {
        // Load all APIs initially
        this.filteredAPIs = Object.values(apiDatabase);
        this.renderResults();
    }
}

// Global functions for API actions
function viewAPIDetails(apiName) {
    const api = Object.values(apiDatabase).find(a => a.name === apiName);
    if (api) {
        // Show detailed modal or navigate to details page
        showAPIModal(api);
    }
}

function selectAPI(apiName) {
    const api = Object.values(apiDatabase).find(a => a.name === apiName);
    if (api) {
        // Show selection confirmation
        showSelectionModal(api);
    }
}

function showAPIModal(api) {
    // Create and show API details modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${api.name}</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>${api.description}</p>
                <div class="modal-stats">
                    <div class="modal-stat">
                        <span class="modal-stat-label">Base URL:</span>
                        <span class="modal-stat-value">${api.baseUrl}</span>
                    </div>
                    <div class="modal-stat">
                        <span class="modal-stat-label">Category:</span>
                        <span class="modal-stat-value">${api.category}</span>
                    </div>
                    <div class="modal-stat">
                        <span class="modal-stat-label">Reliability:</span>
                        <span class="modal-stat-value">${api.reliability}%</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }

        .modal-content {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: var(--shadow-2xl);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--gray-200);
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray-500);
            padding: 0.5rem;
            border-radius: var(--radius-md);
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: var(--gray-100);
            color: var(--gray-700);
        }

        .modal-stats {
            display: grid;
            gap: 1rem;
            margin-top: 1.5rem;
        }

        .modal-stat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: var(--gray-50);
            border-radius: var(--radius-md);
        }

        .modal-stat-label {
            font-weight: 600;
            color: var(--gray-700);
        }

        .modal-stat-value {
            font-family: monospace;
            color: var(--primary-600);
        }
    `;
    document.head.appendChild(style);

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showSelectionModal(api) {
    // Simple confirmation for now
    if (confirm(`Great choice! 🎉\n\nYou've selected ${api.name} by ${api.provider}.\n\nWould you like to visit their documentation?`)) {
        // In a real app, this would redirect to the provider's docs
        window.open(`https://docs.example.com/${api.provider.toLowerCase()}`, '_blank');
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
    // Remove modal styles
    const style = document.querySelector('style[data-modal]');
    if (style) {
        style.remove();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StackFinder();
});

// Add smooth scrolling and animations
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
