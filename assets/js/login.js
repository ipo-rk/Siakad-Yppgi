


document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        // ── State Utama ───────────────────────────────────────────────
        darkMode: localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),

        sidebarOpen: false,
        userRole: localStorage.getItem('userRole') || 'admin',
        userName: localStorage.getItem('userName') || 'Admin',

        currentPage: 'dashboard',
        currentPageTitle: 'Dashboard',

        // Modal Control
        modalOpen: false,
        modalType: '',

        // Menu
        menu: [],

        // Data dummy admin
        adminStats: {
            totalSiswa: 428,
            totalGuru: 34,
            totalKelas: 18,
            tahunAjaran: '2025/2026',
            semester: 'Ganjil',
            siswaBaru: 18,
            guruBaru: 2,
            distribusi: { kelas7: 142, kelas8: 148, kelas9: 138 }
        },

        // ── Tahun Ajaran & Semester ───────────────────────────────────
        tahunAjaranList: [
            { id: 1, tahun: '2025/2026', semester: 'Ganjil', mulai: '2025-07-01', selesai: '2025-12-31', status: 'Aktif' },
            { id: 2, tahun: '2025/2026', semester: 'Genap', mulai: '2026-01-01', selesai: '2026-06-30', status: 'Non-Aktif' },
            { id: 3, tahun: '2024/2025', semester: 'Genap', mulai: '2025-01-01', selesai: '2025-06-30', status: 'Non-Aktif' },
            { id: 4, tahun: '2024/2025', semester: 'Ganjil', mulai: '2024-07-01', selesai: '2024-12-31', status: 'Non-Aktif' },
        ],

        tahunSearch: '',

        newTahunAjaran: { tahun: '', semester: 'Ganjil', mulai: '', selesai: '' },
        editTahunAjaran: {},

        // ── Mata Pelajaran ────────────────────────────────────────────
        mapelList: [
            { kode: 'MTK', nama: 'Matematika', kelompok: 'A', jp: 6, status: 'Aktif' },
            { kode: 'IPA', nama: 'Ilmu Pengetahuan Alam', kelompok: 'A', jp: 5, status: 'Aktif' },
            { kode: 'IPS', nama: 'Ilmu Pengetahuan Sosial', kelompok: 'A', jp: 4, status: 'Aktif' },
            { kode: 'BIND', nama: 'Bahasa Indonesia', kelompok: 'A', jp: 6, status: 'Aktif' },
            { kode: 'BING', nama: 'Bahasa Inggris', kelompok: 'A', jp: 5, status: 'Aktif' },
            { kode: 'PKN', nama: 'Pendidikan Pancasila & Kewarganegaraan', kelompok: 'A', jp: 3, status: 'Aktif' },
            { kode: 'PAI', nama: 'Pendidikan Agama Islam', kelompok: 'A', jp: 4, status: 'Aktif' },
            { kode: 'PJOK', nama: 'Pendidikan Jasmani, Olahraga & Kesehatan', kelompok: 'C', jp: 3, status: 'Aktif' },
            { kode: 'SENI', nama: 'Seni Budaya & Prakarya', kelompok: 'C', jp: 3, status: 'Non-Aktif' },
        ],

        mapelSearch: { nama: '', kelompok: '', status: '' },
        mapelCurrentPage: 1,
        mapelItemsPerPage: 8,

        newMapel: { kode: '', nama: '', kelompok: '', jp: 0, status: 'Aktif' },
        editMapel: { kode: '', nama: '', kelompok: '', jp: 0, status: 'Aktif' },

        // ── Siswa ─────────────────────────────────────────────────────
        siswaList: [
            { nis: '21001', nama: 'Budi Santoso', kelas: 'VII', jk: 'Laki-laki', status: 'Aktif' },
            { nis: '21002', nama: 'Siti Aminah', kelas: 'VIII', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21003', nama: 'Ahmad Yani', kelas: 'IX', jk: 'Laki-laki', status: 'Mutasi' },
            { nis: '21004', nama: 'Maria Magdalena', kelas: 'VIII', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21005', nama: 'Joko Widodo', kelas: 'VII', jk: 'Laki-laki', status: 'Aktif' },
            { nis: '21006', nama: 'Dewi Sartika', kelas: 'IX', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21007', nama: 'Hasanuddin', kelas: 'VIII', jk: 'Laki-laki', status: 'Aktif' },
            { nis: '21008', nama: 'Kartini', kelas: 'VII', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21009', nama: 'Sutrisno', kelas: 'IX', jk: 'Laki-laki', status: 'Mutasi' },
            { nis: '21010', nama: 'Bambang Pamungkas', kelas: 'VIII', jk: 'Laki-laki', status: 'Aktif' },
        ],

        siswaSearch: { nama: '', kelas: '', status: '' },
        siswaCurrentPage: 1,
        siswaItemsPerPage: 10,

        newSiswa: { nis: '', nama: '', kelas: '', jk: 'Laki-laki', status: 'Aktif' },
        editSiswa: { nis: '', nama: '', kelas: '', jk: 'Laki-laki', status: 'Aktif' },

        // ── Guru ──────────────────────────────────────────────────────
        guruList: [
            { nuptk: '1234567890', nama: 'Dra. Siti Aminah, M.Pd', jabatan: 'Guru Kelas', mapel: 'Matematika', status: 'Aktif' },
            { nuptk: '0987654321', nama: 'Drs. Ahmad Yani', jabatan: 'Guru Mapel', mapel: 'IPA', status: 'Aktif' },
            { nuptk: '1122334455', nama: 'Bpk. Joko Widodo, S.Pd', jabatan: 'Tendik', mapel: '-', status: 'Non-Aktif' },
            { nuptk: '5566778899', nama: 'Ibu Maria Magdalena', jabatan: 'Guru Kelas', mapel: 'Bahasa Indonesia', status: 'Aktif' },
            { nuptk: '3344556677', nama: 'Bpk. Bambang Pamungkas', jabatan: 'Guru Mapel', mapel: 'IPS', status: 'Aktif' },
            { nuptk: '7788990011', nama: 'Ibu Rina Susanti', jabatan: 'Tendik', mapel: '-', status: 'Aktif' },
            { nuptk: '2233445566', nama: 'Drs. Yohanes Rumsay', jabatan: 'Guru Kelas', mapel: 'Pendidikan Agama', status: 'Aktif' },
            { nuptk: '6677889900', nama: 'Ibu Dewi Sartika', jabatan: 'Guru Mapel', mapel: 'Seni Budaya', status: 'Non-Aktif' },
            { nuptk: '0011223344', nama: 'Bpk. Sutrisno', jabatan: 'Tendik', mapel: '-', status: 'Aktif' },
            { nuptk: '4455667788', nama: 'Ibu Kartini', jabatan: 'Guru Kelas', mapel: 'PPKn', status: 'Aktif' },
            { nuptk: '8899001122', nama: 'Bpk. Hasanuddin', jabatan: 'Guru Mapel', mapel: 'Olahraga', status: 'Aktif' },
        ],

        guruSearch: { nama: '', jabatan: '', status: '' },
        guruCurrentPage: 1,
        guruItemsPerPage: 5,

        newGuru: { nuptk: '', nama: '', jabatan: '', mapel: '', status: 'Aktif' },
        editGuru: { nuptk: '', nama: '', jabatan: '', mapel: '', status: 'Aktif' },

        // ── Kelas ─────────────────────────────────────────────────────
        kelasList: [
            { kode: 'VII-A', tingkat: 'VII', waliId: '5566778899', waliNama: 'Ibu Maria Magdalena', jumlahSiswa: 30, status: 'Aktif' },
            { kode: 'VII-B', tingkat: 'VII', waliId: '4455667788', waliNama: 'Ibu Kartini', jumlahSiswa: 28, status: 'Aktif' },
            { kode: 'VIII-A', tingkat: 'VIII', waliId: '2233445566', waliNama: 'Drs. Yohanes Rumsay', jumlahSiswa: 32, status: 'Aktif' },
            { kode: 'VIII-B', tingkat: 'VIII', waliId: '1234567890', waliNama: 'Dra. Siti Aminah, M.Pd', jumlahSiswa: 29, status: 'Aktif' },
            { kode: 'IX-A', tingkat: 'IX', waliId: '6677889900', waliNama: 'Ibu Dewi Sartika', jumlahSiswa: 31, status: 'Non-Aktif' },
        ],

        kelasSearch: { kode: '', tingkat: '', status: '' },
        kelasCurrentPage: 1,
        kelasItemsPerPage: 5,

        newKelas: { kode: '', tingkat: '', waliId: '', jumlahSiswa: 0, status: 'Aktif' },
        editKelas: { kode: '', tingkat: '', waliId: '', jumlahSiswa: 0, status: 'Aktif' },

        // ── Lainnya ───────────────────────────────────────────────────
        charts: {},
        laporanTab: 'siswa',

        // ── Computed Properties ───────────────────────────────────────
        get menuItems() {
            return this.menu.map(item => ({ ...item, href: `#${item.page}` }));
        },

        get filteredTahunAjaran() {
            return this.tahunAjaranList.filter(ta =>
                ta.tahun.toLowerCase().includes(this.tahunSearch.toLowerCase()) ||
                ta.semester.toLowerCase().includes(this.tahunSearch.toLowerCase())
            );
        },

        get filteredMapel() {
            return this.mapelList.filter(m => {
                const namaMatch = m.nama.toLowerCase().includes(this.mapelSearch.nama.toLowerCase()) ||
                    m.kode.toLowerCase().includes(this.mapelSearch.nama.toLowerCase());
                const kelompokMatch = !this.mapelSearch.kelompok || m.kelompok === this.mapelSearch.kelompok;
                const statusMatch = !this.mapelSearch.status || m.status === this.mapelSearch.status;
                return namaMatch && kelompokMatch && statusMatch;
            });
        },

        get paginatedMapel() {
            const start = (this.mapelCurrentPage - 1) * this.mapelItemsPerPage;
            return this.filteredMapel.slice(start, start + this.mapelItemsPerPage);
        },

        get mapelTotalPages() {
            return Math.max(1, Math.ceil(this.filteredMapel.length / this.mapelItemsPerPage));
        },

        get mapelPageRange() {
            const total = this.mapelTotalPages;
            const current = this.mapelCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        get filteredSiswa() {
            return this.siswaList.filter(s => {
                const namaMatch = s.nama.toLowerCase().includes(this.siswaSearch.nama.toLowerCase()) ||
                    s.nis.includes(this.siswaSearch.nama);
                const kelasMatch = !this.siswaSearch.kelas || s.kelas === this.siswaSearch.kelas;
                const statusMatch = !this.siswaSearch.status || s.status === this.siswaSearch.status;
                return namaMatch && kelasMatch && statusMatch;
            });
        },

        get paginatedSiswa() {
            const start = (this.siswaCurrentPage - 1) * this.siswaItemsPerPage;
            return this.filteredSiswa.slice(start, start + this.siswaItemsPerPage);
        },

        get siswaTotalPages() {
            return Math.max(1, Math.ceil(this.filteredSiswa.length / this.siswaItemsPerPage));
        },

        get siswaPageRange() {
            const total = this.siswaTotalPages;
            const current = this.siswaCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        get filteredGuru() {
            const search = this.guruSearch.nama.toLowerCase();
            return this.guruList.filter(g => {
                const namaMatch = g.nama.toLowerCase().includes(search) || g.nuptk.includes(search);
                const jabatanMatch = !this.guruSearch.jabatan || g.jabatan === this.guruSearch.jabatan;
                const statusMatch = !this.guruSearch.status || g.status === this.guruSearch.status;
                return namaMatch && jabatanMatch && statusMatch;
            });
        },

        get paginatedGuru() {
            const start = (this.guruCurrentPage - 1) * this.guruItemsPerPage;
            return this.filteredGuru.slice(start, start + this.guruItemsPerPage);
        },

        get guruTotalPages() {
            return Math.max(1, Math.ceil(this.filteredGuru.length / this.guruItemsPerPage));
        },

        get guruPageRange() {
            const total = this.guruTotalPages;
            const current = this.guruCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        get filteredKelas() {
            return this.kelasList.filter(k => {
                const kodeMatch = k.kode.toLowerCase().includes(this.kelasSearch.kode.toLowerCase()) ||
                    k.waliNama.toLowerCase().includes(this.kelasSearch.kode.toLowerCase());
                const tingkatMatch = !this.kelasSearch.tingkat || k.tingkat === this.kelasSearch.tingkat;
                const statusMatch = !this.kelasSearch.status || k.status === this.kelasSearch.status;
                return kodeMatch && tingkatMatch && statusMatch;
            });
        },

        get paginatedKelas() {
            const start = (this.kelasCurrentPage - 1) * this.kelasItemsPerPage;
            return this.filteredKelas.slice(start, start + this.kelasItemsPerPage);
        },

        get kelasTotalPages() {
            return Math.max(1, Math.ceil(this.filteredKelas.length / this.kelasItemsPerPage));
        },

        get kelasPageRange() {
            const total = this.kelasTotalPages;
            const current = this.kelasCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        // ── Lifecycle ─────────────────────────────────────────────────
        init() {
            this.updateMenu();

            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024) this.sidebarOpen = false;
            });

            if (!localStorage.getItem('userRole')) {
                window.location.href = 'login.html';
            }

            // Watch filter changes → reset page to 1
            this.$watch('mapelSearch', () => { this.mapelCurrentPage = 1; }, { deep: true });
            this.$watch('siswaSearch', () => { this.siswaCurrentPage = 1; }, { deep: true });
            this.$watch('guruSearch', () => { this.guruCurrentPage = 1; }, { deep: true });
            this.$watch('kelasSearch', () => { this.kelasCurrentPage = 1; }, { deep: true });
            this.$watch('tahunSearch', () => { /* no pagination for tahun ajaran yet */ });

            this.$nextTick(() => this.initCharts());
        },

        // ── Methods ───────────────────────────────────────────────────
        updateMenu() {
            const common = [{ label: 'Dashboard', icon: 'fas fa-home', page: 'dashboard' }];

            const roleMenus = {
                admin: [
                    ...common,
                    { label: 'Data Siswa', icon: 'fas fa-users', page: 'data-siswa' },
                    { label: 'Data Guru & Tendik', icon: 'fas fa-user-tie', page: 'data-guru' },
                    { label: 'Manajemen Kelas', icon: 'fas fa-chalkboard-teacher', page: 'data-kelas' },
                    { label: 'Mata Pelajaran & Kurikulum', icon: 'fas fa-book', page: 'mata-pelajaran' },
                    { label: 'Tahun Ajaran & Semester', icon: 'fas fa-calendar-alt', page: 'tahun-ajaran' },
                    { label: 'Pengumuman', icon: 'fas fa-bullhorn', page: 'pengumuman' },
                    { label: 'Laporan & Analitik', icon: 'fas fa-chart-bar', page: 'laporan' }
                ],
            };

            this.menu = roleMenus[this.userRole] || common;
        },

        setPage(page) {
            if (!this.menu.some(item => item.page === page)) return;

            this.currentPage = page;
            const found = this.menu.find(item => item.page === page);
            this.currentPageTitle = found?.label || 'Dashboard';

            if (window.innerWidth < 1024) this.sidebarOpen = false;

            if (page === 'laporan') {
                this.$nextTick(() => this.initCharts());
            }
        },

        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
        },

        logout() {
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
            window.location.href = 'login.html';
        },

        formatNumber(num) {
            return num.toLocaleString('id-ID');
        },

        getPercentage(kelas) {
            const d = this.adminStats.distribusi;
            const total = d.kelas7 + d.kelas8 + d.kelas9;
            return total > 0 ? Math.round((d[kelas] / total) * 100) : 0;
        },

        // ── Modal Control ─────────────────────────────────────────────
        openModal(type) {
            this.modalType = type;
            this.modalOpen = true;

            // Reset form sesuai jenis modal
            if (type === 'addTahunAjaran') {
                this.newTahunAjaran = { tahun: '', semester: 'Ganjil', mulai: '', selesai: '' };
            } else if (type === 'addMapel') {
                this.newMapel = { kode: '', nama: '', kelompok: '', jp: 0, status: 'Aktif' };
            } else if (type === 'addSiswa') {
                this.newSiswa = { nis: '', nama: '', kelas: '', jk: 'Laki-laki', status: 'Aktif' };
            } else if (type === 'addGuru') {
                this.newGuru = { nuptk: '', nama: '', jabatan: '', mapel: '', status: 'Aktif' };
            } else if (type === 'addKelas') {
                this.newKelas = { kode: '', tingkat: '', waliId: '', jumlahSiswa: 0, status: 'Aktif' };
            }
        },

        closeModal() {
            this.modalOpen = false;
            this.modalType = '';

            // Reset semua form agar bersih saat dibuka lagi
            this.newTahunAjaran = { tahun: '', semester: 'Ganjil', mulai: '', selesai: '' };
            this.editTahunAjaran = {};
            this.newMapel = { kode: '', nama: '', kelompok: '', jp: 0, status: 'Aktif' };
            this.editMapel = {};
            this.newSiswa = { nis: '', nama: '', kelas: '', jk: 'Laki-laki', status: 'Aktif' };
            this.editSiswa = {};
            this.newGuru = { nuptk: '', nama: '', jabatan: '', mapel: '', status: 'Aktif' };
            this.editGuru = {};
            this.newKelas = { kode: '', tingkat: '', waliId: '', jumlahSiswa: 0, status: 'Aktif' };
            this.editKelas = {};
        },

        // ── CRUD Tahun Ajaran ─────────────────────────────────────────
        addTahunAjaran() {
            if (!this.newTahunAjaran.tahun.trim() || !this.newTahunAjaran.mulai || !this.newTahunAjaran.selesai) {
                this.showError('Tahun ajaran, tanggal mulai, dan tanggal selesai wajib diisi!');
                return;
            }

            const newId = this.tahunAjaranList.length > 0
                ? Math.max(...this.tahunAjaranList.map(t => t.id)) + 1
                : 1;

            this.tahunAjaranList.push({
                id: newId,
                ...this.newTahunAjaran,
                status: 'Non-Aktif'
            });

            this.closeModal();
            this.showSuccess('Tahun ajaran baru berhasil ditambahkan.');
        },

        openEditTahunModal(ta) {
            this.editTahunAjaran = { ...ta };
            this.modalType = 'editTahunAjaran';
            this.modalOpen = true;
        },

        updateTahunAjaran() {
            if (!this.editTahunAjaran.tahun.trim() || !this.editTahunAjaran.mulai || !this.editTahunAjaran.selesai) {
                this.showError('Tahun ajaran, tanggal mulai, dan tanggal selesai wajib diisi!');
                return;
            }

            const index = this.tahunAjaranList.findIndex(t => t.id === this.editTahunAjaran.id);
            if (index !== -1) {
                this.tahunAjaranList[index] = { ...this.editTahunAjaran };
                this.closeModal();
                this.showSuccess('Tahun ajaran berhasil diperbarui.');
            }
        },

        deleteTahunAjaran(id) {
            Swal.fire({
                title: 'Yakin menghapus?',
                text: "Tahun ajaran ini akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.tahunAjaranList = this.tahunAjaranList.filter(t => t.id !== id);
                    this.showSuccess('Tahun ajaran berhasil dihapus.');
                }
            });
        },

        setAktif(id) {
            this.tahunAjaranList.forEach(ta => {
                ta.status = ta.id === id ? 'Aktif' : 'Non-Aktif';
            });
            this.showSuccess('Tahun ajaran berhasil diaktifkan.');
        },

        // ── CRUD Mata Pelajaran ───────────────────────────────────────
        addMapel() {
            if (!this.newMapel.kode.trim() || !this.newMapel.nama.trim() || !this.newMapel.kelompok || this.newMapel.jp <= 0) {
                this.showError('Kode, Nama, Kelompok, dan JP/minggu wajib diisi dan JP harus > 0!');
                return;
            }

            if (this.mapelList.some(m => m.kode === this.newMapel.kode.trim())) {
                this.showError('Kode mata pelajaran sudah ada!');
                return;
            }

            this.mapelList.push({ ...this.newMapel });
            this.closeModal();
            this.showSuccess('Mata pelajaran baru berhasil ditambahkan.');
        },

        openEditMapelModal(mapel) {
            this.editMapel = { ...mapel };
            this.openModal('editMapel');
        },

        updateMapel() {
            if (!this.editMapel.kode.trim() || !this.editMapel.nama.trim() || !this.editMapel.kelompok || this.editMapel.jp <= 0) {
                this.showError('Kode, Nama, Kelompok, dan JP/minggu wajib diisi dan JP harus > 0!');
                return;
            }

            const index = this.mapelList.findIndex(m => m.kode === this.editMapel.kode);
            if (index !== -1) {
                this.mapelList[index] = { ...this.editMapel };
                this.closeModal();
                this.showSuccess('Data mata pelajaran berhasil diperbarui.');
            }
        },

        deleteMapel(kode) {
            Swal.fire({
                title: 'Yakin menghapus?',
                text: "Data mata pelajaran akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.mapelList = this.mapelList.filter(m => m.kode !== kode);
                    this.showSuccess('Mata pelajaran berhasil dihapus.');
                }
            });
        },

        // ── CRUD Siswa, Guru, Kelas ───────────────────────────────────
        // ── CRUD Siswa ────────────────────────────────────────────────
        addSiswa() {
            if (!this.newSiswa.nis.trim() || !this.newSiswa.nama.trim() || !this.newSiswa.kelas) {
                this.showError('NIS, Nama Lengkap, dan Kelas wajib diisi!');
                return;
            }

            if (this.siswaList.some(s => s.nis === this.newSiswa.nis.trim())) {
                this.showError('NIS sudah terdaftar!');
                return;
            }

            this.siswaList.push({ ...this.newSiswa });
            this.closeModal();
            this.showSuccess('Siswa baru berhasil ditambahkan.');
        },

        openEditSiswaModal(siswa) {
            this.editSiswa = { ...siswa };
            this.openModal('editSiswa');
        },

        updateSiswa() {
            if (!this.editSiswa.nis.trim() || !this.editSiswa.nama.trim() || !this.editSiswa.kelas) {
                this.showError('NIS, Nama Lengkap, dan Kelas wajib diisi!');
                return;
            }

            const index = this.siswaList.findIndex(s => s.nis === this.editSiswa.nis);
            if (index !== -1) {
                this.siswaList[index] = { ...this.editSiswa };
                this.closeModal();
                this.showSuccess('Data siswa berhasil diperbarui.');
            }
        },

        deleteSiswa(nis) {
            Swal.fire({
                title: 'Yakin menghapus siswa?',
                text: "Data siswa akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.siswaList = this.siswaList.filter(s => s.nis !== nis);
                    this.showSuccess('Siswa berhasil dihapus.');
                }
            });
        },

        // ── CRUD Guru ─────────────────────────────────────────────────
        addGuru() {
            if (!this.newGuru.nuptk.trim() || !this.newGuru.nama.trim() || !this.newGuru.jabatan) {
                this.showError('NUPTK/NIP, Nama, dan Jabatan wajib diisi!');
                return;
            }

            if (this.guruList.some(g => g.nuptk === this.newGuru.nuptk.trim())) {
                this.showError('NUPTK/NIP sudah terdaftar!');
                return;
            }

            this.guruList.push({ ...this.newGuru });
            this.closeModal();
            this.showSuccess('Guru baru berhasil ditambahkan.');
        },

        openEditGuruModal(guru) {
            this.editGuru = { ...guru };
            this.openModal('editGuru');
        },

        updateGuru() {
            if (!this.editGuru.nuptk.trim() || !this.editGuru.nama.trim() || !this.editGuru.jabatan) {
                this.showError('NUPTK/NIP, Nama, dan Jabatan wajib diisi!');
                return;
            }

            const index = this.guruList.findIndex(g => g.nuptk === this.editGuru.nuptk);
            if (index !== -1) {
                this.guruList[index] = { ...this.editGuru };
                this.closeModal();
                this.showSuccess('Data guru berhasil diperbarui.');
            }
        },

        deleteGuru(nuptk) {
            Swal.fire({
                title: 'Yakin menghapus guru?',
                text: "Data guru akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.guruList = this.guruList.filter(g => g.nuptk !== nuptk);
                    this.showSuccess('Guru berhasil dihapus.');
                }
            });
        },

        // ── CRUD Kelas ────────────────────────────────────────────────
        addKelas() {
            if (!this.newKelas.kode.trim() || !this.newKelas.tingkat || !this.newKelas.waliId || this.newKelas.jumlahSiswa <= 0) {
                this.showError('Kode kelas, Tingkat, Wali Kelas, dan Jumlah Siswa wajib diisi!');
                return;
            }

            if (this.kelasList.some(k => k.kode === this.newKelas.kode.trim())) {
                this.showError('Kode kelas sudah ada!');
                return;
            }

            const wali = this.guruList.find(g => g.nuptk === this.newKelas.waliId);
            if (!wali) {
                this.showError('Wali kelas tidak ditemukan!');
                return;
            }

            this.kelasList.push({
                ...this.newKelas,
                waliNama: wali.nama
            });

            this.closeModal();
            this.showSuccess('Kelas baru berhasil ditambahkan.');
        },

        openEditKelasModal(kelas) {
            this.editKelas = { ...kelas };
            this.openModal('editKelas');
        },

        updateKelas() {
            if (!this.editKelas.kode.trim() || !this.editKelas.tingkat || !this.editKelas.waliId || this.editKelas.jumlahSiswa <= 0) {
                this.showError('Kode kelas, Tingkat, Wali Kelas, dan Jumlah Siswa wajib diisi!');
                return;
            }

            const wali = this.guruList.find(g => g.nuptk === this.editKelas.waliId);
            if (!wali) {
                this.showError('Wali kelas tidak ditemukan!');
                return;
            }

            const index = this.kelasList.findIndex(k => k.kode === this.editKelas.kode);
            if (index !== -1) {
                this.kelasList[index] = {
                    ...this.editKelas,
                    waliNama: wali.nama
                };
                this.closeModal();
                this.showSuccess('Data kelas berhasil diperbarui.');
            }
        },

        deleteKelas(kode) {
            Swal.fire({
                title: 'Yakin menghapus kelas?',
                text: "Data kelas akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.kelasList = this.kelasList.filter(k => k.kode !== kode);
                    this.showSuccess('Kelas berhasil dihapus.');
                }
            });
        },

        // ── Pagination ────────────────────────────────────────────────
        goToMapelPage(page) { if (page >= 1 && page <= this.mapelTotalPages) this.mapelCurrentPage = page; },
        prevMapelPage() { if (this.mapelCurrentPage > 1) this.mapelCurrentPage--; },
        nextMapelPage() { if (this.mapelCurrentPage < this.mapelTotalPages) this.mapelCurrentPage++; },

        goToSiswaPage(page) { if (page >= 1 && page <= this.siswaTotalPages) this.siswaCurrentPage = page; },
        prevSiswaPage() { if (this.siswaCurrentPage > 1) this.siswaCurrentPage--; },
        nextSiswaPage() { if (this.siswaCurrentPage < this.siswaTotalPages) this.siswaCurrentPage++; },

        goToGuruPage(page) { if (page >= 1 && page <= this.guruTotalPages) this.guruCurrentPage = page; },
        prevGuruPage() { if (this.guruCurrentPage > 1) this.guruCurrentPage--; },
        nextGuruPage() { if (this.guruCurrentPage < this.guruTotalPages) this.guruCurrentPage++; },

        goToKelasPage(page) { if (page >= 1 && page <= this.kelasTotalPages) this.kelasCurrentPage = page; },
        prevKelasPage() { if (this.kelasCurrentPage > 1) this.kelasCurrentPage--; },
        nextKelasPage() { if (this.kelasCurrentPage < this.kelasTotalPages) this.kelasCurrentPage++; },

        // ── Chart ─────────────────────────────────────────────────────
        initCharts() {
            const createOrUpdate = (id, config) => {
                const canvas = document.getElementById(id);
                if (!canvas) return;

                if (this.charts[id]) {
                    this.charts[id].destroy();
                }

                this.charts[id] = new Chart(canvas, config);
            };

            createOrUpdate('siswaPieChart', {
                type: 'pie',
                data: {
                    labels: ['VII', 'VIII', 'IX'],
                    datasets: [{ data: [142, 148, 138], backgroundColor: ['#6366f1', '#4f46e5', '#4338ca'] }]
                },
                options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
            });

            createOrUpdate('nilaiRataBarChart', {
                type: 'bar',
                data: {
                    labels: ['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A', 'IX-B'],
                    datasets: [{ label: 'Rata-rata', data: [81.2, 79.8, 84.5, 82.1, 86.3, 80.9], backgroundColor: '#4f46e5' }]
                },
                options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
            });

            createOrUpdate('absensiLineChart', {
                type: 'line',
                data: {
                    labels: ['Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des', 'Jan'],
                    datasets: [{ label: '% Kehadiran', data: [95.2, 96.1, 94.8, 97.3, 96.5, 95.9, 96.8], borderColor: '#10b981', tension: 0.3 }]
                },
                options: { responsive: true, scales: { y: { min: 80, max: 100 } } }
            });

            createOrUpdate('sppPieChart', {
                type: 'doughnut',
                data: {
                    labels: ['Lunas', 'Cicilan', 'Tunggakan'],
                    datasets: [{ data: [74, 18, 8], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'] }]
                },
                options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
            });
        },

        // ── Helper ────────────────────────────────────────────────────
        showSuccess(message) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: message,
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true
            });
        },

        showError(message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
                confirmButtonColor: '#4f46e5'
            });
        },

        exportReport(format) {
            Swal.fire({
                icon: 'info',
                title: 'Sedang memproses...',
                text: `Export laporan sebagai ${format.toUpperCase()}. Fitur ini memerlukan backend.`,
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true
            });
        }
    }));
});






document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        // ── State Utama ───────────────────────────────────────────────
        darkMode: localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),

        sidebarOpen: false,
        userRole: localStorage.getItem('userRole') || 'admin',
        userName: localStorage.getItem('userName') || 'Admin',

        currentPage: 'dashboard',
        currentPageTitle: 'Dashboard',

        // Modal
        modalOpen: false,
        modalType: '',

        // Menu
        menu: [],

        // Data dummy admin
        adminStats: {
            totalSiswa: 428,
            totalGuru: 34,
            totalKelas: 18,
            tahunAjaran: '2025/2026',
            semester: 'Ganjil',
            siswaBaru: 18,
            guruBaru: 2,
            distribusi: { kelas7: 142, kelas8: 148, kelas9: 138 }
        },

        // ── Tahun Ajaran & Semester ───────────────────────────────────────
        tahunAjaranList: [
            { id: 1, tahun: '2025/2026', semester: 'Ganjil', mulai: '2025-07-01', selesai: '2025-12-31', status: 'Aktif' },
            { id: 2, tahun: '2025/2026', semester: 'Genap', mulai: '2026-01-01', selesai: '2026-06-30', status: 'Non-Aktif' },
            { id: 3, tahun: '2024/2025', semester: 'Genap', mulai: '2025-01-01', selesai: '2025-06-30', status: 'Non-Aktif' },
            { id: 4, tahun: '2024/2025', semester: 'Ganjil', mulai: '2024-07-01', selesai: '2024-12-31', status: 'Non-Aktif' },
        ],

        tahunSearch: '',

        newTahunAjaran: { tahun: '', semester: 'Ganjil', mulai: '', selesai: '' },
        editTahunAjaran: {},

        // ── Mata Pelajaran ────────────────────────────────────────────
        mapelList: [
            { kode: 'MTK', nama: 'Matematika', kelompok: 'A', jp: 6, status: 'Aktif' },
            { kode: 'IPA', nama: 'Ilmu Pengetahuan Alam', kelompok: 'A', jp: 5, status: 'Aktif' },
            { kode: 'IPS', nama: 'Ilmu Pengetahuan Sosial', kelompok: 'A', jp: 4, status: 'Aktif' },
            { kode: 'BIND', nama: 'Bahasa Indonesia', kelompok: 'A', jp: 6, status: 'Aktif' },
            { kode: 'BING', nama: 'Bahasa Inggris', kelompok: 'A', jp: 5, status: 'Aktif' },
            { kode: 'PKN', nama: 'Pendidikan Pancasila & Kewarganegaraan', kelompok: 'A', jp: 3, status: 'Aktif' },
            { kode: 'PAI', nama: 'Pendidikan Agama Islam', kelompok: 'A', jp: 4, status: 'Aktif' },
            { kode: 'PJOK', nama: 'Pendidikan Jasmani, Olahraga & Kesehatan', kelompok: 'C', jp: 3, status: 'Aktif' },
            { kode: 'SENI', nama: 'Seni Budaya & Prakarya', kelompok: 'C', jp: 3, status: 'Non-Aktif' },
        ],

        mapelSearch: { nama: '', kelompok: '', status: '' },
        mapelCurrentPage: 1,
        mapelItemsPerPage: 8,

        newMapel: { kode: '', nama: '', kelompok: '', jp: 0, status: 'Aktif' },
        editMapel: { kode: '', nama: '', kelompok: '', jp: 0, status: 'Aktif' },

        // ── Siswa ─────────────────────────────────────────────────────
        siswaList: [
            { nis: '21001', nama: 'Budi Santoso', kelas: 'VII', jk: 'Laki-laki', status: 'Aktif' },
            { nis: '21002', nama: 'Siti Aminah', kelas: 'VIII', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21003', nama: 'Ahmad Yani', kelas: 'IX', jk: 'Laki-laki', status: 'Mutasi' },
            { nis: '21004', nama: 'Maria Magdalena', kelas: 'VIII', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21005', nama: 'Joko Widodo', kelas: 'VII', jk: 'Laki-laki', status: 'Aktif' },
            { nis: '21006', nama: 'Dewi Sartika', kelas: 'IX', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21007', nama: 'Hasanuddin', kelas: 'VIII', jk: 'Laki-laki', status: 'Aktif' },
            { nis: '21008', nama: 'Kartini', kelas: 'VII', jk: 'Perempuan', status: 'Aktif' },
            { nis: '21009', nama: 'Sutrisno', kelas: 'IX', jk: 'Laki-laki', status: 'Mutasi' },
            { nis: '21010', nama: 'Bambang Pamungkas', kelas: 'VIII', jk: 'Laki-laki', status: 'Aktif' },
        ],

        siswaSearch: { nama: '', kelas: '', status: '' },
        siswaCurrentPage: 1,
        siswaItemsPerPage: 10,

        newSiswa: { nis: '', nama: '', kelas: '', jk: 'Laki-laki', status: 'Aktif' },
        editSiswa: { nis: '', nama: '', kelas: '', jk: 'Laki-laki', status: 'Aktif' },

        // ── Guru ──────────────────────────────────────────────────────
        guruList: [
            { nuptk: '1234567890', nama: 'Dra. Siti Aminah, M.Pd', jabatan: 'Guru Kelas', mapel: 'Matematika', status: 'Aktif' },
            { nuptk: '0987654321', nama: 'Drs. Ahmad Yani', jabatan: 'Guru Mapel', mapel: 'IPA', status: 'Aktif' },
            { nuptk: '1122334455', nama: 'Bpk. Joko Widodo, S.Pd', jabatan: 'Tendik', mapel: '-', status: 'Non-Aktif' },
            { nuptk: '5566778899', nama: 'Ibu Maria Magdalena', jabatan: 'Guru Kelas', mapel: 'Bahasa Indonesia', status: 'Aktif' },
            { nuptk: '3344556677', nama: 'Bpk. Bambang Pamungkas', jabatan: 'Guru Mapel', mapel: 'IPS', status: 'Aktif' },
            { nuptk: '7788990011', nama: 'Ibu Rina Susanti', jabatan: 'Tendik', mapel: '-', status: 'Aktif' },
            { nuptk: '2233445566', nama: 'Drs. Yohanes Rumsay', jabatan: 'Guru Kelas', mapel: 'Pendidikan Agama', status: 'Aktif' },
            { nuptk: '6677889900', nama: 'Ibu Dewi Sartika', jabatan: 'Guru Mapel', mapel: 'Seni Budaya', status: 'Non-Aktif' },
            { nuptk: '0011223344', nama: 'Bpk. Sutrisno', jabatan: 'Tendik', mapel: '-', status: 'Aktif' },
            { nuptk: '4455667788', nama: 'Ibu Kartini', jabatan: 'Guru Kelas', mapel: 'PPKn', status: 'Aktif' },
            { nuptk: '8899001122', nama: 'Bpk. Hasanuddin', jabatan: 'Guru Mapel', mapel: 'Olahraga', status: 'Aktif' },
        ],

        guruSearch: { nama: '', jabatan: '', status: '' },
        guruCurrentPage: 1,
        guruItemsPerPage: 5,

        newGuru: { nuptk: '', nama: '', jabatan: '', mapel: '', status: 'Aktif' },
        editGuru: { nuptk: '', nama: '', jabatan: '', mapel: '', status: 'Aktif' },

        // ── Kelas ─────────────────────────────────────────────────────
        kelasList: [
            { kode: 'VII-A', tingkat: 'VII', waliId: '5566778899', waliNama: 'Ibu Maria Magdalena', jumlahSiswa: 30, status: 'Aktif' },
            { kode: 'VII-B', tingkat: 'VII', waliId: '4455667788', waliNama: 'Ibu Kartini', jumlahSiswa: 28, status: 'Aktif' },
            { kode: 'VIII-A', tingkat: 'VIII', waliId: '2233445566', waliNama: 'Drs. Yohanes Rumsay', jumlahSiswa: 32, status: 'Aktif' },
            { kode: 'VIII-B', tingkat: 'VIII', waliId: '1234567890', waliNama: 'Dra. Siti Aminah, M.Pd', jumlahSiswa: 29, status: 'Aktif' },
            { kode: 'IX-A', tingkat: 'IX', waliId: '6677889900', waliNama: 'Ibu Dewi Sartika', jumlahSiswa: 31, status: 'Non-Aktif' },
        ],

        kelasSearch: { kode: '', tingkat: '', status: '' },
        kelasCurrentPage: 1,
        kelasItemsPerPage: 5,

        newKelas: { kode: '', tingkat: '', waliId: '', jumlahSiswa: 0, status: 'Aktif' },
        editKelas: { kode: '', tingkat: '', waliId: '', jumlahSiswa: 0, status: 'Aktif' },

        // ── Lainnya ───────────────────────────────────────────────────
        charts: {},
        laporanTab: 'siswa',

        // ── Computed Properties ───────────────────────────────────────
        get menuItems() {
            return this.menu.map(item => ({ ...item, href: `#${item.page}` }));
        },

        // Mapel
        get filteredMapel() {
            return this.mapelList.filter(m => {
                const namaMatch = m.nama.toLowerCase().includes(this.mapelSearch.nama.toLowerCase()) ||
                    m.kode.toLowerCase().includes(this.mapelSearch.nama.toLowerCase());
                const kelompokMatch = !this.mapelSearch.kelompok || m.kelompok === this.mapelSearch.kelompok;
                const statusMatch = !this.mapelSearch.status || m.status === this.mapelSearch.status;
                return namaMatch && kelompokMatch && statusMatch;
            });
        },

        get paginatedMapel() {
            const start = (this.mapelCurrentPage - 1) * this.mapelItemsPerPage;
            return this.filteredMapel.slice(start, start + this.mapelItemsPerPage);
        },

        get mapelTotalPages() {
            return Math.max(1, Math.ceil(this.filteredMapel.length / this.mapelItemsPerPage));
        },

        get mapelPageRange() {
            const total = this.mapelTotalPages;
            const current = this.mapelCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        // Siswa
        get filteredSiswa() {
            return this.siswaList.filter(s => {
                const namaMatch = s.nama.toLowerCase().includes(this.siswaSearch.nama.toLowerCase());
                const kelasMatch = !this.siswaSearch.kelas || s.kelas === this.siswaSearch.kelas;
                const statusMatch = !this.siswaSearch.status || s.status === this.siswaSearch.status;
                return namaMatch && kelasMatch && statusMatch;
            });
        },

        get paginatedSiswa() {
            const start = (this.siswaCurrentPage - 1) * this.siswaItemsPerPage;
            return this.filteredSiswa.slice(start, start + this.siswaItemsPerPage);
        },

        get siswaTotalPages() {
            return Math.max(1, Math.ceil(this.filteredSiswa.length / this.siswaItemsPerPage));
        },

        get siswaPageRange() {
            const total = this.siswaTotalPages;
            const current = this.siswaCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        // Guru
        get filteredGuru() {
            const search = this.guruSearch.nama.toLowerCase();
            return this.guruList.filter(g => {
                const namaMatch = g.nama.toLowerCase().includes(search) || g.nuptk.includes(search);
                const jabatanMatch = !this.guruSearch.jabatan || g.jabatan === this.guruSearch.jabatan;
                const statusMatch = !this.guruSearch.status || g.status === this.guruSearch.status;
                return namaMatch && jabatanMatch && statusMatch;
            });
        },

        get paginatedGuru() {
            const start = (this.guruCurrentPage - 1) * this.guruItemsPerPage;
            return this.filteredGuru.slice(start, start + this.guruItemsPerPage);
        },

        get guruTotalPages() {
            return Math.max(1, Math.ceil(this.filteredGuru.length / this.guruItemsPerPage));
        },

        get guruPageRange() {
            const total = this.guruTotalPages;
            const current = this.guruCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        // Kelas
        get filteredKelas() {
            return this.kelasList.filter(k => {
                const kodeMatch = k.kode.toLowerCase().includes(this.kelasSearch.kode.toLowerCase()) ||
                    k.waliNama.toLowerCase().includes(this.kelasSearch.kode.toLowerCase());
                const tingkatMatch = !this.kelasSearch.tingkat || k.tingkat === this.kelasSearch.tingkat;
                const statusMatch = !this.kelasSearch.status || k.status === this.kelasSearch.status;
                return kodeMatch && tingkatMatch && statusMatch;
            });
        },

        get paginatedKelas() {
            const start = (this.kelasCurrentPage - 1) * this.kelasItemsPerPage;
            return this.filteredKelas.slice(start, start + this.kelasItemsPerPage);
        },

        get kelasTotalPages() {
            return Math.max(1, Math.ceil(this.filteredKelas.length / this.kelasItemsPerPage));
        },

        get kelasPageRange() {
            const total = this.kelasTotalPages;
            const current = this.kelasCurrentPage;
            const range = 2;
            let start = Math.max(1, current - range);
            let end = Math.min(total, current + range);
            if (end - start < range * 2 + 1) {
                if (start === 1) end = Math.min(total, start + range * 2);
                else if (end === total) start = Math.max(1, end - range * 2);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },

        // Tahunjaran
        get filteredTahunAjaran() {
            return this.tahunAjaranList.filter(ta =>
                ta.tahun.toLowerCase().includes(this.tahunSearch.toLowerCase()) ||
                ta.semester.toLowerCase().includes(this.tahunSearch.toLowerCase())
            );
        },

        // ── Lifecycle ─────────────────────────────────────────────────
        init() {
            this.updateMenu();

            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024) this.sidebarOpen = false;
            });

            if (!localStorage.getItem('userRole')) {
                window.location.href = 'login.html';
            }

            // Reset pagination saat filter berubah
            this.$watch('mapelSearch', () => { this.mapelCurrentPage = 1; }, { deep: true });
            this.$watch('siswaSearch', () => { this.siswaCurrentPage = 1; }, { deep: true });
            this.$watch('guruSearch', () => { this.guruCurrentPage = 1; }, { deep: true });
            this.$watch('kelasSearch', () => { this.kelasCurrentPage = 1; }, { deep: true });

            this.$nextTick(() => this.initCharts());
        },

        // ── Methods ───────────────────────────────────────────────────
        updateMenu() {
            const common = [{ label: 'Dashboard', icon: 'fas fa-home', page: 'dashboard' }];

            const roleMenus = {
                admin: [
                    ...common,
                    { label: 'Data Siswa', icon: 'fas fa-users', page: 'data-siswa' },
                    { label: 'Data Guru & Tendik', icon: 'fas fa-user-tie', page: 'data-guru' },
                    { label: 'Manajemen Kelas', icon: 'fas fa-chalkboard-teacher', page: 'data-kelas' },
                    { label: 'Mata Pelajaran & Kurikulum', icon: 'fas fa-book', page: 'mata-pelajaran' },
                    { label: 'Tahun Ajaran & Semester', icon: 'fas fa-calendar-alt', page: 'tahun-ajaran' },
                    { label: 'Pengumuman', icon: 'fas fa-bullhorn', page: 'pengumuman' },
                    { label: 'Laporan & Analitik', icon: 'fas fa-chart-bar', page: 'laporan' }
                ],
            };

            this.menu = roleMenus[this.userRole] || common;
        },

        setPage(page) {
            if (!this.menu.some(item => item.page === page)) return;

            this.currentPage = page;
            const found = this.menu.find(item => item.page === page);
            this.currentPageTitle = found?.label || 'Dashboard';

            if (window.innerWidth < 1024) this.sidebarOpen = false;

            if (page === 'laporan') {
                this.$nextTick(() => this.initCharts());
            }
        },

        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
        },

        logout() {
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
            window.location.href = 'login.html';
        },

        formatNumber(num) {
            return num.toLocaleString('id-ID');
        },

        getPercentage(kelas) {
            const d = this.adminStats.distribusi;
            const total = d.kelas7 + d.kelas8 + d.kelas9;
            return total > 0 ? Math.round((d[kelas] / total) * 100) : 0;
        },

        // Modal
        openModal(type) {
            this.modalType = type;
            this.modalOpen = true;
        },

        closeModal() {
            this.modalOpen = false;
            this.modalType = '';
            // Reset form
            this.newMapel = { kode: '', nama: '', kelompok: '', jp: 0, status: 'Aktif' };
            this.newSiswa = { nis: '', nama: '', kelas: '', jk: 'Laki-laki', status: 'Aktif' };
            this.newGuru = { nuptk: '', nama: '', jabatan: '', mapel: '', status: 'Aktif' };
            this.newKelas = { kode: '', tingkat: '', waliId: '', jumlahSiswa: 0, status: 'Aktif' };
        },

        // ── CRUD Mata Pelajaran ───────────────────────────────────────
        addMapel() {
            if (!this.newMapel.kode.trim() || !this.newMapel.nama.trim() || !this.newMapel.kelompok || this.newMapel.jp <= 0) {
                this.showError('Kode, Nama, Kelompok, dan JP/minggu wajib diisi dan JP harus > 0!');
                return;
            }

            if (this.mapelList.some(m => m.kode === this.newMapel.kode.trim())) {
                this.showError('Kode mata pelajaran sudah ada!');
                return;
            }

            this.mapelList.push({ ...this.newMapel });
            this.closeModal();
            this.showSuccess('Mata pelajaran baru berhasil ditambahkan.');
        },

        openEditMapelModal(mapel) {
            this.editMapel = { ...mapel };
            this.openModal('editMapel');
        },

        updateMapel() {
            if (!this.editMapel.kode.trim() || !this.editMapel.nama.trim() || !this.editMapel.kelompok || this.editMapel.jp <= 0) {
                this.showError('Kode, Nama, Kelompok, dan JP/minggu wajib diisi dan JP harus > 0!');
                return;
            }

            const index = this.mapelList.findIndex(m => m.kode === this.editMapel.kode);
            if (index !== -1) {
                this.mapelList[index] = { ...this.editMapel };
                this.closeModal();
                this.showSuccess('Data mata pelajaran berhasil diperbarui.');
            }
        },

        deleteMapel(kode) {
            Swal.fire({
                title: 'Yakin menghapus?',
                text: "Data mata pelajaran akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.mapelList = this.mapelList.filter(m => m.kode !== kode);
                    this.showSuccess('Mata pelajaran berhasil dihapus.');
                }
            });
        },

        // ── CRUD Siswa ────────────────────────────────────────────────
        addSiswa() {
            if (!this.newSiswa.nis.trim() || !this.newSiswa.nama.trim() || !this.newSiswa.kelas) {
                this.showError('NIS, Nama Lengkap, dan Kelas wajib diisi!');
                return;
            }

            if (this.siswaList.some(s => s.nis === this.newSiswa.nis.trim())) {
                this.showError('NIS sudah terdaftar!');
                return;
            }

            this.siswaList.push({ ...this.newSiswa });
            this.closeModal();
            this.showSuccess('Siswa baru berhasil ditambahkan.');
        },

        openEditSiswaModal(siswa) {
            this.editSiswa = { ...siswa };
            this.openModal('editSiswa');
        },

        updateSiswa() {
            if (!this.editSiswa.nis.trim() || !this.editSiswa.nama.trim() || !this.editSiswa.kelas) {
                this.showError('NIS, Nama Lengkap, dan Kelas wajib diisi!');
                return;
            }

            const index = this.siswaList.findIndex(s => s.nis === this.editSiswa.nis);
            if (index !== -1) {
                this.siswaList[index] = { ...this.editSiswa };
                this.closeModal();
                this.showSuccess('Data siswa berhasil diperbarui.');
            }
        },

        deleteSiswa(nis) {
            Swal.fire({
                title: 'Yakin menghapus siswa?',
                text: "Data siswa akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.siswaList = this.siswaList.filter(s => s.nis !== nis);
                    this.showSuccess('Siswa berhasil dihapus.');
                }
            });
        },

        // ── CRUD Guru ─────────────────────────────────────────────────
        addGuru() {
            if (!this.newGuru.nuptk.trim() || !this.newGuru.nama.trim() || !this.newGuru.jabatan) {
                this.showError('NUPTK/NIP, Nama, dan Jabatan wajib diisi!');
                return;
            }

            if (this.guruList.some(g => g.nuptk === this.newGuru.nuptk.trim())) {
                this.showError('NUPTK/NIP sudah terdaftar!');
                return;
            }

            this.guruList.push({ ...this.newGuru });
            this.closeModal();
            this.showSuccess('Guru baru berhasil ditambahkan.');
        },

        openEditGuruModal(guru) {
            this.editGuru = { ...guru };
            this.openModal('editGuru');
        },

        updateGuru() {
            if (!this.editGuru.nuptk.trim() || !this.editGuru.nama.trim() || !this.editGuru.jabatan) {
                this.showError('NUPTK/NIP, Nama, dan Jabatan wajib diisi!');
                return;
            }

            const index = this.guruList.findIndex(g => g.nuptk === this.editGuru.nuptk);
            if (index !== -1) {
                this.guruList[index] = { ...this.editGuru };
                this.closeModal();
                this.showSuccess('Data guru berhasil diperbarui.');
            }
        },

        deleteGuru(nuptk) {
            Swal.fire({
                title: 'Yakin menghapus guru?',
                text: "Data guru akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.guruList = this.guruList.filter(g => g.nuptk !== nuptk);
                    this.showSuccess('Guru berhasil dihapus.');
                }
            });
        },

        // ── CRUD Kelas ────────────────────────────────────────────────
        addKelas() {
            if (!this.newKelas.kode.trim() || !this.newKelas.tingkat || !this.newKelas.waliId || this.newKelas.jumlahSiswa <= 0) {
                this.showError('Kode kelas, Tingkat, Wali Kelas, dan Jumlah Siswa wajib diisi!');
                return;
            }

            if (this.kelasList.some(k => k.kode === this.newKelas.kode.trim())) {
                this.showError('Kode kelas sudah ada!');
                return;
            }

            const wali = this.guruList.find(g => g.nuptk === this.newKelas.waliId);
            if (!wali) {
                this.showError('Wali kelas tidak ditemukan!');
                return;
            }

            this.kelasList.push({
                ...this.newKelas,
                waliNama: wali.nama
            });

            this.closeModal();
            this.showSuccess('Kelas baru berhasil ditambahkan.');
        },

        openEditKelasModal(kelas) {
            this.editKelas = { ...kelas };
            this.openModal('editKelas');
        },

        updateKelas() {
            if (!this.editKelas.kode.trim() || !this.editKelas.tingkat || !this.editKelas.waliId || this.editKelas.jumlahSiswa <= 0) {
                this.showError('Kode kelas, Tingkat, Wali Kelas, dan Jumlah Siswa wajib diisi!');
                return;
            }

            const wali = this.guruList.find(g => g.nuptk === this.editKelas.waliId);
            if (!wali) {
                this.showError('Wali kelas tidak ditemukan!');
                return;
            }

            const index = this.kelasList.findIndex(k => k.kode === this.editKelas.kode);
            if (index !== -1) {
                this.kelasList[index] = {
                    ...this.editKelas,
                    waliNama: wali.nama
                };
                this.closeModal();
                this.showSuccess('Data kelas berhasil diperbarui.');
            }
        },

        deleteKelas(kode) {
            Swal.fire({
                title: 'Yakin menghapus kelas?',
                text: "Data kelas akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.kelasList = this.kelasList.filter(k => k.kode !== kode);
                    this.showSuccess('Kelas berhasil dihapus.');
                }
            });
        },
        // Methods
        openModal(type) {
            this.modalType = type;
            this.modalOpen = true;

            if (type === 'addTahunAjaran') {
                this.newTahunAjaran = { tahun: '', semester: 'Ganjil', mulai: '', selesai: '' };
            }
        },

        addTahunAjaran() {
            if (!this.newTahunAjaran.tahun || !this.newTahunAjaran.mulai || !this.newTahunAjaran.selesai) {
                this.showError('Tahun, tanggal mulai, dan tanggal selesai wajib diisi!');
                return;
            }

            const newId = Math.max(0, ...this.tahunAjaranList.map(t => t.id)) + 1;

            this.tahunAjaranList.push({
                id: newId,
                ...this.newTahunAjaran,
                status: 'Non-Aktif'
            });

            this.closeModal();
            this.showSuccess('Tahun ajaran baru berhasil ditambahkan.');
        },

        openEditTahunModal(ta) {
            this.editTahunAjaran = { ...ta };
            this.modalType = 'editTahunAjaran';
            this.modalOpen = true;
        },

        updateTahunAjaran() {
            const index = this.tahunAjaranList.findIndex(t => t.id === this.editTahunAjaran.id);
            if (index !== -1) {
                this.tahunAjaranList[index] = { ...this.editTahunAjaran };
                this.closeModal();
                this.showSuccess('Tahun ajaran berhasil diperbarui.');
            }
        },

        deleteTahunAjaran(id) {
            Swal.fire({
                title: 'Yakin menghapus?',
                text: "Data tahun ajaran ini akan dihapus permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.tahunAjaranList = this.tahunAjaranList.filter(t => t.id !== id);
                    this.showSuccess('Tahun ajaran berhasil dihapus.');
                }
            });
        },

        setAktif(id) {
            // Nonaktifkan semua yang lain
            this.tahunAjaranList.forEach(ta => {
                ta.status = ta.id === id ? 'Aktif' : 'Non-Aktif';
            });
            this.showSuccess('Tahun ajaran berhasil diaktifkan.');
        },

        // ── Pagination ────────────────────────────────────────────────
        goToMapelPage(page) { if (page >= 1 && page <= this.mapelTotalPages) this.mapelCurrentPage = page; },
        prevMapelPage() { if (this.mapelCurrentPage > 1) this.mapelCurrentPage--; },
        nextMapelPage() { if (this.mapelCurrentPage < this.mapelTotalPages) this.mapelCurrentPage++; },

        goToSiswaPage(page) { if (page >= 1 && page <= this.siswaTotalPages) this.siswaCurrentPage = page; },
        prevSiswaPage() { if (this.siswaCurrentPage > 1) this.siswaCurrentPage--; },
        nextSiswaPage() { if (this.siswaCurrentPage < this.siswaTotalPages) this.siswaCurrentPage++; },

        goToGuruPage(page) { if (page >= 1 && page <= this.guruTotalPages) this.guruCurrentPage = page; },
        prevGuruPage() { if (this.guruCurrentPage > 1) this.guruCurrentPage--; },
        nextGuruPage() { if (this.guruCurrentPage < this.guruTotalPages) this.guruCurrentPage++; },

        goToKelasPage(page) { if (page >= 1 && page <= this.kelasTotalPages) this.kelasCurrentPage = page; },
        prevKelasPage() { if (this.kelasCurrentPage > 1) this.kelasCurrentPage--; },
        nextKelasPage() { if (this.kelasCurrentPage < this.kelasTotalPages) this.kelasCurrentPage++; },

        // ── Chart ─────────────────────────────────────────────────────
        initCharts() {
            const createOrUpdate = (id, config) => {
                const canvas = document.getElementById(id);
                if (!canvas) return;

                if (this.charts[id]) {
                    this.charts[id].destroy();
                }

                this.charts[id] = new Chart(canvas, config);
            };

            createOrUpdate('siswaPieChart', {
                type: 'pie',
                data: {
                    labels: ['VII', 'VIII', 'IX'],
                    datasets: [{ data: [142, 148, 138], backgroundColor: ['#6366f1', '#4f46e5', '#4338ca'] }]
                },
                options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
            });

            createOrUpdate('nilaiRataBarChart', {
                type: 'bar',
                data: {
                    labels: ['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A', 'IX-B'],
                    datasets: [{ label: 'Rata-rata', data: [81.2, 79.8, 84.5, 82.1, 86.3, 80.9], backgroundColor: '#4f46e5' }]
                },
                options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
            });

            createOrUpdate('absensiLineChart', {
                type: 'line',
                data: {
                    labels: ['Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des', 'Jan'],
                    datasets: [{ label: '% Kehadiran', data: [95.2, 96.1, 94.8, 97.3, 96.5, 95.9, 96.8], borderColor: '#10b981', tension: 0.3 }]
                },
                options: { responsive: true, scales: { y: { min: 80, max: 100 } } }
            });

            createOrUpdate('sppPieChart', {
                type: 'doughnut',
                data: {
                    labels: ['Lunas', 'Cicilan', 'Tunggakan'],
                    datasets: [{ data: [74, 18, 8], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'] }]
                },
                options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
            });
        },

        // ── Helper ────────────────────────────────────────────────────
        showSuccess(message) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: message,
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true
            });
        },

        showError(message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
                confirmButtonColor: '#4f46e5'
            });
        },

        exportReport(format) {
            Swal.fire({
                icon: 'info',
                title: 'Sedang memproses...',
                text: `Export laporan sebagai ${format.toUpperCase()}. Fitur ini memerlukan backend.`,
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true
            });
        }
    }));
});