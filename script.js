// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupResponsiveNav();
        this.loadDashboardData();
        this.initializeCharts();
    }

    setupEventListeners() {
        // Quick Actions (dashboard only)
        document.querySelectorAll('.quick-actions .action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.currentTarget);
            });
        });

        // Filter Actions
        const filterBtn = document.querySelector('.filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }

        // Table Actions
        document.querySelectorAll('.action-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.handleTableAction(e.target);
            });
        });

        // Room Actions
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleRoomAction(e.target);
            });
        });

        // Report Generation
        const generateReportBtn = document.querySelector('.btn-primary');
        if (generateReportBtn && generateReportBtn.textContent.includes('Generate Report')) {
            generateReportBtn.addEventListener('click', () => {
                this.generateReport();
            });
        }

        // Template Actions
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.useTemplate(e.target.closest('.template-card'));
            });
        });
    }

    setupResponsiveNav() {
        // Toggle header .nav-open on mobile
        const header = document.querySelector('.header');
        const toggleBtn = document.querySelector('.nav-toggle');
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');

        if (!header || !toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            header.classList.toggle('nav-open');
        });

        // Close menu when a link is clicked (useful on mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('nav-open');
            });
        });

        // Reset state on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                header.classList.remove('nav-open');
            }
        });
    }

    navigateToPage(page) {
        // For separate pages, navigation is handled by HTML links
        // This function is kept for compatibility but not used
        console.log('Navigation handled by HTML links for separate pages');
    }

    loadPageData(page) {
        switch (page) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'bookings':
                this.loadBookingsData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
            case 'reports':
                this.loadReportsData();
                break;
            case 'rooms':
                this.loadRoomsData();
                break;
        }
    }

    loadDashboardData() {
        // Simulate real-time data updates
        this.updateStats();
        this.updateRecentActivity();
    }

    updateStats() {
        // Animate stat numbers
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            this.animateNumber(stat, 0, finalValue, 1000);
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    updateRecentActivity() {
        // Simulate new activity
        const activities = [
            {
                icon: 'fas fa-calendar-check',
                content: '<strong>Room 301</strong> booked by Dr. Wilson for 3:00 PM - 5:00 PM',
                time: 'Just now'
            },
            {
                icon: 'fas fa-user-plus',
                content: '<strong>New teacher</strong> registered: Prof. Davis',
                time: '5 minutes ago'
            },
            {
                icon: 'fas fa-tools',
                content: '<strong>Maintenance completed</strong> for Room 105',
                time: '10 minutes ago'
            }
        ];

        // Add random activity every 30 seconds
        setInterval(() => {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            this.addActivityItem(randomActivity);
        }, 30000);
    }

    addActivityItem(activity) {
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.content}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            `;
            activityList.insertBefore(activityItem, activityList.firstChild);
            
            // Remove old activities if more than 5
            const items = activityList.querySelectorAll('.activity-item');
            if (items.length > 5) {
                activityList.removeChild(items[items.length - 1]);
            }
        }
    }

    loadBookingsData() {
        // Simulate booking data loading
        console.log('Loading bookings data...');
        this.updateBookingTable();
    }

    updateBookingTable() {
        // Add loading state
        const table = document.querySelector('.bookings-table tbody');
        if (table) {
            table.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem;">
                        <i class="fas fa-spinner fa-spin"></i> Loading bookings...
                    </td>
                </tr>
            `;
            
            // Simulate data loading
            setTimeout(() => {
                this.populateBookingTable();
            }, 1000);
        }
    }

    populateBookingTable() {
        const bookings = [
            {
                id: '#BK001',
                teacher: 'Dr. Sarah Smith',
                room: 'Room 201',
                datetime: 'Dec 15, 2024 2:00 PM',
                duration: '2 hours',
                status: 'confirmed'
            },
            {
                id: '#BK002',
                teacher: 'Prof. John Doe',
                room: 'Room 105',
                datetime: 'Dec 15, 2024 10:00 AM',
                duration: '1.5 hours',
                status: 'pending'
            },
            {
                id: '#BK003',
                teacher: 'Dr. Emily Brown',
                room: 'Room 301',
                datetime: 'Dec 16, 2024 9:00 AM',
                duration: '3 hours',
                status: 'confirmed'
            },
            {
                id: '#BK004',
                teacher: 'Prof. Michael Johnson',
                room: 'Room 102',
                datetime: 'Dec 16, 2024 1:00 PM',
                duration: '2.5 hours',
                status: 'cancelled'
            }
        ];

        const table = document.querySelector('.bookings-table tbody');
        if (table) {
            table.innerHTML = bookings.map(booking => `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.teacher}</td>
                    <td>${booking.room}</td>
                    <td>${booking.datetime}</td>
                    <td>${booking.duration}</td>
                    <td><span class="status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
                    <td>
                        <button class="action-icon" onclick="adminDashboard.editBooking('${booking.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-icon" onclick="adminDashboard.deleteBooking('${booking.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    loadAnalyticsData() {
        this.updateAnalyticsCharts();
    }

    updateAnalyticsCharts() {
        // Update utilization chart
        const chartProgress = document.querySelector('.chart-progress');
        if (chartProgress) {
            const percentage = 78;
            chartProgress.style.background = `conic-gradient(#1B3C53 0deg ${percentage * 3.6}deg, #D2C1B6 ${percentage * 3.6}deg 360deg)`;
        }

        // Animate bar chart
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = bar.style.height;
            }, index * 200);
        });

        // Animate usage bars
        const usageFills = document.querySelectorAll('.usage-fill');
        usageFills.forEach((fill, index) => {
            setTimeout(() => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            }, index * 300);
        });
    }

    loadReportsData() {
        console.log('Loading reports data...');
    }

    loadRoomsData() {
        console.log('Loading rooms data...');
        this.updateRoomStatuses();
    }

    updateRoomStatuses() {
        // Simulate real-time room status updates
        const roomCards = document.querySelectorAll('.room-card');
        roomCards.forEach(card => {
            const statusElement = card.querySelector('.room-status');
            if (statusElement) {
                // Add hover effect for status updates
                statusElement.addEventListener('click', () => {
                    this.toggleRoomStatus(statusElement);
                });
            }
        });
    }

    toggleRoomStatus(statusElement) {
        const currentStatus = statusElement.textContent.toLowerCase();
        const statuses = ['available', 'occupied', 'maintenance'];
        const currentIndex = statuses.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        
        statusElement.textContent = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1);
        statusElement.className = `room-status ${nextStatus}`;
        
        // Show notification
        this.showNotification(`Room status updated to ${nextStatus}`, 'success');
    }

    handleQuickAction(button) {
        const action = button.querySelector('span')?.textContent?.trim();
        console.log(`Quick action: ${action}`);
        
        switch (action) {
            case 'Add New Room':
                // Navigate to Rooms page for full management
                window.location.href = 'rooms.html';
                break;
            case 'Create Booking':
                this.showModal('Create Booking', this.getCreateBookingForm());
                break;
            case 'Generate Report':
                // Navigate to Reports builder
                window.location.href = 'reports.html';
                break;
            case 'System Settings':
                this.showModal('System Settings', this.getSettingsForm());
                break;
        }
    }

    handleTableAction(icon) {
        const action = icon.classList.contains('fa-edit') ? 'edit' : 'delete';
        const row = icon.closest('tr');
        const bookingId = row.querySelector('td').textContent;
        
        if (action === 'edit') {
            this.editBooking(bookingId);
        } else {
            this.deleteBooking(bookingId);
        }
    }

    handleRoomAction(button) {
        const action = button.textContent.toLowerCase();
        const roomCard = button.closest('.room-card');
        const roomName = roomCard.querySelector('h3').textContent;
        
        console.log(`${action} action for ${roomName}`);
        
        switch (action) {
            case 'edit':
                this.showModal(`Edit ${roomName}`, this.getEditRoomForm(roomName));
                break;
            case 'schedule':
                this.showModal(`${roomName} Schedule`, this.getRoomSchedule(roomName));
                break;
            case 'maintenance':
                this.showModal(`${roomName} Maintenance`, this.getMaintenanceForm(roomName));
                break;
        }
    }

    applyFilters() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const room = document.querySelector('.filter-select').value;
        
        console.log('Applying filters:', { startDate, endDate, room });
        
        // Show loading state
        this.showNotification('Applying filters...', 'info');
        
        // Simulate filter application
        setTimeout(() => {
            this.updateBookingTable();
            this.showNotification('Filters applied successfully', 'success');
        }, 1000);
    }

    generateReport() {
        const reportType = document.querySelector('.form-select').value;
        const format = document.querySelectorAll('.form-select')[1].value;
        
        console.log('Generating report:', { reportType, format });
        
        // Show loading state
        this.showNotification('Generating report...', 'info');
        
        // Simulate report generation
        setTimeout(() => {
            this.showNotification(`Report generated successfully in ${format} format`, 'success');
        }, 2000);
    }

    useTemplate(templateCard) {
        const templateName = templateCard.querySelector('h4').textContent;
        console.log('Using template:', templateName);
        
        this.showNotification(`Template "${templateName}" applied`, 'success');
        
        // Fill form with template data
        setTimeout(() => {
            this.navigateToPage('reports');
        }, 500);
    }

    editBooking(bookingId) {
        console.log('Editing booking:', bookingId);
        this.showModal(`Edit Booking ${bookingId}`, this.getEditBookingForm(bookingId));
    }

    deleteBooking(bookingId) {
        if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
            console.log('Deleting booking:', bookingId);
            this.showNotification(`Booking ${bookingId} deleted successfully`, 'success');
            
            // Remove from table
            const rows = document.querySelectorAll('.bookings-table tbody tr');
            rows.forEach(tr => {
                const firstCell = tr.querySelector('td');
                if (firstCell && firstCell.textContent.trim() === bookingId) {
                    tr.remove();
                }
            });
        }
    }

    showModal(title, content) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-cancel">Cancel</button>
                    <button class="btn-primary modal-save">Save</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #D2C1B6;
            }
            .modal-header h3 {
                margin: 0;
                color: #1B3C53;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .modal-footer {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                padding: 1.5rem;
                border-top: 1px solid #D2C1B6;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        modal.querySelector('.modal-cancel').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 3000;
                animation: slideIn 0.3s ease;
            }
            .notification.success {
                background: #28a745;
            }
            .notification.error {
                background: #dc3545;
            }
            .notification.info {
                background: #17a2b8;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 3000);
    }

    getAddRoomForm() {
        return `
            <div class="form-group">
                <label>Room Number</label>
                <input type="text" class="form-input" placeholder="e.g., 201">
            </div>
            <div class="form-group">
                <label>Capacity</label>
                <input type="number" class="form-input" placeholder="e.g., 30">
            </div>
            <div class="form-group">
                <label>Equipment</label>
                <input type="text" class="form-input" placeholder="e.g., Projector, Whiteboard">
            </div>
            <div class="form-group">
                <label>Accessibility</label>
                <select class="form-select">
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>
        `;
    }

    getCreateBookingForm() {
        return `
            <div class="form-group">
                <label>Teacher</label>
                <select class="form-select">
                    <option>Dr. Sarah Smith</option>
                    <option>Prof. John Doe</option>
                    <option>Dr. Emily Brown</option>
                </select>
            </div>
            <div class="form-group">
                <label>Room</label>
                <select class="form-select">
                    <option>Room 101</option>
                    <option>Room 102</option>
                    <option>Room 201</option>
                </select>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" class="form-input">
            </div>
            <div class="form-group">
                <label>Start Time</label>
                <input type="time" class="form-input">
            </div>
            <div class="form-group">
                <label>Duration (hours)</label>
                <input type="number" class="form-input" placeholder="2">
            </div>
        `;
    }

    getEditRoomForm(roomName) {
        return `
            <div class="form-group">
                <label>Room Number</label>
                <input type="text" class="form-input" value="${roomName}">
            </div>
            <div class="form-group">
                <label>Capacity</label>
                <input type="number" class="form-input" value="30">
            </div>
            <div class="form-group">
                <label>Status</label>
                <select class="form-select">
                    <option>Available</option>
                    <option>Occupied</option>
                    <option>Maintenance</option>
                </select>
            </div>
        `;
    }

    getRoomSchedule(roomName) {
        return `
            <div class="schedule-view">
                <h4>${roomName} Schedule for Today</h4>
                <div class="schedule-timeline">
                    <div class="time-slot">
                        <span class="time">9:00 AM</span>
                        <div class="booking">Dr. Smith - Mathematics</div>
                    </div>
                    <div class="time-slot">
                        <span class="time">11:00 AM</span>
                        <div class="booking available">Available</div>
                    </div>
                    <div class="time-slot">
                        <span class="time">2:00 PM</span>
                        <div class="booking">Prof. Johnson - Physics</div>
                    </div>
                </div>
            </div>
        `;
    }

    getMaintenanceForm(roomName) {
        return `
            <div class="form-group">
                <label>Issue Type</label>
                <select class="form-select">
                    <option>AC/Heating</option>
                    <option>Projector</option>
                    <option>Lighting</option>
                    <option>Furniture</option>
                    <option>Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-input" rows="3" placeholder="Describe the issue..."></textarea>
            </div>
            <div class="form-group">
                <label>Priority</label>
                <select class="form-select">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                </select>
            </div>
        `;
    }

    getEditBookingForm(bookingId) {
        return `
            <div class="form-group">
                <label>Teacher</label>
                <select class="form-select">
                    <option>Dr. Sarah Smith</option>
                    <option>Prof. John Doe</option>
                    <option>Dr. Emily Brown</option>
                </select>
            </div>
            <div class="form-group">
                <label>Room</label>
                <select class="form-select">
                    <option>Room 101</option>
                    <option>Room 102</option>
                    <option>Room 201</option>
                </select>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" class="form-input">
            </div>
            <div class="form-group">
                <label>Status</label>
                <select class="form-select">
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                </select>
            </div>
        `;
    }

    getSettingsForm() {
        return `
            <div class="form-group">
                <label>System Name</label>
                <input type="text" class="form-input" value="EduBook Admin">
            </div>
            <div class="form-group">
                <label>Max Booking Duration (hours)</label>
                <input type="number" class="form-input" value="8">
            </div>
            <div class="form-group">
                <label>Auto-approve Bookings</label>
                <input type="checkbox" checked>
            </div>
            <div class="form-group">
                <label>Email Notifications</label>
                <input type="checkbox" checked>
            </div>
        `;
    }

    initializeCharts() {
        // Initialize any charts that need JavaScript
        console.log('Initializing charts...');
    }
}

// Global functions for HTML onclick handlers
function showCreateBookingModal() {
    if (typeof adminDashboard !== 'undefined') {
        adminDashboard.showModal('Create New Booking', adminDashboard.getCreateBookingForm());
    } else {
        console.log('Create booking modal requested');
    }
}

function showSettingsModal() {
    if (typeof adminDashboard !== 'undefined') {
        adminDashboard.showModal('System Settings', adminDashboard.getSettingsForm());
    } else {
        console.log('Settings modal requested');
    }
}

function showModal(title, content) {
    if (typeof adminDashboard !== 'undefined') {
        adminDashboard.showModal(title, content);
    } else {
        console.log('Modal requested:', title);
    }
}

function showNotification(message, type = 'info') {
    if (typeof adminDashboard !== 'undefined') {
        adminDashboard.showNotification(message, type);
    } else {
        console.log('Notification:', message, type);
    }
}

// Additional global functions for page-specific functionality
function getCreateBookingForm() {
    return `
        <div class="form-group">
            <label>Teacher</label>
            <select class="form-select">
                <option>Dr. Sarah Smith</option>
                <option>Prof. John Doe</option>
                <option>Dr. Emily Brown</option>
            </select>
        </div>
        <div class="form-group">
            <label>Room</label>
            <select class="form-select">
                <option>Room 101</option>
                <option>Room 102</option>
                <option>Room 201</option>
            </select>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" class="form-input">
        </div>
        <div class="form-group">
            <label>Start Time</label>
            <input type="time" class="form-input">
        </div>
        <div class="form-group">
            <label>Duration (hours)</label>
            <input type="number" class="form-input" placeholder="2">
        </div>
    `;
}

function getEditBookingForm(bookingId) {
    return `
        <div class="form-group">
            <label>Teacher</label>
            <select class="form-select">
                <option>Dr. Sarah Smith</option>
                <option>Prof. John Doe</option>
                <option>Dr. Emily Brown</option>
            </select>
        </div>
        <div class="form-group">
            <label>Room</label>
            <select class="form-select">
                <option>Room 101</option>
                <option>Room 102</option>
                <option>Room 201</option>
            </select>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" class="form-input">
        </div>
        <div class="form-group">
            <label>Status</label>
            <select class="form-select">
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
            </select>
        </div>
    `;
}

function getViewBookingForm(bookingId) {
    return `
        <div class="booking-details">
            <h4>Booking Details for ${bookingId}</h4>
            <p><strong>Teacher:</strong> Dr. Sarah Smith</p>
            <p><strong>Room:</strong> Room 201</p>
            <p><strong>Date:</strong> December 15, 2024</p>
            <p><strong>Time:</strong> 2:00 PM - 4:00 PM</p>
            <p><strong>Status:</strong> Confirmed</p>
        </div>
    `;
}

function getAddRoomForm() {
    return `
        <div class="form-group">
            <label>Room Number</label>
            <input type="text" class="form-input" placeholder="e.g., 201">
        </div>
        <div class="form-group">
            <label>Capacity</label>
            <input type="number" class="form-input" placeholder="e.g., 30">
        </div>
        <div class="form-group">
            <label>Equipment</label>
            <input type="text" class="form-input" placeholder="e.g., Projector, Whiteboard">
        </div>
        <div class="form-group">
            <label>Accessibility</label>
            <select class="form-select">
                <option>Yes</option>
                <option>No</option>
            </select>
        </div>
    `;
}

function getEditRoomForm(roomName) {
    return `
        <div class="form-group">
            <label>Room Number</label>
            <input type="text" class="form-input" value="${roomName}">
        </div>
        <div class="form-group">
            <label>Capacity</label>
            <input type="number" class="form-input" value="30">
        </div>
        <div class="form-group">
            <label>Status</label>
            <select class="form-select">
                <option>Available</option>
                <option>Occupied</option>
                <option>Maintenance</option>
            </select>
        </div>
    `;
}

function getRoomScheduleForm(roomName) {
    return `
        <div class="schedule-view">
            <h4>${roomName} Schedule for Today</h4>
            <div class="schedule-timeline">
                <div class="time-slot">
                    <span class="time">9:00 AM</span>
                    <div class="booking">Dr. Smith - Mathematics</div>
                </div>
                <div class="time-slot">
                    <span class="time">11:00 AM</span>
                    <div class="booking available">Available</div>
                </div>
                <div class="time-slot">
                    <span class="time">2:00 PM</span>
                    <div class="booking">Prof. Johnson - Physics</div>
                </div>
            </div>
        </div>
    `;
}

function getMaintenanceForm(roomName) {
    return `
        <div class="form-group">
            <label>Issue Type</label>
            <select class="form-select">
                <option>AC/Heating</option>
                <option>Projector</option>
                <option>Lighting</option>
                <option>Furniture</option>
                <option>Other</option>
            </select>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-input" rows="3" placeholder="Describe the issue..."></textarea>
        </div>
        <div class="form-group">
            <label>Priority</label>
            <select class="form-select">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
            </select>
        </div>
    `;
}

function getSettingsForm() {
    return `
        <div class="form-group">
            <label>System Name</label>
            <input type="text" class="form-input" value="EduBook Admin">
        </div>
        <div class="form-group">
            <label>Max Booking Duration (hours)</label>
            <input type="number" class="form-input" value="8">
        </div>
        <div class="form-group">
            <label>Auto-approve Bookings</label>
            <input type="checkbox" checked>
        </div>
        <div class="form-group">
            <label>Email Notifications</label>
            <input type="checkbox" checked>
        </div>
    `;
}

function getRoomDetailsForm(roomNumber) {
    return `
        <div class="room-details">
            <h4>Room ${roomNumber} Details</h4>
            <p><strong>Capacity:</strong> 30</p>
            <p><strong>Equipment:</strong> Projector, Whiteboard</p>
            <p><strong>Status:</strong> Available</p>
            <p><strong>Last Maintenance:</strong> 2 weeks ago</p>
        </div>
    `;
}

function getReportPreview(reportType) {
    return `
        <div class="report-preview">
            <h4>Preview: ${reportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
            <p>This is a preview of the report that will be generated.</p>
            <div class="preview-content">
                <p>Sample data will be displayed here...</p>
            </div>
        </div>
    `;
}

function getLoadTemplateForm() {
    return `
        <div class="template-list">
            <h4>Select Template</h4>
            <div class="template-options">
                <label class="template-option">
                    <input type="radio" name="template" value="weekly">
                    <span>Weekly Summary</span>
                </label>
                <label class="template-option">
                    <input type="radio" name="template" value="monthly">
                    <span>Monthly Analytics</span>
                </label>
                <label class="template-option">
                    <input type="radio" name="template" value="department">
                    <span>Department Report</span>
                </label>
            </div>
        </div>
    `;
}

function getNewTemplateForm() {
    return `
        <div class="form-group">
            <label>Template Name</label>
            <input type="text" class="form-input" placeholder="Enter template name">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-input" rows="3" placeholder="Enter description"></textarea>
        </div>
        <div class="form-group">
            <label>Report Type</label>
            <select class="form-select">
                <option>Booking Summary</option>
                <option>Room Utilization</option>
                <option>Teacher Activity</option>
            </select>
        </div>
    `;
}

function getEditTemplateForm(templateId) {
    return `
        <div class="form-group">
            <label>Template Name</label>
            <input type="text" class="form-input" value="${templateId}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-input" rows="3">Template description</textarea>
        </div>
    `;
}

function getShareReportForm(reportId) {
    return `
        <div class="form-group">
            <label>Email Address</label>
            <input type="email" class="form-input" placeholder="Enter email address">
        </div>
        <div class="form-group">
            <label>Message (Optional)</label>
            <textarea class="form-input" rows="3" placeholder="Add a message"></textarea>
        </div>
    `;
}

function getAllReportsList() {
    return `
        <div class="reports-list">
            <h4>All Generated Reports</h4>
            <div class="report-item">
                <span>Weekly Summary - Dec 8-14, 2024</span>
                <button class="btn-small">Download</button>
            </div>
            <div class="report-item">
                <span>Room Utilization - November 2024</span>
                <button class="btn-small">Download</button>
            </div>
        </div>
    `;
}

function getBulkActionsForm() {
    return `
        <div class="bulk-actions-form">
            <h4>Bulk Actions</h4>
            <div class="form-group">
                <label>Action</label>
                <select class="form-select">
                    <option>Approve Selected</option>
                    <option>Cancel Selected</option>
                    <option>Delete Selected</option>
                    <option>Export Selected</option>
                </select>
            </div>
            <div class="form-group">
                <label>Confirmation</label>
                <input type="checkbox" required> I understand this action will affect multiple items
            </div>
        </div>
    `;
}

function getAllMaintenanceForm() {
    return `
        <div class="maintenance-list">
            <h4>All Maintenance Records</h4>
            <div class="maintenance-item">
                <span>Room 201 - AC repair completed</span>
                <span class="status completed">Completed</span>
            </div>
            <div class="maintenance-item">
                <span>Room 105 - Projector not working</span>
                <span class="status pending">Pending</span>
            </div>
        </div>
    `;
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(time) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminDashboard;
}
