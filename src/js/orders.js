// Orders Management System

class OrdersManager {
    constructor() {
        this.orders = [];
        this.apiUrl = 'https://api.jamalx7.com'; // Replace with actual API URL
        this.init();
    }

    async init() {
        await this.loadOrders();
        this.setupOrderForm();
        this.setupRealTimeUpdates();
        this.setupOrderNotifications();
    }

    async loadOrders() {
        try {
            // For demo purposes, use localStorage
            const storedOrders = localStorage.getItem('jamalx7_orders');
            if (storedOrders) {
                this.orders = JSON.parse(storedOrders);
            } else {
                // Sample data for demo
                this.orders = this.generateSampleOrders();
                this.saveOrders();
            }
            
            this.renderOrdersDashboard();
            this.updateStats();
        } catch (error) {
            console.error('Error loading orders:', error);
            this.showToast('حدث خطأ في تحميل الطلبات', 'error');
        }
    }

    generateSampleOrders() {
        const services = [
            'logo-design',
            'website-design', 
            'video-editing',
            'programming',
            'content-writing',
            'voice-over',
            'digital-marketing',
            'custom-service'
        ];
        
        const statuses = ['pending', 'processing', 'completed', 'cancelled'];
        const priorities = ['normal', 'high', 'urgent'];
        
        const orders = [];
        
        for (let i = 1; i <= 12; i++) {
            const service = services[Math.floor(Math.random() * services.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const priority = priorities[Math.floor(Math.random() * priorities.length)];
            
            orders.push({
                id: `ORD-${1000 + i}`,
                service,
                clientName: `عميل ${i}`,
                clientEmail: `client${i}@example.com`,
                clientPhone: `+966 55 123 ${4567 + i}`,
                description: `وصف مشروع رقم ${i}`,
                budget: ['500-1000', '1000-3000', '3000-5000', '5000+'][Math.floor(Math.random() * 4)],
                priority,
                status,
                createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(),
                notes: Math.random() > 0.5 ? `ملاحظات إضافية للمشروع ${i}` : ''
            });
        }
        
        return orders;
    }

    setupOrderForm() {
        const form = document.getElementById('orderForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.submitOrder(form);
        });

        // Auto-fill service based on URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        if (serviceParam) {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = serviceParam;
            }
        }

        // Character counter for description
        const descriptionTextarea = document.getElementById('description');
        if (descriptionTextarea) {
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.fontSize = '0.8rem';
            counter.style.color = 'var(--text-secondary)';
            counter.style.textAlign = 'left';
            counter.style.marginTop = '4px';
            descriptionTextarea.parentNode.appendChild(counter);

            descriptionTextarea.addEventListener('input', () => {
                const length = descriptionTextarea.value.length;
                counter.textContent = `${length}/1000 حرف`;
                
                if (length > 800) {
                    counter.style.color = '#F59E0B';
                } else if (length > 950) {
                    counter.style.color = '#EF4444';
                } else {
                    counter.style.color = 'var(--text-secondary)';
                }
            });

            // Trigger initial count
            descriptionTextarea.dispatchEvent(new Event('input'));
        }
    }

    async submitOrder(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري إنشاء الطلب...
        `;
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const orderData = {
                id: `ORD-${Date.now()}`,
                service: formData.get('service'),
                clientName: formData.get('name'),
                clientEmail: formData.get('email'),
                clientPhone: formData.get('phone'),
                description: formData.get('description'),
                budget: formData.get('budget') || 'غير محدد',
                timeline: formData.get('timeline') || 'غير محدد',
                priority: 'normal',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Add to orders
            this.orders.unshift(orderData);
            
            // Save to localStorage
            this.saveOrders();
            
            // Show success message
            this.showToast('تم إنشاء طلبك بنجاح! رقم الطلب: ' + orderData.id, 'success');
            
            // Reset form
            form.reset();
            
            // Update dashboard if open
            this.renderOrdersDashboard();
            this.updateStats();
            
            // Send notification (simulated)
            this.sendOrderNotification(orderData);
            
            // Scroll to confirmation
            setTimeout(() => {
                const confirmationSection = document.createElement('div');
                confirmationSection.className = 'order-confirmation';
                confirmationSection.innerHTML = `
                    <div class="confirmation-content">
                        <i class="fas fa-check-circle"></i>
                        <h3>تم استلام طلبك بنجاح!</h3>
                        <p>رقم طلبك: <strong>${orderData.id}</strong></p>
                        <p>سنتواصل معك خلال 24 ساعة عمل</p>
                        <a href="https://wa.me/966123456789?text=مرحباً، لدي استفسار عن الطلب ${orderData.id}" 
                           class="btn btn-primary" target="_blank">
                            <i class="fab fa-whatsapp"></i>
                            تواصل معنا على واتساب
                        </a>
                    </div>
                `;
                
                form.parentNode.insertBefore(confirmationSection, form.nextSibling);
                
                // Scroll to confirmation
                confirmationSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);

        } catch (error) {
            console.error('Error submitting order:', error);
            this.showToast('حدث خطأ أثناء إنشاء الطلب', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    renderOrdersDashboard() {
        const dashboard = document.getElementById('ordersDashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h2>لوحة التحكم - إدارة الطلبات</h2>
                <div class="dashboard-actions">
                    <button class="btn btn-primary" id="refreshOrders">
                        <i class="fas fa-sync-alt"></i>
                        تحديث
                    </button>
                    <button class="btn btn-outline" id="exportOrders">
                        <i class="fas fa-download"></i>
                        تصدير
                    </button>
                </div>
            </div>

            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.orders.length}</div>
                        <div class="stat-label">إجمالي الطلبات</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="color: #F59E0B;">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.orders.filter(o => o.status === 'pending').length}</div>
                        <div class="stat-label">قيد الانتظار</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="color: #3B82F6;">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.orders.filter(o => o.status === 'processing').length}</div>
                        <div class="stat-label">قيد المعالجة</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="color: #10B981;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.orders.filter(o => o.status === 'completed').length}</div>
                        <div class="stat-label">مكتملة</div>
                    </div>
                </div>
            </div>

            <div class="orders-table-container">
                <div class="table-header">
                    <h3>الطلبات الحديثة</h3>
                    <div class="table-filters">
                        <select id="statusFilter" class="filter-select">
                            <option value="">جميع الحالات</option>
                            <option value="pending">قيد الانتظار</option>
                            <option value="processing">قيد المعالجة</option>
                            <option value="completed">مكتملة</option>
                            <option value="cancelled">ملغاة</option>
                        </select>
                        
                        <select id="priorityFilter" class="filter-select">
                            <option value="">جميع الأولويات</option>
                            <option value="normal">عادية</option>
                            <option value="high">عالية</option>
                            <option value="urgent">عاجلة</option>
                        </select>
                    </div>
                </div>
                
                <div class="orders-table">
                    ${this.generateOrdersTable()}
                </div>
            </div>
        `;

        // Add event listeners
        this.setupDashboardEvents();
    }

    generateOrdersTable() {
        if (this.orders.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>لا توجد طلبات حتى الآن</h3>
                    <p>ابدأ بإنشاء طلبك الأول!</p>
                </div>
            `;
        }

        return `
            <table>
                <thead>
                    <tr>
                        <th>رقم الطلب</th>
                        <th>العميل</th>
                        <th>الخدمة</th>
                        <th>الحالة</th>
                        <th>الأولوية</th>
                        <th>التاريخ</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.orders.slice(0, 10).map(order => `
                        <tr>
                            <td>${order.id}</td>
                            <td>
                                <div class="client-info">
                                    <div class="client-name">${order.clientName}</div>
                                    <div class="client-contact">${order.clientEmail}</div>
                                </div>
                            </td>
                            <td>${this.getServiceName(order.service)}</td>
                            <td>
                                <span class="status-badge status-${order.status}">
                                    ${this.getStatusLabel(order.status)}
                                </span>
                            </td>
                            <td>
                                <span class="priority-badge priority-${order.priority}">
                                    ${this.getPriorityLabel(order.priority)}
                                </span>
                            </td>
                            <td>${this.formatDate(order.createdAt)}</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-icon btn-view" data-order="${order.id}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn-icon btn-edit" data-order="${order.id}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-icon btn-delete" data-order="${order.id}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    getServiceName(serviceId) {
        const services = {
            'logo-design': 'تصميم شعار',
            'website-design': 'تصميم موقع',
            'video-editing': 'تحرير فيديو',
            'programming': 'برمجة وتطوير',
            'content-writing': 'كتابة محتوى',
            'voice-over': 'تعليق صوتي',
            'digital-marketing': 'تسويق رقمي',
            'custom-service': 'خدمة مخصصة'
        };
        
        return services[serviceId] || serviceId;
    }

    getStatusLabel(status) {
        const labels = {
            'pending': 'قيد الانتظار',
            'processing': 'قيد المعالجة',
            'completed': 'مكتمل',
            'cancelled': 'ملغى'
        };
        
        return labels[status] || status;
    }

    getPriorityLabel(priority) {
        const labels = {
            'normal': 'عادية',
            'high': 'عالية',
            'urgent': 'عاجلة'
        };
        
        return labels[priority] || priority;
    }

    formatDate(date) {
        const d = new Date(date);
        return d.toLocaleDateString('ar-SA');
    }

    setupDashboardEvents() {
        // Refresh button
        const refreshBtn = document.getElementById('refreshOrders');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadOrders();
                this.showToast('تم تحديث البيانات', 'success');
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportOrders');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportOrders();
            });
        }

        // Filters
        const statusFilter = document.getElementById('statusFilter');
        const priorityFilter = document.getElementById('priorityFilter');
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                this.filterOrders();
            });
        }
        
        if (priorityFilter) {
            priorityFilter.addEventListener('change', () => {
                this.filterOrders();
            });
        }

        // Action buttons
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderId = e.currentTarget.dataset.order;
                this.viewOrderDetails(orderId);
            });
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderId = e.currentTarget.dataset.order;
                this.editOrder(orderId);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderId = e.currentTarget.dataset.order;
                this.deleteOrder(orderId);
            });
        });
    }

    filterOrders() {
        const statusFilter = document.getElementById('statusFilter');
        const priorityFilter = document.getElementById('priorityFilter');
        
        const status = statusFilter ? statusFilter.value : '';
        const priority = priorityFilter ? priorityFilter.value : '';
        
        let filteredOrders = this.orders;
        
        if (status) {
            filteredOrders = filteredOrders.filter(order => order.status === status);
        }
        
        if (priority) {
            filteredOrders = filteredOrders.filter(order => order.priority === priority);
        }
        
        // Update table with filtered orders
        this.renderFilteredTable(filteredOrders);
    }

    renderFilteredTable(filteredOrders) {
        const tableBody = document.querySelector('.orders-table tbody');
        if (!tableBody) return;

        if (filteredOrders.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">
                        <div class="empty-state">
                            <i class="fas fa-search"></i>
                            <p>لا توجد نتائج مطابقة للبحث</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = filteredOrders.slice(0, 10).map(order => `
            <tr>
                <td>${order.id}</td>
                <td>
                    <div class="client-info">
                        <div class="client-name">${order.clientName}</div>
                        <div class="client-contact">${order.clientEmail}</div>
                    </div>
                </td>
                <td>${this.getServiceName(order.service)}</td>
                <td>
                    <span class="status-badge status-${order.status}">
                        ${this.getStatusLabel(order.status)}
                    </span>
                </td>
                <td>
                    <span class="priority-badge priority-${order.priority}">
                        ${this.getPriorityLabel(order.priority)}
                    </span>
                </td>
                <td>${this.formatDate(order.createdAt)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-view" data-order="${order.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-edit" data-order="${order.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-delete" data-order="${order.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    viewOrderDetails(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const modal = this.createOrderModal(order, 'view');
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    editOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const modal = this.createOrderModal(order, 'edit');
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    deleteOrder(orderId) {
        if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            this.orders.splice(index, 1);
            this.saveOrders();
            this.renderOrdersDashboard();
            this.updateStats();
            this.showToast('تم حذف الطلب بنجاح', 'success');
        }
    }

    createOrderModal(order, mode = 'view') {
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        
        const isViewMode = mode === 'view';
        
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${isViewMode ? 'تفاصيل الطلب' : 'تعديل الطلب'} - ${order.id}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="order-details">
                        ${isViewMode ? this.renderOrderDetails(order) : this.renderOrderForm(order)}
                    </div>
                </div>
                
                <div class="modal-footer">
                    ${isViewMode ? `
                        <button class="btn btn-primary" id="editOrder">
                            <i class="fas fa-edit"></i>
                            تعديل
                        </button>
                        <button class="btn btn-outline" id="closeModal">
                            إغلاق
                        </button>
                    ` : `
                        <button class="btn btn-primary" id="saveOrder">
                            <i class="fas fa-save"></i>
                            حفظ التغييرات
                        </button>
                        <button class="btn btn-outline" id="cancelEdit">
                            إلغاء
                        </button>
                    `}
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.modal-backdrop').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal(modal));
        
        if (isViewMode) {
            modal.querySelector('#closeModal').addEventListener('click', () => this.closeModal(modal));
            modal.querySelector('#editOrder').addEventListener('click', () => {
                this.closeModal(modal);
                setTimeout(() => this.editOrder(order.id), 300);
            });
        } else {
            modal.querySelector('#cancelEdit').addEventListener('click', () => this.closeModal(modal));
            modal.querySelector('#saveOrder').addEventListener('click', () => {
                this.saveOrderChanges(order.id, modal);
            });
        }

        return modal;
    }

    renderOrderDetails(order) {
        return `
            <div class="detail-section">
                <h3>معلومات العميل</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">الاسم:</span>
                        <span class="detail-value">${order.clientName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">البريد الإلكتروني:</span>
                        <span class="detail-value">${order.clientEmail}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">رقم الهاتف:</span>
                        <span class="detail-value">${order.clientPhone}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>معلومات الخدمة</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">نوع الخدمة:</span>
                        <span class="detail-value">${this.getServiceName(order.service)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">الميزانية:</span>
                        <span class="detail-value">${order.budget}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">الأولوية:</span>
                        <span class="detail-value priority-badge priority-${order.priority}">
                            ${this.getPriorityLabel(order.priority)}
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">الحالة:</span>
                        <span class="detail-value status-badge status-${order.status}">
                            ${this.getStatusLabel(order.status)}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>وصف المشروع</h3>
                <div class="description-box">${order.description}</div>
            </div>
            
            <div class="detail-section">
                <h3>التواريخ</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">تاريخ الإنشاء:</span>
                        <span class="detail-value">${this.formatDate(order.createdAt)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">آخر تحديث:</span>
                        <span class="detail-value">${this.formatDate(order.updatedAt)}</span>
                    </div>
                </div>
            </div>
            
            ${order.notes ? `
                <div class="detail-section">
                    <h3>ملاحظات</h3>
                    <div class="notes-box">${order.notes}</div>
                </div>
            ` : ''}
        `;
    }

    renderOrderForm(order) {
        return `
            <form id="editOrderForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="editStatus">الحالة</label>
                        <select id="editStatus" name="status" required>
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>قيد الانتظار</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>قيد المعالجة</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>مكتمل</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>ملغى</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="editPriority">الأولوية</label>
                        <select id="editPriority" name="priority" required>
                            <option value="normal" ${order.priority === 'normal' ? 'selected' : ''}>عادية</option>
                            <option value="high" ${order.priority === 'high' ? 'selected' : ''}>عالية</option>
                            <option value="urgent" ${order.priority === 'urgent' ? 'selected' : ''}>عاجلة</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="editNotes">ملاحظات إضافية</label>
                    <textarea id="editNotes" name="notes" rows="4">${order.notes || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="editNextStep">الخطوة التالية</label>
                    <select id="editNextStep" name="nextStep">
                        <option value="">اختر الخطوة التالية</option>
                        <option value="contact">التواصل مع العميل</option>
                        <option value="design">بدء التصميم</option>
                        <option value="development">بدء التطوير</option>
                        <option value="review">مراجعة مع العميل</option>
                        <option value="delivery">التسليم</option>
                        <option value="followup">متابعة بعد التسليم</option>
                    </select>
                </div>
            </form>
        `;
    }

    saveOrderChanges(orderId, modal) {
        const form = modal.querySelector('#editOrderForm');
        if (!form) return;

        const formData = new FormData(form);
        const order = this.orders.find(o => o.id === orderId);
        
        if (order) {
            order.status = formData.get('status');
            order.priority = formData.get('priority');
            order.notes = formData.get('notes');
            order.updatedAt = new Date();
            
            this.saveOrders();
            this.renderOrdersDashboard();
            this.updateStats();
            this.closeModal(modal);
            this.showToast('تم تحديث الطلب بنجاح', 'success');
            
            // Send notification about update
            this.sendStatusUpdateNotification(order);
        }
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    updateStats() {
        const stats = {
            total: this.orders.length,
            pending: this.orders.filter(o => o.status === 'pending').length,
            processing: this.orders.filter(o => o.status === 'processing').length,
            completed: this.orders.filter(o => o.status === 'completed').length,
            urgent: this.orders.filter(o => o.priority === 'urgent').length
        };

        // Update stats display if exists
        document.querySelectorAll('.stat-number').forEach(stat => {
            const statType = stat.dataset.stat;
            if (stats[statType] !== undefined) {
                stat.textContent = stats[statType];
            }
        });
    }

    saveOrders() {
        try {
            localStorage.setItem('jamalx7_orders', JSON.stringify(this.orders));
        } catch (error) {
            console.error('Error saving orders:', error);
        }
    }

    exportOrders() {
        const data = JSON.stringify(this.orders, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `jamalx7-orders-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('تم تصدير الطلبات بنجاح', 'success');
    }

    setupRealTimeUpdates() {
        // Simulate real-time updates for demo
        setInterval(() => {
            if (Math.random() > 0.7) {
                const statuses = ['pending', 'processing', 'completed'];
                const randomOrder = this.orders[Math.floor(Math.random() * this.orders.length)];
                
                if (randomOrder) {
                    const oldStatus = randomOrder.status;
                    randomOrder.status = statuses[Math.floor(Math.random() * statuses.length)];
                    randomOrder.updatedAt = new Date();
                    
                    if (oldStatus !== randomOrder.status) {
                        this.saveOrders();
                        this.updateStats();
                        this.showToast(`تم تحديث حالة الطلب ${randomOrder.id}`, 'info');
                    }
                }
            }
        }, 30000); // Every 30 seconds
    }

    setupOrderNotifications() {
        // Check for new orders periodically
        setInterval(() => {
            const lastCheck = localStorage.getItem('jamalx7_lastCheck') || 0;
            const newOrders = this.orders.filter(order => 
                new Date(order.createdAt) > new Date(lastCheck)
            );
            
            if (newOrders.length > 0) {
                this.showNotification(`لديك ${newOrders.length} طلب جديد`);
                localStorage.setItem('jamalx7_lastCheck', new Date().toISOString());
            }
        }, 60000); // Every minute
    }

    sendOrderNotification(order) {
        // In a real app, this would send an email or push notification
        console.log('Order notification sent:', order);
        
        // Simulate sending to API
        fetch(`${this.apiUrl}/notifications/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: order.id,
                clientEmail: order.clientEmail,
                service: order.service,
                message: 'تم استلام طلبك بنجاح'
            })
        }).catch(error => {
            console.error('Error sending notification:', error);
        });
    }

    sendStatusUpdateNotification(order) {
        // Send notification about status update
        fetch(`${this.apiUrl}/notifications/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: order.id,
                clientEmail: order.clientEmail,
                status: order.status,
                message: `تم تحديث حالة طلبك إلى: ${this.getStatusLabel(order.status)}`
            })
        }).catch(error => {
            console.error('Error sending status notification:', error);
        });
    }

    showNotification(message) {
        // Check if browser supports notifications
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('JAMAL X7 - إشعار جديد', {
                body: message,
                icon: '/assets/icons/logo.png'
            });
        }
        
        // Also show toast
        this.showToast(message, 'info');
    }

    showToast(message, type = 'success') {
        // Use the app's toast system if available
        if (window.app && window.app.showToast) {
            window.app.showToast(message, type);
        } else {
            // Fallback toast
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
    }
}

// Initialize orders manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ordersManager = new OrdersManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrdersManager;
    }
