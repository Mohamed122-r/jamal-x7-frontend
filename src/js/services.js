// Services Management

const SERVICES_DATA = [
    {
        id: 'logo-design',
        name: 'تصميم الشعار',
        icon: 'fa-palette',
        description: 'شعار احترافي يعكس هوية علامتك التجارية',
        features: [
            'تصميم 3 مقترحات مختلفة',
            'تسليم بصيغ متعددة (PNG, SVG, AI)',
            'ملفات مصدرية قابلة للتعديل',
            'دليل استخدام الهوية البصرية',
            'حقوق الملكية الكاملة'
        ],
        price: '500+ ريال',
        duration: '3-5 أيام',
        examples: ['/assets/images/services/logo-1.jpg', '/assets/images/services/logo-2.jpg'],
        category: 'design'
    },
    {
        id: 'website-design',
        name: 'تصميم وبناء المواقع',
        icon: 'fa-globe',
        description: 'مواقع سريعة ومتجاوبة مع جميع الأجهزة',
        features: [
            'تصميم واجهة احترافية',
            'تطوير باستخدام أحدث التقنيات',
            'تحسين محركات البحث (SEO)',
            'شهادة SSL مجانية',
            'دعم فني لمدة 3 أشهر'
        ],
        price: '1500+ ريال',
        duration: '10-15 يوم',
        examples: ['/assets/images/services/web-1.jpg', '/assets/images/services/web-2.jpg'],
        category: 'web'
    },
    {
        id: 'video-editing',
        name: 'تصميم وتحرير الفيديو',
        icon: 'fa-video',
        description: 'مقاطع فيديو احترافية تجذب جمهورك',
        features: [
            'مونتاج فيديو احترافي',
            'إضافة مؤثرات وحركات',
            'تحسين الصوت والإضاءة',
            'تصميم جرافيك متحرك',
            'تسليم بصيغ متعددة'
        ],
        price: '800+ ريال',
        duration: '5-7 أيام',
        examples: ['/assets/images/services/video-1.jpg', '/assets/images/services/video-2.jpg'],
        category: 'video'
    },
    {
        id: 'programming',
        name: 'البرمجة والتطوير',
        icon: 'fa-code',
        description: 'حلول برمجية مخصصة لاحتياجاتك',
        features: [
            'تطبيقات ويب متقدمة',
            'أنظمة إدارة محتوى مخصصة',
            'تطبيقات جوال',
            'تكامل مع خدمات الطرف الثالث',
            'تسليم كود مصدري'
        ],
        price: '2000+ ريال',
        duration: '15-30 يوم',
        examples: ['/assets/images/services/dev-1.jpg', '/assets/images/services/dev-2.jpg'],
        category: 'development'
    },
    {
        id: 'content-writing',
        name: 'كتابة وترجمة المحتوى',
        icon: 'fa-pen-fancy',
        description: 'محتوى جذاب يعبر عن رسالتك',
        features: [
            'كتابة محتوى تسويقي',
            'ترجمة احترافية',
            'تحسين محركات البحث',
            'إعداد استراتيجية محتوى',
            'مراجعة وتدقيق لغوي'
        ],
        price: '400+ ريال',
        duration: '2-4 أيام',
        examples: ['/assets/images/services/content-1.jpg', '/assets/images/services/content-2.jpg'],
        category: 'content'
    },
    {
        id: 'voice-over',
        name: 'الصوتيات والتعليق الصوتي',
        icon: 'fa-microphone',
        description: 'تعليق صوتي واضح واحترافي',
        features: [
            'تسجيل صوت احترافي',
            'تعليق صوتي باللهجة المطلوبة',
            'معالجة وتنقية الصوت',
            'إضافة مؤثرات صوتية',
            'تسليم بصيغ متعددة'
        ],
        price: '300+ ريال',
        duration: '1-2 يوم',
        examples: ['/assets/images/services/audio-1.jpg', '/assets/images/services/audio-2.jpg'],
        category: 'audio'
    },
    {
        id: 'digital-marketing',
        name: 'التسويق الرقمي',
        icon: 'fa-chart-line',
        description: 'استراتيجيات تسويقية فعالة',
        features: [
            'إدارة حملات إعلانية',
            'تحليل أداء المنافسين',
            'تحسين معدل التحويل',
            'إعداد تقارير شهرية',
            'استشارات تسويقية'
        ],
        price: '1000+ ريال',
        duration: 'مستمر',
        examples: ['/assets/images/services/marketing-1.jpg', '/assets/images/services/marketing-2.jpg'],
        category: 'marketing'
    },
    {
        id: 'custom-service',
        name: 'خدمات خاصة حسب الطلب',
        icon: 'fa-cogs',
        description: 'حلول مصممة خصيصاً لمشروعك',
        features: [
            'تحليل احتياجات المشروع',
            'اقتراح حلول مخصصة',
            'تطوير حسب المتطلبات',
            'اختبار وتجربة',
            'تدريب ودعم'
        ],
        price: 'تختلف حسب المشروع',
        duration: 'تختلف حسب المشروع',
        examples: ['/assets/images/services/custom-1.jpg', '/assets/images/services/custom-2.jpg'],
        category: 'custom'
    }
];

class ServicesManager {
    constructor() {
        this.services = SERVICES_DATA;
        this.filteredServices = [...this.services];
        this.currentFilter = 'all';
    }

    init() {
        this.renderServices();
        this.setupServiceFilters();
        this.setupServiceModals();
    }

    renderServices() {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;

        grid.innerHTML = '';

        this.filteredServices.forEach(service => {
            const card = this.createServiceCard(service);
            grid.appendChild(card);
        });
    }

    createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service-card scroll-animate';
        card.dataset.serviceId = service.id;
        card.dataset.category = service.category;

        card.innerHTML = `
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.name}</h3>
            <p class="service-description">${service.description}</p>
            
            <ul class="service-features">
                ${service.features.slice(0, 3).map(feature => `
                    <li>
                        <i class="fas fa-check-circle"></i>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
            
            <div class="service-price">
                <div>
                    <div class="price-tag">${service.price}</div>
                    <small>${service.duration}</small>
                </div>
                <button class="btn btn-primary btn-service-details" data-service="${service.id}">
                    <i class="fas fa-info-circle"></i>
                    التفاصيل
                </button>
            </div>
        `;

        return card;
    }

    setupServiceFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter services
                const filter = button.dataset.filter;
                this.filterServices(filter);
            });
        });
    }

    filterServices(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredServices = [...this.services];
        } else {
            this.filteredServices = this.services.filter(service => 
                service.category === filter
            );
        }
        
        this.renderServices();
    }

    setupServiceModals() {
        // Event delegation for service detail buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-service-details')) {
                const button = e.target.closest('.btn-service-details');
                const serviceId = button.dataset.service;
                this.openServiceModal(serviceId);
            }
        });
    }

    openServiceModal(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        if (!service) return;

        const modal = this.createServiceModal(service);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    createServiceModal(service) {
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${service.name}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="service-info">
                        <div class="service-icon-large">
                            <i class="fas ${service.icon}"></i>
                        </div>
                        
                        <div class="service-details">
                            <p class="service-description">${service.description}</p>
                            
                            <div class="service-meta">
                                <div class="meta-item">
                                    <i class="fas fa-clock"></i>
                                    <span>${service.duration}</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-tag"></i>
                                    <span>${service.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-features-full">
                        <h3>مميزات الخدمة</h3>
                        <ul>
                            ${service.features.map(feature => `
                                <li>
                                    <i class="fas fa-check"></i>
                                    ${feature}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="service-examples">
                        <h3>نماذج من الأعمال</h3>
                        <div class="examples-grid">
                            ${service.examples.map(example => `
                                <div class="example-item">
                                    <img src="${example}" alt="مثال ${service.name}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="service-process">
                        <h3>خطوات العمل</h3>
                        <div class="process-steps">
                            <div class="step">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h4>التواصل والمشورة</h4>
                                    <p>نناقش معك متطلبات المشروع</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h4>التخطيط والتصميم</h4>
                                    <p>نضع خطة العمل ونصمم المقترحات</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h4>التطوير والتنفيذ</h4>
                                    <p>ننفذ المشروع وفق المواصفات</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <h4>التسليم والدعم</h4>
                                    <p>نسلم المشروع وندعمك بعد التسليم</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <a href="#contact" class="btn btn-primary btn-lg">
                        <i class="fas fa-shopping-cart"></i>
                        اطلب هذه الخدمة
                    </a>
                    <button class="btn btn-outline btn-lg btn-close-modal">
                        إغلاق
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.modal-backdrop').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('.btn-close-modal').addEventListener('click', () => this.closeModal(modal));

        // Add styles
        this.addModalStyles();

        return modal;
    }

    addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .service-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: none;
            }
            
            .service-modal.show {
                display: block;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(4px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--surface-color);
                border-radius: var(--border-radius-lg);
                width: 90%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid var(--border-color);
                box-shadow: var(--shadow-lg);
            }
            
            .modal-header {
                padding: 24px 30px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 1.8rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition);
            }
            
            .modal-close:hover {
                background: var(--light-surface);
                color: var(--text-primary);
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .service-info {
                display: flex;
                gap: 30px;
                margin-bottom: 30px;
                align-items: flex-start;
            }
            
            .service-icon-large {
                width: 80px;
                height: 80px;
                background: rgba(59, 130, 246, 0.1);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary-color);
                font-size: 2rem;
                flex-shrink: 0;
            }
            
            .service-details {
                flex: 1;
            }
            
            .service-meta {
                display: flex;
                gap: 30px;
                margin-top: 16px;
            }
            
            .meta-item {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--text-secondary);
            }
            
            .meta-item i {
                color: var(--primary-color);
            }
            
            .service-features-full h3,
            .service-examples h3,
            .service-process h3 {
                font-size: 1.3rem;
                margin-bottom: 20px;
                color: var(--text-primary);
            }
            
            .service-features-full ul {
                list-style: none;
                padding: 0;
                margin-bottom: 30px;
            }
            
            .service-features-full li {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
                color: var(--text-primary);
            }
            
            .service-features-full li i {
                color: var(--success);
            }
            
            .examples-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                margin-bottom: 30px;
            }
            
            .example-item {
                background: var(--light-surface);
                border-radius: var(--border-radius);
                overflow: hidden;
                height: 150px;
            }
            
            .example-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: var(--transition);
            }
            
            .example-item:hover img {
                transform: scale(1.05);
            }
            
            .process-steps {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .step {
                background: var(--light-surface);
                border-radius: var(--border-radius);
                padding: 20px;
                border: 1px solid var(--border-color);
                transition: var(--transition);
            }
            
            .step:hover {
                border-color: var(--primary-color);
                transform: translateY(-4px);
            }
            
            .step-number {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                margin-bottom: 12px;
            }
            
            .step-content h4 {
                font-size: 1.1rem;
                margin-bottom: 8px;
                color: var(--text-primary);
            }
            
            .step-content p {
                color: var(--text-secondary);
                font-size: 0.9rem;
                line-height: 1.5;
            }
            
            .modal-footer {
                padding: 24px 30px;
                border-top: 1px solid var(--border-color);
                display: flex;
                gap: 16px;
                justify-content: flex-end;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .service-info {
                    flex-direction: column;
                    text-align: center;
                }
                
                .service-icon-large {
                    margin: 0 auto;
                }
                
                .service-meta {
                    justify-content: center;
                }
                
                .process-steps {
                    grid-template-columns: 1fr;
                }
                
                .modal-footer {
                    flex-direction: column;
                }
            }
        `;

        document.head.appendChild(style);
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    getServiceById(serviceId) {
        return this.services.find(service => service.id === serviceId);
    }

    getServicesByCategory(category) {
        return this.services.filter(service => service.category === category);
    }

    getAllCategories() {
        const categories = new Set(this.services.map(service => service.category));
        return Array.from(categories);
    }
}

// Initialize services when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.servicesManager = new ServicesManager();
    window.servicesManager.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServicesManager;
                  }
