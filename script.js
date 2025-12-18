// ================================
// STATE MANAGEMENT
// ================================
const appState = {
    currentPage: 'beranda',
    points: 0,
    schedules: [],
    notifications: [],
    vouchers: [], // Store redeemed vouchers
    totalWasteCollected: 0,
    lastLoginDate: null
};

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Load data from localStorage
    loadData();

    // Initialize app
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app').style.display = 'block';



        // Update UI
        updateUI();

        // Setup Constraints
        setupScheduleConstraints();

        // Send welcome notification
        if (appState.notifications.length === 0) {
            addNotification(
                'Selamat Datang! 🎉',
                'Terima kasih telah menggunakan WasteWise. Mari kelola sampah dengan bijak!',
                'success'
            );
        }
    }, 2500);

    // Setup event listeners
    setupEventListeners();
});

// ================================
// DATA PERSISTENCE
// ================================
function loadData() {
    const savedPoints = localStorage.getItem('wastewise_points');
    const savedSchedules = localStorage.getItem('wastewise_schedules');
    const savedNotifications = localStorage.getItem('wastewise_notifications');
    const savedVouchers = localStorage.getItem('wastewise_vouchers');
    const savedWaste = localStorage.getItem('wastewise_waste');
    const savedLastLogin = localStorage.getItem('wastewise_last_login');

    if (savedPoints) appState.points = parseInt(savedPoints);
    if (savedSchedules) appState.schedules = JSON.parse(savedSchedules);
    if (savedNotifications) appState.notifications = JSON.parse(savedNotifications);
    if (savedVouchers) appState.vouchers = JSON.parse(savedVouchers);
    if (savedWaste) appState.totalWasteCollected = parseFloat(savedWaste);
    if (savedLastLogin) appState.lastLoginDate = savedLastLogin;
}

function saveData() {
    localStorage.setItem('wastewise_points', appState.points);
    localStorage.setItem('wastewise_schedules', JSON.stringify(appState.schedules));
    localStorage.setItem('wastewise_notifications', JSON.stringify(appState.notifications));
    localStorage.setItem('wastewise_vouchers', JSON.stringify(appState.vouchers));
    localStorage.setItem('wastewise_waste', appState.totalWasteCollected);
    localStorage.setItem('wastewise_last_login', appState.lastLoginDate);

    updateUI();
}

// ================================
// EVENT LISTENERS
// ================================
function setupEventListeners() {
    // Hamburger Menu
    const hamburgerBtn = document.querySelector('.mobile-only-btn');
    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);

    const closeSidebarBtn = document.getElementById('close-sidebar');
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);

    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // Schedule form
    const scheduleForm = document.getElementById('schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', handleScheduleSubmit);
    }

    // Guide tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.style.right = '0';
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.style.right = '-280px';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    }
}

function setupScheduleConstraints() {
    const dateInput = document.getElementById('pickup-date');

    if (!dateInput) return;

    // Set minimal date hari ini
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Validasi Hari: Hanya Senin (1) dan Kamis (4)
    dateInput.addEventListener('change', function () {
        const date = new Date(this.value);
        const day = date.getDay(); // 0=Minggu, 1=Senin, ..., 4=Kamis

        if (day !== 1 && day !== 4) {
            alert('⚠️ Jadwal penjemputan hanya tersedia hari Senin dan Kamis!');
            this.value = ''; // Reset input
        }
    });
}

// ================================
// NAVIGATION
// ================================
function navigateTo(page) {
    appState.currentPage = page;

    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0); // Scroll to top
    }

    // Sidebar Highlighting
    const sideItems = document.querySelectorAll('.nav-item-side');
    sideItems.forEach(item => {
        item.style.fontWeight = '500';
        item.style.color = 'var(--text-primary)';
        item.style.background = 'transparent';

        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(`'${page}'`)) {
            item.style.fontWeight = '700';
            item.style.color = 'var(--primary)';
            item.style.background = 'var(--bg-tertiary)';
        }
    });

    // Desktop Highlighting
    const deskItems = document.querySelectorAll('.nav-link');
    deskItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(`'${page}'`)) {
            item.classList.add('active');
        }
    });

    const headerTexts = {
        'beranda': 'WasteWise',
        'jadwal': 'Jadwal Penjemputan',
        'panduan': 'Panduan Pemilahan',
        'reward': 'Reward System',
        'notifikasi': 'Notifikasi'
    };
    const headerEl = document.getElementById('header-text');
    if (headerEl) headerEl.textContent = headerTexts[page] || 'WasteWise';

    if (page === 'notifikasi') {
        markNotificationsAsRead();
    }

    if (page === 'jadwal') {
        setTimeout(initMap, 100); // Delay slightly to ensure visibility
    }
}

// ================================
// SCHEDULE MANAGEMENT
// ================================
function handleScheduleSubmit(e) {
    e.preventDefault();

    const wasteType = document.getElementById('waste-type').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const pickupTime = "07:00 - 12:00 (Slot Pagi)"; // Set waktu default sesuai operasional
    const wasteWeight = parseFloat(document.getElementById('waste-weight').value);
    const address = document.getElementById('address').value;
    const lat = document.getElementById('pickup-lat').value;
    const lng = document.getElementById('pickup-lng').value;

    const schedule = {
        id: Date.now(),
        type: wasteType,
        date: pickupDate,
        time: pickupTime,
        weight: wasteWeight,
        address: address,
        coordinates: { lat, lng },
        status: 'pending', // Status awal
        createdAt: new Date().toISOString()
    };

    appState.schedules.push(schedule);

    addNotification(
        'Jadwal Berhasil Dibuat! 📅',
        `Penjemputan ${wasteType} dijadwalkan pada ${formatDate(pickupDate)}. Menunggu petugas.`,
        'info'
    );

    saveData();

    e.target.reset();
    showToast(`Jadwal berhasil dibuat! Menunggu penjemputan 🚚`);
}

function deleteSchedule(id) {
    const index = appState.schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        const schedule = appState.schedules[index];
        appState.schedules.splice(index, 1);
        appState.totalWasteCollected -= schedule.weight;
        saveData();
        showToast('Jadwal dihapus');
    }
}

function renderSchedules() {
    const scheduleList = document.getElementById('schedule-list');
    if (!scheduleList) return;

    if (appState.schedules.length === 0) {
        scheduleList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>Belum ada jadwal penjemputan</p>
            </div>
        `;
        return;
    }

    const typeEmoji = {
        'organik': '🌿',
        'anorganik': '♻️',
        'campuran': '🗑️'
    };

    const sortedSchedules = [...appState.schedules].sort((a, b) => new Date(b.date) - new Date(a.date));

    scheduleList.innerHTML = sortedSchedules.map(schedule => {
        const isCompleted = schedule.status === 'completed';
        const statusBadge = isCompleted
            ? '<span class="status-badge completed" style="background: #d1fae5; color: #065f46; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">✅ Selesai</span>'
            : '<span class="status-badge pending" style="background: #fef3c7; color: #92400e; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">⏳ Menunggu</span>';

        const actionButton = !isCompleted
            ? `<button onclick="completeSchedule(${schedule.id})" class="btn-primary" style="margin-top: 0.5rem; width: 100%; padding: 0.5rem; font-size: 0.9rem;">✅ Selesaikan Penjemputan</button>`
            : '';

        return `
        <div class="schedule-item">
            <div class="schedule-header">
                <span class="schedule-type">
                    ${typeEmoji[schedule.type] || '🗑️'} ${capitalize(schedule.type)}
                </span>
                ${statusBadge}
                <button class="schedule-delete" onclick="deleteSchedule(${schedule.id})" title="Hapus Jadwal (Batal)">❌</button>
            </div>
            <div class="schedule-info">
                <div class="schedule-row">📅 <strong>Tanggal:</strong> ${formatDate(schedule.date)}</div>
                <div class="schedule-row">🕐 <strong>Waktu:</strong> ${schedule.time}</div>
                <div class="schedule-row">⚖️ <strong>Berat:</strong> ${schedule.weight} kg</div>
                <div class="schedule-row">📍 <strong>Alamat:</strong> ${schedule.address}</div>
                ${actionButton}
            </div>
        </div>
    `}).join('');
}

function completeSchedule(id) {
    const index = appState.schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        const schedule = appState.schedules[index];
        if (schedule.status === 'completed') return;

        // Update Status
        schedule.status = 'completed';

        // Tambah Poin (Dinamis: 10 poin per kg)
        const pointsEarned = Math.round(schedule.weight * 10);
        addPoints(pointsEarned);

        // Update Total Sampah
        appState.totalWasteCollected += schedule.weight;

        // Notifikasi
        addNotification(
            'Penjemputan Selesai! 🎉',
            `Sampah ${schedule.type} telah dijemput. Anda mendapatkan +${pointsEarned} poin!`,
            'success'
        );

        saveData();
        renderSchedules(); // Re-render untuk update UI
        renderHome(); // Update total poin di home
        showToast(`Penjemputan selesai! +${pointsEarned} poin ditambahkan.`);
    }
}

// ================================
// GUIDE & TABS
// ================================
function switchTab(tabName) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) btn.classList.add('active');
    });

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) targetTab.classList.add('active');
}

// ================================
// REWARD SYSTEM & VOUCHERS
// ================================
function redeemReward(rewardName, pointsCost) {
    if (appState.points < pointsCost) {
        showToast('Poin Anda tidak cukup! 😢');
        return;
    }

    // Deduct points
    appState.points -= pointsCost;

    // Create Voucher
    const voucherCode = generateVoucherCode();
    const newVoucher = {
        id: Date.now(),
        name: rewardName,
        code: voucherCode,
        date: new Date().toISOString(),
        cost: pointsCost
    };
    appState.vouchers.unshift(newVoucher);

    // Notification
    addNotification(
        'Reward Ditukar! 🎁',
        `Berhasil menukar ${rewardName}. Kode Voucher: ${voucherCode}`,
        'success'
    );

    saveData();
    showToast(`Berhasil! Cek Tiket Voucher Anda 🎉`);

    // Scroll to vouchers
    const vouchersEl = document.getElementById('my-vouchers');
    if (vouchersEl) vouchersEl.scrollIntoView({ behavior: 'smooth' });
}

function generateVoucherCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result; // eg: A7X9B2C1
}

function renderVouchers() {
    const vouchersList = document.getElementById('my-vouchers');
    if (!vouchersList) return;

    if (appState.vouchers.length === 0) {
        vouchersList.innerHTML = `
            <div class="empty-state" style="padding: 2rem;">
                <div class="empty-icon" style="font-size: 3rem;">🎟️</div>
                <p>Belum ada voucher. Tukarkan poin Anda!</p>
            </div>
        `;
        return;
    }

    vouchersList.innerHTML = appState.vouchers.map(voucher => `
        <div class="voucher-ticket">
            <div class="voucher-header">
                <div class="voucher-title">${voucher.name}</div>
                <div class="voucher-date">${formatDate(voucher.date)}</div>
            </div>
            <div class="voucher-body">
                <div class="voucher-code-label">KODE VOUCHER</div>
                <div class="voucher-code">${voucher.code}</div>
                <div class="voucher-qr">
                    <span>🏁</span>
                </div>
            </div>
            <div class="voucher-footer">
                Tunjukkan bukti ini ke petugas
            </div>
        </div>
    `).join('');
}

function getUserLevel() {
    if (appState.points < 50) return 'Pemula';
    if (appState.points < 150) return 'Berkembang';
    if (appState.points < 300) return 'Mahir';
    if (appState.points < 500) return 'Ahli';
    return 'Master';
}

function renderRewards() {
    // Defines rewards data directly here or usage
    const rewards = [
        { name: 'Bibit Tanaman', cost: 50, icon: '🌱' },
        { name: 'Tas Belanja Eco', cost: 100, icon: '🛍️' },
        { name: 'Tumbler Eksklusif', cost: 150, icon: '🥤' },
        { name: 'Voucher Pulsa 20rb', cost: 200, icon: '📱' },
        { name: 'Backpack Daur Ulang', cost: 300, icon: '🎒' },
        { name: 'Sertifikat Hero', cost: 500, icon: '🏆' }
    ];

    const rewardsGrid = document.querySelector('.rewards-grid');
    if (rewardsGrid) {
        rewardsGrid.innerHTML = rewards.map(reward => `
            <div class="reward-item">
                <div class="reward-badge">${reward.cost} Poin</div>
                <div class="reward-icon">${reward.icon}</div>
                <h4>${reward.name}</h4>
                <p>Tukarkan ${reward.cost} poin</p>
                <button class="btn-reward" onclick="redeemReward('${reward.name}', ${reward.cost})">
                    Tukar
                </button>
            </div>
        `).join('');
    }
}

// ================================
// NOTIFICATIONS
// ================================
function addNotification(title, message, type = 'info') {
    const notification = {
        id: Date.now(),
        title: title,
        message: message,
        type: type,
        timestamp: new Date().toISOString(),
        read: false
    };
    appState.notifications.unshift(notification);
    saveData();
}

function markNotificationsAsRead() {
    appState.notifications.forEach(notif => notif.read = true);
    saveData();
}

function renderNotifications() {
    const list = document.getElementById('notification-list');
    if (!list) return;

    if (appState.notifications.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔕</div>
                <p>Belum ada notifikasi</p>
            </div>
        `;
        return;
    }

    const icons = { 'info': 'ℹ️', 'success': '✅', 'warning': '⚠️' };

    list.innerHTML = appState.notifications.map(notif => `
        <div class="notification-item ${notif.read ? '' : 'unread'}">
            <div class="notification-icon-wrapper ${notif.type}">${icons[notif.type] || 'ℹ️'}</div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${getRelativeTime(notif.timestamp)}</div>
            </div>
        </div>
    `).join('');

    updateNotificationBadge();
}

function updateNotificationBadge() {
    const unreadCount = appState.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('header-notif-badge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
}

// ================================
// POINTS & BONUS
// ================================
function addPoints(points) {
    appState.points += points;
    saveData();
}



// ================================
// UI UPDATE CENTRAL
// ================================
function updateUI() {
    const pointsEl = document.getElementById('total-points');
    if (pointsEl) pointsEl.textContent = appState.points;

    const rewardPointsEl = document.getElementById('reward-points');
    if (rewardPointsEl) rewardPointsEl.textContent = appState.points;

    const levelEl = document.getElementById('user-level');
    if (levelEl) levelEl.textContent = getUserLevel();

    const schedCountEl = document.getElementById('schedule-count');
    if (schedCountEl) schedCountEl.textContent = appState.schedules.length;

    const wasteEl = document.getElementById('waste-collected');
    if (wasteEl) wasteEl.textContent = appState.totalWasteCollected.toFixed(1);

    renderSchedules();
    renderNotifications();
    renderVouchers();
    renderRewards();
    updateNotificationBadge();
}

// ================================
// UTILS
// ================================
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRelativeTime(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return formatDate(timestamp.split('T')[0]);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// Demo Data Loader (for testing)
window.loadDemoData = function () {
    appState.points = 150;
    appState.schedules = [{
        id: Date.now(),
        type: 'organik',
        date: new Date().toISOString().split('T')[0],
        time: '08:00',
        weight: 2.5,
        address: 'Jl. Demo',
        createdAt: new Date().toISOString()
    }];
    saveData();
    showToast('Demo Data Loaded');
};

// ================================
// MAP INTEGRATION (Leaflet)
// ================================
let mapSource = null;
let markerSource = null;

function initMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    if (mapSource) {
        setTimeout(() => mapSource.invalidateSize(), 100);
        return;
    }

    // Default: Jakarta (Monas)
    const defaultLat = -6.175392;
    const defaultLng = 106.827153;

    // Init Map
    mapSource = L.map('map-container').setView([defaultLat, defaultLng], 13);

    // Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapSource);

    // Search Control (Geocoder)
    if (L.Control.Geocoder) {
        L.Control.geocoder({
            defaultMarkGeocode: false
        })
            .on('markgeocode', function (e) {
                const bbox = e.geocode.bbox;
                const poly = L.polygon([
                    bbox.getSouthEast(),
                    bbox.getNorthEast(),
                    bbox.getNorthWest(),
                    bbox.getSouthWest()
                ]);
                mapSource.fitBounds(poly.getBounds());

                const center = e.geocode.center;
                markerSource.setLatLng(center);
                updateLocationInfo(center.lat, center.lng);
            })
            .addTo(mapSource);
    }

    // Draggable Marker
    markerSource = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(mapSource);

    // Initial value
    updateLocationInfo(defaultLat, defaultLng, false); // False = jangan fetch alamat default (hemat API)

    // Events
    markerSource.on('dragend', (e) => updateLocationInfo(e.target.getLatLng().lat, e.target.getLatLng().lng));
    mapSource.on('click', (e) => {
        markerSource.setLatLng(e.latlng);
        updateLocationInfo(e.latlng.lat, e.latlng.lng);
    });

    // Button Current Location
    const btnLoc = document.getElementById('btn-current-location');
    if (btnLoc) {
        btnLoc.addEventListener('click', () => {
            if (navigator.geolocation) {
                btnLoc.innerHTML = '<span>⏳</span> Mencari lokasi...';
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        mapSource.setView([latitude, longitude], 16);
                        markerSource.setLatLng([latitude, longitude]);
                        updateLocationInfo(latitude, longitude);
                        btnLoc.innerHTML = '<span>📍</span> Lokasi Ditemukan';
                        setTimeout(() => btnLoc.innerHTML = '<span>📍</span> Gunakan Lokasi Saat Ini', 2000);
                    },
                    () => {
                        alert('Gagal mendapatkan lokasi. Pastikan GPS aktif.');
                        btnLoc.innerHTML = '<span>📍</span> Gunakan Lokasi Saat Ini';
                    }
                );
            } else {
                alert('Browser tidak support geolocation');
            }
        });
    }
}

async function updateLocationInfo(lat, lng, fetchAddress = true) {
    // Update Hidden Input
    const latInput = document.getElementById('pickup-lat');
    const lngInput = document.getElementById('pickup-lng');
    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;

    if (!fetchAddress) return;

    // Update Alamat UI (Reverse Geocoding)
    const addressInput = document.getElementById('address');
    if (addressInput) {
        addressInput.placeholder = "Mengambil alamat...";
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data && data.display_name) {
                addressInput.value = data.display_name;
            }
        } catch (error) {
            console.error('Gagal reverse geocode:', error);
            addressInput.placeholder = "Gagal mengambil alamat otomatis, silakan ketik manual.";
        }
    }
}
